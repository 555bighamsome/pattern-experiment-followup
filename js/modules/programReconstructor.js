/**
 * Program Reconstruction Module
 * Reconstructs the complete program from trial steps for data verification and replay
 */

import { geomDSL, transDSL } from './patterns.js';

/**
 * Reconstruct the complete program from trial steps
 * @param {Array} steps - Array of step records from currentTrialRecord.steps
 * @param {Array} targetPattern - The target pattern to compare against
 * @returns {Object} Reconstruction result with program and verification
 */
export function reconstructProgram(steps, targetPattern) {
    if (!steps || steps.length === 0) {
        return {
            success: false,
            error: 'No steps to reconstruct',
            program: null,
            finalPattern: null,
            matches: false
        };
    }

    const program = {
        steps: [],
        primitives: [],
        operations: [],
        reconstructionMetadata: {
            totalSteps: steps.length,
            timestamp: Date.now()
        }
    };

    let reconstructedPatterns = [];
    
    try {
        // Reconstruct each step
        steps.forEach((step, index) => {
            const stepInfo = {
                stepNumber: index + 1,
                operation: step.operation,
                opFn: step.opFn,
                timestamp: step.timestamp,
                intervalFromLast: step.intervalFromLast
            };

            // Extract operand information
            if (step.operands) {
                if (step.operands.a !== undefined) {
                    stepInfo.operandA = {
                        pattern: step.operands.a,
                        source: step.sourceTracking?.operandA
                    };
                }
                if (step.operands.b !== undefined) {
                    stepInfo.operandB = {
                        pattern: step.operands.b,
                        source: step.sourceTracking?.operandB
                    };
                }
                if (step.operands.input !== undefined) {
                    stepInfo.unaryInput = {
                        pattern: step.operands.input,
                        source: step.sourceTracking?.unaryInput
                    };
                }
            }

            stepInfo.resultPattern = step.pattern;
            program.steps.push(stepInfo);
            reconstructedPatterns.push(step.pattern);
        });

        // Extract all primitives used
        const primitivesUsed = new Set();
        steps.forEach(step => {
            if (step.sourceTracking) {
                ['operandA', 'operandB', 'unaryInput'].forEach(key => {
                    const source = step.sourceTracking[key];
                    if (source && source.type === 'primitive') {
                        // Try to identify which primitive was used
                        const pattern = step.operands?.[key === 'operandA' ? 'a' : key === 'operandB' ? 'b' : 'input'];
                        if (pattern) {
                            const primName = identifyPrimitive(pattern);
                            if (primName) primitivesUsed.add(primName);
                        }
                    }
                });
            }
        });
        program.primitives = Array.from(primitivesUsed);

        // Extract operation sequence
        program.operations = steps.map(s => ({
            type: s.opFn,
            display: s.operation
        }));

        // Get final pattern
        const finalPattern = reconstructedPatterns[reconstructedPatterns.length - 1];
        
        // Verify match with target
        const matches = targetPattern && JSON.stringify(finalPattern) === JSON.stringify(targetPattern);

        return {
            success: true,
            program: program,
            finalPattern: finalPattern,
            targetPattern: targetPattern,
            matches: matches,
            reconstructionMetadata: {
                stepsProcessed: steps.length,
                primitivesUsed: program.primitives.length,
                timestamp: Date.now()
            }
        };

    } catch (error) {
        return {
            success: false,
            error: error.message,
            program: program,
            finalPattern: null,
            matches: false
        };
    }
}

/**
 * Identify which primitive a pattern matches
 * @param {Array} pattern - 10x10 pattern array
 * @returns {string|null} Primitive name or null
 */
function identifyPrimitive(pattern) {
    const primitiveNames = ['blank', 'triangle', 'diag_square', 'border_square', 'middle_square', 'center_square', 'diagonal'];
    
    for (const name of primitiveNames) {
        const primPattern = geomDSL[name]();
        if (JSON.stringify(pattern) === JSON.stringify(primPattern)) {
            return name;
        }
    }
    return null;
}

/**
 * Generate executable code from program reconstruction
 * @param {Object} program - Reconstructed program object
 * @returns {string} JavaScript code that reproduces the pattern
 */
export function generateExecutableCode(program) {
    if (!program || !program.steps) {
        return '// No program to generate';
    }

    const lines = [
        '// Auto-generated code from trial reconstruction',
        '// This code reproduces the participant\'s solution',
        '',
        'import { geomDSL, transDSL } from \'./modules/patterns.js\';',
        ''
    ];

    // Generate variable declarations for each step
    program.steps.forEach((step, index) => {
        const varName = `step${index + 1}`;
        
        if (step.opFn) {
            // Binary operations
            if (['add', 'subtract', 'overlap'].includes(step.opFn)) {
                const aSource = step.operandA?.source?.type === 'primitive' 
                    ? identifyPrimitive(step.operandA.pattern) || 'blank'
                    : `step${step.operandA?.source?.index + 1}`;
                const bSource = step.operandB?.source?.type === 'primitive'
                    ? identifyPrimitive(step.operandB.pattern) || 'blank'
                    : `step${step.operandB?.source?.index + 1}`;
                
                lines.push(`const ${varName} = transDSL.${step.opFn}(${aSource}, ${bSource}); // ${step.operation}`);
            }
            // Unary operations  
            else if (['invert', 'reflect_horizontal', 'reflect_vertical', 'reflect_diag'].includes(step.opFn)) {
                const inputSource = step.unaryInput?.source?.type === 'primitive'
                    ? identifyPrimitive(step.unaryInput.pattern) || 'blank'
                    : `step${step.unaryInput?.source?.index + 1}`;
                
                lines.push(`const ${varName} = transDSL.${step.opFn}(${inputSource}); // ${step.operation}`);
            }
        } else {
            lines.push(`const ${varName} = /* ${step.operation} */ undefined;`);
        }
    });

    lines.push('');
    lines.push(`// Final pattern: step${program.steps.length}`);
    lines.push(`export default step${program.steps.length};`);

    return lines.join('\n');
}

/**
 * Validate program can be executed and produces expected result
 * @param {Object} reconstructionResult - Result from reconstructProgram
 * @returns {Object} Validation result
 */
export function validateProgram(reconstructionResult) {
    if (!reconstructionResult.success) {
        return {
            valid: false,
            error: 'Reconstruction failed: ' + reconstructionResult.error
        };
    }

    const hasAllSteps = reconstructionResult.program.steps.length > 0;
    const hasFinalPattern = reconstructionResult.finalPattern !== null;
    const matchesTarget = reconstructionResult.matches;

    return {
        valid: hasAllSteps && hasFinalPattern,
        matchesTarget: matchesTarget,
        stepsComplete: hasAllSteps,
        finalPatternExists: hasFinalPattern,
        details: {
            totalSteps: reconstructionResult.program.steps.length,
            primitivesUsed: reconstructionResult.program.primitives.length,
            operationsUsed: reconstructionResult.program.operations.length
        }
    };
}

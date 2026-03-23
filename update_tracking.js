const fs = require('fs');

const filePath = 'js/task.js';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Update applySelectedBinary function
const binaryPattern = /const labelA = operandLabel\(a\);\s+const labelB = operandLabel\(b\);\s+const opText = `\$\{pendingBinaryOp\}\(\$\{labelA\}, \$\{labelB\}\)`;\s+addOperation\(opText, \{\s+opFn: pendingBinaryOp,\s+operands: \{ a: a, b: b \}\s+\}\);/;

const binaryReplacement = `const labelA = operandLabel(a);
    const labelB = operandLabel(b);

    // Collect source tracking information for operands
    const sourceA = {
        type: inlinePreview.aFromFavorite ? 'helper' : 
              (inlinePreview.aIndex !== null ? 'workspace' : 'primitive'),
        index: inlinePreview.aIndex !== null ? inlinePreview.aIndex : null,
        isHelper: inlinePreview.aFromFavorite || false
    };
    const sourceB = {
        type: inlinePreview.bFromFavorite ? 'helper' : 
              (inlinePreview.bIndex !== null ? 'workspace' : 'primitive'),
        index: inlinePreview.bIndex !== null ? inlinePreview.bIndex : null,
        isHelper: inlinePreview.bFromFavorite || false
    };

    const opText = \`\${pendingBinaryOp}(\${labelA}, \${labelB})\`;
    addOperation(opText, {
        opFn: pendingBinaryOp,
        operands: { a: a, b: b },
        sourceTracking: {
            operationType: pendingBinaryOp,
            operandA: sourceA,
            operandB: sourceB
        }
    });`;

if (binaryPattern.test(content)) {
    content = content.replace(binaryPattern, binaryReplacement);
    console.log('✓ Updated applySelectedBinary');
} else {
    console.log('✗ Could not find pattern for applySelectedBinary');
}

// 2. Update applySelectedUnary function
const unaryPattern = /const operandCopy = \(sourceSnapshot !== undefined && sourceSnapshot !== null\)\s+\? JSON\.parse\(JSON\.stringify\(sourceSnapshot\)\)\s+: null;\s+const opText = `\$\{pendingUnaryOp\}\(\$\{operandLabel\}\)`;\s+addOperation\(opText, \{\s+opFn: pendingUnaryOp,\s+operands: \{ input: operandCopy \}\s+\}\);/;

const unaryReplacement = `const operandCopy = (sourceSnapshot !== undefined && sourceSnapshot !== null)
        ? JSON.parse(JSON.stringify(sourceSnapshot))
        : null;

    // Determine source type for tracking
    const sourceInput = {
        type: operandSourceMeta && operandSourceMeta.type === 'favorite' ? 'helper' :
              (operandSourceMeta && typeof operandSourceMeta.index === 'number' ? 'workspace' : 'primitive'),
        index: operandSourceMeta && typeof operandSourceMeta.index === 'number' ? operandSourceMeta.index : null,
        isHelper: operandSourceMeta && operandSourceMeta.type === 'favorite'
    };

    const opText = \`\${pendingUnaryOp}(\${operandLabel})\`;
    addOperation(opText, {
        opFn: pendingUnaryOp,
        operands: { input: operandCopy },
        sourceTracking: {
            operationType: pendingUnaryOp,
            unaryInput: sourceInput
        }
    });`;

if (unaryPattern.test(content)) {
    content = content.replace(unaryPattern, unaryReplacement);
    console.log('✓ Updated applySelectedUnary');
} else {
    console.log('✗ Could not find pattern for applySelectedUnary');
}

// 3. Update applyPrimitive to count clicks
const primitivePattern = /logButtonClick\('primitive', name, \{\s+pendingBinary: !!pendingBinaryOp,\s+pendingUnary: !!pendingUnaryOp\s+\}\);/;

const primitiveReplacement = `logButtonClick('primitive', name, {
        pendingBinary: !!pendingBinaryOp,
        pendingUnary: !!pendingUnaryOp
    });

    // Count primitive button clicks for statistics
    if (currentTrialRecord) {
        currentTrialRecord.statistics.primitiveClickCount++;
    }`;

if (primitivePattern.test(content)) {
    content = content.replace(primitivePattern, primitiveReplacement);
    console.log('✓ Updated applyPrimitive');
} else {
    console.log('✗ Could not find pattern for applyPrimitive');
}

// Write updated content
fs.writeFileSync(filePath, content, 'utf8');
console.log('\nUpdates complete! Check js/task.js');

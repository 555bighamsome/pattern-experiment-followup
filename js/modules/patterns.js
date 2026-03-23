import { SIZE, CELL_SIZE } from './state.js';

const geomDSL = {
    blank: () => Array(SIZE).fill(0).map(() => Array(SIZE).fill(0)),
    
    triangle: () => [
        [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    
    diag_square: () => [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    
    border_square: () => [
        [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    
    middle_square: () => [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    
    center_square: () => [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    
    diagonal: () => {
        const pattern = geomDSL.blank();
        for (let i = 0; i < SIZE; i++) pattern[i][i] = 1;
        return pattern;
    }
};

const brushSystem = {
    blank: () => Array(SIZE).fill(0).map(() => Array(SIZE).fill(0)),
    createFromPoints: (points) => {
        const pattern = brushSystem.blank();
        points.forEach(({ row, col }) => {
            if (row >= 0 && row < SIZE && col >= 0 && col < SIZE) {
                pattern[row][col] = 1;
            }
        });
        return pattern;
    },
    getPointsList: (pattern) => {
        const points = [];
        pattern.forEach((row, i) => {
            row.forEach((cell, j) => {
                if (cell) points.push({ row: i, col: j });
            });
        });
        return points;
    },
    addPoint: (pattern, row, col) => {
        const newPattern = pattern.map(r => [...r]);
        if (row >= 0 && row < SIZE && col >= 0 && col < SIZE) {
            newPattern[row][col] = 1;
        }
        return newPattern;
    },
    removePoint: (pattern, row, col) => {
        const newPattern = pattern.map(r => [...r]);
        if (row >= 0 && row < SIZE && col >= 0 && col < SIZE) {
            newPattern[row][col] = 0;
        }
        return newPattern;
    },
    togglePoint: (pattern, row, col) => {
        const newPattern = pattern.map(r => [...r]);
        if (row >= 0 && row < SIZE && col >= 0 && col < SIZE) {
            newPattern[row][col] = newPattern[row][col] ? 0 : 1;
        }
        return newPattern;
    },
    countPoints: (pattern) => pattern.flat().filter(cell => cell === 1).length
};

const transDSL = {
    subtract: (a, b) => a.map((row, i) => row.map((val, j) => (val && !b[i][j] ? 1 : 0))),
    add: (a, b) => a.map((row, i) => row.map((val, j) => (val || b[i][j] ? 1 : 0))),
    overlap: (a, b) => a.map((row, i) => row.map((val, j) => (val && b[i][j] ? 1 : 0))),
    invert: (a) => a.map((row) => row.map((val) => (val ? 0 : 1))),
    reflect_horizontal: (a) => [...a].reverse(),
    reflect_vertical: (a) => a.map((row) => [...row].reverse()),
    reflect_diag: (a) => a[0].map((_, i) => a.map((row) => row[i]))
};

const OP_ABBREVIATIONS = {
    subtract: 'sub',
    reflect_horizontal: 'refl_h',
    reflect_vertical: 'refl_v',
    reflect_diag: 'refl_d',
    diagonal: 'diag',
    triangle: 'tri',
    diag_square: 'diag_sq',
    border_square: 'bord_sq',
    middle_square: 'mid_sq',
    center_square: 'ctr_sq'
};

function getOperationAbbreviation(name) {
    if (!name) return '';
    const trimmed = name.trim();
    return OP_ABBREVIATIONS[trimmed] || trimmed;
}

function formatOperationText(op) {
    if (!op) return '';
    const trimmed = op.trim();
    const match = trimmed.match(/^(.*?)(\(.*\))?$/);
    if (!match) return trimmed;
    const base = match[1];
    const suffix = match[2] || '';
    return `${getOperationAbbreviation(base)}${suffix}`;
}

function renderPattern(pattern, containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const width = SIZE * CELL_SIZE;
    const height = SIZE * CELL_SIZE;
    const borderWidth = 3;

    svg.setAttribute('width', width + borderWidth * 2);
    svg.setAttribute('height', height + borderWidth * 2);
    svg.setAttribute('viewBox', `0 0 ${width + borderWidth * 2} ${height + borderWidth * 2}`);

    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('transform', `translate(${borderWidth}, ${borderWidth})`);

    for (let i = 0; i <= SIZE; i++) {
        const vline = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        vline.setAttribute('x1', i * CELL_SIZE);
        vline.setAttribute('y1', 0);
        vline.setAttribute('x2', i * CELL_SIZE);
        vline.setAttribute('y2', height);
        vline.setAttribute('stroke', '#9ca3af');
        vline.setAttribute('stroke-width', '1');
        g.appendChild(vline);

        const hline = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        hline.setAttribute('x1', 0);
        hline.setAttribute('y1', i * CELL_SIZE);
        hline.setAttribute('x2', width);
        hline.setAttribute('y2', i * CELL_SIZE);
        hline.setAttribute('stroke', '#9ca3af');
        hline.setAttribute('stroke-width', '1');
        g.appendChild(hline);
    }

    const diffMode = options.diffMode || null;
    const basePattern = options.basePattern || null;

    const palette = {
        add: {
            base: '#265dff',
            newCell: '#22c55e',
            ghost: 'rgba(37, 99, 235, 0.18)'
        },
        subtract: {
            base: '#312e81',
            removed: '#f97316',
            newCell: '#22d3ee',
            ghost: 'rgba(249, 115, 22, 0.2)'
        },
        overlap: {
            overlap: '#9333ea',
            onlyBase: '#3b82f6',
            onlyOther: '#facc15',
            ghost: 'rgba(148, 163, 184, 0.2)'
        }
    };

    pattern.forEach((row, i) => {
        row.forEach((cell, j) => {
            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', j * CELL_SIZE);
            rect.setAttribute('y', i * CELL_SIZE);
            rect.setAttribute('width', CELL_SIZE);
            rect.setAttribute('height', CELL_SIZE);
            rect.setAttribute('stroke', '#9ca3af');
            rect.setAttribute('stroke-width', '1');

            if (diffMode && basePattern) {
                const baseVal = basePattern[i]?.[j] || 0;
                if (diffMode === 'add') {
                    if (cell && baseVal) {
                        rect.setAttribute('fill', palette.add.base);
                        rect.setAttribute('fill-opacity', '0.75');
                    } else if (cell && !baseVal) {
                        rect.setAttribute('fill', palette.add.newCell);
                        rect.setAttribute('fill-opacity', '0.88');
                    } else if (!cell && baseVal) {
                        rect.setAttribute('fill', palette.add.ghost);
                    } else {
                        rect.setAttribute('fill', 'transparent');
                    }
                } else if (diffMode === 'subtract') {
                    if (baseVal && !cell) {
                        rect.setAttribute('fill', palette.subtract.removed);
                        rect.setAttribute('fill-opacity', '0.75');
                    } else if (cell && baseVal) {
                        rect.setAttribute('fill', palette.subtract.base);
                        rect.setAttribute('fill-opacity', '0.68');
                    } else if (cell && !baseVal) {
                        rect.setAttribute('fill', palette.subtract.newCell);
                        rect.setAttribute('fill-opacity', '0.88');
                    } else if (!cell && baseVal) {
                        rect.setAttribute('fill', palette.subtract.ghost);
                    } else {
                        rect.setAttribute('fill', 'transparent');
                    }
                } else if (diffMode === 'overlap') {
                    if (cell && baseVal) {
                        rect.setAttribute('fill', palette.overlap.overlap);
                        rect.setAttribute('fill-opacity', '0.85');
                    } else if (cell && !baseVal) {
                        rect.setAttribute('fill', palette.overlap.onlyOther);
                        rect.setAttribute('fill-opacity', '0.95');
                    } else if (!cell && baseVal) {
                        rect.setAttribute('fill', palette.overlap.onlyBase);
                        rect.setAttribute('fill-opacity', '0.82');
                    } else {
                        rect.setAttribute('fill', palette.overlap.ghost);
                    }
                }
            } else {
                if (cell) {
                    rect.setAttribute('fill', '#08306B');
                } else {
                    rect.setAttribute('fill', 'transparent');
                }
            }

            if (cell || (diffMode && basePattern && basePattern[i]?.[j])) {
                g.appendChild(rect);
            }
        });
    });

    svg.appendChild(g);

    const border = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    border.setAttribute('x', borderWidth / 2);
    border.setAttribute('y', borderWidth / 2);
    border.setAttribute('width', width + borderWidth);
    border.setAttribute('height', height + borderWidth);
    border.setAttribute('fill', 'none');
    border.setAttribute('stroke', '#000');
    border.setAttribute('stroke-width', borderWidth);
    svg.appendChild(border);

    container.appendChild(svg);
}

function renderThumbnail(pattern, scale = 6) {
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', SIZE * scale);
    svg.setAttribute('height', SIZE * scale);
    svg.setAttribute('viewBox', `0 0 ${SIZE} ${SIZE}`);
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.style.display = 'block';

    const gridStroke = Math.max(0.04, (scale / 6) * 0.08);
    for (let i = 0; i <= SIZE; i++) {
        const vline = document.createElementNS(svgNS, 'line');
        vline.setAttribute('x1', i);
        vline.setAttribute('y1', 0);
        vline.setAttribute('x2', i);
        vline.setAttribute('y2', SIZE);
        vline.setAttribute('stroke', '#e5e7eb');
        vline.setAttribute('stroke-width', gridStroke);
        vline.setAttribute('shape-rendering', 'crispEdges');
        svg.appendChild(vline);

        const hline = document.createElementNS(svgNS, 'line');
        hline.setAttribute('x1', 0);
        hline.setAttribute('y1', i);
        hline.setAttribute('x2', SIZE);
        hline.setAttribute('y2', i);
        hline.setAttribute('stroke', '#e5e7eb');
        hline.setAttribute('stroke-width', gridStroke);
        hline.setAttribute('shape-rendering', 'crispEdges');
        svg.appendChild(hline);
    }

    pattern.forEach((row, i) => {
        row.forEach((cell, j) => {
            if (cell) {
                const rect = document.createElementNS(svgNS, 'rect');
                rect.setAttribute('x', j);
                rect.setAttribute('y', i);
                rect.setAttribute('width', 1);
                rect.setAttribute('height', 1);
                rect.setAttribute('fill', '#08306B');
                rect.setAttribute('shape-rendering', 'crispEdges');
                svg.appendChild(rect);
            }
        });
    });

    return svg;
}

function renderPrimitiveIcon(pattern, scale = 3.5) {
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', SIZE * scale);
    svg.setAttribute('height', SIZE * scale);
    svg.style.display = 'block';

    pattern.forEach((row, i) => {
        row.forEach((cell, j) => {
            if (cell) {
                const rect = document.createElementNS(svgNS, 'rect');
                rect.setAttribute('x', j * scale);
                rect.setAttribute('y', i * scale);
                rect.setAttribute('width', scale);
                rect.setAttribute('height', scale);
                rect.setAttribute('fill', '#08306B');
                svg.appendChild(rect);
            }
        });
    });

    return svg;
}

function initializePrimitiveIcons() {
    const primitiveNames = ['blank', 'triangle', 'diag_square', 'border_square', 'middle_square', 'center_square', 'diagonal'];
    primitiveNames.forEach((name) => {
        const btn = document.querySelector(`button[data-op="${name}"]`);
        if (!btn) return;
        const iconSpan = btn.querySelector('.btn-icon');
        if (!iconSpan) return;
        iconSpan.innerHTML = '';
        const pattern = geomDSL[name]();
        const icon = renderPrimitiveIcon(pattern);
        iconSpan.appendChild(icon);
    });
}

function initializeBrushInterface() {
    const brushCanvas = document.getElementById('brushCanvas');
    if (!brushCanvas) return null;

    let currentBrushPattern = brushSystem.blank();
    let maxPoints = 10;
    const BRUSH_CELL_SIZE = 18;

    function updatePointCounter() {
        const counter = document.getElementById('pointCounter');
        const count = brushSystem.countPoints(currentBrushPattern);
        if (counter) {
            counter.textContent = `${count}/${maxPoints}`;
            counter.className = count > maxPoints ? 'point-counter over-limit' : 'point-counter';
        }
    }

    function addCanvasClickHandler() {
        const svg = brushCanvas.querySelector('svg');
        if (!svg) return;

        const newSvg = svg.cloneNode(true);
        if (svg.parentNode) {
            svg.parentNode.replaceChild(newSvg, svg);
        }

        newSvg.addEventListener('click', (e) => {
            const rect = newSvg.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calculate which cell was clicked
            const col = Math.floor(x / BRUSH_CELL_SIZE);
            const row = Math.floor(y / BRUSH_CELL_SIZE);
            if (row < 0 || row >= SIZE || col < 0 || col >= SIZE) return;
            
            // Check if click is too close to cell boundary to avoid mis-clicks
            const BOUNDARY_MARGIN = 2; // pixels from edge to ignore
            const xInCell = x - (col * BRUSH_CELL_SIZE);
            const yInCell = y - (row * BRUSH_CELL_SIZE);
            if (xInCell < BOUNDARY_MARGIN || xInCell > BRUSH_CELL_SIZE - BOUNDARY_MARGIN ||
                yInCell < BOUNDARY_MARGIN || yInCell > BRUSH_CELL_SIZE - BOUNDARY_MARGIN) {
                return; // Too close to boundary, ignore click
            }

            const currentCount = brushSystem.countPoints(currentBrushPattern);
            const isAdding = !currentBrushPattern[row]?.[col];
            if (isAdding && currentCount >= maxPoints) {
                return;
            }

            currentBrushPattern = brushSystem.togglePoint(currentBrushPattern, row, col);
            renderBrushCanvas();
        });
    }

    function renderBrushCanvas() {
        brushCanvas.innerHTML = '';

        const svgNS = 'http://www.w3.org/2000/svg';
        const svg = document.createElementNS(svgNS, 'svg');
        const width = SIZE * BRUSH_CELL_SIZE;
        const height = SIZE * BRUSH_CELL_SIZE;

        svg.setAttribute('width', width);
        svg.setAttribute('height', height);
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
        svg.style.display = 'block';
        svg.style.cursor = 'crosshair';

        for (let i = 0; i <= SIZE; i++) {
            const vline = document.createElementNS(svgNS, 'line');
            vline.setAttribute('x1', i * BRUSH_CELL_SIZE);
            vline.setAttribute('y1', 0);
            vline.setAttribute('x2', i * BRUSH_CELL_SIZE);
            vline.setAttribute('y2', height);
            vline.setAttribute('stroke', '#d1d5db');
            vline.setAttribute('stroke-width', '1');
            svg.appendChild(vline);

            const hline = document.createElementNS(svgNS, 'line');
            hline.setAttribute('x1', 0);
            hline.setAttribute('y1', i * BRUSH_CELL_SIZE);
            hline.setAttribute('x2', width);
            hline.setAttribute('y2', i * BRUSH_CELL_SIZE);
            hline.setAttribute('stroke', '#d1d5db');
            hline.setAttribute('stroke-width', '1');
            svg.appendChild(hline);
        }

        currentBrushPattern.forEach((row, i) => {
            row.forEach((cell, j) => {
                if (cell) {
                    const rect = document.createElementNS(svgNS, 'rect');
                    rect.setAttribute('x', j * BRUSH_CELL_SIZE);
                    rect.setAttribute('y', i * BRUSH_CELL_SIZE);
                    rect.setAttribute('width', BRUSH_CELL_SIZE);
                    rect.setAttribute('height', BRUSH_CELL_SIZE);
                    rect.setAttribute('fill', '#08306B');
                    svg.appendChild(rect);
                }
            });
        });

        brushCanvas.appendChild(svg);
        updatePointCounter();
        addCanvasClickHandler();
    }

    const host = typeof window !== 'undefined' ? window : globalThis;
    host.clearBrush = function clearBrush() {
        currentBrushPattern = brushSystem.blank();
        renderBrushCanvas();
    };

    host.applyBrushPattern = function applyBrushPattern() {
        if (host.applyCustomPattern) {
            host.applyCustomPattern(currentBrushPattern);
        }
    };

    renderBrushCanvas();

    return {
        getCurrentPattern: () => currentBrushPattern,
        setPattern: (pattern) => {
            currentBrushPattern = pattern;
            renderBrushCanvas();
        },
        clear: () => host.clearBrush()
    };
}

export {
    geomDSL,
    brushSystem,
    transDSL,
    OP_ABBREVIATIONS,
    getOperationAbbreviation,
    formatOperationText,
    renderPattern,
    renderThumbnail,
    initializePrimitiveIcons,
    initializeBrushInterface
};

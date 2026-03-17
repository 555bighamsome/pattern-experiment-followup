(function () {
    // Global test controls: condition switch + quick route jump.
    // To remove this feature later, delete this file and remove script includes.

    function normalizePrimitiveCondition(value) {
        if (!value) return null;
        const normalized = String(value).trim().toUpperCase();
        return normalized === 'A' || normalized === 'B' ? normalized : null;
    }

    function setPrimitiveCondition(value) {
        const normalized = normalizePrimitiveCondition(value);
        if (!normalized) return;
        localStorage.setItem('primitiveCondition', normalized);
        renderCurrentCondition();
    }

    function assignRandomPrimitiveCondition() {
        setPrimitiveCondition(Math.random() < 0.5 ? 'A' : 'B');
    }

    function renderCurrentCondition() {
        var current = normalizePrimitiveCondition(localStorage.getItem('primitiveCondition')) || '-';
        var el = document.getElementById('globalTestConditionValue');
        if (el) el.textContent = current;
    }

    function inRoutesFolder() {
        return window.location.pathname.indexOf('/routes/') !== -1;
    }

    function routeHref(routeFile) {
        return inRoutesFolder() ? routeFile : ('routes/' + routeFile);
    }

    function buildControls() {
        var toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.id = 'globalTestControlToggle';
        toggle.className = 'test-control-toggle';
        toggle.textContent = 'Test';

        var panel = document.createElement('div');
        panel.id = 'globalTestControlPanel';
        panel.className = 'test-control-panel';

        panel.innerHTML = [
            '<h3>Test Controls</h3>',
            '<div class="test-condition-row">',
            '  <button type="button" class="btn" data-test-condition="A">Set Condition A</button>',
            '  <button type="button" class="btn" data-test-condition="B">Set Condition B</button>',
            '  <button type="button" class="btn" data-test-condition="R">Random Condition</button>',
            '</div>',
            '<div class="test-status-row">Current primitive condition: <strong id="globalTestConditionValue">-</strong></div>',
            '<div class="test-nav-row">',
            '  <button type="button" class="btn" data-test-route="consent.html">Go Consent</button>',
            '  <button type="button" class="btn" data-test-route="reminder.html">Go Reminder</button>',
            '  <button type="button" class="btn" data-test-route="instruction.html">Go Instruction</button>',
            '  <button type="button" class="btn" data-test-route="tutorial.html">Go Tutorial</button>',
            '  <button type="button" class="btn" data-test-route="task.html">Go Task</button>',
            '  <button type="button" class="btn" data-test-route="freeplay.html">Go Freeplay</button>',
            '  <button type="button" class="btn" data-test-route="gallery.html">Go Gallery</button>',
            '</div>'
        ].join('');

        document.body.appendChild(toggle);
        document.body.appendChild(panel);

        toggle.addEventListener('click', function () {
            var open = panel.classList.toggle('is-open');
            toggle.textContent = open ? 'Close' : 'Test';
        });

        panel.querySelectorAll('[data-test-condition]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var val = btn.getAttribute('data-test-condition');
                if (val === 'R') {
                    assignRandomPrimitiveCondition();
                } else {
                    setPrimitiveCondition(val);
                }
            });
        });

        panel.querySelectorAll('[data-test-route]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var route = btn.getAttribute('data-test-route');
                if (!route) return;
                window.location.href = routeHref(route);
            });
        });

        renderCurrentCondition();
    }

    if (!normalizePrimitiveCondition(localStorage.getItem('primitiveCondition'))) {
        assignRandomPrimitiveCondition();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', buildControls);
    } else {
        buildControls();
    }
})();

# Pattern Experiment Follow-up

Web-based experiment on how participants invent compositional visual languages when solving a full set of pattern-construction tasks.

## Live Page

https://555bighamsome.github.io/pattern-experiment-followup/

## Overview

Participants build 10x10 target patterns using primitives and transformations.

- Condition A: geometric primitives (blank, line, diagonal, square, triangle)
- Condition B: pixel-level brush primitive + original transformations

The task flow allows participants to choose target order during the experiment from a full-stimulus overview modal.

## Main Flow

1. Consent
2. Reminder
3. Instructions
4. Tutorial
5. Comprehension
6. Task phase
7. Free play phase
8. Data download

Order of task/free play is controlled by `experimentCondition`.

## Key Behaviors Implemented

- Primitive condition A/B is assigned and persisted in `localStorage` (`primitiveCondition`).
- Task and freeplay both use the same A/B primitive logic.
- In Condition B, brush primitive is used (point-limited canvas with `Clear` and `Use`).
- In task mode, participants choose next target via overview modal.
- Completed targets are marked and re-ordered to the top in the selector.
- Brush state is cleared when entering a new task trial.

## Local Run

Use any static server from the project root:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/index.html
```

## Testing Utilities

A global test control is injected on all pages by:

- `js/devTestControls.js`

It provides:

- quick A/B condition switching
- quick route navigation buttons

To remove this utility later:

1. Delete `js/devTestControls.js`
2. Remove its `<script src=".../devTestControls.js"></script>` include from pages

## Project Structure

```text
index.html
css/
    styles.css
js/
    devTestControls.js
    consent.js
    reminder.js
    instruction.js
    tutorial.js
    comprehension.js
    task.js
    freeplay.js
    gallery.js
    modules/
        state.js
        patterns.js
        testData.js
        toast.js
routes/
    consent.html
    reminder.html
    instruction.html
    tutorial.html
    comprehension.html
    task.html
    freeplay.html
    gallery.html
```

## Data Notes

- Task and freeplay results are stored in browser `localStorage` during runtime.
- Final export uses JSON download.
- Current repo settings ignore `*.md`, `*.sh`, `*.php` from tracking.

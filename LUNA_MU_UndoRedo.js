// === LUNA_MU_UndoRedo.js ===
// Undo/Redo system for plugin controls (knobs, switches, selectors)

// List all controllable components here (update with your actual names)
const var CONTROL_COMPONENTS = [
    Content.getComponent("InputKnob"),
    Content.getComponent("OutputKnob"),
    Content.getComponent("ThresholdKnob"),
    Content.getComponent("TrimKnob"),
    Content.getComponent("TapeSatKnob"),
    Content.getComponent("TapeBlendKnob"),
    Content.getComponent("TextureKnob"),
    Content.getComponent("MixKnob"),
    Content.getComponent("HPFSwitch"),
    Content.getComponent("IPSSwitch"),
    Content.getComponent("CompTapeSwitch"),
    Content.getComponent("StereoMidSideSwitch"),
    Content.getComponent("TimeConstantSelector")
];

// Buttons to trigger undo/redo
const var UndoButton = Content.getComponent("UndoButton");
const var RedoButton = Content.getComponent("RedoButton");

// Undo/Redo stacks
reg undoStack = [];
reg redoStack = [];

// Helper: capture the current state of all controls
inline function captureState()
{
    var state = [];
    for (n in CONTROL_COMPONENTS)
        state.push(n.getValue());
    return state;
}

// Helper: restore a given state to all controls
inline function restoreState(state)
{
    for (i = 0; i < CONTROL_COMPONENTS.length; i++)
        CONTROL_COMPONENTS[i].setValue(state[i]);
}

// Call this whenever a control value changes
inline function pushUndo()
{
    undoStack.push(captureState());
    // Clear redo stack on new action
    redoStack = [];
}

// Undo handler
UndoButton.setControlCallback(function(event)
{
    if (event.clicked && undoStack.length > 1) // At least one previous state
    {
        var current = undoStack.pop();
        redoStack.push(current);
        var prev = undoStack[undoStack.length - 1];
        restoreState(prev);
    }
});

// Redo handler
RedoButton.setControlCallback(function(event)
{
    if (event.clicked && redoStack.length > 0)
    {
        var next = redoStack.pop();
        undoStack.push(next);
        restoreState(next);
    }
});

// Attach pushUndo to all controls
for (c in CONTROL_COMPONENTS)
{
    c.setControlCallback(function(event)
    {
        if (event.changed)
            pushUndo();
    });
}

// Initialize system with starting state
pushUndo();
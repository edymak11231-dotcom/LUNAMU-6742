// === LUNA_MU_ABSwitch.js ===
// Classic A/B State Switching for instant comparison of settings

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

// A/B buttons on the GUI
const var AButton = Content.getComponent("AButton");
const var BButton = Content.getComponent("BButton");

// Storage for A and B states
reg AState = [];
reg BState = [];

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

// Save current state as A
AButton.setControlCallback(function(event)
{
    if (event.clicked)
    {
        AState = captureState();
        // Optional: give user feedback that A is stored (e.g., light up AButton)
        AButton.set("saturation", 1);
        BButton.set("saturation", 0);
    }
});

// Save current state as B
BButton.setControlCallback(function(event)
{
    if (event.clicked)
    {
        BState = captureState();
        // Optional: give user feedback that B is stored (e.g., light up BButton)
        BButton.set("saturation", 1);
        AButton.set("saturation", 0);
    }
});

// Switch to A state on double-click of A
AButton.setMouseCallback(function(event)
{
    if (event.doubleClicked && AState.length == CONTROL_COMPONENTS.length)
        restoreState(AState);
});

// Switch to B state on double-click of B
BButton.setMouseCallback(function(event)
{
    if (event.doubleClicked && BState.length == CONTROL_COMPONENTS.length)
        restoreState(BState);
});

// On startup, initialize A and B to current state
AState = captureState();
BState = captureState();
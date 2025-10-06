// === LUNA_MU_Resizer.js ===
// Automatically scales & repositions components when the GUI is resized

// Reference size (the original "design" size in HISE, e.g., 1200x600)
const var REFERENCE_WIDTH = 1200;
const var REFERENCE_HEIGHT = 600;

// List all components to scale (update with your actual names)
const var COMPONENTS = [
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
    Content.getComponent("TimeConstantSelector"),
    Content.getComponent("FaceplateColor"),
    Content.getComponent("FaceplateGrey"),
    Content.getComponent("NuMoonLogo"),
    // ...add all meter, button, and indicator components you want to scale!
];

// Store original positions and sizes (fill this at startup)
reg originalLayouts = [];

// On init, capture original positions and sizes
inline function storeOriginalLayouts()
{
    originalLayouts = [];
    for (i = 0; i < COMPONENTS.length; i++)
    {
        var c = COMPONENTS[i];
        originalLayouts.push({
            x: c.get("x"),
            y: c.get("y"),
            width: c.get("width"),
            height: c.get("height")
        });
    }
}

// Helper to scale and reposition components
inline function applyScaling()
{
    var scaleX = Content.getWidth() / REFERENCE_WIDTH;
    var scaleY = Content.getHeight() / REFERENCE_HEIGHT;

    for (i = 0; i < COMPONENTS.length; i++)
    {
        var c = COMPONENTS[i];
        var orig = originalLayouts[i];

        c.set("x", Math.round(orig.x * scaleX));
        c.set("y", Math.round(orig.y * scaleY));
        c.set("width", Math.round(orig.width * scaleX));
        c.set("height", Math.round(orig.height * scaleY));
    }
}

// Listen for GUI size changes
Content.setPropertiesFromJSON({ "Resizable": true });

Content.setOnResizeCallback(function(width, height)
{
    if (originalLayouts.length == 0)
        storeOriginalLayouts();
    applyScaling();
});

// On startup, store layouts and apply scaling in case window is not default size
storeOriginalLayouts();
applyScaling();
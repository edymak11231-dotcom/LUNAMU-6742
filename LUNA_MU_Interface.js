// LUNA MU 6742 - Main Interface Glue Script

// ===================
// --- FILMSTRIPS ---
// ===================

// VU Needles (Left & Right)
const var VUNeedleL = Content.getComponent("VUNeedleL");
VUNeedleL.set("numFrames", 9);

const var VUNeedleR = Content.getComponent("VUNeedleR");
VUNeedleR.set("numFrames", 9);

// Tape Drive Filmstrips (Left & Right)
const var TapeDriveL = Content.getComponent("TapeDriveLeft");
TapeDriveL.set("numFrames", 9);

const var TapeDriveR = Content.getComponent("TapeDriveRight");
TapeDriveR.set("numFrames", 9);

// Tape Level Filmstrips (Left & Right)
const var TapeLevelL = Content.getComponent("TapeLevelLeft");
TapeLevelL.set("numFrames", 9);

const var TapeLevelR = Content.getComponent("TapeLevelRight");
TapeLevelR.set("numFrames", 9);

// Tube Animation Filmstrip
const var TubeGlow = Content.getComponent("TubeGlow");
TubeGlow.set("numFrames", 12); // Adjust if your tube filmstrip uses a different frame count

// =======================
// --- INDICATOR LIGHTS ---
// =======================

const var CompOnLight = Content.getComponent("CompOnLight");
const var TapeOnLight = Content.getComponent("TapeOnLight");

// =======================
// --- SKIN SWITCHER BUTTON ---
// =======================

const var LogoButton = Content.getComponent("LogoButton");

// =======================
// --- UPDATE FUNCTIONS ---
// =======================

inline function updateFilmstrips()
{
    // VU Needles
    VUNeedleL.setValue(Content.getValue("VU_Needle_Left"));
    VUNeedleR.setValue(Content.getValue("VU_Needle_Right"));

    // Tape Drive
    TapeDriveL.setValue(Content.getValue("Tape_Drive_Left_Frame"));
    TapeDriveR.setValue(Content.getValue("Tape_Drive_Right_Frame"));

    // Tape Level
    TapeLevelL.setValue(Content.getValue("Tape_Level_Left_Frame"));
    TapeLevelR.setValue(Content.getValue("Tape_Level_Right_Frame"));

    // Tube Glow
    TubeGlow.setValue(Content.getValue("Tube_Glow_Frame"));
}

inline function updateIndicatorLights()
{
    CompOnLight.set("saturation", Content.getValue("CompOn") ? 1 : 0);
    TapeOnLight.set("saturation", Content.getValue("TapeIn") ? 1 : 0);
}

// ======================
// --- TIMERS ---
// ======================

reg guiTimer = Engine.createTimerObject();
guiTimer.setTimerCallback(function()
{
    updateFilmstrips();
    updateIndicatorLights();
});
guiTimer.startTimer(33);

// Call once at startup
updateFilmstrips();
updateIndicatorLights();

// ================================
// --- SKIN SWITCHER CALLBACK ---
// ================================
LogoButton.setControlCallback(function(event)
{
    if (event.clicked)
    {
        // Toggle skin logic (assuming you use a reg variable skinState)
        reg currentSkin = Content.getValue("SkinState"); // 0 = grey, 1 = color
        Content.setValue("SkinState", 1 - currentSkin);
        // If using a helper function from LUNA_MU_SkinSwitcher.js, call it here
        // setSkin(1 - currentSkin);
    }
});

// =======================================
// --- EXAMPLES: CUSTOM CONTROL HOOKUP ---
// =======================================

// Example: Attach a custom slider to compressor input gain
const var InputGainSlider = Content.getComponent("InputGainSlider");
InputGainSlider.setControlCallback(function(event)
{
    if (event.changed)
    {
        Content.setParameter("InputGain", event.value);
    }
});

// Repeat above pattern for any custom knobs, switches, or non-default parameter controls

// --- END OF FILE ---
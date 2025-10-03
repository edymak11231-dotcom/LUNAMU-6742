// LUNA MU 6742 - Skin Switcher and Tape DSP Swapper

// --- Logo Button ---
const var logoButton = Content.getComponent("LogoButton");

// --- Faceplate Images ---
const var faceplateGrey = Content.getComponent("FaceplateGrey");
const var faceplateColor = Content.getComponent("FaceplateColor");

// --- Tape DSP ScriptFX Modules ---
// These must be added in your HISE project tree with these exact names:
const var tapeGrey = Synth.getChildSynth("TapeGrey");   // LUNA_MU_TapeEmulator.js
const var tapeColor = Synth.getChildSynth("TapeColor"); // LUNA_MU_TapeEmulator_StuderA827.js

// --- Skin State ---
reg skinState = 0; // 0 = grey, 1 = color

inline function setSkin(newSkin)
{
    skinState = newSkin;
    if(skinState == 0) // Grey faceplate
    {
        faceplateGrey.set("visible", true);
        faceplateColor.set("visible", false);
        tapeGrey.setBypassed(false);   // Enable grey tape DSP
        tapeColor.setBypassed(true);   // Disable color tape DSP
    }
    else // Color faceplate
    {
        faceplateGrey.set("visible", false);
        faceplateColor.set("visible", true);
        tapeGrey.setBypassed(true);    // Disable grey tape DSP
        tapeColor.setBypassed(false);  // Enable color tape DSP
    }
}

// --- Logo Button Callback ---
logoButton.setControlCallback(function(event)
{
    if(event.clicked)
    {
        setSkin(1 - skinState); // Toggle skin
    }
});

// --- Init: Set to default skin (grey) ---
setSkin(0);
// LUNA MU 6742 - Meter ScriptFX
// Handles all meter output values for GUI animation

// --- INPUTS FROM COMPRESSOR SECTION ---
// These should be set by your compressor ScriptFX each block
reg compGR_L, compGR_R, compGR_M, compGR_S, compMode;

// --- INPUTS FROM TAPE SECTION ---
// These should be set by your tape ScriptFX each block
reg tapeDriveL, tapeDriveR, tapeLevelL, tapeLevelR;

// --- UTILS: Map value to GUI frame (e.g. for 9-frame strips, 0-8) ---
inline function mapMeter(val, min, max, frames)
{
    if (val < min) val = min;
    if (val > max) val = max;
    return int((frames - 1) * (val - min) / (max - min) + 0.5);
}

function processBlock(samples, numChannels)
{
    // --- Get values from other ScriptFX ---
    compGR_L = Content.getValue("Comp_GR_Left");
    compGR_R = Content.getValue("Comp_GR_Right");
    compGR_M = Content.getValue("Comp_GR_Mid");
    compGR_S = Content.getValue("Comp_GR_Side");
    compMode = Content.getValue("Comp_Mode"); // 0=Stereo, 1=Mid/Side

    tapeDriveL = Content.getValue("Tape_Drive_Left");
    tapeDriveR = Content.getValue("Tape_Drive_Right");
    tapeLevelL = Content.getValue("Tape_Level_Left");
    tapeLevelR = Content.getValue("Tape_Level_Right");

    // --- VU Needles (Compressor) ---
    // Map gain reduction dB (expected: 0 (no GR) to -12dB (max GR)) to 0-8
    // Frame 0 = no GR, 8 = max GR
    reg vuNeedleL, vuNeedleR;
    if (compMode == 0) // Stereo
    {
        vuNeedleL = mapMeter(-compGR_L, 0, 12, 9);
        vuNeedleR = mapMeter(-compGR_R, 0, 12, 9);
    }
    else // Mid/Side
    {
        vuNeedleL = mapMeter(-compGR_M, 0, 12, 9);
        vuNeedleR = mapMeter(-compGR_S, 0, 12, 9);
    }

    // --- Tape Drive/Level Meters ---
    // Map from 0.0 (min) to 1.0 (max) to 0-8 (9 frames)
    reg driveL_Frame = mapMeter(tapeDriveL, 0, 1, 9);
    reg driveR_Frame = mapMeter(tapeDriveR, 0, 1, 9);
    reg levelL_Frame = mapMeter(tapeLevelL, 0, 1, 9);
    reg levelR_Frame = mapMeter(tapeLevelR, 0, 1, 9);

    // --- Output for GUI ---
    Content.setValue("VU_Needle_Left", vuNeedleL);     // 0–8
    Content.setValue("VU_Needle_Right", vuNeedleR);    // 0–8
    Content.setValue("Tape_Drive_Left_Frame", driveL_Frame); // 0–8
    Content.setValue("Tape_Drive_Right_Frame", driveR_Frame);
    Content.setValue("Tape_Level_Left_Frame", levelL_Frame);
    Content.setValue("Tape_Level_Right_Frame", levelR_Frame);
}
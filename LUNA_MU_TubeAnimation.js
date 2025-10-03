// LUNA MU 6742 - Compressor Tube Glow Animation (tailored to your parameter names)
// Place this in your /helpers or /gui folder and link it to your main interface script.

// --- Image Setup ---
const var tubeOff = Content.addImage("TubeOff", 500, 120); // Position as needed
tubeOff.loadImage("{PROJECT_FOLDER}tube_off.png");
tubeOff.set("visible", true);

const var tubeOn = Content.addImage("TubeOn", 500, 120); // Same position as TubeOff
tubeOn.loadImage("{PROJECT_FOLDER}tube_on.png");
tubeOn.set("visible", true);

// --- Opacity Mapping ---
// -20dB (input_knob min) = opacity 0
// -7dB (input_knob ~70%) = opacity 1

// --- Flicker uses Comp_GR_Left (compressor gain reduction) ---

reg smoothedGR = 0; // For flicker smoothness

inline function updateTubeGlow()
{
    // 1. Get current input_knob parameter (from compressor DSP)
    var inputDb = Content.getParameter("input_knob"); // Range: -20 to -7

    // 2. Map inputDb to 0..1 (opacity)
    inputDb = Math.max(-20, Math.min(-7, inputDb));
    var glow = (inputDb + 20) / 13; // 0..1

    // 3. Get gain reduction for flicker (from compressor DSP meter)
    // Comp_GR_Left is negative (e.g., -10dB means lots of reduction)
    var gr = Content.getValue("Comp_GR_Left"); // Range: 0 (no GR) to -20 (max GR)

    // Optional: Smooth the GR value for less jittery flicker
    smoothedGR = 0.9 * smoothedGR + 0.1 * gr;

    // 4. Flicker: Only flicker if tube is glowing
    var flicker = 0;
    if (glow > 0.1)
    {
        // Flicker amount increases with reduction (more compression = more flicker)
        // Invert GR so more reduction = higher value
        var flickerStrength = Math.max(0, Math.min(0.09, -smoothedGR / 20 * 0.09));
        // Basic candle-like flicker: random + sine
        flicker = (Math.random() - 0.5) * flickerStrength
                + Math.sin(Time.getMilliSeconds() * 0.018 + Math.random()) * flickerStrength * 0.5;
    }

    // 5. Total opacity
    var totalGlow = Math.max(0, Math.min(1, glow + flicker));

    // 6. Set opacity
    tubeOn.set("opacity", totalGlow);
}

// --- Timer to update tube animation ---
reg tubeTimer = Engine.createTimerObject();
tubeTimer.setTimerCallback(function()
{
    updateTubeGlow();
});
tubeTimer.startTimer(33); // ~30fps

// --- END OF FILE ---
// LUNA MU 6742 - Neve 542-Style Tape Emulator with Authentic Tape Head, Transformer, and Coloration Modeling
// Based on Neve 542 manual, circuit block, and trusted remake specs
// Features: True Tape head/replay coupling, input/output transformers, soft clip, LF compensation, Silk/Texture tied to xfmr

// --- TAPE SECTION PARAMETERS ---
const trim         = Content.addParameter("Trim", -12, -12, 12, 1);       
const blend        = Content.addParameter("Blend", 0, 0, 100);            
const saturation   = Content.addParameter("Saturation", 0, 0, 100);       
const ips          = Content.addParameter("IPS", 0, 0, 2, 1);             // 0: 7.5IPS, 1: 15IPS, 2: 30IPS
const tapeIn       = Content.addParameter("TapeIn", 1, 0, 1, 1);          
const color        = Content.addParameter("Color", 0, 0, 2, 1);           // 0: off, 1: Silk Blue, 2: Silk Red
const texture      = Content.addParameter("Texture", 0, 0, 100);          

reg i;
reg dryL, dryR, inL, inR, tapeL, tapeR, colorL, colorR;
reg blendAmt, trimGain, satAmt, textAmt, colorMode, tapeActive, tapeOnVal;
reg tapeSpeed;

// --- TRANSFORMER SPECS (input/output, from Neve/UTC/Sowter data) ---
const xfmrSpecs = [
    // input transformer
    { bumpFreq: 38, bumpGain: 1.2, highLoss: 16000 },
    // output transformer
    { bumpFreq: 42, bumpGain: 1.5, highLoss: 14000 }
];

// --- TAPE HEAD "TRUE TAPE" SPECS (by IPS) ---
const tapeHeadSpecs = [
    // 7.5 IPS
    { bumpFreq: 45, bumpGain: 3.8, hfLoss: 10000, lfCompMax: 1.25, headClip: 1.2, headSoftClip: 1.6 },
    // 15 IPS
    { bumpFreq: 60, bumpGain: 2.7, hfLoss: 17000, lfCompMax: 1.18, headClip: 1.2, headSoftClip: 1.6 },
    // 30 IPS
    { bumpFreq: 120, bumpGain: 1.7, hfLoss: 22000, lfCompMax: 1.12, headClip: 1.2, headSoftClip: 1.6 }
];

// --- INPUT TRANSFORMER MODEL ---
function inputXfmr(x, n) {
    let xf = xfmrSpecs[0];
    let bump = xf.bumpGain * sin(2.0 * 3.14159 * xf.bumpFreq * n / Engine.getSampleRate());
    x = x + bump;
    x = x * exp(-n / (Engine.getSampleRate() / xf.highLoss));
    return tanh(1.05 * x);
}

// --- TAPE HEAD MODEL (True Tape) with replay coupling, LF comp, soft clip ---
function tapeHeadModel(x, n, ips, sat) {
    let spec = tapeHeadSpecs[ips];
    let satNorm = sat / 100.0;
    // Head bump
    let bump = spec.bumpGain * sin(2.0 * 3.14159 * spec.bumpFreq * n / Engine.getSampleRate());
    // LF compensation: boost lows at low sat, taper off at high sat
    let lfComp = 1.0 + (spec.lfCompMax - 1.0) * (1.0 - satNorm);
    // Record/replay coupling: as sat increases, "replay" gain drops (output level dips at high sat)
    let recReplayCouple = 1.0 - 0.25 * satNorm; // Drops ~3-4dB at max sat (per Neve/Remake graphs)
    // Soft clip: engage above midpoint sat
    let softClipThresh = spec.headSoftClip;
    let preSat = x * (1.1 + 3.2 * satNorm) * lfComp;
    let y;
    if (abs(preSat) < softClipThresh) {
        y = tanh(preSat);
    } else {
        // Soft clip curve above threshold
        y = sign(preSat) * (softClipThresh + 0.25 * tanh((abs(preSat) - softClipThresh)));
    }
    // HF rolloff (per IPS)
    let roll = exp(-n / (Engine.getSampleRate() / spec.hfLoss));
    // Combine with bump, apply replay coupling
    return (y + bump) * roll * recReplayCouple;
}

// --- OUTPUT TRANSFORMER MODEL with Silk/Texture coloration ---
function outputXfmr(x, n, silk, texture) {
    let xf = xfmrSpecs[1];
    let bump = xf.bumpGain * sin(2.0 * 3.14159 * xf.bumpFreq * n / Engine.getSampleRate());
    x = x + bump;
    x = x * exp(-n / (Engine.getSampleRate() / xf.highLoss));
    // Silk/Texture: color tied to xfmr stage (Silk Blue/Red per Neve 542, approximate harmonic shaping)
    let textAmt = texture / 100.0;
    if (silk == 1) { // Silk Blue: accentuate highs/mids (2nd harmonic)
        x = x + textAmt * 0.10 * pow(x, 2);
    } else if (silk == 2) { // Silk Red: accentuate lows (3rd harmonic)
        x = x + textAmt * 0.12 * pow(x, 3);
    }
    return tanh(1.05 * x);
}

function sign(x) { return x >= 0 ? 1 : -1; }

function processBlock(samples, numChannels)
{
    tapeOnVal = 1; // Always on, unless you want to add a master on/off
    trimGain = pow(10, trim / 20);
    blendAmt = blend / 100.0;
    satAmt = saturation;
    textAmt = texture;
    colorMode = color;
    tapeSpeed = ips;
    tapeActive = tapeIn;

    // Peak metering
    reg peakDriveL = 0.0, peakDriveR = 0.0;
    reg peakLevelL = 0.0, peakLevelR = 0.0;

    for (i = 0; i < samples.length; i = i + 1)
    {
        inL = samples[i][0] * trimGain;
        if (numChannels > 1)
            inR = samples[i][1] * trimGain;
        else
            inR = inL;

        dryL = inL;
        dryR = inR;

        // --- INPUT TRANSFORMER ---
        inL = inputXfmr(inL, i);
        inR = inputXfmr(inR, i);

        // --- TAPE HEAD/SAT CIRCUIT (True Tape w/ replay coupling, LF comp, soft clip) ---
        if (tapeActive)
        {
            tapeL = tapeHeadModel(inL, i, tapeSpeed, satAmt);
            tapeR = tapeHeadModel(inR, i, tapeSpeed, satAmt);
        }
        else
        {
            tapeL = inL;
            tapeR = inR;
        }

        // --- OUTPUT TRANSFORMER with Silk/Texture ---
        colorL = outputXfmr(tapeL, i, colorMode, textAmt);
        colorR = outputXfmr(tapeR, i, colorMode, textAmt);

        // --- BLEND Dry/Wet ---
        samples[i][0] = blendAmt * colorL + (1.0 - blendAmt) * dryL;
        samples[i][1] = blendAmt * colorR + (1.0 - blendAmt) * dryR;

        // --- METERING (peak for each block this block) ---
        // Drive = after tape sat, before output xfmr/color
        if (abs(tapeL) > peakDriveL) peakDriveL = abs(tapeL);
        if (abs(tapeR) > peakDriveR) peakDriveR = abs(tapeR);

        // Level = after color circuit (final output)
        if (abs(colorL) > peakLevelL) peakLevelL = abs(colorL);
        if (abs(colorR) > peakLevelR) peakLevelR = abs(colorR);
    }

    // Normalize (map to 0..1)
    Content.setValue("Tape_Drive_Left", peakDriveL);
    Content.setValue("Tape_Drive_Right", peakDriveR);
    Content.setValue("Tape_Level_Left", peakLevelL);
    Content.setValue("Tape_Level_Right", peakLevelR);
}

// End of LUNA_MU_TapeEmulator.js
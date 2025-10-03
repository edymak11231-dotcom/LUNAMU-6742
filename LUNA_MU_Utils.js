// LUNA MU 6742 - Utility Functions
// Based on original Fairchild 670/Neve 542 design principles, your .txt/.pdf info, and pro audio DSP standards.

// --- dB/Linear Conversion ---
inline function dbToLinear(dB)
{
    // Converts dB to linear gain
    return pow(10, dB / 20);
}
inline function linearToDb(linear)
{
    // Converts linear gain to dB, clamps for log(0)
    if (linear <= 0.00000001)
        return -120;
    return 20 * log10(linear);
}

// --- Mid/Side Encode/Decode (Fairchild 670 style) ---
inline function toMid(L, R)
{
    return (L + R) * 0.5;
}
inline function toSide(L, R)
{
    return (L - R) * 0.5;
}
inline function fromMidSide(mid, side)
{
    // Returns [L, R]
    return [mid + side, mid - side];
}

// --- Envelope Follower (Peak, for GR and tape simulation) ---
inline function peakEnv(input, env, attack, release, sampleRate)
{
    // attack/release in ms
    reg att = exp(-1.0 / (0.001 * attack * sampleRate));
    reg rel = exp(-1.0 / (0.001 * release * sampleRate));
    if (abs(input) > env)
        env = att * (env - abs(input)) + abs(input);
    else
        env = rel * (env - abs(input)) + abs(input);
    return env;
}

// --- Soft Clipping (Tube/Tape style, general) ---
inline function softClip(x)
{
    // Symmetric soft clipping for analog-style saturation
    return tanh(x);
}

// --- Tube/Transformer Coloration (simplified) ---
inline function tubeStage(x, drive, asym, even, odd)
{
    // Emulates tube odd/even harmonics for compressor/tape
    reg y = tanh(drive * (x + asym * x * x));
    y = y + even * pow(x, 2) - odd * pow(x, 3);
    return 0.85 * y;
}
inline function xfmrStage(x, n, bumpFreq, bumpGain, highLoss, sampleRate)
{
    // Transformer: low-bump + high loss (Neve/Fairchild flavor)
    reg bump = bumpGain * sin(2.0 * 3.14159 * bumpFreq * n / sampleRate);
    x = x + bump;
    x = x * exp(-n / (sampleRate / highLoss));
    return tanh(1.08 * x);
}

// --- One-Pole Highpass/Lowpass (for sidechain/tape) ---
inline function onePoleLP(x, last, alpha)
{
    // Simple RC lowpass, alpha ~0.01-0.1 for smoothing
    return alpha * x + (1.0 - alpha) * last;
}
inline function onePoleHP(x, last, alpha)
{
    // Simple RC highpass
    return alpha * (last + x - last);
}

// --- Metering Utility: Map to GUI Frame Index ---
inline function mapMeter(val, min, max, frames)
{
    // Maps [min,max] to integer [0,frames-1]
    if (val < min) val = min;
    if (val > max) val = max;
    return int((frames - 1) * (val - min) / (max - min) + 0.5);
}

// --- Utility: Clamp ---
inline function clamp(x, min, max)
{
    if (x < min) return min;
    if (x > max) return max;
    return x;
}

// --- Tape IPS Mapping (7, 15, 30) ---
inline function mapIpsIndexToValue(idx)
{
    // 0 = 7 IPS, 1 = 15 IPS, 2 = 30 IPS
    if (idx == 0) return 7;
    if (idx == 1) return 15;
    return 30;
}

// --- Sidechain HPF Frequency Table (OFF/60/120Hz) ---
inline function scHpfFreq(idx)
{
    // 0=OFF, 1=60Hz, 2=120Hz
    if (idx == 1) return 60;
    if (idx == 2) return 120;
    return 0;
}
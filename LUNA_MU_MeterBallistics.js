// === Meter Ballistics, matching Comp Time Constant switch ===

// Meters
const var DriveMeterL = Content.getComponent("DriveMeterL");
const var DriveMeterR = Content.getComponent("DriveMeterR");
const var TimeConstantSelector = Content.getComponent("TimeConstantSelector");

// Exact attack/release values for each position
const var attackTimes = [0.2, 0.2, 0.4, 0.8, 0.2, 0.2];      // In ms
const var releaseTimes = [300, 800, 2000, 5000, 2000, 300];   // In ms (use first value for transients for pos 5-6)

// For program-dependent (positions 5-6), meters will use the "transient" release for visual realism
// For more realism, you could average or interpolate between transient/multi-peak/sustained

const var fps = 30;

var smoothedL = 0;
var smoothedR = 0;
var lastTime = Engine.getUptime();

inline function fastSmooth(current, target, ms)
{
    var dt = (Engine.getUptime() - lastTime) * 1000;
    var alpha = 1 - Math.exp(-dt / ms);
    return current + (target - current) * alpha;
}

inline function updateBallistics()
{
    lastTime = Engine.getUptime();

    var rawL = Content.getParameter("DriveLevelLeft");   // [0, 1]
    var rawR = Content.getParameter("DriveLevelRight");  // [0, 1]

    // Get selected time constant index (0-5)
    var tcIndex = TimeConstantSelector.getValue(); // Make sure this matches your GUI (0-based or 1-based)

    // Clamp for safety
    tcIndex = Math.max(0, Math.min(5, tcIndex));

    var attackMs = attackTimes[tcIndex];
    var releaseMs = releaseTimes[tcIndex];

    // Attack/release smoothing: fast up, slow down
    smoothedL = (rawL > smoothedL)
        ? fastSmooth(smoothedL, rawL, attackMs)
        : fastSmooth(smoothedL, rawL, releaseMs);

    smoothedR = (rawR > smoothedR)
        ? fastSmooth(smoothedR, rawR, attackMs)
        : fastSmooth(smoothedR, rawR, releaseMs);

    // Map to filmstrip frames (0-8 for 9 frames)
    var frameL = Math.round(smoothedL * 8);
    var frameR = Math.round(smoothedR * 8);

    DriveMeterL.setValue(frameL / 8);
    DriveMeterR.setValue(frameR / 8);
}

reg meterTimer = Engine.createTimerObject();
meterTimer.setTimerCallback(function() { updateBallistics(); });
meterTimer.startTimer(1000 / fps);
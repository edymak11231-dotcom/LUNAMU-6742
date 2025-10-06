// === ALL KNOBS (set filmstrip, numFrames, value mapping) ===

// Input Knob (41 steps)
const var InputKnob = Content.getComponent("InputKnob");
InputKnob.loadImage("{PROJECT_FOLDER}inputknobfilmstrip.png");
InputKnob.set("numFrames", 41);
InputKnob.setControlCallback(function(event)
{
    if (event.changed)
        Content.setParameter("InputGain", event.value);
});

// Output Knob (51 steps)
const var OutputKnob = Content.getComponent("OutputKnob");
OutputKnob.loadImage("{PROJECT_FOLDER}outputknobfilmstrip.png");
OutputKnob.set("numFrames", 51);
OutputKnob.setControlCallback(function(event)
{
    if (event.changed)
        Content.setParameter("OutputGain", event.value);
});

// Mix Knob (51 steps)
const var MixKnob = Content.getComponent("MixKnob");
MixKnob.loadImage("{PROJECT_FOLDER}mixknobfilmstrip.png");
MixKnob.set("numFrames", 51);
MixKnob.setControlCallback(function(event)
{
    if (event.changed)
        Content.setParameter("Mix", event.value);
});

// Threshold Knob (11 steps)
const var ThresholdKnob = Content.getComponent("ThresholdKnob");
ThresholdKnob.loadImage("{PROJECT_FOLDER}thresholdknobfilmstrip.png");
ThresholdKnob.set("numFrames", 11);
ThresholdKnob.setControlCallback(function(event)
{
    if (event.changed)
        Content.setParameter("Threshold", event.value);
});

// Trim Knob (25 steps)
const var TrimKnob = Content.getComponent("TrimKnob");
TrimKnob.loadImage("{PROJECT_FOLDER}trimknobfilmstrip.png");
TrimKnob.set("numFrames", 25);
TrimKnob.setControlCallback(function(event)
{
    if (event.changed)
        Content.setParameter("Trim", event.value);
});

// Tape Sat Knob (31 steps)
const var TapeSatKnob = Content.getComponent("TapeSatKnob");
TapeSatKnob.loadImage("{PROJECT_FOLDER}sat-blendknobfilmstrip.png");
TapeSatKnob.set("numFrames", 31);
TapeSatKnob.setControlCallback(function(event)
{
    if (event.changed)
        Content.setParameter("TapeSat", event.value);
});

// Tape Blend Knob (31 steps)
const var TapeBlendKnob = Content.getComponent("TapeBlendKnob");
TapeBlendKnob.loadImage("{PROJECT_FOLDER}sat-blendknobfilmstrip.png");
TapeBlendKnob.set("numFrames", 31);
TapeBlendKnob.setControlCallback(function(event)
{
    if (event.changed)
        Content.setParameter("TapeBlend", event.value);
});

// Texture Knob (31 steps)
const var TextureKnob = Content.getComponent("TextureKnob");
TextureKnob.loadImage("{PROJECT_FOLDER}textureknob.png");
TextureKnob.set("numFrames", 31);
TextureKnob.setControlCallback(function(event)
{
    if (event.changed)
        Content.setParameter("Texture", event.value);
});
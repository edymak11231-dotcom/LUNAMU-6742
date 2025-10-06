// === ALL SWITCHES / SLIDERS (filmstrips, numFrames, value mapping) ===

// HPF Switch (3 steps)
const var HPFSwitch = Content.getComponent("HPFSwitch");
HPFSwitch.loadImage("{PROJECT_FOLDER}hpf_filmstrip.png");
HPFSwitch.set("numFrames", 3);
HPFSwitch.setControlCallback(function(event)
{
    if (event.changed)
        Content.setParameter("HPF", event.value);
});

// IPS Switch (3 steps)
const var IPSSwitch = Content.getComponent("IPSSwitch");
IPSSwitch.loadImage("{PROJECT_FOLDER}ips_switchfilmstrip.png");
IPSSwitch.set("numFrames", 3);
IPSSwitch.setControlCallback(function(event)
{
    if (event.changed)
        Content.setParameter("IPS", event.value);
});

// Link/Unlink Switch (2 steps)
const var LinkUnlinkSwitch = Content.getComponent("LinkUnlinkSwitch");
LinkUnlinkSwitch.loadImage("{PROJECT_FOLDER}link_unlinkfilmstrip.png");
LinkUnlinkSwitch.set("numFrames", 2);
LinkUnlinkSwitch.setControlCallback(function(event)
{
    if (event.changed)
        Content.setParameter("LinkUnlink", event.value);
});

// Comp/Tape Direction Switch (2 steps)
const var CompTapeSwitch = Content.getComponent("CompTapeSwitch");
CompTapeSwitch.loadImage("{PROJECT_FOLDER}comptape_tapecompfilmstrip.png");
CompTapeSwitch.set("numFrames", 2);
CompTapeSwitch.setControlCallback(function(event)
{
    if (event.changed)
        Content.setParameter("CompTapeDirection", event.value);
});

// Stereo/Mid/Side Switch (2 steps)
const var StereoMidSideSwitch = Content.getComponent("StereoMidSideSwitch");
StereoMidSideSwitch.loadImage("{PROJECT_FOLDER}stereo_mid_sidefilmstrip.png");
StereoMidSideSwitch.set("numFrames", 2);
StereoMidSideSwitch.setControlCallback(function(event)
{
    if (event.changed)
        Content.setParameter("StereoMidSide", event.value);
});

// Tape In Button (2 steps)
const var TapeInButton = Content.getComponent("TapeInButton");
TapeInButton.loadImage("{PROJECT_FOLDER}tapeinfilmstrip.png");
TapeInButton.set("numFrames", 2);
TapeInButton.setControlCallback(function(event)
{
    if (event.changed)
        Content.setParameter("TapeIn", event.value);
});

// Color Mode Button (3 steps)
const var ColorButton = Content.getComponent("ColorButton");
ColorButton.loadImage("{PROJECT_FOLDER}colorbuttonfilmstrip.png");
ColorButton.set("numFrames", 3);
ColorButton.setControlCallback(function(event)
{
    if (event.changed)
        Content.setParameter("ColorMode", event.value);
});

// Time Constant Selector (6 steps)
const var TimeConstantSelector = Content.getComponent("TimeConstantSelector");
TimeConstantSelector.loadImage("{PROJECT_FOLDER}timeconstantfilmstrip.png");
TimeConstantSelector.set("numFrames", 6);
TimeConstantSelector.setControlCallback(function(event)
{
    if (event.changed)
        Content.setParameter("TimeConstant", event.value);
});
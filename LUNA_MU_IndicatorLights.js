// LUNA MU 6742 - Indicator Light Control (Compressor & Tape)

// --- Image Components (create or reference these in your GUI editor) ---
const var CompOnLight = Content.getComponent("CompOnLight");
const var TapeOnLight = Content.getComponent("TapeOnLight");

// --- Load Images ---
CompOnLight.loadImage("{PROJECT_FOLDER}comp-on-light.png");
TapeOnLight.loadImage("{PROJECT_FOLDER}tape-on-light.png");

// --- State Variables ---
reg compIsOn = true;  // Set to your default state
reg tapeIsOn = true;

// --- Update Function ---
inline function updateIndicatorLights()
{
    CompOnLight.set("saturation", compIsOn ? 1 : 0);
    TapeOnLight.set("saturation", tapeIsOn ? 1 : 0);
}

// --- Button Callbacks ---
const var CompOnButton = Content.getComponent("CompOnButton");
CompOnButton.setControlCallback(function(event)
{
    if (event.clicked)
    {
        compIsOn = !compIsOn;
        updateIndicatorLights();
    }
});

const var TapeOnButton = Content.getComponent("TapeOnButton");
TapeOnButton.setControlCallback(function(event)
{
    if (event.clicked)
    {
        tapeIsOn = !tapeIsOn;
        updateIndicatorLights();
    }
});

// --- Initialize lights on startup ---
updateIndicatorLights();
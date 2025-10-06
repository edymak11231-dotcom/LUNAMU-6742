// LUNA MU 6742 - Preset Manager

const var PresetBrowser = Content.getComponent("PresetBrowser");
const var SavePresetButton = Content.getComponent("SavePresetButton");
const var LoadPresetButton = Content.getComponent("LoadPresetButton");

// --- Save Preset ---
SavePresetButton.setControlCallback(function(event)
{
    if (event.clicked)
    {
        var presetName = Engine.getPopupText("Enter Preset Name:");
        if (presetName && presetName.length > 0)
        {
            Engine.saveUserPreset(presetName);
            PresetBrowser.refresh();
        }
    }
});

// --- Load Preset ---
PresetBrowser.setControlCallback(function(event)
{
    if (event.clicked)
    {
        var selectedPreset = PresetBrowser.getCurrentPreset();
        if (selectedPreset && selectedPreset.length > 0)
        {
            Engine.loadUserPreset(selectedPreset);
        }
    }
});

// --- Optional: Load preset on button ---
LoadPresetButton.setControlCallback(function(event)
{
    if (event.clicked)
    {
        var selectedPreset = PresetBrowser.getCurrentPreset();
        if (selectedPreset && selectedPreset.length > 0)
        {
            Engine.loadUserPreset(selectedPreset);
        }
    }
});
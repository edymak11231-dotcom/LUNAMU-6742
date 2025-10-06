// LUNA MU 6742 - Automation & Parameter Linking

// Example: Link a knob to a parameter and allow automation
const var InputGainSlider = Content.getComponent("InputGainSlider");
InputGainSlider.set("allowAutomation", true);

InputGainSlider.setControlCallback(function(event)
{
    if (event.changed)
    {
        // Update parameter (replace with your parameter name)
        Content.setParameter("InputGain", event.value);
    }
});

// Repeat for other automatable controls
const var OutputGainSlider = Content.getComponent("OutputGainSlider");
OutputGainSlider.set("allowAutomation", true);

OutputGainSlider.setControlCallback(function(event)
{
    if (event.changed)
    {
        Content.setParameter("OutputGain", event.value);
    }
});

// To link parameters programmatically:
function linkParameters(sourceComponent, targetComponent)
{
    sourceComponent.setControlCallback(function(event)
    {
        if (event.changed)
        {
            targetComponent.setValue(event.value);
            // Optionally mirror the parameter as well
            // Content.setParameter("LinkedParam", event.value);
        }
    });
}

// Example: Link InputGainSlider to OutputGainSlider (optional)
linkParameters(InputGainSlider, OutputGainSlider);
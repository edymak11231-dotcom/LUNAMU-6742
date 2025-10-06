// === LUNA_MU_EasterEggs.js ===
// Secret skin unlocked: click NuMoonLogo 5 times within 3 seconds

const var FaceplateColor = Content.getComponent("FaceplateColor");
const var FaceplateGrey = Content.getComponent("FaceplateGrey");
const var NuMoonLogo = Content.getComponent("NuMoonLogo");

// Add a secret "purple" skin (make sure this file exists in your assets!)
const var secretSkin = {
    faceplate: "FaceplatePurple.png.png" // Add this PNG to your assets folder!
};

var clickCount = 0;
var clickTimer = 0;
const var SECRET_CLICKS = 5;
const var SECRET_TIMEOUT_MS = 3000; // 3 seconds

// Easter egg: Unlock secret skin
NuMoonLogo.setControlCallback(function(event)
{
    if (event.clicked)
    {
        var now = Engine.getUptime() * 1000; // milliseconds
        if (now - clickTimer > SECRET_TIMEOUT_MS)
            clickCount = 0; // Too slow, reset

        clickCount += 1;
        clickTimer = now;

        if (clickCount >= SECRET_CLICKS)
        {
            // Hide the other faceplates
            FaceplateColor.set("visible", false);
            FaceplateGrey.set("visible", false);

            // Show and load secret faceplate (add this image to your project!)
            FaceplateColor.set("visible", true);
            FaceplateColor.loadImage("{PROJECT_FOLDER}" + secretSkin.faceplate);

            // Optional: Message to confirm
            MessageBox.info("Secret 'Purple' Skin Unlocked!", "Easter Egg");

            clickCount = 0; // Reset for future
        }
    }
});
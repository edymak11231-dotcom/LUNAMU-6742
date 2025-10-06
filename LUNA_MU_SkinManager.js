// === LUNA_MU_SkinManager.js ===
// Click the logo to toggle between skins (faceplate + logo)

// Components
const var FaceplateColor = Content.getComponent("FaceplateColor");
const var FaceplateGrey = Content.getComponent("FaceplateGrey");
const var NuMoonLogo = Content.getComponent("NuMoonLogo");

// Array of skins (can expand with more if desired)
const var skins = [
    {
        faceplate: "FaceplateColor.png.png",
        logo: "nu_moon_logo.png"
    },
    {
        faceplate: "FaceplateGrey.png.png",
        logo: "nu_moon_logo.png"
    }
];

var currentSkin = 0;

// Function to apply the selected skin
inline function applySkin(idx)
{
    // Clamp index
    idx = Math.max(0, Math.min(idx, skins.length - 1));

    // Hide all faceplates first
    FaceplateColor.set("visible", false);
    FaceplateGrey.set("visible", false);

    // Show and load only selected faceplate
    if (skins[idx].faceplate == "FaceplateColor.png.png") {
        FaceplateColor.set("visible", true);
        FaceplateColor.loadImage("{PROJECT_FOLDER}FaceplateColor.png.png");
    } else if (skins[idx].faceplate == "FaceplateGrey.png.png") {
        FaceplateGrey.set("visible", true);
        FaceplateGrey.loadImage("{PROJECT_FOLDER}FaceplateGrey.png.png");
    }

    // (Optional) Swap logo if you have themed logos
    NuMoonLogo.loadImage("{PROJECT_FOLDER}" + skins[idx].logo);
}

// Click callback for logo to toggle skin
NuMoonLogo.setControlCallback(function(event)
{
    if (event.clicked)
    {
        currentSkin = (currentSkin + 1) % skins.length;
        applySkin(currentSkin);
    }
});

// On initialization, apply first skin
applySkin(currentSkin);
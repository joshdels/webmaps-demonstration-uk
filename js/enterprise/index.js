function copyURL() {
  const url =
    "https://services1.arcgis.com/6677msI40mnLuuLr/arcgis/rest/services/Isle_of_Wight_WFL1/FeatureServer/5";
  navigator.clipboard
    .writeText(url)
    .then(() => alert("URL copied! "))
    .catch((err) => console.error("Copy failed:", err));
}

function copyURLTown() {
  const url =
    "https://raw.githubusercontent.com/joshdels/webmaps-demonstration-uk/main/data/iow_town.geojson";
  navigator.clipboard
    .writeText(url)
    .then(() => alert("URL copied! "))
    .catch((err) => console.error("Copy failed:", err));
}

const toggleBtn = document.getElementById("toggle-legend");
toggleBtn.addEventListener("click", () => {
  const div = document.getElementById("legendDiv");
  div.style.display = div.style.display === "none" ? "block" : "none";
});

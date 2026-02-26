function copyURL() {
  const url = "https://services1.arcgis.com/6677msI40mnLuuLr/arcgis/rest/services/Isle_of_Wight_WFL1/FeatureServer/5";
  navigator.clipboard.writeText(url)
    .then(() => alert("URL copied! "))
    .catch(err => console.error("Copy failed:", err));
}
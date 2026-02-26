function copyURL() {
  const url = "https://raw.githubusercontent.com/joshdels/webmaps-demonstration-uk/main/data/iow_outline.kml";
  navigator.clipboard.writeText(url)
    .then(() => alert("URL copied! "))
    .catch(err => console.error("Copy failed:", err));
}
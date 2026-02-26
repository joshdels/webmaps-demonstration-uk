let googleMap;
const googleLayers = {};

function initMap() {
  googleMap = new google.maps.Map(document.getElementById("map-google"), {
    zoom: 10,
    center: { lat: 50.7, lng: -1.3 },
  });

  const kmlLayer = new google.maps.KmlLayer({
    url: "https://raw.githubusercontent.com/username/repo/main/iow_outline.kml",
    map: googleMap,
    preserveViewport: false,
    suppressInfoWindows: false
  });

  kmlLayer.addListener("status_changed", () => {
    console.log("KML status:", kmlLayer.getStatus());
  });

}

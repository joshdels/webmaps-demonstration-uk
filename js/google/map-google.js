let googleMap;
const googleLayers = {};

function initMap() {
  googleMap = new google.maps.Map(document.getElementById("map-google"), {
    zoom: 10,
    center: { lat: 50.7, lng: -1.3 },
  });

  const outlineLayer = new google.maps.KmlLayer({
    url: "https://raw.githubusercontent.com/joshdels/webmaps-demonstration-uk/main/data/iow_outline.kml",
    map: googleMap,
    preserveViewport: true,
    suppressInfoWindows: true,
  });

  outlineLayer.addListener("status_changed", () => {
    console.log("KML status:", outlineLayer.getStatus());
  });

  googleMap.data.loadGeoJson("data/iow_roads.geojson");

  googleMap.data.setStyle({
    strokeColor: "#2f3ad3",
    strokeWeight: 2,
  });

}

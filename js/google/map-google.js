let googleMap;
const googleLayers = {};

function initMap() {
  googleMap = new google.maps.Map(document.getElementById("map-google"), {
    zoom: 10,
    center: { lat: 50.7, lng: -1.3 },
  });

  const kmlLayer = new google.maps.KmlLayer({
    // Change this KMZ file that you hosted on github
    url: "https://raw.githubusercontent.com/joshdels/webmaps-demonstration-uk/main/data/iow_outline.kml",
    map: googleMap,
    preserveViewport: true,
    suppressInfoWindows: true,
  });

  kmlLayer.addListener("status_changed", () => {
    console.log("KML status:", kmlLayer.getStatus());
  });

}

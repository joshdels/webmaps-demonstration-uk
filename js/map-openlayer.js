// Create map
const mapOL = new ol.Map({
  target: "map-openlayer",
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM(),
    }),
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([0, 20]),
    zoom: 2,
  }),
});

// External GeoJSON URL
const geojsonUrl = "data/iow_town.geojson";

// Create vector source from external URL with projection
const vectorSource = new ol.source.Vector({
  url: geojsonUrl,
  format: new ol.format.GeoJSON({
    dataProjection: "EPSG:4326",
    featureProjection: "EPSG:3857",
  }),
});

// Style for points
const vectorLayer = new ol.layer.Vector({
  source: vectorSource,
  style: new ol.style.Style({
    image: new ol.style.Circle({
      radius: 6,
      fill: new ol.style.Fill({ color: "#007bff" }),
      stroke: new ol.style.Stroke({ color: "#ffffff", width: 2 }),
    }),
  }),
});

mapOL.addLayer(vectorLayer);

// Zoom to features when loaded
vectorSource.on("change", function () {
  if (vectorSource.getState() === "ready") {
    mapOL.getView().fit(vectorSource.getExtent(), {
      padding: [120, 120, 120, 120],
    });
  }
});

// Popup overlay
const popupEl = document.getElementById("popup");
const overlay = new ol.Overlay({
  element: popupEl,
  positioning: "bottom-center",
  stopEvent: false,
  offset: [0, -10],
});
mapOL.addOverlay(overlay);

// Show popup on click
mapOL.on("singleclick", function (evt) {
  const feature = mapOL.forEachFeatureAtPixel(evt.pixel, (f) => f);
  if (feature) {
    const coords = feature.getGeometry().getCoordinates();
    overlay.setPosition(coords);
    const props = feature.getProperties();
    let info = "";
    for (const k in props) {
      if (k !== "geometry") info += k + ": " + props[k] + "\n";
    }
    popupEl.innerText = info;
  } else {
    popupEl.innerText = "";
  }
});

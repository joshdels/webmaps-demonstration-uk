// ====== OpenLayers Map Setup ======
const mapOL = new ol.Map({
  target: "map-openlayer",
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM(),
    }),
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([-1.3, 50.7]),
    zoom: 10,
  }),
});

const olLayers = {};

LayerManager.registerMap({
  addLayer: async function (layerName, url) {
    if (!olLayers[layerName]) {
      // Create vector source
      const vectorSource = new ol.source.Vector({
        url: url,
        format: new ol.format.GeoJSON({
          dataProjection: "EPSG:4326",
          featureProjection: "EPSG:3857",
        }),
      });

      // Create vector layer with styles
      const vectorLayer = new ol.layer.Vector({
        source: vectorSource,
        style: function (feature) {
          const geomType = feature.getGeometry().getType();

          if (geomType === "Point") {
            return new ol.style.Style({
              image: new ol.style.Circle({
                radius: 6,
                fill: new ol.style.Fill({ color: "#007bff" }),
                stroke: new ol.style.Stroke({ color: "#ffffff", width: 2 }),
              }),
            });
          } else if (geomType === "Polygon" || geomType === "MultiPolygon") {
            return new ol.style.Style({
              stroke: new ol.style.Stroke({
                color: "#FF0000",
                width: 2,
              }),
              fill: new ol.style.Fill({
                color: "rgba(255, 0, 0, 0.3)",
              }),
            });
          } else if (geomType === "LineString" || geomType === "MultiLineString") {
            return new ol.style.Style({
              stroke: new ol.style.Stroke({
                color: "#0000FF",
                width: 3,
              }),
            });
          }
        },
      });

      mapOL.addLayer(vectorLayer);
      olLayers[layerName] = { vectorLayer, vectorSource };

      // Zoom to layer extent once features are loaded
      vectorSource.on("change", function () {
        if (vectorSource.getState() === "ready") {
          mapOL
            .getView()
            .fit(vectorSource.getExtent(), { padding: [120, 120, 120, 120] });
        }
      });
    } else {
      olLayers[layerName].vectorLayer.setVisible(true);
    }
  },

  removeLayer: function (layerName) {
    if (olLayers[layerName]) {
      olLayers[layerName].vectorLayer.setVisible(false);
    }
  },
});

// ====== Popup Overlay ======
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
    const coords = feature.getGeometry().getClosestPoint(evt.coordinate);
    overlay.setPosition(coords);

    const props = feature.getProperties();
    let info = "";
    for (const k in props) {
      if (k !== "geometry") info += `${k}: ${props[k]}\n`;
    }
    popupEl.innerText = info;
  } else {
    popupEl.innerText = "";
  }
});
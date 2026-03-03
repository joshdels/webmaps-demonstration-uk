const map = L.map("map-leaflet").setView([50.7, -1.3], 11);

const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 25,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const leafletLayers = {};

LayerManager.registerMap({
  addLayer: function (layerName, url) {
    if (!leafletLayers[layerName]) {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          const layer = L.geoJSON(data, {
            style: function () {
              return {
                color: "blue",
                weight: 2,
              };
            },

            onEachFeature: function (feature, layer) {
              if (feature.properties) {
                let popupContent = "<table>";

                for (const key in feature.properties) {
                  popupContent += `
                    <tr>
                      <td><b>${key}</b></td>
                      <td>${feature.properties[key]}</td>
                    </tr>
                  `;
                }

                popupContent += "</table>";

                layer.bindPopup(popupContent);
              }
            },
          });

          leafletLayers[layerName] = layer;
          layer.addTo(map);
        });
    } else {
      leafletLayers[layerName].addTo(map);
    }
  },

  removeLayer: function (layerName) {
    if (leafletLayers[layerName]) {
      map.removeLayer(leafletLayers[layerName]);
    }
  },
});

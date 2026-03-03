const map = L.map("map-leaflet").setView([50.7, -1.3], 10);

const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 25,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// Fetching Data
fetch("data/iow_town.geojson")
  .then((response) => response.json())
  .then((data) => {
    const geoLayer = L.geoJSON(data, {
      style: { color: "blue", weight: 2 },
      onEachFeature: function (feature, layer) {
        if (feature.properties) {
          let popupContent = "<table>";
          for (const key in feature.properties) {
            popupContent += `
            <tr><td><b>${key}:</b></td>
            <td>${feature.properties[key]}</td></tr>
            `;
          }
          popupContent += "</table>";
          layer.bindPopup(popupContent);
        }
      },
    }).addTo(map);

    map.fitBounds(geoLayer.getBounds(), { padding: [40, 40] });
  })
  .catch((err) => console.error("Error loading GeoJSON:", err));

fetch("data/iow_outline.geojson")
  .then((response) => response.json())
  .then((data) => {
    const geoLayer = L.geoJSON(data, {
      style: { color: "blue", weight: 2 },
      onEachFeature: function (feature, layer) {
        if (feature.properties) {
          let popupContent = "<table>";
          for (const key in feature.properties) {
            popupContent += `
            <tr><td><b>${key}:</b></td>
            <td>${feature.properties[key]}</td></tr>
            `;
          }
          popupContent += "</table>";
          layer.bindPopup(popupContent);
        }
      },
    }).addTo(map);

    map.fitBounds(geoLayer.getBounds(), { padding: [40, 40] });
  })
  .catch((err) => console.error("Error loading GeoJSON:", err));

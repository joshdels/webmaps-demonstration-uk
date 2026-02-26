let googleMap;
const googleLayers = {};

function initMap() {
  googleMap = new google.maps.Map(document.getElementById("map-google"), {
    zoom: 10,
    center: { lat: 50.7, lng: -1.3 },
  });

  LayerManager.registerMap({
    addLayer: async function (layerName, url) {
      if (!googleLayers[layerName]) {
        const response = await fetch(url);
        const data = await response.json();

        const shapes = [];
        const bounds = new google.maps.LatLngBounds();
        const infoWindow = new google.maps.InfoWindow();

        data.features.forEach((feature) => {
          const geomType = feature.geometry.type;
          const coords = feature.geometry.coordinates;
          let shape;

          // Build popup content
          let content = "<table>";
          for (const key in feature.properties) {
            content += `<tr><td><b>${key}</b></td><td>${feature.properties[key]}</td></tr>`;
          }
          content += "</table>";

          if (geomType === "Point") {
            const [lng, lat] = coords;
            shape = new google.maps.Marker({
              position: { lat, lng },
              map: googleMap,
            });

            shape.addListener(
              "click",
              () =>
                infoWindow.setContent(content) ||
                infoWindow.open(googleMap, shape),
            );
            bounds.extend({ lat, lng });
          } else if (geomType === "Polygon") {
            shape = new google.maps.Polygon({
              paths: coords.map((ring) =>
                ring.map(([lng, lat]) => ({ lat, lng })),
              ),
              strokeColor: "#FF0000",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: "#FF0000",
              fillOpacity: 0.35,
              map: googleMap,
            });

            shape.addListener(
              "click",
              (event) =>
                infoWindow.setContent(content) ||
                infoWindow.setPosition(event.latLng) ||
                infoWindow.open(googleMap),
            );
            bounds.extend({ lat: coords[0][0][1], lng: coords[0][0][0] });
          } else if (geomType === "MultiPolygon") {
            coords.forEach((polygonCoords) => {
              const poly = new google.maps.Polygon({
                paths: polygonCoords.map((ring) =>
                  ring.map(([lng, lat]) => ({ lat, lng })),
                ),
                strokeColor: "#FF0000",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#FF0000",
                fillOpacity: 0.35,
                map: googleMap,
              });

              poly.addListener(
                "click",
                (event) =>
                  infoWindow.setContent(content) ||
                  infoWindow.setPosition(event.latLng) ||
                  infoWindow.open(googleMap),
              );
              shapes.push(poly);
            });
            return;
          } else if (geomType === "LineString") {
            shape = new google.maps.Polyline({
              path: coords.map(([lng, lat]) => ({ lat, lng })),
              strokeColor: "#0000FF",
              strokeOpacity: 0.8,
              strokeWeight: 3,
              map: googleMap,
            });

            shape.addListener(
              "click",
              (event) =>
                infoWindow.setContent(content) ||
                infoWindow.setPosition(event.latLng) ||
                infoWindow.open(googleMap),
            );
          } else if (geomType === "MultiLineString") {
            coords.forEach((lineCoords) => {
              const line = new google.maps.Polyline({
                path: lineCoords.map(([lng, lat]) => ({ lat, lng })),
                strokeColor: "#0000FF",
                strokeOpacity: 0.8,
                strokeWeight: 3,
                map: googleMap,
              });
              line.addListener(
                "click",
                (event) =>
                  infoWindow.setContent(content) ||
                  infoWindow.setPosition(event.latLng) ||
                  infoWindow.open(googleMap),
              );
              shapes.push(line);
            });
            return;
          }

          shapes.push(shape);
        });

        googleLayers[layerName] = { shapes, bounds };

        if (!bounds.isEmpty()) googleMap.fitBounds(bounds);
      } else {
        googleLayers[layerName].shapes.forEach((shape) =>
          shape.setMap(googleMap),
        );
      }
    },

    removeLayer: function (layerName) {
      if (googleLayers[layerName]) {
        googleLayers[layerName].shapes.forEach((shape) => shape.setMap(null));
      }
    },
  });
}

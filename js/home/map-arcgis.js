(async () => {
  const [Map, MapView, GeoJSONLayer] = await $arcgis.import([
    "@arcgis/core/Map.js",
    "@arcgis/core/views/MapView.js",
    "@arcgis/core/layers/GeoJSONLayer.js",
  ]);

  const map = new Map({
    basemap: "topo-vector",
  });

  const view = new MapView({
    container: "map-arcgis", //target container
    map: map,
    zoom: 10,
    center: [-1.3, 50.7],
  });

  const arcgisLayers = {};

  LayerManager.registerMap({
    addLayer: function (layerName, url) {
      if (!arcgisLayers[layerName]) {
        const layer = new GeoJSONLayer({
          url: url,

          popupTemplate: {
            title: "{name}",

            content: function (feature) {
              const attrs = feature.graphic.attributes;

              let content = "<table>";

              for (const key in attrs) {
                content += `
                <tr>
                  <td><b>${key}</b></td>
                  <td>${attrs[key]}</td>
                </tr>
              `;
              }

              content += "</table>";

              return content;
            },
          },
        });

        arcgisLayers[layerName] = layer;
        map.add(layer);

        layer.when(() => {
          layer.queryExtent().then((result) => {
            if (result.extent) {
              view.goTo(result.extent.expand(1.2));
            }
          });
        });
      } else {
        map.add(arcgisLayers[layerName]);
      }
    },

    removeLayer: function (layerName) {
      if (arcgisLayers[layerName]) {
        map.remove(arcgisLayers[layerName]);
      }
    },
  });
})();

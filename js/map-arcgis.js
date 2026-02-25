(async () => {
  const [Map, MapView, GeoJSONLayer] = await $arcgis.import([
    "@arcgis/core/Map.js",
    "@arcgis/core/views/MapView.js",
    "@arcgis/core/layers/GeoJSONLayer.js",
  ]);

  // Fetching Data
  const url = "data/iow_town.geojson";

  // Create the GeoJSON layer
  const layer = new GeoJSONLayer({
    url: url,
    title: "Towns",
    popupTemplate: {
      title: "{name}",
      content: (feature) => {
        const attrs = feature.graphic.attributes;
        let content = "<table>";
        for (const key in attrs) {
          content += `<tr><td><b>${key}:</b></td><td>${attrs[key]}</td></tr>`;
        }
        content += "</table>";
        return content;
      },
    },
  });

  const map = new Map({
    basemap: "topo-vector",
    layers: [layer],
  });

  const view = new MapView({
    container: "map-arcgis", //target container
    map: map,
    zoom: 10,
    center: [-1.3, 50.7],
  });

  // Zooming
  layer.when(() => {
    layer.queryExtent().then((result) => {
      if (result.extent) {
        view.goTo(result.extent.expand(1.2));
      }
    });
  });
})();

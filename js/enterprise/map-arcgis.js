(async () => {
  const [Map, MapView, FeatureLayer] = await $arcgis.import([
    "@arcgis/core/Map.js",
    "@arcgis/core/views/MapView.js",
    "@arcgis/core/layers/FeatureLayer",
  ]);

  const map = new Map({
    basemap: "topo-vector",
  });

  const view = new MapView({
    container: "map-arcgis",
    map: map,
    zoom: 6,
    center: [-1.3, 50.7],
  });

  const roadsLayer = new FeatureLayer({
    url: "https://services1.arcgis.com/6677msI40mnLuuLr/arcgis/rest/services/Isle_of_Wight_WFL1/FeatureServer/5",
    outFields: ["*"],
    popupEnabled: true,
    visible: true,
  });

  map.add(roadsLayer);

  roadsLayer.when(() => {
    roadsLayer.queryExtent().then((result) => {
      if (result.extent) {
        view.goTo(result.extent);
      }
    });
  });
})();

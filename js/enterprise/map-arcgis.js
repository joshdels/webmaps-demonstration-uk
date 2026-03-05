(async () => {
  const [Map, MapView, FeatureLayer, GeoJSONLayer, Legend] =
    await $arcgis.import([
      "@arcgis/core/Map.js",
      "@arcgis/core/views/MapView.js",
      "@arcgis/core/layers/FeatureLayer",
      "@arcgis/core/layers/GeoJSONLayer.js",
      "@arcgis/core/widgets/Legend.js",
    ]);

  const map = new Map({
    basemap: "topo-vector",
  });

  const view = new MapView({
    container: "map-arcgis",
    map: map,
    zoom: 11,
    center: [-1.3, 50.7],
  });

  const roadLayer = new FeatureLayer({
    url: "https://services1.arcgis.com/6677msI40mnLuuLr/arcgis/rest/services/Isle_of_Wight_WFL1/FeatureServer/5",
    outFields: ["*"],
    popupEnabled: true,
    visible: true,
  });

  map.add(roadLayer);

  const roadsLayer = new GeoJSONLayer({
    url: "data/iow_roads.geojson",
    visible: true,
    popupTemplate: {
      title: "{Road}",
      content: `
        Easting: {Easting} <br>
        Northing: {Northing}
      `,
    },
  });

  map.add(roadsLayer);

  const townsLayer = new GeoJSONLayer({
    url: "data/iow_town.geojson",
    visible: true,
    popupTemplate: {
      title: "{Town}",
      content: `
        Easting: {Easting} <br>
        Northing: {Northing}
      `,
    },
    renderer: {
      type: "simple",
      symbol: {
        type: "picture-marker",
        url: "https://static.arcgis.com/icons/places/City_Hall_15.svg",
        width: "24px",
        height: "24px",
      },
    },
  });

  map.add(townsLayer);

  const legend = new Legend({
    view: view,
    layerInfos: [
      { layer: roadsLayer, title: "Roads" },
      { layer: townsLayer, title: "Towns" },
    ],
    container: "legendDiv",
  });

  try {
    await townsLayer.when();
    const layerView = await view.whenLayerView(townsLayer);
    const result = await townsLayer.queryExtent();

    if (result.extent) {
      view.goTo(result.extent, { duration: 1500 });
    }
  } catch (error) {
    console.error("Error zooming to layer:", error);
  }

  const toggleBtn = document.getElementById("toggle-legend");
  toggleBtn.addEventListener("click", () => {
    const div = document.getElementById("legendDiv");
    div.style.display = div.style.display === "none" ? "block" : "none";
  });
})();

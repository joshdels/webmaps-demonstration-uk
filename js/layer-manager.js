window.LayerManager = (function () {
  const maps = [];
  const layerCache = {};

  function registerMap(mapAdapter) {
    maps.push(mapAdapter);
  }

  function addLayer(layerName) {
    if (!layerCache[layerName]) {
      layerCache[layerName] = `data/${layerName}.geojson`;
    }

    maps.forEach((map) => {
      map.addLayer(layerName, layerCache[layerName]);
    });
  }

  function removeLayer(layerName) {
    maps.forEach((map) => {
      map.removeLayer(layerName);
    });
  }

  return {
    registerMap,
    addLayer,
    removeLayer,
  };
})();

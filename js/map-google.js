async function initMap() {
  const map = new google.maps.Map(document.getElementById("map-google"), {
    zoom: 10,
    center: { lat: 50.7, lng: 1.3 },
  });

  // Ajax Fetching Data
  const response = await fetch("data/iow_town.geojson");
  const data = await response.json();

  const bounds = new google.maps.LatLngBounds();
  // Iterate over features
  data.features.forEach((feature) => {
    const coords = feature.geometry.coordinates;
    let lat, lng;

    // Handle Point geometry
    if (feature.geometry.type === "Point") {
      lng = coords[0];
      lat = coords[1];

      const marker = new google.maps.Marker({
        position: { lat, lng },
        map: map,
      });

      // Build popup content dynamically for all properties
      let content = "<table>";
      for (const key in feature.properties) {
        content += `<tr><td><b>${key}:</b></td><td>${feature.properties[key]}</td></tr>`;
      }
      content += "</table>";

      const infoWindow = new google.maps.InfoWindow({
        content: content,
      });

      marker.addListener("click", () => infoWindow.open(map, marker));

      bounds.extend({ lat, lng });
    }
  });

  // Fit map to all markers
  map.fitBounds(bounds);
}

initMap();

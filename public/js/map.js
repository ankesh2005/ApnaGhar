  // Default location (Delhi example)
let lat = 28.644800;
let lng = 77.216721;

// If listing has geometry, override default
if (geometry && geometry.coordinates && geometry.coordinates.length === 2) {
  lng = geometry.coordinates[0];
  lat = geometry.coordinates[1];
}

  const map = L.map("map").setView([lat, lng], 10);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:  '&copy; <a href="http://www.openstreetmap.org/copyright">ApnaGhar</a>'
  }).addTo(map);

  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(` Exact Location after booking`)
    .openPopup();


var circle = L.circle([lat,lng], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);


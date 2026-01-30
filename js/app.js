// js/app.js
export let map;

export function initMap() {
  if (map) return;

  map = L.map("map", {
    center: [-15.7801, -47.9292],
    zoom: 5,
  });

  const osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  });

  const esriSat = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    { maxZoom: 19, attribution: "© Esri" }
  );

  esriSat.addTo(map);

  const baseMaps = {
    "Satélite (ESRI)": esriSat,
    "Mapa (OSM)": osm,
  };

  L.control.layers(baseMaps, null, { position: "topright" }).addTo(map);
}

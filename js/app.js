let map;

document.addEventListener("DOMContentLoaded", async () => {
  const { data } = await supabase.auth.getSession();
  const session = data.session;

  const authContainer = document.getElementById("auth-container");
  const appContainer = document.getElementById("app-container");

  if (session) {
    authContainer.style.display = "none";
    appContainer.style.display = "block";

    initMap();
  } else {
    authContainer.style.display = "block";
    appContainer.style.display = "none";
  }
});

function initMap() {
  if (map) return;

  map = L.map("map", {
    center: [-15.7801, -47.9292], // Brasil (centro inicial)
    zoom: 5,
    zoomControl: true
  });

  // OpenStreetMap
  const osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap"
  });

  // ESRI Satellite
  const esriSat = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
      maxZoom: 19,
      attribution: "© Esri"
    }
  );

  // Adiciona satélite por padrão
  esriSat.addTo(map);

  // Controle de camadas
  const baseMaps = {
    "Satélite (ESRI)": esriSat,
    "Mapa (OSM)": osm
  };

  L.control.layers(baseMaps, null, { position: "topright" }).addTo(map);
}

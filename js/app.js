// PROVA DE VIDA
console.log("app.js carregado corretamente");
alert("JS externo executando");

// Inicializa o mapa
var map = L.map('map').setView([-15.78, -47.93], 6);

// Camadas base
var osm = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    { attribution: '© OpenStreetMap' }
);

var esri = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    { attribution: 'Tiles © Esri' }
);

// Adiciona camada padrão
osm.addTo(map);

// Controle de camadas
L.control.layers({
    "OpenStreetMap": osm,
    "Satélite": esri
}).addTo(map);

/***************************************************
 * FASE 1 - BASE GIS
 * Planejamento de Voo para Drones Agrícolas
 ***************************************************/

/* ================================
   VARIÁVEIS GLOBAIS
================================ */
let map;
let baseLayers = {};
let overlayLayers = {};
let ortomosaicoLayer = null;

/* ================================
   INICIALIZAÇÃO DO MAPA
================================ */
function initMap() {

    // Centro inicial (Brasil - posição genérica)
    const initialCenter = [-15.7801, -47.9292]; // Brasília
    const initialZoom = 6;

    map = L.map('map', {
        center: initialCenter,
        zoom: initialZoom,
        minZoom: 3,
        maxZoom: 22,
        zoomControl: true
    });

    initBaseLayers();
    initLayerControl();
}

/* ================================
   CAMADAS BASE
================================ */
function initBaseLayers() {

    // OpenStreetMap
    const osm = L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
            attribution: '&copy; OpenStreetMap contributors',
            maxZoom: 22
        }
    );

    // ESRI Satellite
    const esriSatellite = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/' +
        'World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
            attribution: 'Tiles &copy; Esri',
            maxZoom: 22
        }
    );

    // Definindo camadas base
    baseLayers = {
        "OpenStreetMap": osm,
        "ESRI Satélite": esriSatellite
    };

    // Camada padrão
    osm.addTo(map);
}

/* ================================
   CONTROLE DE CAMADAS
================================ */
function initLayerControl() {

    overlayLayers = {
        // Orto mosaico será inserido aqui futuramente
    };

    L.control.layers(baseLayers, overlayLayers, {
        position: 'topright',
        collapsed: false
    }).addTo(map);
}

/* ================================
   START
================================ */
document.addEventListener('DOMContentLoaded', () => {
    initMap();
});


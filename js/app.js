/***************************************************
 * FASE 1 - BASE GIS
 ***************************************************/

let map;
let baseLayers = {};

function initMap() {

    const initialCenter = [-15.78, -47.93]; // Brasil
    const initialZoom = 6;

    map = L.map('map', {
        center: initialCenter,
        zoom: initialZoom,
        minZoom: 3,
        maxZoom: 22
    });

    const osm = L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
            attribution: '&copy; OpenStreetMap'
        }
    );

    const esri = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
            attribution: 'Tiles &copy; Esri'
        }
    );

    baseLayers = {
        "OpenStreetMap": osm,
        "Satélite (ESRI)": esri
    };

    osm.addTo(map);

    L.control.layers(baseLayers, {}, {
        collapsed: false
    }).addTo(map);
}

document.addEventListener('DOMContentLoaded', initMap);

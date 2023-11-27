/* global L */

let map;

export function initMap() {
    map = L.map('map').setView([52.232, 21.005], 12);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    customizeMapControls();
}

export function updateMap(data) {
    removeAllMarkers();

    const lat = parseFloat(data.lat);
    const lon = parseFloat(data.lon);

    const bounds = [
        [parseFloat(data.bounds[0]), parseFloat(data.bounds[2])],
        [parseFloat(data.bounds[1]), parseFloat(data.bounds[3])]
    ];

    // Enable scroll wheel zooming after the animation is complete
    map.once('zoomend', function() {
        map.scrollWheelZoom.enable();
        map.dragging.enable();
    });  
    
    if (map) {
        map.scrollWheelZoom.disable();
        map.dragging.disable();

        L.marker([lat, lon]).addTo(map);

        map.flyToBounds(bounds, {
            duration: 4
        });
    }
}

function customizeMapControls() {
    // Disable +/- buttons
    document.querySelector('.leaflet-control-zoom').style.display = 'none';
    
    // Style the contributors label 
    document.querySelector('.leaflet-control-attribution').style.fontSize = '0.5rem';
}

function removeAllMarkers() {
    map.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });
}
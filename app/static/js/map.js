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
    const lat = parseFloat(data.lat);
    const lon = parseFloat(data.lon);

    removeAllMarkers();
    placeMarker(lat, lon)

    const bounds = [
        [parseFloat(data.bounds[0]), parseFloat(data.bounds[2])],
        [parseFloat(data.bounds[1]), parseFloat(data.bounds[3])]
    ];

    if (map) {
        map.scrollWheelZoom.disable();
        map.dragging.disable();

        const zoom = map.getBoundsZoom(bounds);
    
        clearGeoJSONLayers();

        L.geoJSON(data.geojson, {
            style: {
                color: '#3388ff',
                weight: 2,
                fillOpacity: 0.1
            }
        }).addTo(map)


        map.flyTo([lat, lon], zoom, {
            duration: 4
        });

        map.once('zoomend', function() {
            map.scrollWheelZoom.enable();
            map.dragging.enable();
        }); 
    }
}

function placeMarker(lat, lon) {
    L.marker([lat, lon]).addTo(map);
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

function clearGeoJSONLayers() {
    map.eachLayer(function (layer) {
        if (layer instanceof L.GeoJSON) {
        map.removeLayer(layer);
        }
    });
}

/*
    jezeli address to marker, else geojson


*/
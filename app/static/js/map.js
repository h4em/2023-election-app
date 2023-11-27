let map;

export function initMap() {
    map = L.map('map').setView([52.232, 21.005], 12);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    //Disable +/- buttons
    map.zoomControl.setPosition('bottomright');
    document.querySelector('.leaflet-control-zoom').style.display = 'none';

    document.querySelector('.leaflet-control-attribution').style.fontSize = '0.5rem';
}

export function updateMap(data) {
    const lat = parseFloat(data.lat)
    const lon = parseFloat(data.lon)

    const bounds = [
        [parseFloat(data.bounds[0]), parseFloat(data.bounds[2])],
        [parseFloat(data.bounds[1]), parseFloat(data.bounds[3])]
    ];
    
    if (map) {
        map.flyToBounds(bounds, {
            duration: 4
        });
    }
}

/*
    jakies markery dodac?
*/
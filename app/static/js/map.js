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

export function updateMap(latitude, longitude, category) {
    let zoom = getZoom(category)
    
    if (map) {
        map.flyTo([latitude, longitude], zoom);
    }
}

function getZoom(category) {
    if(category == '1') {
        return 16;
    } else if (category == '2') {
        return 11
    } else if (category == '3') {
        return 13
    } else if (category == '4') {
        return 10;
    } else if (category == '5')
        return 8;

    return 11;
}

/*
    miasto na podstawie wielkosci miasta zoom?
*/
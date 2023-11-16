export function initMap() {
    const map = L.map('map').setView([52.232, 21.005], 12);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    //Disable +/- buttons
    map.zoomControl.setPosition('bottomright');
    document.querySelector('.leaflet-control-zoom').style.display = 'none';

    //Changing the 'Leaflet | © OpenStreetMap contributors' element font size
    document.querySelector('.leaflet-control-attribution').style.fontSize = '0.5rem';
}

/*
    flyTo(<LatLng> latlng, <Number> zoom?, <Zoom/pan options> options?)
*/
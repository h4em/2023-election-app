import requests
import json

def geocode_placename(placename, category):
    base_url = "https://nominatim.openstreetmap.org/search"

    if category == '1':
        placename = placename.split(', ', 1)[1]
        if placename.startswith('ul. '):
            placename = placename[4:]

    params = {
        'q': placename,
        'format': 'json',
        'limit': 1,
        'countrycodes': 'PL'
    }
    
    response = requests.get(base_url, params)
    data = response.json()

    result = {}

    if data:
        result['name'] = data[0]['display_name']
        result['lat'] = data[0]['lat']
        result['lon'] = data[0]['lon']
        result['bounds'] = data[0]['boundingbox']

    return json.dumps(result, ensure_ascii=True)

'''
    boundsy sa w formacie: lista, min lat, max lat, min lon max lon 
    
    map.fitBounds([[bbox[0],bbox[2]],[bbox[1],bbox[3]]], {padding: [20, 20], maxzoom: 16});
'''

'''
    Dla category == 1 bardzo czesto brak wynikow.

    format jest zawsze 'adres, miasto, post_code'

    woj 8
    powiat 10
    gmina 13
    miasto 14
    adres 16
'''
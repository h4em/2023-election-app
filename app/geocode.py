import requests
import json

def geocode_placename(placename, category):
    base_url = "https://nominatim.openstreetmap.org/search"

    if category == '1':
        placename = placename.split(', ', 1)[1].strip()
        
    params = {
        'q': placename,
        'format': 'json'
    }
    
    response = requests.get(base_url, params=params)
    data = response.json()

    coordinates = {}

    if data:
        coordinates['lat'] = data[0]['lat']
        coordinates['lon'] = data[0]['lon']

    return json.dumps(coordinates, ensure_ascii=True)

'''
    Dla category == 1 bardzo czesto brak wynikow.

    format jest zawsze 'adres, miasto, post_code'

    moze fallbackowac na city jak nie znajdzie dla adresu
    bo dla city git jest zazwyczaj

    woj 8
    powiat 10
    gmina 13
    miasto 14
    adres 16
'''
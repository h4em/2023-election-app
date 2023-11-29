import requests
import json

def geocode_placename(placename):
    base_url = "https://nominatim.openstreetmap.org/search"

    params = {
        'q': placename,
        'format': 'json',
        'limit': 1,
        'countrycodes': 'PL',
        'polygon_geojson': 1
    }
    
    response = requests.get(base_url, params)
    data = response.json()

    result = {}

    if data:
        result['name'] = data[0]['display_name']
        result['lat'] = data[0]['lat']
        result['lon'] = data[0]['lon']
        result['bounds'] = data[0]['boundingbox']
        result['geojson'] = data[0]['geojson']

    return json.dumps(result, ensure_ascii=True)

'''
    dla gmin czesto no results

    dla gmin sa dobre wyniki ale mapa, koordynaty zle, czesto pokazuje np. miasta zamiast gmin
'''
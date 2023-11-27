import requests
import json

def geocode_placename(placename):
    base_url = "https://nominatim.openstreetmap.org/search"

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
        result['lat'] = data[0]['lat']
        result['lon'] = data[0]['lon']
        result['bounds'] = data[0]['boundingbox']

    return json.dumps(result, ensure_ascii=True)

'''
    dla gminy tez jest slabizna czesto


'''
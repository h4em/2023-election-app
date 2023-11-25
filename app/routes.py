from flask import Blueprint, render_template, request
from app.db_util import get_matching_records, get_voting_results
from app.geocode import geocode_placename

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return render_template('index.html')

@main.route('/hints', methods=['GET'])
def get_hints():
    keyword = request.args.get('keyword', default='', type=str)
    category = request.args.get('category', default='', type=str)

    results = get_matching_records(keyword, category)

    return results

@main.route('/results', methods=['GET'])
def get_results():
    id = request.args.get('id', default='', type=str)
    category = request.args.get('category', default='', type=str)

    results = get_voting_results(id, category)
    
    return results

@main.route('/location', methods=['GET'])
def get_coordinates():
    placename = request.args.get('placename', default='', type=str)
    category = request.args.get('category', default='', type=str)

    location_coordinates = geocode_placename(placename, category)

    return location_coordinates
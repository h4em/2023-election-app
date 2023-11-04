from flask import Blueprint, render_template, request, jsonify
from app.db_util import get_institutions, get_institution_results

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return render_template('index.html')

@main.route('/institution_search_bar', methods=['GET'])
def search_for_institution():
    institution_name = request.args.get('q')
    institutions = get_institutions(institution_name) 
    return jsonify(institutions)

@main.route('/institution_results', methods=['GET'])
def institution_results():
    institution = request.args.get('q')
    result = get_institution_results(institution)
    return jsonify(result)
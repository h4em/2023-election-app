from flask import Blueprint, render_template, request
from app.db_util import get_matching_records, get_voting_results

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
    item = request.args.get('item', default='', type=str)
    category = request.args.get('category', default='', type=str)

    results = get_voting_results(item, category)
    
    return results
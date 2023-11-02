from flask import Flask, render_template, request
from config.db_config import Config
import os
import pymysql


app = Flask(__name__)

# Set the path to the 'templates' directory
template_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'templates'))

# Update the app's template folder
app.template_folder = template_dir

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
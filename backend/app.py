from flask import Flask, jsonify
from flask_cors import CORS
from queries import (create_user, get_user, get_menu)
import sqlite3
from db import DB

app = Flask(__name__)
CORS(app)

db_name = './database/restaurant.db'

app.add_url_rule('/register', None, create_user, methods=["POST"])
app.add_url_rule('/menu', None, get_menu, methods=["GET"])
app.add_url_rule('/login', None, get_user, methods=["POST"])

# app.add_url_rule('/', None, getStaff, methods=["GET"])

def db_connection():
    conn = None
    try:
        conn = sqlite3.connect('./database/restaurant.db')
        print("Connected to the restaurant database")
    except sqlite3.error as e:
        print(e)
    return conn


# routes
@app.route('/')
def index():
    # here we can return our staff pictures and titles
    return "Home"


# This is a query to get the menu
@app.route('/ourmenu')
def menu():
    db_connection()
    qry = 'SELECT * FROM menu'
    menukaart = DB.all(qry)
    # menukaart = conn.execute(qry)
    return jsonify(menukaart)


@app.errorhandler(404)
def error():
    return 'Go back to our home'


@app.errorhandler(500)
def error():
    return 'Go back to our <a href="/">home</a>'


if __name__ == "__main__":
    app.run(port=5000)
    app.run(debug=True)

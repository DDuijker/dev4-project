import sqlite3
from flask import Flask, jsonify
from db import DB

app = Flask(__name__)
<<<<<<< HEAD:backend/server.py
def db_connection():
    conn = None
    try:
        conn = sqlite3.connect("./database/restaurant.db") 
    except sqlite3.error as e:
        print(e)
    return conn
=======

db_name = './database/restaurant.db'
>>>>>>> bf91ca7827031af0749384eab0bdf6203cd2ba90:backend/read_db.py


# routes
@app.route('/')
def index():
    return "Home"


# voorbeeld route
@app.route('/members')
def members():
    return {"members": ["Member 1", "Member 2", "Member 3"]}

@app.route('/menu')
def menu():
    conn = db_connection()
    qry = "SELECT * FROM menu"
    menukaart = DB.all(qry)
    return jsonify(menukaart)
  


@app.route('/home')
def home():
    return jsonify(msg='This is our home page')


@app.errorhandler(404)
def error():
    return 'Go back to our home'


if __name__ == "__main__":
    app.run(debug=True)

from flask import Flask, jsonify, request_finished, request_started, request
from flask_cors import CORS
from queries import (create_user, get_user, get_menu, get_staff, get_gallery, logout)
import sqlite3
from db import DB

app = Flask(__name__)
CORS(app)

db_name = './database/restaurant.db'

app.add_url_rule('/register', None, create_user, methods=["POST"])
app.add_url_rule('/menu', None, get_menu, methods=["GET"])
app.add_url_rule('/login', None, get_user, methods=["POST"])
app.add_url_rule('/gallery', None, get_gallery, methods=["GET"])
app.add_url_rule('/home', None, get_staff, methods=["GET"])
app.add_url_rule('/', None, get_staff, methods=["GET"])
app.add_url_rule('/logout', None, logout, methods=["GET"])


def check_login():
    if request.cookies["access_token"]:
        print(request)


def db_connection():
    conn = None
    try:
        conn = sqlite3.connect('./database/restaurant.db')
        print("Connected to the restaurant database")
    except sqlite3.error as e:
        print(e)
    return conn


@app.errorhandler(404)
def error(e):
    return jsonify({"message": "Not found"}), 404


@app.errorhandler(500)
def error(e):
    return jsonify({"message": "Internal server error"}), 500


if __name__ == "__main__":
    app.run(port=5000)
    app.run(debug=True)

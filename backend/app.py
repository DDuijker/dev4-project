from flask import Flask
from flask_cors import CORS
from database.db import DB
from resources.user import create_user

app = Flask(__name__)
CORS(app)

db_name = './database/restaurant.db'

app.add_url_rule('/register', None, create_user, methods=["POST"])

if __name__ == "__main__":
    app.run(port=5000)
    app.run(debug=True)

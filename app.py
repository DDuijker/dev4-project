from flask import Flask, jsonify, render_template

app = Flask(__name__)


@app.route('/')
def index():
    return 'Welcome to GitPub!'


@app.route('/home')
def home():
    return 'This is our home page'


@app.errorhandler(404)
def error404(e):
    return 'This page doesnt exist. Go to <a href="home">our home page</a>'

@app.errorhandler(5)
def error404(e):
    return 'Our server has an error. Go to <a href="home">our home page</a>'


app.run()

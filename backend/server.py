from flask import Flask, jsonify, render_template

app = Flask(__name__)


@app.route('/')
def index():
    return jsonify(msg='whote??', name='./')


@app.route('/home')
def home():
    return 'This is our home page'


app.run()

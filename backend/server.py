from flask import Flask, jsonify, render_template

app = Flask(__name__)


@app.route('/')
def index():
    return jsonify(msg='whote??', name='./')


# voorbeeld route
@app.route('/members')
def members():
    return {"members": ["Member 1", "Member 2", "Member 3"]}


@app.route('/home')
def home():
    return jsonify(msg='This is our home page')


@app.errorhandler(404)
def error():
    return 'Go back to our homepage'


if __name__ == "__main__":
    app.run(debug=True)

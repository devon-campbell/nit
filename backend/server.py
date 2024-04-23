from flask import Flask, send_file
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes


@app.route('/')
def hello():
    return 'Hello, World!'


@app.route('/dogs')
def dogs():
    return {"dogs": ["beagle", "labrador", "bulldog"]}


@app.route('/get-music')
def get_music():
    return send_file('../sheet_music/Test_Score4.musicxml', as_attachment=True)


if __name__ == '__main__':
    app.run(debug=True, port=8000)

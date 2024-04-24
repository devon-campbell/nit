from flask import Flask, send_file
from flask_cors import CORS
from random_note_gen import gen_n_notes

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
    # return send_file('../sheet_music/Test_Score4.musicxml', as_attachment=True)
    return send_file('../sheet_music/Test_Quiz1.musicxml', as_attachment=True)

@app.route('/gen_q5')
def gen_q5():
    # Call the function to generate 8 beats of random notes (with no 8th notes and no sharps)
    return send_file(gen_n_notes(8, False, False), as_attachment=True)


if __name__ == '__main__':
    app.run(debug=True, port=8000)

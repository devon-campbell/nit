from flask import Flask, send_file, request
from flask_cors import CORS
from random_note_gen import gen_n_notes
import os
import jsonify

app = Flask(__name__)
CORS(app)  # Adjust the path and origins as necessary


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

# Directory to save MusicXML files
MUSIC_XML_DIR = '../utils/user_notes/'

@app.route('/save-musicxml', methods=['POST'])
def save_musicxml():
    if not os.path.exists(MUSIC_XML_DIR):
        os.makedirs(MUSIC_XML_DIR)  # Create the directory if it doesn't exist
    xml_data = request.data.decode('utf-8')
    file_path = os.path.join(MUSIC_XML_DIR, 'user_music.xml')
    with open(file_path, 'w') as file:
        file.write(xml_data)
    return jsonify({'message': 'File saved successfully', 'file_path': file_path})


if __name__ == '__main__':
    app.run(debug=True, port=8000)

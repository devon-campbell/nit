from flask import Flask, send_file, request, jsonify
from flask_cors import CORS
from random_note_gen import gen_n_notes
from user_evaluation import compare_sheet_music_to_user_notes
import os 
import sys
import json

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

@app.route('/get-quiz-musicxml/<int:quiz_number>')
def get_quiz_musicxml(quiz_number):
    if quiz_number >= 1 and quiz_number <= 4:
        return send_file('../sheet_music/Test_Quiz1.musicxml', as_attachment=True)
    elif quiz_number == 5:
        return send_file(gen_n_notes(8, False, False), as_attachment=True)
    else:
        return "Invalid quiz number", 400

# Directory to save MusicXML files
MUSIC_XML_DIR = f'{os.getcwd()}/../frontend/src/utils/user_notes/'

@app.route('/save-musicxml', methods=['POST'])
def save_musicxml():
    if not os.path.exists(MUSIC_XML_DIR):
        os.makedirs(MUSIC_XML_DIR)  # Create the directory if it doesn't exist
    xml_data = request.data.decode('utf-8')
    file_path = os.path.join(MUSIC_XML_DIR, 'user_music.musicxml')
    try:
        with open(file_path, 'w') as file:
            file.write(xml_data)
    except Exception as e:
        app.logger.error(f"Error writing file: {e}")
        return jsonify({'message': 'Failed to save file', 'error': str(e)}), 500

    # Set CORS headers explicitly
    response = jsonify({'message': 'File saved successfully', 'file_path': file_path, 'xml_data':xml_data})
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    return response

@app.route('/evaluate-user-playing', methods=['POST'])
def evaluate_user_playing():
    """
        Evaluates the users playing by comparing the user's played notes with the notes from the
        musicXML file. 

        Returns a musicXML file denoting the notes the user played, with color annotations for
        the correctly and incorrectly played notes.
    """
    sheet_music_file = request.files['sheetMusic']
    sheet_music_content = sheet_music_file.read().decode('utf-8')
    print("Received MusicXML file content:", sheet_music_content)

    played_notes_file = request.files['playedNotes']
    played_notes_content = played_notes_file.read()
    played_notes_objects = json.loads(played_notes_content)
    print("Received played notes objects:", played_notes_objects)
    sys.stdout.flush()

    user_notes_annotated_as_xml = compare_sheet_music_to_user_notes(sheet_music_content, played_notes_objects)

    response_data = {
        'user_notes_annotated_as_xml': user_notes_annotated_as_xml
    }

    return jsonify(response_data)

if __name__ == '__main__':
    app.run(debug=True, port=8000)

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


@app.route('/get-quiz-musicxml/<int:quiz_number>')
def get_quiz_musicxml(quiz_number):
    notes_per_bar = 16  # Assuming each bar has 16 notes as a default
    longestNote = 'whole'
    if quiz_number == 1:
        return send_file(gen_n_notes(8, False, False, 'none', True), as_attachment=True)
    elif quiz_number == 2:
        return send_file(gen_n_notes(16, False, False, 'half', True), as_attachment=True)
    elif 3 <= quiz_number <= 4:
        return send_file('../sheet_music/Test_Quiz1.musicxml', as_attachment=True)
    elif quiz_number == 5:
        return send_file(gen_n_notes(8, False, False, 'whole', False), as_attachment=True)
    elif quiz_number == 999:
        bars = request.args.get('bars', default=1, type=int)  # Get 'bars' from query params
        longestNote = request.args.get('longestNote', default='whole', type=str)  # Get 'longestNote' from query params
        print(bars, longestNote)
        return send_file(gen_n_notes(notes_per_bar * bars, False, False, longestNote.lower(), False), as_attachment=True)
    else:
        return "Invalid quiz number", 400


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

    played_notes_file = request.files['playedNotes']
    played_notes_content = played_notes_file.read()
    played_notes_objects = json.loads(played_notes_content)

    user_notes_annotated_as_xml = compare_sheet_music_to_user_notes(sheet_music_content, played_notes_objects)

    response_data = {
        'user_notes_annotated_as_xml': user_notes_annotated_as_xml
    }

    return jsonify(response_data)

if __name__ == '__main__':
    app.run(debug=True, port=8000)

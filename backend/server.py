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
    if quiz_number == 1:
        return send_file(gen_n_notes(8, False, False, 'none', True, False), as_attachment=True)
    elif quiz_number == 2:
        return send_file(gen_n_notes(16, False, False, 'half', True, False), as_attachment=True)
    elif quiz_number == 3:
        return send_file(gen_n_notes(16, False, False, 'whole', True, False), as_attachment=True)
    elif quiz_number == 4:
        return send_file(gen_n_notes(16, True, False, 'whole', True, False), as_attachment=True)
    elif quiz_number == 5:
        return send_file(gen_n_notes(16, True, False, 'whole', True, False), as_attachment=True)
    elif quiz_number == 6:
        return send_file(gen_n_notes(8, False, False, 'none', False, True), as_attachment=True)
    elif quiz_number == 7:
        return send_file(gen_n_notes(16, True, False, 'none', False, False), as_attachment=True)
    else:
        return "Invalid quiz number", 400


# Route to get the example XML for Lesson 6
@app.route('/get-lesson-6-example')
def get_lesson_6_example():
    return send_file('../frontend/src/data/lesson6_example.musicxml', as_attachment=True)


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

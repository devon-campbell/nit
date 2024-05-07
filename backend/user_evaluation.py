from xml.etree import ElementTree as ET
import sys

def compare_sheet_music_to_user_notes(musicXML: str, user_notes: list):
    # Parse the musicXML file, extract a list of note dictionaries (name, type, divisions)
    root = ET.fromstring(musicXML)
    sheet_music_notes = []
    for measure in root.findall(".//measure"):
        for note_elem in measure.findall(".//note"):
            pitch = note_elem.find("pitch")
            step = pitch.find("step").text
            octave = pitch.find("octave").text
            note_type = note_elem.find("type").text

            if note_type == "eighth":
                divisions = 0.5
            elif note_type == "quarter":
                divisions = 1
            elif note_type == "half":
                divisions = 2
            elif note_type == "whole":
                divisions = 4

            note_name = f"{step}{octave}"
            note = {'name': note_name, 'type': note_type, 'divisions': divisions}
            sheet_music_notes.append(note)
    
    # Compare the sheet music notes to the user notes, adding 'color' key to each note object
    # based on whether the user played the note correctly, partially correctly, or incorrectly.
    user_notes_ptr = 0
    print("Sheet music notes: ", sheet_music_notes)

    for note in sheet_music_notes:
        curr_divisions = note['divisions']
        time_elapsed = 0

        while time_elapsed < note['divisions']:
            user_note = user_notes[user_notes_ptr]
            user_note_divisions = user_note['divisions']

            if user_note_divisions == curr_divisions:
                if user_note['name'] == note['name']:
                    user_note['color'] = 'green'
                else:
                    user_note['color'] = 'red'
            elif user_note_divisions < curr_divisions:
                if user_note['name'] == note['name']:
                    user_note['color'] = 'yellow'
                else:
                    user_note['color'] = 'red'
            else:
                note['color'] = 'red'

            time_elapsed += user_note_divisions
            user_notes_ptr += 1 # Move onto next note that user played

    for i in range(user_notes_ptr, len(user_notes)):
        user_notes[i]['color'] = 'red' # Extraneous notes played by user after the sheet music ended

    print("User notes with color: ", user_notes)
    sys.stdout.flush()

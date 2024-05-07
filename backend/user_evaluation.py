from xml.etree import ElementTree as ET
from music21 import stream, note as m21_note, clef, converter
from music21.musicxml import m21ToXml
import pickle
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

    # Write the rest of the function here: take the list of user notes and write them to a new musicXML file
    # Create a new stream for the user notes
    user_notes_stream = stream.Stream()
    treble_clef = clef.TrebleClef()
    user_notes_stream.append(treble_clef)  # Set treble clef
    
    # Add notes with colors to the user notes stream
    for user_note in user_notes:
        # Create a music21 Note object
        duration = user_note['divisions']
        name = user_note['name']
        note_obj = m21_note.Note(name)
        note_obj.duration.quarterLength = duration
        # Set the color attribute properly
        note_obj.style.color = user_note['color']  
        user_notes_stream.append(note_obj)
    
    # Convert the user notes stream into a MusicXML string
    user_notes_xml = m21ToXml.GeneralObjectExporter().parse(user_notes_stream).decode('utf-8')
    user_notes_xml = remove_extraneous_xml(user_notes_xml)
    print("User notes xml string: ", user_notes_xml)
    sys.stdout.flush()  

    return user_notes_xml

def remove_extraneous_xml(xml_string):
    '''
        Music21 Sometimes adds extraneous XML after the first occurrence of '</score-partwise>'
        This function removes any extraneous XML after the first occurrence of '</score-partwise>'

        Returns the original XML string if '</score-partwise>' is not found
    '''
    # Find the index of the first occurrence of '</score-partwise>'
    index = xml_string.find('</score-partwise>')
    
    # If '</score-partwise>' is found
    if index != -1:
        # Remove any extraneous XML after the first occurrence of '</score-partwise>'
        return xml_string[:index + len('</score-partwise>')]
    
    # If '</score-partwise>' is not found, return the original XML string
    return xml_string

    

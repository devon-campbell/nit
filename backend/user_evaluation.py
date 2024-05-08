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
                user_note['color'] = 'red'

            time_elapsed += user_note_divisions
            user_notes_ptr += 1  # Move onto the next note that the user played

    # If there are remaining user notes after the sheet music ends, mark them as red
    for i in range(user_notes_ptr, len(user_notes)):
        user_notes[i]['color'] = 'red'

    # Create a new stream for the user notes
    user_notes_stream = stream.Stream()
    treble_clef = clef.TrebleClef()
    user_notes_stream.append(treble_clef)  # Set treble clef
    
    # Add colored notes to a musicXML stream
    for user_note in user_notes:
        # Create a music21 Note object
        duration = user_note['divisions']
        name = user_note['name']
        note_obj = m21_note.Note(name)
        note_obj.duration.quarterLength = duration

        # Set the color attribute only for the note head
        noteColorHexCodes = {
            'red': '#f40c00',
            'green': '#008000',
            'yellow': '#fce205'
        }
        note_obj.style.color = noteColorHexCodes[user_note['color']] 
        user_notes_stream.append(note_obj)
    
    # Convert the user notes stream into a MusicXML string
    user_notes_xml = m21ToXml.GeneralObjectExporter().parse(user_notes_stream).decode('utf-8')
    user_notes_xml = remove_extraneous_xml(user_notes_xml) # Remove potentially extraneous XML at end of string
    user_notes_xml = remove_note_color_attribute(user_notes_xml) # Remove color from non-notehead parts of the note

    return user_notes_xml

def remove_extraneous_xml(xml_string):
    '''
    Remove any extraneous XML after the first occurrence of '</score-partwise>',
    and exclude lines starting with '<movement-title' and '<creator '. 

    <movement-title> and <creator> elements display the actual title and creator once the
    musicXML is passed into the sheetMusic element, and we don't want that.
    
    Also removes the <part-name /> element.

    Returns the modified XML string.
    '''
    # Find the index of the first occurrence of '</score-partwise>'
    index = xml_string.find('</score-partwise>')
    
    # If '</score-partwise>' is found
    if index != -1:
        # Remove any extraneous XML after the first occurrence of '</score-partwise>'
        modified_xml = xml_string[:index + len('</score-partwise>')]
        
        # Put the XML string into a list of lines
        xml_lines = modified_xml.split('\n')
        
        # Remove lines starting with '<movement-title' and '<creator '
        xml_lines = [line for line in xml_lines if not line.strip().startswith('<movement-title') and not line.strip().startswith('<creator ')]
        
        # Remove the <part-name /> element
        xml_lines = [line for line in xml_lines if not '<part-name />' in line]
        
        # Join the lines back together into the modified XML string
        modified_xml_string = '\n'.join(xml_lines)
        
        return modified_xml_string
    
    # If '</score-partwise>' is not found, return the original XML string
    return xml_string



def remove_note_color_attribute(xml_string):
    '''
        To date, Aaron does not know of any way to set the color of the note head in Music21.
        Specifying the note's style.color attribute changes the entire note's color, including the stem.

        This function removes the 'color' attribute from all <note> elements in the musicXML string, leaving 
        only the note head color unchanged (notehead color is specified in a different musicXML element.)

        It returns the modified XML string with the 'color' attribute removed.
    '''
    # Convert the musicXML string into a list of lines
    xml_lines = xml_string.split('\n')

    # Iterate through each line in the list
    for i, line in enumerate(xml_lines):
        # Find all <note> elements
        index_note = line.find('<note color=')
        if index_note != -1:
            xml_lines[i] = xml_lines[i][0: index_note + 5] + '>' # Remove color attribute from <note> element

    # Join the lines back together into the modified musicXML string
    modified_xml_string = '\n'.join(xml_lines)

    return modified_xml_string
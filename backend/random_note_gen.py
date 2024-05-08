import random
from music21 import stream, note, metadata, instrument, clef
from datetime import datetime
import xml.etree.ElementTree as ET

def gen_n_notes(total_duration, include_8th, include_sharps):
    notes_list = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4','B4','C5', 'D5', 'E5', 'F5'] 
    if include_sharps: 
        notes_list.extend(['C#4','D#4', 'F#4', 'G#4','A#4', 'C#5','D#5'] )    
    
    durations_list = [4, 2, 1]  # Whole, Half, Quarter notes
    paired_durations = [0.5]  # Eighth 

    s = stream.Stream()
    treble_clef = clef.TrebleClef()
    s.append(treble_clef) # Set treble clef

    s.metadata = metadata.Metadata()
    s.metadata.title = ''
    s.metadata.composer = ''

    current_duration = 0
    paired_duration_used = 0

    while current_duration < total_duration:
        # Include 8th notes
        if include_8th:
            # Update possible durations based on the limit for paired durations
            if paired_duration_used < total_duration / 4:
                possible_durations = durations_list + [d for d in paired_durations if (total_duration - current_duration) - 2*d >= 0 and paired_duration_used + 2*d <= total_duration / 2]
            else:
                possible_durations = [d for d in durations_list if d <= total_duration - current_duration]

            if not possible_durations:
                break  # Break if no possible durations fit the remaining duration

            random_duration = random.choice(possible_durations)
            if random_duration in paired_durations:
                # If the selected duration requires a pair, generate two notes
                for _ in range(2):
                    random_note_name = random.choice(notes_list)
                    new_note = note.Note(random_note_name, quarterLength=random_duration)
                    s.append(new_note)
                current_duration += 2 * random_duration
                paired_duration_used += 2 * random_duration  # Update the paired duration used
            else:
                random_note_name = random.choice(notes_list)
                new_note = note.Note(random_note_name, quarterLength=random_duration)
                s.append(new_note)
                current_duration += random_duration
        # Only half, whole, quarter
        else:
            possible_durations = [d for d in durations_list if d <= total_duration - current_duration]

            if not possible_durations:
                break  

            random_duration = random.choice(possible_durations)
            random_note_name = random.choice(notes_list)
            new_note = note.Note(random_note_name, quarterLength=random_duration)
            s.append(new_note)
            current_duration += random_duration

    # Adjust the file path and name as necessary
    fp = f'./random_notes/random_notes_{datetime.now().strftime("%Y-%m-%d_%H-%M-%S")}.musicxml'
    s.write('musicxml', fp=fp, storeMetadata=False)

    '''
        SOMETIMES MUSIC21 GENERATES A SCORE WITH EXTRANEOUS CONTENT AFTER THE CLOSING </score-partwise> TAG
        THE FOLLOWING CODE REMOVES ANY EXTRA CONTENT AFTER THE CLOSING TAG!
    '''
    # Read the generated MusicXML file to remove any extra content 
    with open(fp, 'r') as f:
        musicxml_content = f.read()
    
    # Remove any extra content after the closing </score-partwise> tag
    index = musicxml_content.find('</score-partwise>') + len('</score-partwise>')
    musicxml_content = musicxml_content[:index]
    
    # Write the modified MusicXML content back to the file
    with open(fp, 'w') as f:
        f.write(musicxml_content)

    return fp

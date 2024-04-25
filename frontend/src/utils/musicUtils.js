// src/utils/musicUtils.js

/**
 * Calculates the musical duration based on the duration in milliseconds and BPM.
 * Returns both the type of note (e.g., quarter, whole) and the numeric duration in divisions.
 * Assumes 1 quarter note = 1 division for simplicity, adjust if using different division settings.
 */
export function calculateNoteDuration(durationMs, bpm) {
    const beatsPerSecond = bpm / 60;
    const durationInSeconds = durationMs / 1000;
    const durationInBeats = durationInSeconds * beatsPerSecond;
  
    if (durationInBeats >= 3.5) { // Adjust threshold as needed for more accuracy
      return { type: 'whole', divisions: 4 };
    } else if (durationInBeats >= 1.75) {
      return { type: 'half', divisions: 2 };
    } else if (durationInBeats >= 0.875) {
      return { type: 'quarter', divisions: 1 };
    } else {
      return { type: 'eighth', divisions: 0.5 };
    }
  }
  
  /**
   * Generates MusicXML string from an array of notes.
   */
  export function createMusicXML(notes) {
    let xml = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
  <!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 3.1 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">
  <score-partwise version="3.1">
    <part-list>
      <score-part id="P1">
        <part-name>Piano</part-name>
      </score-part>
    </part-list>
    <part id="P1">`;
  
    xml += `<measure number="1">`; // Simplified example with one measure
  
    for (let note of notes) {
      let { type, divisions } = calculateNoteDuration(note.duration, note.bpm);
      xml += `
        <note>
          <pitch>
            <step>${note.name[0]}</step>
            <octave>${note.name.slice(-1)}</octave>
          </pitch>
          <duration>${divisions}</duration>
          <type>${type}</type>
        </note>`;
    }
  
    xml += `</measure></part></score-partwise>`;
    return xml;
  }
  
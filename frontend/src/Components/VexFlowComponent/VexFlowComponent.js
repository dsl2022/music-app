import React, { useRef, useEffect, useState } from 'react';
import { Renderer, Stave, StaveNote, Voice, Formatter, BarNote } from 'vexflow';

const VexFlowComponent = () => {
  const containerRef = useRef(null);
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState('c/4');
  const [selectedDuration, setSelectedDuration] = useState('q');
  const [selectedType, setSelectedType] = useState('note'); // 'note' or 'rest'
  const [timeSignature, setTimeSignature] = useState('4/4');

  const noteOptions = [
    // Octave 2
    { value: 'c/2', label: 'C2' },
    { value: 'd/2', label: 'D2' },
    { value: 'e/2', label: 'E2' },
    { value: 'f/2', label: 'F2' },
    { value: 'g/2', label: 'G2' },
    { value: 'a/2', label: 'A2' },
    { value: 'b/2', label: 'B2' },
    // Octave 3
    { value: 'c/3', label: 'C3' },
    { value: 'd/3', label: 'D3' },
    { value: 'e/3', label: 'E3' },
    { value: 'f/3', label: 'F3' },
    { value: 'g/3', label: 'G3' },
    { value: 'a/3', label: 'A3' },
    { value: 'b/3', label: 'B3' },
    // Octave 4
    { value: 'c/4', label: 'C4' },
    { value: 'd/4', label: 'D4' },
    { value: 'e/4', label: 'E4' },
    { value: 'f/4', label: 'F4' },
    { value: 'g/4', label: 'G4' },
    { value: 'a/4', label: 'A4' },
    { value: 'b/4', label: 'B4' },
    // Octave 5
    { value: 'c/5', label: 'C5' },
    { value: 'd/5', label: 'D5' },
    { value: 'e/5', label: 'E5' },
    { value: 'f/5', label: 'F5' },
    { value: 'g/5', label: 'G5' },
    { value: 'a/5', label: 'A5' },
    { value: 'b/5', label: 'B5' },
    // Octave 6
    { value: 'c/6', label: 'C6' },
    { value: 'd/6', label: 'D6' },
    { value: 'e/6', label: 'E6' },
    { value: 'f/6', label: 'F6' },
    { value: 'g/6', label: 'G6' },
    { value: 'a/6', label: 'A6' },
    { value: 'b/6', label: 'B6' }
  ];

  const durationOptions = [
    { value: 'w', label: 'Whole Note' },
    { value: 'h', label: 'Half Note' },
    { value: 'q', label: 'Quarter Note' },
    { value: '8', label: 'Eighth Note' },
    { value: '16', label: 'Sixteenth Note' }
  ];

  const timeSignatureOptions = [
    { value: '4/4', label: '4/4', beatsPerMeasure: 4, beatValue: 4 },
    { value: '3/4', label: '3/4', beatsPerMeasure: 3, beatValue: 4 },
    { value: '2/4', label: '2/4', beatsPerMeasure: 2, beatValue: 4 },
    { value: '6/8', label: '6/8', beatsPerMeasure: 6, beatValue: 8 },
    { value: '9/8', label: '9/8', beatsPerMeasure: 9, beatValue: 8 },
    { value: '12/8', label: '12/8', beatsPerMeasure: 12, beatValue: 8 }
  ];

  const getCurrentTimeSignature = () => {
    return timeSignatureOptions.find(ts => ts.value === timeSignature) || timeSignatureOptions[0];
  };

  const getBeatValue = (duration) => {
    const baseDuration = duration.replace('r', ''); // Remove 'r' for rests
    const beatValues = { 'w': 4, 'h': 2, 'q': 1, '8': 0.5, '16': 0.25 };
    return beatValues[baseDuration] || 1;
  };

  const addNote = () => {
    const newNote = {
      keys: selectedType === 'rest' ? ['d/4'] : [selectedNote],
      duration: selectedType === 'rest' ? selectedDuration + 'r' : selectedDuration,
      isRest: selectedType === 'rest'
    };
    setNotes([...notes, newNote]);
  };

  const clearNotes = () => {
    setNotes([]);
  };

  const removeNote = (indexToRemove) => {
    setNotes(notes.filter((_, index) => index !== indexToRemove));
  };

  const renderStaff = () => {
    if (!containerRef.current) return;

    // Clear previous rendering
    containerRef.current.innerHTML = '';

    const renderer = new Renderer(containerRef.current, Renderer.Backends.SVG);
    const currentTS = getCurrentTimeSignature();
    
    console.log('Current time signature:', timeSignature, currentTS);
    
    // Simple beat calculation - always use quarter note as base unit
    const totalBeats = notes.reduce((sum, note) => {
      return sum + getBeatValue(note.duration);
    }, 0);
    
    console.log('Total beats:', totalBeats);
    
    // Calculate beats per measure in quarter note units
    let quarterNotesPerMeasure;
    if (currentTS.beatValue === 4) {
      quarterNotesPerMeasure = currentTS.beatsPerMeasure;
    } else if (currentTS.beatValue === 8) {
      quarterNotesPerMeasure = currentTS.beatsPerMeasure / 2;
    } else {
      quarterNotesPerMeasure = currentTS.beatsPerMeasure;
    }
    
    console.log('Quarter notes per measure:', quarterNotesPerMeasure);
    
    const measuresNeeded = Math.max(1, Math.ceil(totalBeats / quarterNotesPerMeasure) || 1);
    console.log('Measures needed:', measuresNeeded);
    
    const staveWidth = 400;
    const totalWidth = staveWidth * measuresNeeded + 50;
    
    renderer.resize(totalWidth, 200);
    const context = renderer.getContext();

    // Create staves (measures)
    const staves = [];
    for (let i = 0; i < measuresNeeded; i++) {
      const stave = new Stave(10 + (i * staveWidth), 40, staveWidth);
      
      // Add clef and time signature only to first stave
      if (i === 0) {
        stave.addClef('treble').addTimeSignature(timeSignature);
      }
      
      stave.setContext(context).draw();
      staves.push(stave);
    }

    console.log('Notes to render:', notes);

    // Only render notes if there are any
    if (notes.length > 0) {
      try {
        // Create VexFlow notes
        const vexFlowNotes = notes.map(note => 
          new StaveNote({ clef: 'treble', keys: note.keys, duration: note.duration })
        );

        console.log('VexFlow notes created:', vexFlowNotes.length);

        // Use the same logic for ALL time signatures (not just 4/4)
        const measures = [];
        let currentMeasure = [];
        let currentBeats = 0;

        for (let note of vexFlowNotes) {
          const noteBeats = getBeatValue(note.duration);
          
          if (currentBeats + noteBeats > quarterNotesPerMeasure && currentMeasure.length > 0) {
            const remainingBeats = quarterNotesPerMeasure - currentBeats;
            if (remainingBeats > 0) {
              currentMeasure.push(...createRests(remainingBeats));
            }
            
            measures.push([...currentMeasure]);
            currentMeasure = [note];
            currentBeats = noteBeats;
          } else {
            currentMeasure.push(note);
            currentBeats += noteBeats;
          }
        }
        
        if (currentMeasure.length > 0) {
          const remainingBeats = quarterNotesPerMeasure - currentBeats;
          if (remainingBeats > 0) {
            currentMeasure.push(...createRests(remainingBeats));
          }
          measures.push(currentMeasure);
        }

        console.log('Measures created:', measures.length);
        console.log('First measure contents:', measures[0]?.length);

        measures.forEach((measureNotes, index) => {
          if (measureNotes.length > 0 && staves[index]) {
            try {
              // Always use 4/4 voice settings regardless of time signature
              // This is a workaround for VexFlow's time signature handling
              const voice = new Voice({ 
                num_beats: 4, 
                beat_value: 4 
              });
              voice.addTickables(measureNotes);
              
              new Formatter().joinVoices([voice]).format([voice], staveWidth - 20);
              voice.draw(context, staves[index]);
              
              console.log(`Measure ${index + 1} rendered successfully`);
            } catch (error) {
              console.error(`Error rendering measure ${index + 1}:`, error);
            }
          }
        });
      } catch (error) {
        console.error('Error rendering notes:', error);
        console.log('Time signature:', timeSignature);
        console.log('Notes:', notes);
      }
    }
  };

  // Helper function to create rest notes
  const createRests = (beats) => {
    const rests = [];
    let remaining = beats;
    
    while (remaining > 0.01) {
      if (remaining >= 4) {
        rests.push(new StaveNote({ clef: 'treble', keys: ['d/4'], duration: 'wr' }));
        remaining -= 4;
      } else if (remaining >= 2) {
        rests.push(new StaveNote({ clef: 'treble', keys: ['d/4'], duration: 'hr' }));
        remaining -= 2;
      } else if (remaining >= 1) {
        rests.push(new StaveNote({ clef: 'treble', keys: ['d/4'], duration: 'qr' }));
        remaining -= 1;
      } else if (remaining >= 0.5) {
        rests.push(new StaveNote({ clef: 'treble', keys: ['d/4'], duration: '8r' }));
        remaining -= 0.5;
      } else if (remaining >= 0.25) {
        rests.push(new StaveNote({ clef: 'treble', keys: ['d/4'], duration: '16r' }));
        remaining -= 0.25;
      } else {
        break;
      }
    }
    
    return rests;
  };

  useEffect(() => {
    renderStaff();
  }, [notes, timeSignature]);

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>Time Signature: </label>
          <select 
            value={timeSignature} 
            onChange={(e) => setTimeSignature(e.target.value)}
            style={{ marginRight: '20px' }}
          >
            {timeSignatureOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <label>Type: </label>
          <select 
            value={selectedType} 
            onChange={(e) => setSelectedType(e.target.value)}
            style={{ marginRight: '20px' }}
          >
            <option value="note">Note</option>
            <option value="rest">Rest</option>
          </select>
          
          {selectedType === 'note' && (
            <>
              <label>Select Note: </label>
              <select 
                value={selectedNote} 
                onChange={(e) => setSelectedNote(e.target.value)}
                style={{ marginRight: '20px' }}
              >
                {noteOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </>
          )}
          
          <label>Select Duration: </label>
          <select 
            value={selectedDuration} 
            onChange={(e) => setSelectedDuration(e.target.value)}
          >
            {durationOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <button 
          onClick={addNote}
          style={{ 
            marginRight: '10px', 
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Add {selectedType === 'rest' ? 'Rest' : 'Note'}
        </button>
        
        <button 
          onClick={clearNotes}
          style={{ 
            padding: '8px 16px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Clear All Notes
        </button>
        
        <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
          Total notes: {notes.length} | Time signature: {timeSignature}
        </div>

        {notes.length > 0 && (
          <div style={{ marginTop: '15px' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Added Notes/Rests:</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {notes.map((note, index) => (
                <div 
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #dee2e6',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    fontSize: '12px'
                  }}
                >
                  <span style={{ marginRight: '6px' }}>
                    {note.isRest ? `Rest (${note.duration.replace('r', '')})` : `${note.keys[0].toUpperCase()} (${note.duration})`}
                  </span>
                  <button
                    onClick={() => removeNote(index)}
                    style={{
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '3px',
                      padding: '2px 6px',
                      cursor: 'pointer',
                      fontSize: '10px'
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div ref={containerRef}></div>
    </div>
  );
};

export default VexFlowComponent;
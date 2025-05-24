import React, { useRef, useEffect, useState } from 'react';
import { Renderer, Stave, StaveNote, Voice, Formatter } from 'vexflow';

const VexFlowComponent = ({ notes }) => {
  
  const containerRef = useRef(null);
  const [newProcessNotes, setNewProcessNotes] = useState([]);
  const [hasRendered, setHasRendered] = useState(false);
  
  useEffect(() => {
    // Collect all new StaveNotes into an array
    const processedNotes = notes.map(note => new StaveNote(note));
    setNewProcessNotes(processedNotes);
  }, [notes]); // Trigger this effect when notes prop changes

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = ''; // Clear the container before re-render
    }

    // Render the notes to the canvas
    const renderer = new Renderer(containerRef.current, Renderer.Backends.SVG);
    renderer.resize(500, 200);
    const context = renderer.getContext();
    const stave = new Stave(10, 40, 400);
    // challenge 2, try to monitor number of measures and add new treble clef accordingly
    stave.addClef('treble').addTimeSignature('4/4');
    stave.setContext(context).draw();

    if (newProcessNotes.length > 0) {
      const voice = new Voice({ num_beats: 4, beat_value: 4 }).setStrict(false);
      voice.addTickables(newProcessNotes);
      new Formatter().joinVoices([voice]).format([voice], 400);
      voice.draw(context, stave);
    }
    setHasRendered(true); // After rendering, set this to true to indicate that it has rendered
  }, [newProcessNotes]); // Trigger this effect when newProcessNotes state changes

  return <div ref={containerRef}></div>;
};

export default VexFlowComponent;

import React, { useRef, useEffect } from 'react';
import { Renderer, Stave, StaveNote, Voice, Formatter } from 'vexflow';

const VexFlowComponent = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const renderer = new Renderer(containerRef.current, Renderer.Backends.SVG);
    renderer.resize(500, 200);
    const context = renderer.getContext();
    const stave = new Stave(10, 40, 400);
    stave.addClef('treble').addTimeSignature('4/4');
    stave.setContext(context).draw();

    const notes = [
      new StaveNote({ clef: 'treble', keys: ['c/4'], duration: 'q' }),
      new StaveNote({ clef: 'treble', keys: ['d/4'], duration: 'q' }),
      new StaveNote({ clef: 'treble', keys: ['e/4'], duration: 'q' }),
      new StaveNote({ clef: 'treble', keys: ['f/4'], duration: 'q' }),
    ];

    const voice = new Voice({ num_beats: 4, beat_value: 4 });
    voice.addTickables(notes);
    new Formatter().joinVoices([voice]).format([voice], 400);
    voice.draw(context, stave);
  }, []);

  return <div ref={containerRef}></div>;
};

export default VexFlowComponent;
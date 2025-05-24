import React,{useState} from 'react';
import './App.css';
// import ButtonComponent from './Components/Button/ButtonComponent';
import VexFlowComponent from './Components/Button/VexFlowComponent';
function App() {
  const [notes,setNotes]=useState([]);
  // starter code for challenge 1
  // const [nameOfNote,setNameOfNote] = useState('')
    function addNote(){
      const newNote = { clef: 'treble', keys: ['c/4'], duration: 'q' }
      setNotes(notes => [...notes, newNote]);
    }
  return (
    <div className="App">
      {notes.length}
      <h1>Music Notation App</h1>
      {/* <ButtonComponent /> */}
      <button onClick={addNote}>Add note</button>
      {/* <input/> */}
      <VexFlowComponent notes = {notes}/> 
    </div>
  );
}

export default App;
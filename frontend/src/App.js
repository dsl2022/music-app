import React from 'react';
import './App.css';
import ButtonComponent from './Components/Button/ButtonComponent';
import VexFlowComponent from './Components/Button/VexFlowComponent';
function App() {
  return (
    <div className="App">
      <h1>Music Notation App</h1> {/* Optional heading */}
      {/* <ButtonComponent /> */}
      <VexFlowComponent /> 
    </div>
  );
}

export default App;
import React, { useState } from 'react';
import VexFlowComponent from './VexFlowComponent';
function ButtonComponent() {
  const [name, setName] = useState('');
  const [submittedName, setSubmittedName] = useState('');
  const [step, setStep] = useState(1);
  const [projectName, setProjectName] = useState('');
  const [finalProjectName, setFinalProjectName] = useState('');
  const [notationType, setNotationType] = useState('');

  const handleNameSubmit = () => {
    setSubmittedName(name);
    setStep(2);
  };

  const handleProjectSubmit = () => {
    setFinalProjectName(projectName);
    setStep(3);
  };

  const handleNotationSelect = (type) => {
    setNotationType(type);
    setStep(5);
  };

  return (
    <div>
      {step === 1 && (
        <div>
          <h2>Enter your name:</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
          <button onClick={handleNameSubmit}>Submit</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Hello, {submittedName}!</h2>
          <p>What do you want to name your project?</p>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Project name"
          />
          <button onClick={handleProjectSubmit}>Next</button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2>Great!</h2>
          <p>
            {submittedName}, your project is called <strong>{finalProjectName}</strong>.
          </p>
          <button onClick={() => setStep(4)}>Next</button>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2>Choose a notation type for your project:</h2>
          <button onClick={() => handleNotationSelect('Music Staff')}>
            Music Staff
          </button>
          <button onClick={() => handleNotationSelect('Tablature')}>
            Tablature
          </button>
        </div>
      )}

      {step === 5 && notationType === 'Music Staff' && (
        <div>
          <h2>Music Staff Notation</h2>
          <VexFlowComponent />
        </div>
      )}

      {step === 5 && notationType === 'Tablature' && (
        <div>
          <h2>Guitar Tablature (coming soon!)</h2>
        </div>
      )}
    </div>
  );
}

export default ButtonComponent;
// 5/19 revision:

import React, { useState } from 'react';

function ButtonComponent() {
  const [name, setName] = useState('');
  const [submittedName, setSubmittedName] = useState('');
  const [step, setStep] = useState(1); // Controls which screen to show
  const [projectName, setProjectName] = useState('');
  const [finalProjectName, setFinalProjectName] = useState('');

  const handleNameSubmit = () => {
    setSubmittedName(name);
    setStep(2); // Go to next step: project naming
  };

  const handleProjectSubmit = () => {
    setFinalProjectName(projectName);
    setStep(3); // Optional: step 3 could be a summary or next feature
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
          <p>{submittedName}, your project is called <strong>{finalProjectName}</strong>.</p>
          {/* Here you can add more steps later */}
        </div>
      )}
    </div>
  );
}

export default ButtonComponent;


/* 5/18 revision:

import React, { useState } from 'react';

function ButtonComponent() {
  const [name, setName] = useState('');
  const [submittedName, setSubmittedName] = useState('');

  const handleInputChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = () => {
    setSubmittedName(name);
  };

  return (
    <div>
      <h2>Enter your name:</h2>
      <input
        type="text"
        value={name}
        onChange={handleInputChange}
        placeholder="Your name"
      />
      <button onClick={handleSubmit}>Submit</button>

      {submittedName && (
        <p>Hello, {submittedName}!</p>
      )}
    </div>
  );
}

export default ButtonComponent;
*/


/* original code, 5/17: 

import React from 'react';

function ButtonComponent() {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div>
      <button onClick={handleClick}>Submit</button>
    </div>
  );
}

export default ButtonComponent;
*/
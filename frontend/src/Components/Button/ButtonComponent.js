//new code:

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

/* original code: import React from 'react';

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
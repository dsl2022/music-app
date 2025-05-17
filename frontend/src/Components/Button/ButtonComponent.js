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

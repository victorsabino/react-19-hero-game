import React from 'react';

const Concepts = ({ positions }) => {
  return (
    <>
      {positions.map((pos, index) => (
        <span key={index} className="concept" style={{ gridRow: pos[1] + 1, gridColumn: pos[0] + 1 }}>
          📜
        </span>
      ))}
    </>
  );
};

export default Concepts;

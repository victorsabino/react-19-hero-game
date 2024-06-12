import React from 'react';

const Enemies = ({ positions, symbols }) => {
  return (
    <>
      {positions.map((pos, index) => (
        <span key={index} className="enemy" style={{ gridRow: pos[1] + 1, gridColumn: pos[0] + 1 }}>
          {symbols[index % symbols.length]}
        </span>
      ))}
    </>
  );
};

export default Enemies;

import React from 'react';

const Items = ({ positions }) => {
  return (
    <>
      {positions.map((pos, index) => (
        <span key={index} className="item" style={{ gridRow: pos[1] + 1, gridColumn: pos[0] + 1 }}>
          🔹
        </span>
      ))}
    </>
  );
};

export default Items;

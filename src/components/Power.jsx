import React from 'react';

const Power = ({ effectArea, effectSymbol }) => {
  return (
    <>
      {effectArea.map((pos, index) => (
        <span key={index} className="power" style={{ gridRow: pos[1] + 1, gridColumn: pos[0] + 1 }}>
          {effectSymbol}
        </span>
      ))}
    </>
  );
};

export default Power;

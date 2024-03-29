import React from 'react';
import Range from '../../components/Range';

const Exercise2 = () => {
  return (
    <div>
      <Range fixedRange className="slider" onChange={() => null} type="range" value={20} min={0} max={100} />
    </div>
  );
};

export default Exercise2;
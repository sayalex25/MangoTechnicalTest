import React from 'react';
import Range from '../../components/Range';

const exercise1 = () => {
  return (
    <div>
      <Range className="slider" onChange={() => null} type="range" value={20} min={0} max={100} />
    </div>
  );
};

export default exercise1;
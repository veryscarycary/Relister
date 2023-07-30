import React from 'react';

const SegmentedControl = ({ className, mode, setMode }) => {
  return (
    <div className={`segmented-control ${className}`}>
      <input
        type="radio"
        name="mode"
        id="both"
        checked={mode === 'both'}
        onChange={() => setMode('both')}
      />
      <label htmlFor="both">Both</label>

      <input
        type="radio"
        name="mode"
        id="fbm"
        checked={mode === 'fbm'}
        onChange={() => setMode('fbm')}
      />
      <label htmlFor="fbm">FBM</label>

      <input
        type="radio"
        name="mode"
        id="cl"
        checked={mode === 'cl'}
        onChange={() => setMode('cl')}
      />
      <label htmlFor="cl">CL</label>
    </div>
  );
};

export default SegmentedControl;
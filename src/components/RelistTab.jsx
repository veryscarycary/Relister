import React from 'react';

import { useState } from 'react';

import SegmentedControl from './SegmentedControl.jsx';
import InputField from './InputField.jsx';

import { relistActivePostings } from '../appHelpers.js';

const RelistTab = () => {
  const [priceDrop, setPriceDrop] = useState('');
  const [selectedApp, setSelectedApp] = useState('both');
  const [loading, setLoading] = useState(false);

  return (
    <div className="form-section tab-section">
      <SegmentedControl
        className="mb-32"
        mode={selectedApp}
        setMode={setSelectedApp}
      />

      <div className="form-section layout-row layout-align-center-end">
        <InputField
          className="mr-32"
          label="Price Drop"
          value={priceDrop}
          setValue={setPriceDrop}
        />
        <button
          className={`button-primary ${loading ? 'loading' : ''}`}
          onClick={async () => {
            setLoading(true);
            await relistActivePostings(priceDrop, selectedApp);
            setTimeout(() => setLoading(false), 30000); // poor mans await
          }}
        >
          <span className="button-text">Relist Active Postings</span>
        </button>
      </div>
    </div>
  );
};

export default RelistTab;
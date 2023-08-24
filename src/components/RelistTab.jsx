import React from 'react';

import { useState } from 'react';

import SegmentedControl from './SegmentedControl.jsx';
import InputField from './InputField.jsx';

import { relistActivePostings } from '../appHelpers.js';

const RelistTab = ({
  selectedApp,
  setSelectedApp,
  loading,
  setLoading,
  setIsModalOpen,
  setErrorCL,
  setErrorFB,
}) => {
  const [priceDrop, setPriceDrop] = useState('');

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
            setIsModalOpen(true);
            setLoading(true);
            try {
              const response = await relistActivePostings(
                priceDrop,
                selectedApp
              );
              console.log(`RESPONSE: ${response}`);
            } catch (e) {
              if (e.message.includes('cl:')) setErrorCL(e.message);
              if (e.message.includes('fb:')) setErrorFB(e.message);
              console.log(`ERROR during relisting: ${e}`);
            }
            setLoading(false);
          }}
          disabled={loading}
        >
          <span className="button-text">Relist Active Postings</span>
        </button>
      </div>
    </div>
  );
};

export default RelistTab;
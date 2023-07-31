import React from 'react';
import { useState } from 'react';

import InputField from './InputField.jsx';

const Settings = () => {
  const [credentialsFB, setCredentialsFB] = useState({}});
  const [credentialsCL, setCredentialsCL] = useState({});

  return (
    <section className="main-section form-section layout-row layout-align-center">
      <div className="login-container ">
        <h3 className="mb-16 text-align-left">Facebook</h3>
        <InputField label="Facebook Username" />
        <InputField label="Facebook Password" />
        <div className="layout-row layout-align-end-end">
          <button
            className="button-primary mt-16"
            onClick={() => window.scratchpad.saveCredentialsFB(credentialsFB)}
          >
            Save
          </button>
        </div>

        <h3 className="mb-16 mt-24 text-align-left">Craigslist</h3>
        <InputField label="Craigslist Username" />
        <InputField label="Craigslist Password" />
        <div className="layout-row layout-align-end-end">
          <button
            className="button-primary mt-16"
            onClick={() => window.scratchpad.saveCredentialsCL(credentialsCL)}
          >
            Save
          </button>
        </div>
      </div>
    </section>
  );
};

export default Settings;

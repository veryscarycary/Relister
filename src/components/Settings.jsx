import React from 'react';
import { useState } from 'react';

import InputField from './InputField.jsx';

const Settings = () => {
  const [usernameFB, setUsernameFB] = useState('');
  const [passwordFB, setPasswordFB] = useState('');
  const [usernameCL, setUsernameCL] = useState('');
  const [passwordCL, setPasswordCL] = useState('');
  const [wasSavedFB, setWasSavedFB] = useState(false);
  const [wasSavedCL, setWasSavedCL] = useState(false);

  return (
    <section className="main-section form-section layout-row layout-align-center">
      <div className="login-container ">
        <h3 className="mb-16 text-align-left">Facebook</h3>
        <InputField
          label="Facebook Username"
          value={usernameFB}
          setValue={setUsernameFB}
        />
        <InputField
          label="Facebook Password"
          value={passwordFB}
          setValue={setPasswordFB}
          type="password"
        />
        <div className="layout-row layout-align-end-end">
          <button
            className={`button-primary mt-16 ${wasSavedFB ? 'checked' : ''}`}
            onClick={async () => {
              window.scratchpad.saveCredentialsFB({
                username: usernameFB,
                password: passwordFB,
              });
              setWasSavedFB(true);
            }}
          >
            <span className="button-text">Save</span>
          </button>
        </div>

        <h3 className="mb-16 mt-24 text-align-left">Craigslist</h3>
        <InputField
          label="Craigslist Username"
          value={usernameCL}
          setValue={setUsernameCL}
        />
        <InputField
          label="Craigslist Password"
          value={passwordCL}
          setValue={setPasswordCL}
          type="password"
        />
        <div className="layout-row layout-align-end-end">
          <button
            className={`button-primary mt-16 ${wasSavedCL ? 'checked' : ''}`}
            onClick={async () => {
              window.scratchpad.saveCredentialsCL({
                username: usernameCL,
                password: passwordCL,
              });
              setWasSavedCL(true);
            }}
          >
            <span className="button-text">Save</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Settings;

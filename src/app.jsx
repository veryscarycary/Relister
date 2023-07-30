import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { useState } from 'react';

import CreateTab from './components/CreateTab.jsx';
import RelistTab from './components/RelistTab.jsx';
import Settings from './components/Settings.jsx';

const App = () => {
  const [selectedTab, setSelectedTab] = useState('create');
  const [isSettingsSelected, setIsSettingSelected] = useState(false);

  return (
    <>
      <div className="relister-body">
        <div className="heading mb-24">
          {isSettingsSelected && (
            <button
              onClick={() => setIsSettingSelected(false)}
              className="button-back"
            >
              <span className="fa fa-arrow-left"></span>
            </button>
          )}
          <h1>Relister</h1>
          <button
            onClick={() => setIsSettingSelected(true)}
            className="button-settings"
          >
            <span className="fa fa-gear"></span>
          </button>
        </div>

        {isSettingsSelected ? (
          <Settings />
        ) : (
          <div className="pc-tab">
            <input
              className="tab-input"
              id="tab1"
              type="radio"
              name="pct"
              checked={selectedTab === 'create'}
              onChange={() => setSelectedTab('create')}
            />
            <input
              className="tab-input"
              id="tab2"
              type="radio"
              name="pct"
              checked={selectedTab === 'relist'}
              onChange={() => setSelectedTab('relist')}
            />
            <nav>
              <ul>
                <li
                  className={`tab-li ${
                    selectedTab === 'create' ? 'selected' : ''
                  }`}
                >
                  <label htmlFor="tab1">Create New Posting</label>
                </li>
                <li
                  className={`tab-li ${
                    selectedTab === 'relist' ? 'selected' : ''
                  }`}
                >
                  <label htmlFor="tab2">Relist</label>
                </li>
              </ul>
            </nav>
            <section id="main-section">
              {selectedTab === 'create' && <CreateTab />}
              {selectedTab === 'relist' && <RelistTab />}
            </section>
          </div>
        )}
      </div>
    </>
  );
};

(async () => {
  ReactDOM.render(<App />, document.getElementById('app'));
})();

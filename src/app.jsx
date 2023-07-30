import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { useState } from 'react';

import CreateTab from './components/CreateTab.jsx';
import RelistTab from './components/RelistTab.jsx';

const App = () => {
  const [selectedTab, setSelectedTab] = useState('create');

  return (
    <>
      <div>
        <h1 className="mt-24 mb-24">Relister</h1>

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
          <section>
            {selectedTab === 'create' && (
              <CreateTab />
            )}
            {selectedTab === 'relist' && (
              <RelistTab />
            )}
          </section>
        </div>
      </div>
    </>
  );
};

(async () => {
  ReactDOM.render(<App />, document.body);
})();

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { useState } from 'react';

const clCategories = [
  'antiques',
  'appliances',
  'arts & crafts',
  'atvs, utvs, snowmobiles',
  'auto parts',
  'auto wheels & tires',
  'aviation',
  'baby & kid stuff',
  'barter',
  'bicycle parts',
  'bicycles',
  'boat parts',
  'boats',
  'books & magazines',
  'business/commercial',
  'cars & trucks',
  'cds / dvds / vhs',
  'cell phones',
  'clothing & accessories',
  'collectibles',
  'computer parts',
  'computers',
  'electronics',
  'farm & garden',
  'free stuff',
  'furniture',
  'garage & moving sales',
  'general for sale',
  'health and beauty',
  'heavy equipment',
  'household items',
  'jewelry',
  'materials',
  'motorcycle parts',
  'motorcycles/scooters',
  'musical instruments',
  'photo/video',
  'rvs',
  'sporting goods',
  'tickets',
  'tools',
  'toys & games',
  'trailers',
  'video gaming',
  'wanted',
];

const clConditions = [
  '-',
  'new',
  'like new',
  'excellent',
  'good',
  'fair',
  'salvage',
];

const fbCategoriesLevel1 = [
  'Antiques & Collectibles',
  'Antiques & Collectibles',
  'Antiques & Collectibles',
  'Antique & Collectible Appliances',
  'Antique & Collectible Electronics',
  'Antique & Collectible Furniture',
  'Antique & Collectible Home Goods',
  'Paper Ephemera',
  'Sports Memorabilia',
];



const fbConditions = ['New', 'Used - Like New', 'Used - Good', 'Used - Fair'];

const SegmentedControl = ({ className, mode, setMode }) => {
  return (
    <div class={`segmented-control ${className}`}>
      <input
        type="radio"
        name="mode"
        id="both"
        checked={mode === 'both'}
        onChange={() => setMode('both')}
      />
      <label for="both">Both</label>

      <input
        type="radio"
        name="mode"
        id="fbm"
        checked={mode === 'fbm'}
        onChange={() => setMode('fbm')}
      />
      <label for="fbm">FBM</label>

      <input
        type="radio"
        name="mode"
        id="cl"
        checked={mode === 'cl'}
        onChange={() => setMode('cl')}
      />
      <label for="cl">CL</label>
    </div>
  );
};

const InputField = ({ label, value, setValue, className, required }) => {
  function handleValueChange(e, setFn) {
    setFn(e.target.value);
  }

  return (
    <div className={`${className} layout-column`}>
      <label className="mb-4" required={required}>
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => handleValueChange(e, setValue)}
        required={required}
      />
    </div>
  );
};

const TextareaField = ({ label, value, setValue, className, required }) => {
  function handleValueChange(e, setFn) {
    setFn(e.target.value);
  }

  return (
    <div className={`${className} layout-column`}>
      <label className="mb-4" required={required}>
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => handleValueChange(e, setValue)}
        required={required}
      />
    </div>
  );
};

const App = () => {
  const [selectedTab, setSelectedTab] = useState('create');
  const [selectedApp, setSelectedApp] = useState('both');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [conditionCL, setConditionCL] = useState('');
  const [conditionFB, setConditionFB] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [name, setName] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [isHiddenFromFriends, setHideFromFriends] = useState(true);

  function handleHideFromFriends(e) {
    setHideFromFriends(e.target.checked);
  }

  console.log('selectedTab');
  console.log(selectedTab);

  const createNewPosting = async () => {
    await window.scratchpad.createNewPosting({
      title,
      description,
      price,
      location,
      conditionCL,
      conditionFB,
      manufacturer,
      name,
      neighborhood,
      phoneNumber,
      zipCode,
      isHiddenFromFriends,
    });
  };

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
                <label for="tab1">Create New Posting</label>
              </li>
              <li
                className={`tab-li ${
                  selectedTab === 'relist' ? 'selected' : ''
                }`}
              >
                <label for="tab2">Relist</label>
              </li>
            </ul>
          </nav>
          <section>
            {selectedTab === 'create' && (
              <div className="form-section tab-section">
                <SegmentedControl
                  className="mb-12"
                  mode={selectedApp}
                  setMode={setSelectedApp}
                />

                <div className="form-section flex-50 mb-16">
                  <h3 className="field-header mb-16">General Fields</h3>

                  <InputField
                    className="mb-8"
                    label="Title"
                    value={title}
                    setValue={setTitle}
                    required
                  />
                  <TextareaField
                    className="mb-8"
                    label="Description"
                    value={description}
                    setValue={setDescription}
                    required
                  />
                  <InputField
                    className="mb-8"
                    label="Price"
                    value={price}
                    setValue={setPrice}
                    required
                  />
                  <InputField
                    className="mb-8"
                    label="Location"
                    value={location}
                    setValue={setLocation}
                    required
                  />
                </div>

                <div id="specific-fields" className="layout-row mb-16">
                  {/* FB */}
                  {(selectedApp === 'both' || selectedApp === 'fbm') && (
                    <div className="form-section flex-50">
                      <h3 className="field-header mb-16">
                        FB Marketplace Fields
                      </h3>

                      <InputField
                        className="mb-8"
                        label="Condition"
                        value={conditionFB}
                        setValue={setConditionFB}
                        required
                      />
                      <label className="mr-8">Hide From Friends</label>
                      <input
                        type="checkbox"
                        checked={isHiddenFromFriends}
                        onChange={handleHideFromFriends}
                        required
                      />
                    </div>
                  )}

                  {/* CL */}
                  {(selectedApp === 'both' || selectedApp === 'cl') && (
                    <div className="form-section border-left-0 flex-50">
                      <h3 className="field-header mb-16">CL Fields</h3>

                      <InputField
                        className="mb-8"
                        label="Condition"
                        value={conditionCL}
                        setValue={setConditionCL}
                      />
                      <InputField
                        className="mb-8"
                        label="Manufacturer"
                        value={manufacturer}
                        setValue={setManufacturer}
                      />
                      <InputField
                        className="mb-8"
                        label="Name"
                        value={name}
                        setValue={setName}
                        required
                      />
                      <InputField
                        className="mb-8"
                        label="Neighborhood"
                        value={neighborhood}
                        setValue={setNeighborhood}
                        required
                      />
                      <InputField
                        className="mb-8"
                        label="PhoneNumber"
                        value={phoneNumber}
                        setValue={setPhoneNumber}
                        required
                      />
                      <InputField
                        className="mb-8"
                        label="ZipCode"
                        value={zipCode}
                        setValue={setZipCode}
                        required
                      />
                    </div>
                  )}
                </div>

                <div className="layout-row layout-align-end">
                  <button className="button-primary" onClick={createNewPosting}>
                    Create
                  </button>
                </div>
              </div>
            )}
            {selectedTab === 'relist' && (
              <div className="form-section tab-section">
                <h2>Second</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Laborum nesciunt ipsum dolore error repellendus officiis
                  aliquid a, vitae reprehenderit, accusantium vero, ad.
                  Obcaecati numquam sapiente cupiditate. Praesentium eaque, quae
                  error!
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Perferendis, maiores.
                </p>
              </div>
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

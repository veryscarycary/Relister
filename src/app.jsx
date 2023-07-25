import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { useState } from 'react';

const InputField = ({ label, value, setValue }) => {
  function handleValueChange(
    e,
    setFn
  ) {
    setFn(e.target.value);
  }

  return (
    <div className="input-field layout-column">
      <label>{label}</label>
      <input value={value} onChange={(e) => handleValueChange(e, setValue)} />
    </div>
  );
};

const createNewPosting = () => {
  window.scratchpad.createNewPosting();
};

const App = () => {
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

  return (
    <div>
      <h1 className="text-align-center">Relister</h1>
      <h2 className="text-align-center">Create New Posting</h2>
      <h3>Site Agnostic Fields</h3>

      <InputField label="Title" value={title} setValue={setTitle} />
      <InputField
        label="Description"
        value={description}
        setValue={setDescription}
      />
      <InputField label="Price" value={price} setValue={setPrice} />
      <InputField label="Location" value={location} setValue={setLocation} />

      {/* FB */}
      <h3>Facebook Marketplace-specific Fields</h3>

      <InputField
        label="Condition"
        value={conditionFB}
        setValue={setConditionFB}
      />
      <label>Hide From Friends</label>
      <input
        type="checkbox"
        checked={isHiddenFromFriends}
        onChange={handleHideFromFriends}
      />

      {/* CL */}
      <h3>Craigslist-specific Fields</h3>

      <InputField
        label="Condition"
        value={conditionCL}
        setValue={setConditionCL}
      />
      <InputField
        label="Manufacturer"
        value={manufacturer}
        setValue={setManufacturer}
      />
      <InputField label="Name" value={name} setValue={setName} />
      <InputField
        label="Neighborhood"
        value={neighborhood}
        setValue={setNeighborhood}
      />
      <InputField
        label="PhoneNumber"
        value={phoneNumber}
        setValue={setPhoneNumber}
      />
      <InputField label="ZipCode" value={zipCode} setValue={setZipCode} />

      <button onClick={createNewPosting}>Create</button>
    </div>
  );
};

(async () => {
  ReactDOM.render(<App />, document.body);
})();

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { useState } from 'react';

const InputField = ({ label, value, setValue, className }) => {
  function handleValueChange(e, setFn) {
    setFn(e.target.value);
  }

  return (
    <div className={`${className} layout-column`}>
      <label className="mb-4">{label}</label>
      <input value={value} onChange={(e) => handleValueChange(e, setValue)} />
    </div>
  );
};

const TextareaField = ({ label, value, setValue, className }) => {
  function handleValueChange(e, setFn) {
    setFn(e.target.value);
  }

  return (
    <div className={`${className} layout-column`}>
      <label className="mb-4">{label}</label>
      <textarea
        value={value}
        onChange={(e) => handleValueChange(e, setValue)}
      />
    </div>
  );
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
        <h1>Relister</h1>

        <div class="pc-tab">
          <input checked="checked" id="tab1" type="radio" name="pct" />
          <input id="tab2" type="radio" name="pct" />
          <input id="tab3" type="radio" name="pct" />
          <nav>
            <ul>
              <li class="tab1">
                <label for="tab1">Create New Posting</label>
              </li>
              <li class="tab2">
                <label for="tab2">Second Tab</label>
              </li>
              <li class="tab3">
                <label for="tab3">Third Tab</label>
              </li>
            </ul>
          </nav>
          <section>
            <div class="tab1">
              <div className="flex-50 mb-16">
                <h3 className="mb-16">Site Agnostic Fields</h3>

                <InputField
                  className="mb-8"
                  label="Title"
                  value={title}
                  setValue={setTitle}
                />
                <TextareaField
                  className="mb-8"
                  label="Description"
                  value={description}
                  setValue={setDescription}
                />
                <InputField
                  className="mb-8"
                  label="Price"
                  value={price}
                  setValue={setPrice}
                />
                <InputField
                  className="mb-8"
                  label="Location"
                  value={location}
                  setValue={setLocation}
                />
              </div>

              <div id="specific-fields" className="layout-row">
                <div className="flex-50 mb-12">
                  {/* FB */}
                  <h3 className="mb-16">
                    Facebook Marketplace-specific Fields
                  </h3>

                  <InputField
                    className="mb-8"
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
                </div>

                {/* CL */}
                <div className="flex-50 mb-12">
                  <h3 className="mb-16">Craigslist-specific Fields</h3>

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
                  />
                  <InputField
                    className="mb-8"
                    label="Neighborhood"
                    value={neighborhood}
                    setValue={setNeighborhood}
                  />
                  <InputField
                    className="mb-8"
                    label="PhoneNumber"
                    value={phoneNumber}
                    setValue={setPhoneNumber}
                  />
                  <InputField
                    className="mb-8"
                    label="ZipCode"
                    value={zipCode}
                    setValue={setZipCode}
                  />
                </div>
              </div>

              <button onClick={createNewPosting}>Create</button>
            </div>
            <div class="tab2">
              <h2>Second</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Laborum nesciunt ipsum dolore error repellendus officiis aliquid
                a, vitae reprehenderit, accusantium vero, ad. Obcaecati numquam
                sapiente cupiditate. Praesentium eaque, quae error!
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Perferendis, maiores.
              </p>
            </div>
            <div class="tab3">
              <h2>Third</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio,
                nobis culpa rem, vitae earum aliquid.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

(async () => {
  ReactDOM.render(<App />, document.body);
})();

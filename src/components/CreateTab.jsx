import React from 'react';

import { useState } from 'react';

import SegmentedControl from './SegmentedControl.jsx';
import FileUploadField from './FileUploadField.jsx';
import SelectField from './SelectField.jsx';
import ImagesSection from './ImagesSection.jsx';
import SelectTreeField from './SelectTreeField.jsx';
import InputField from './InputField.jsx';
import TextareaField from './TextareaField.jsx';

import { createNewPosting } from '../appHelpers.js';

import { clConditions, fbConditions } from '../formData/conditions.js';
import { clCategories, fbCategories } from '../formData/categories.js';

const CreateTab = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [imagePaths, setImagePaths] = useState([]);
  const [imageDataUris, setImageDataUris] = useState([]);
  const [categoryCL, setCategoryCL] = useState(clCategories[0]);
  const [categoryFB, setCategoryFB] = useState(fbCategories[0].name);
  const [conditionCL, setConditionCL] = useState(clConditions[0]);
  const [conditionFB, setConditionFB] = useState(fbConditions[0]);
  const [manufacturer, setManufacturer] = useState('');
  const [name, setName] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [isHiddenFromFriends, setHideFromFriends] = useState(true);

  const [selectedApp, setSelectedApp] = useState('both');
  const [loading, setLoading] = useState(false);

  function handleHideFromFriends(e) {
    setHideFromFriends(e.target.checked);
  }

  return (
    <div className="form-section tab-section">
      <SegmentedControl
        className="mb-12"
        mode={selectedApp}
        setMode={setSelectedApp}
      />

      <div id="general-fields" className="layout-row mb-16">
        <div className="form-section flex-50">
          <h3 className="field-header">General Fields</h3>

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
        <div className="form-section flex-50">
          <FileUploadField
            style={{ marginTop: '4.8rem' }}
            label="Images"
            id="imageUpload"
            imagePaths={imagePaths}
            setImagePaths={setImagePaths}
            setImageDataUris={setImageDataUris}
            imageDataUris={imageDataUris}
          />
          <ImagesSection imageDataUris={imageDataUris} />
        </div>
      </div>

      <div id="specific-fields" className="layout-row mb-16">
        {/* FB */}
        {(selectedApp === 'both' || selectedApp === 'fbm') && (
          <div className="form-section flex-50">
            <h3 className="field-header">FB Marketplace Fields</h3>

            <SelectTreeField
              className="mb-8"
              id="fbCategory"
              label="Category"
              options={fbCategories}
              value={categoryFB}
              setValue={setCategoryFB}
            />

            <SelectField
              className="mb-8"
              id="fbCondition"
              label="Condition"
              options={fbConditions}
              value={conditionFB}
              setValue={setConditionFB}
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
            <h3 className="field-header">CL Fields</h3>

            <SelectField
              className="mb-8"
              id="clCategory"
              label="Category"
              options={clCategories}
              value={categoryCL}
              setValue={setCategoryCL}
            />

            <SelectField
              className="mb-8"
              id="clCondition"
              label="Condition"
              options={clConditions}
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
        {/* <button className="button-primary" onClick={createNewPosting}> */}
        <button
          className="button-primary"
          onClick={async () => {
            setLoading(true);
            createNewPosting(
              {
                title,
                description,
                price,
                location,
                imagePaths,
                categoryCL,
                categoryFB,
                conditionCL,
                conditionFB,
                manufacturer,
                name,
                neighborhood,
                phoneNumber,
                zipCode,
                isHiddenFromFriends,
              },
              selectedApp
            );
            setLoading(true);
            setTimeout(() => setLoading(false), 30000); // poor mans await
          }}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateTab;
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
  const [imagePaths, setImagePaths] = useState([]);
  const [imageDataUris, setImageDataUris] = useState([]);
  const [categoryCL, setCategoryCL] = useState('');
  const [categoryFB, setCategoryFB] = useState('');
  const [conditionCL, setConditionCL] = useState('');
  const [conditionFB, setConditionFB] = useState('');
  const [locationCL, setLocationCL] = useState('');
  const [locationFB, setLocationFB] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [name, setName] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [isHiddenFromFriends, setHideFromFriends] = useState(true);

  const [selectedApp, setSelectedApp] = useState('both');
  const [loading, setLoading] = useState(false);

  // validation states

  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isDescriptionValid, setIsDescriptionValid] = useState(true);
  const [isPriceValid, setIsPriceValid] = useState(true);
  const [areImagePathsValid, setAreImagePathsValid] = useState(true);
  const [isCategoryCLValid, setIsCategoryCLValid] = useState(true);
  const [isCategoryFBValid, setIsCategoryFBValid] = useState(true);
  const [isConditionFBValid, setIsConditionFBValid] = useState(true);
  const [isLocationCLValid, setIsLocationCLValid] = useState(true);
  const [isLocationFBValid, setIsLocationFBValid] = useState(true);
  const [isNameValid, setIsNameValid] = useState(true);
  const [isNeighborhoodValid, setIsNeighborhoodValid] = useState(true);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
  const [isZipCodeValid, setIsZipCodeValid] = useState(true);

  function handleHideFromFriends(e) {
    setHideFromFriends(e.target.checked);
  }

  function handleValidation() {
    const resetValidationStates = () => {
      const validationFns = [
        setIsTitleValid,
        setIsDescriptionValid,
        setIsPriceValid,
        setAreImagePathsValid,
        setIsCategoryCLValid,
        setIsCategoryFBValid,
        setIsConditionFBValid,
        setIsLocationCLValid,
        setIsLocationFBValid,
        setIsNameValid,
        setIsNeighborhoodValid,
        setIsPhoneNumberValid,
        setIsZipCodeValid,
      ];
      validationFns.forEach((fn) => fn(true));
    };

    resetValidationStates();

    if (selectedApp === 'both' || selectedApp === 'fb') {
      if (!categoryFB) setIsCategoryFBValid(false);
      if (!conditionFB) setIsConditionFBValid(false);
      if (!locationFB) setIsLocationFBValid(false);
    }

    if (selectedApp === 'both' || selectedApp === 'cl') {
      if (!categoryCL) setIsCategoryCLValid(false);
      if (!locationCL) setIsLocationCLValid(false);
      if (!name) setIsNameValid(false);
      if (!neighborhood) setIsNeighborhoodValid(false);
      if (!phoneNumber) setIsPhoneNumberValid(false);
      if (!zipCode) setIsZipCodeValid(false);
    }

    if (
      selectedApp === 'both' ||
      selectedApp === 'fb' ||
      selectedApp === 'cl'
    ) {
      if (!title) setIsTitleValid(false);
      if (!description) setIsDescriptionValid(false);
      if (!price) setIsPriceValid(false);
      if (!imagePaths.length) setAreImagePathsValid(false);
    }

    return (
      categoryFB &&
      conditionFB &&
      categoryCL &&
      name &&
      neighborhood &&
      phoneNumber &&
      zipCode &&
      title &&
      description &&
      price &&
      locationFB &&
      locationCL &&
      imagePaths.length
    );
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
            isInvalid={!isTitleValid}
            required
          />
          <TextareaField
            className="mb-8"
            label="Description"
            value={description}
            setValue={setDescription}
            isInvalid={!isDescriptionValid}
            required
          />
          <InputField
            className="mb-8"
            label="Price"
            value={price}
            setValue={setPrice}
            isInvalid={!isPriceValid}
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
            isInvalid={!areImagePathsValid}
            required
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
              isInvalid={!isCategoryFBValid}
              emptyStateMessage="-- Select a category --"
              required
            />

            <SelectField
              className="mb-8"
              id="fbCondition"
              label="Condition"
              options={fbConditions}
              value={conditionFB}
              setValue={setConditionFB}
              isInvalid={!isConditionFBValid}
              emptyStateMessage="-- Select a condition --"
              required
            />

            <InputField
              className="mb-8"
              label="Location"
              value={locationFB}
              setValue={setLocationFB}
              isInvalid={!isLocationFBValid}
              required
            />

            <label className="mr-8">Hide From Friends</label>
            <input
              type="checkbox"
              checked={isHiddenFromFriends}
              onChange={handleHideFromFriends}
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
              isInvalid={!isCategoryCLValid}
              emptyStateMessage="-- Select a category --"
              required
            />

            <SelectField
              className="mb-8"
              id="clCondition"
              label="Condition"
              options={clConditions}
              value={conditionCL}
              setValue={setConditionCL}
              emptyStateMessage="-- Select a condition --"
            />

            <InputField
              className="mb-8"
              label="Location"
              value={locationCL}
              setValue={setLocationCL}
              isInvalid={!isLocationCLValid}
              tooltipText="This is a field specific to CL. You need to input the location/subarea found on the first page of creating a posting"
              required
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
              isInvalid={!isNameValid}
              required
            />
            <InputField
              className="mb-8"
              label="Neighborhood"
              value={neighborhood}
              setValue={setNeighborhood}
              isInvalid={!isNeighborhoodValid}
              required
            />
            <InputField
              className="mb-8"
              label="PhoneNumber"
              value={phoneNumber}
              setValue={setPhoneNumber}
              isInvalid={!isPhoneNumberValid}
              required
            />
            <InputField
              className="mb-8"
              label="ZipCode"
              value={zipCode}
              setValue={setZipCode}
              isInvalid={!isZipCodeValid}
              required
            />
          </div>
        )}
      </div>

      <div className="layout-row layout-align-end">
        {/* <button className="button-primary" onClick={createNewPosting}> */}
        <button
          className={`button-primary ${loading ? 'loading' : ''}`}
          onClick={async () => {
            if (handleValidation()) {
              setLoading(true);
              createNewPosting(
                {
                  title,
                  description,
                  price,
                  locationCL,
                  locationFB,
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
            }
          }}
          disabled={loading}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateTab;

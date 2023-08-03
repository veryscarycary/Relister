import React from 'react';

import { useState, useEffect } from 'react';

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
  const [isFormValid, setIsFormValid] = useState(true);

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

  useEffect(async () => {
    const formValuesObj = await window.electronAPI.getSavedFormValues();

    if (formValuesObj.RELISTER_LOCATION_CL)
      setLocationCL(formValuesObj.RELISTER_LOCATION_CL);
    if (formValuesObj.RELISTER_LOCATION_FB)
      setLocationFB(formValuesObj.RELISTER_LOCATION_FB);
    if (formValuesObj.RELISTER_MANUFACTURER)
      setManufacturer(formValuesObj.RELISTER_MANUFACTURER);
    if (formValuesObj.RELISTER_NAME) setName(formValuesObj.RELISTER_NAME);
    if (formValuesObj.RELISTER_NEIGHBORHOOD)
      setNeighborhood(formValuesObj.RELISTER_NEIGHBORHOOD);
    if (formValuesObj.RELISTER_PHONE_NUMBER)
      setPhoneNumber(formValuesObj.RELISTER_PHONE_NUMBER);
    if (formValuesObj.RELISTER_ZIP_CODE)
      setZipCode(formValuesObj.RELISTER_ZIP_CODE);
  }, []);

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

    const isFormValid =
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
      imagePaths.length;

    setIsFormValid(isFormValid);

    return isFormValid;
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
              id="categoryFB"
              className="mb-8"
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
              id="conditionFB"
              label="Condition"
              options={fbConditions}
              value={conditionFB}
              setValue={setConditionFB}
              isInvalid={!isConditionFBValid}
              emptyStateMessage="-- Select a condition --"
              required
            />

            <InputField
              id="locationFB"
              className="mb-8"
              label="Location"
              value={locationFB}
              setValue={setLocationFB}
              isInvalid={!isLocationFBValid}
              required
              canSave
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
              id="categoryCL"
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
              id="conditionCL"
              label="Condition"
              options={clConditions}
              value={conditionCL}
              setValue={setConditionCL}
              emptyStateMessage="-- Select a condition --"
            />

            <InputField
              className="mb-8"
              id="locationCL"
              label="Location"
              value={locationCL}
              setValue={setLocationCL}
              isInvalid={!isLocationCLValid}
              tooltipText="Specific to Craigslist -- location/subarea found on the first page of creating a posting"
              required
              canSave
            />

            <InputField
              id="manufacturer"
              className="mb-8"
              label="Manufacturer"
              value={manufacturer}
              setValue={setManufacturer}
              canSave
            />
            <InputField
              id="name"
              className="mb-8"
              label="Name"
              value={name}
              setValue={setName}
              isInvalid={!isNameValid}
              required
              canSave
            />
            <InputField
              className="mb-8"
              id="neighborhood"
              label="Neighborhood"
              value={neighborhood}
              setValue={setNeighborhood}
              isInvalid={!isNeighborhoodValid}
              required
              canSave
            />
            <InputField
              id="phoneNumber"
              className="mb-8"
              label="Phone Number"
              value={phoneNumber}
              setValue={setPhoneNumber}
              isInvalid={!isPhoneNumberValid}
              required
              canSave
            />
            <InputField
              id="zipCode"
              className="mb-8"
              label="Zip Code"
              value={zipCode}
              setValue={setZipCode}
              isInvalid={!isZipCodeValid}
              required
              canSave
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
              try {
                const response = await createNewPosting(
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
                console.log(`RESPONSE: ${response}`);
              } catch (e) {
                console.log(`ERROR during post creation: ${e}`);
              }
              setLoading(false);
            }
          }}
          disabled={!isFormValid || loading}
        >
          <span className="button-text">Create</span>
        </button>
      </div>
    </div>
  );
};

export default CreateTab;

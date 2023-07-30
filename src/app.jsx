import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { useState, useEffect, useRef } from 'react';

import { clConditions, fbConditions } from './formData/conditions.js';
import { clCategories, fbCategories } from './formData/categories.js';

const SegmentedControl = ({ className, mode, setMode }) => {
  return (
    <div className={`segmented-control ${className}`}>
      <input
        type="radio"
        name="mode"
        id="both"
        checked={mode === 'both'}
        onChange={() => setMode('both')}
      />
      <label htmlFor="both">Both</label>

      <input
        type="radio"
        name="mode"
        id="fbm"
        checked={mode === 'fbm'}
        onChange={() => setMode('fbm')}
      />
      <label htmlFor="fbm">FBM</label>

      <input
        type="radio"
        name="mode"
        id="cl"
        checked={mode === 'cl'}
        onChange={() => setMode('cl')}
      />
      <label htmlFor="cl">CL</label>
    </div>
  );
};

const FileUploadField = ({
  id,
  label,
  style,
  className,
  imagePaths,
  setImagePaths,
  imageDataUris,
  setImageDataUris,
}) => {
  const handleUploadFiles = (e) => {
    const chosenFilePaths = Array.prototype.map.call(
      e.target.files,
      (file) => file.path
    );
    Array.prototype.forEach.call(e.target.files, (file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageDataUris([...imageDataUris, e.target.result]);
      };
      reader.readAsDataURL(file);
    });
    const newPaths = chosenFilePaths.filter(
      (chosenPath) => !imagePaths.includes(chosenPath)
    );
    const totalPaths = [...imagePaths, ...newPaths];
    setImagePaths(totalPaths);
  };
  const resetFiles = () => {
    setImagePaths([]);
    setImageDataUris([]);
    ref.current.value = '';
  };
  const ref = useRef(null);

  return (
    <div className={`layout-column ${className}`} style={style}>
      <label className="mb-4" htmlFor={id}>
        {label}
      </label>
      <div>
        <input
          ref={ref}
          id={id}
          type="file"
          multiple
          accept="image/*"
          onChange={handleUploadFiles}
        />
        <button onClick={resetFiles}>Clear</button>
      </div>
    </div>
  );
};

const ImagesSection = ({ imageDataUris }) => {
  return (
    <div className="layout-row flex-wrap">
      {imageDataUris.map((uri) => (
        <img className="uploaded-img mr-8 mb-8" src={uri} />
      ))}
    </div>
  );
};

const SelectField = ({ id, label, className, options, value, setValue }) => {
  return (
    <div className={`layout-column ${className}`}>
      <label className="mb-4" htmlFor={id}>
        {label}
      </label>
      <select id={id} value={value} onChange={(e) => setValue(e.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
const SelectTreeField = ({
  id,
  label,
  className,
  options,
  value,
  setValue,
}) => {
  const emptyState = 'empty-state';
  const [categoryAtDepth1, setCategoryAtDepth1] = useState(emptyState);
  const [categoryAtDepth2, setCategoryAtDepth2] = useState(emptyState);
  const [categoryAtDepth3, setCategoryAtDepth3] = useState(emptyState);
  const [categoryAtDepth4, setCategoryAtDepth4] = useState(emptyState);

  useEffect(() => {
    const finalCategorySelection = [
      categoryAtDepth4,
      categoryAtDepth3,
      categoryAtDepth2,
      categoryAtDepth1,
    ].find((category) => category !== emptyState);

    if (finalCategorySelection && finalCategorySelection.name) {
      setValue(finalCategorySelection.name);
    }
  }, [categoryAtDepth1, categoryAtDepth2, categoryAtDepth3, categoryAtDepth4]);

  const handleCategorySelection = (e, setValue, categories) => {
    const optionName = e.target.value;
    const category = categories.find(
      (category) => category.name === optionName
    );
    setValue(category);

    const selectElementId = e.target.id;
    const selectNumber = Number(
      selectElementId.slice(selectElementId.length - 1)
    );

    // reset lower depth select fields
    for (let i = selectNumber + 1; i <= 4; i++) {
      let stringVar = 'categoryAtDepth';
      let setStringVar = 'setCategoryAtDepth';

      if (eval(`${stringVar}${i}`) !== emptyState) {
        eval(`${setStringVar}${i}('${emptyState}')`);
      }
    }
  };

  return (
    <div className={`layout-column ${className}`}>
      <label htmlFor={id}>{label}</label>
      <select
        className="mb-4"
        id={`${id}-depth1`}
        value={categoryAtDepth1.name || emptyState}
        onChange={(e) =>
          handleCategorySelection(e, setCategoryAtDepth1, options)
        }
      >
        <option key={emptyState} disabled value={emptyState}>
          {' '}
          -- select a category --{' '}
        </option>
        {options.map((category) => (
          <option key={category.name} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>

      {categoryAtDepth1.type === 'container' && (
        <select
          id={`${id}-depth2`}
          value={categoryAtDepth2.name || emptyState}
          onChange={(e) =>
            handleCategorySelection(
              e,
              setCategoryAtDepth2,
              categoryAtDepth1.children
            )
          }
        >
          <option key={emptyState} disabled value={emptyState}>
            {' '}
            -- select an option --{' '}
          </option>
          {categoryAtDepth1.children.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      )}

      {categoryAtDepth2.type === 'container' && (
        <select
          id={`${id}-depth3`}
          value={categoryAtDepth3.name || emptyState}
          onChange={(e) =>
            handleCategorySelection(
              e,
              setCategoryAtDepth3,
              categoryAtDepth2.children
            )
          }
        >
          <option key={emptyState} disabled value={emptyState}>
            {' '}
            -- select an option --{' '}
          </option>
          {categoryAtDepth2.children.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      )}

      {categoryAtDepth3.type === 'container' && (
        <select
          id={`${id}-depth4`}
          value={categoryAtDepth4.name || emptyState}
          onChange={(e) =>
            handleCategorySelection(
              e,
              setCategoryAtDepth4,
              categoryAtDepth3.children
            )
          }
        >
          <option key={emptyState} disabled value={emptyState}>
            {' '}
            -- select an option --{' '}
          </option>
          {categoryAtDepth3.children.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

const InputField = ({
  label,
  value,
  setValue,
  className,
  style,
  inputStyle,
  required,
}) => {
  function handleValueChange(e, setFn) {
    setFn(e.target.value);
  }

  return (
    <div className={`${className} layout-column`} style={style}>
      <label className="mb-4" required={required}>
        {label}
      </label>
      <input
        style={inputStyle}
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

const createNewPostingCL = async (postInfo) => {
  const {
    title,
    description,
    price,
    location,
    categoryCL,
    conditionCL,
    imagePaths,
    manufacturer,
    name,
    neighborhood,
    phoneNumber,
    zipCode,
  } = postInfo;

  const postInfoCL = {
    title,
    body: description,
    price,
    location,
    imagePaths,
    category: categoryCL,
    condition: conditionCL,
    manufacturer,
    name,
    neighborhood,
    phoneNumber,
    zipCode,
  };

  await window.scratchpad.createNewPostingCL(postInfoCL);
};

const createNewPostingFB = async (postInfo) => {
  const {
    title,
    description,
    price,
    location,
    imagePaths,
    categoryFB,
    conditionFB,
  } = postInfo;

  const postInfoFB = {
    title,
    body: description,
    price,
    location,
    imagePaths,
    category: categoryFB,
    condition: conditionFB,
  };

  console.log('create new posting FBBBB, before scratchpad');

  await window.scratchpad.createNewPostingFB(postInfoFB);
};

const createNewPosting = async (postInfo, selectedApp) => {
  setLoading(true);

  switch (selectedApp) {
    case 'cl':
      await createNewPostingCL(postInfo);
      break;
    case 'fbm':
      await createNewPostingFB(postInfo);
      break;
    case 'both':
      await Promise.all([
        createNewPostingCL(postInfo),
        createNewPostingFB(postInfo),
      ]);
      break;
  }

  setLoading(false);
};

const relistActivePostingsCL = async (priceDrop) => {
  await window.scratchpad.relistActivePostingsCL(priceDrop);
};

const relistActivePostingsFB = async (priceDrop) => {
  await window.scratchpad.relistActivePostingsFB(priceDrop);
};

const relistActivePostings = async (priceDrop, selectedApp) => {
  setLoading(true);

  switch (selectedApp) {
    case 'cl':
      await relistActivePostingsCL(priceDrop);
      break;
    case 'fbm':
      await relistActivePostingsFB(priceDrop);
      break;
    case 'both':
      await Promise.all([
        relistActivePostingsCL(priceDrop),
        relistActivePostingsFB(priceDrop),
      ]);
      break;
  }

  setLoading(false);
};

const App = async () => {
  const [selectedTab, setSelectedTab] = useState('create');
  const [selectedApp, setSelectedApp] = useState('both');
  const [loading, setLoading] = useState(false);

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
  const [priceDrop, setPriceDrop] = useState('');

  function handleHideFromFriends(e) {
    setHideFromFriends(e.target.checked);
  }

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
                    className={`button-primary ${
                      loading ? 'button--loading' : ''
                    }`}
                    onClick={async () =>
                      await createNewPosting(
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
                      )
                    }
                  >
                    <span className="button-text">Create</span>
                  </button>
                </div>
              </div>
            )}
            {selectedTab === 'relist' && (
              <div className="form-section tab-section">
                <SegmentedControl
                  className="mb-32"
                  mode={selectedApp}
                  setMode={setSelectedApp}
                />

                <div className="form-section layout-row layout-align-center-end">
                  <InputField
                    className="mr-32"
                    label="Price Drop"
                    value={priceDrop}
                    setValue={setPriceDrop}
                  />
                  <button
                    className={`button-primary ${
                      loading ? 'button--loading' : ''
                    }`}
                    onClick={async () =>
                      await relistActivePostings(priceDrop, selectedApp)
                    }
                  >
                    <span>Relist Active Postings</span>
                  </button>
                </div>
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

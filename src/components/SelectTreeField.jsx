import React from 'react';

import { useState, useEffect } from 'react';

const SelectTreeField = ({
  id,
  label,
  className,
  options,
  setValue,
  required,
  isInvalid,
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
    <div
      className={`layout-column ${className} ${isInvalid ? 'invalid' : ''}`}
    >
      <label htmlFor={id} required={required}>{label}</label>
      <select
        className="mb-4"
        id={`${id}-depth1`}
        value={categoryAtDepth1.name || emptyState}
        onChange={(e) =>
          handleCategorySelection(e, setCategoryAtDepth1, options)
        }
        required={required}
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
          required={required}
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
          required={required}
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
          required={required}
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

export default SelectTreeField;
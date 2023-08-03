import React from 'react';
import { useState } from 'react';

const InputField = ({
  id,
  label,
  value,
  setValue,
  className,
  style,
  inputStyle,
  required,
  type,
  isInvalid,
  tooltipText,
  canSave,
}) => {
  const [wasSaved, setWasSaved] = useState(false);

  function handleValueChange(e, setFn) {
    setFn(e.target.value);
  }

  return (
    <div
      className={`${className} layout-column ${isInvalid ? 'invalid' : ''}`}
      style={style}
    >
      <div className="layout-row layout-align-start-center">
        <label className="mb-4 layout-row" required={required}>
          {label}
        </label>

        {tooltipText && (
          <div className="tooltip tooltip-circle">
            i<span className="tooltip-text">{tooltipText}</span>
          </div>
        )}

        {canSave && (
          <div className="flex layout-row layout-align-end">
            <button
              className={`mb-4 button-primary small ${
                wasSaved ? 'checked' : ''
              }`}
              onClick={async () => {
                window.electronAPI.saveFormValue(id, value);
                setWasSaved(true);
              }}
            >
              <span className="button-text">Save</span>
            </button>
          </div>
        )}
      </div>
      <input
        style={inputStyle}
        value={value}
        onChange={(e) => handleValueChange(e, setValue)}
        required={required}
        type={type}
      />
    </div>
  );
};

export default InputField;

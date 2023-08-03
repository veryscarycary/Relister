import React from 'react';

const InputField = ({
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
}) => {
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

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
}) => {
  function handleValueChange(e, setFn) {
    setFn(e.target.value);
  }

  return (
    <div className={`${className} layout-column ${isInvalid ? 'invalid' : ''}`} style={style}>
      <label className="mb-4" required={required}>
        {label}
      </label>
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

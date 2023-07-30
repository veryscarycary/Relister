import React from 'react';

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

export default InputField;
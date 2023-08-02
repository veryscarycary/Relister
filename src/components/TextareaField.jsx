import React from 'react';

const TextareaField = ({
  label,
  value,
  setValue,
  className,
  required,
  isInvalid,
}) => {
  function handleValueChange(e, setFn) {
    setFn(e.target.value);
  }

  return (
    <div
      className={`${className} layout-column  ${isInvalid ? 'invalid' : ''}`}
    >
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

export default TextareaField;

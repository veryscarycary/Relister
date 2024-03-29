import React from 'react';

const SelectField = ({
  id,
  label,
  className,
  options,
  value,
  setValue,
  required,
  isInvalid,
  emptyStateMessage,
}) => {
  return (
    <div className={`layout-column ${className} ${isInvalid ? 'invalid' : ''}`}>
      <label className="mb-4" htmlFor={id} required={required}>
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required={required}
      >
        <option key="" disabled value="">
          {emptyStateMessage}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;

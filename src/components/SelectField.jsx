import React from 'react';

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

export default SelectField;
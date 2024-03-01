// SelectInput.js
import React from 'react';

const SelectInput = ({ label, name, value, onChange, onBlur, error, options }) => {
  return (
    <div className="col-lg-12">
      <label className='my-1'>
        {label} <b className="text-danger">*</b>
      </label>
      <select
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        className={`form-control form-select ${error ? 'is-invalid' : ''}`}
      >
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <div className="text-left invalid-feedback">{error}</div>}
    </div>
  );
};

export default SelectInput;

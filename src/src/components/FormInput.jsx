import React from 'react';

const FormInput = ({ label, type = 'text', placeholder, value, onChange, required = false, className = '', isTextArea = false }) => {
  const inputClasses = `input input-bordered w-full ${className}`;
  const textareaClasses = `textarea textarea-bordered w-full ${className}`;

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{label} {required && <span className="text-error">*</span>}</span>
      </label>
      {isTextArea ? (
        <textarea
          placeholder={placeholder}
          className={textareaClasses}
          value={value}
          onChange={onChange}
          required={required}
        ></textarea>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className={inputClasses}
          value={value}
          onChange={onChange}
          required={required}
          min={0}
        />
      )}
    </div>
  );
};

export default FormInput;
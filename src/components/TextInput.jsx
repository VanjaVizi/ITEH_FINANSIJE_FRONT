import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const TextInput = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  autoComplete,
  hint,
   showPasswordToggle = false,
  ...rest
}) => {

    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    const inputType = isPassword  && showPasswordToggle ? (showPassword ? "text" : "password") : type;
      

  return (

 
    <div className="auth-field">
      {label && <label htmlFor={id}>{label}</label>}
      <div className="auth-input-wrapper">
      <input
        id={id}
        type={inputType}
        className="" // koristi default stil iz .auth-field input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        {...rest}
      />
          {isPassword && showPasswordToggle && (
          <button
            type="button"
            className="toggle-password-btn"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
</div>


      {hint && <small className="auth-hint">{hint}</small>}
    </div>
  )
}

export default TextInput
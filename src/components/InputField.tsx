import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-regular-svg-icons';

interface InputFieldProps {
  type: string;
  name: string;
  label: string;
  value: string;
  isPassword?: boolean;
  error?: string;
  viewPassword?: boolean;
  handleViewPassword?: () => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  isPassword,
  error,
  type,
  name,
  label,
  value,
  handleChange,
  viewPassword,
  handleViewPassword,
  className,
}) => {
  return (
    <div className={`w-full relative flex flex-col ${className}`}>
      <label htmlFor={`#${name}`} className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          className="w-full py-[1.2rem] px-[1rem] border-[1px] border-solid border-[#485467] rounded-lg outline-none transition duration-200 cursor-pointer"
        />
        <span
          className={`input-text absolute top-[1rem] left-[1rem] transition duration-200 font-[500] text-[#A0AEC0] ${
            value ? 'transform -translate-y-4 -translate-x-2 scale-75' : ''
          }`}
        >
          {label}
        </span>
        {isPassword && (
          <FontAwesomeIcon
            icon={viewPassword ? faEyeSlash : faEye}
            className="absolute top-1/2 tranform -translate-y-1/2 right-5 cursor-pointer"
            onClick={handleViewPassword}
          />
        )}
      </label>
      {error && <small className="text-red-600 font-[500] mt-1">{error}</small>}
    </div>
  );
};

export default InputField;

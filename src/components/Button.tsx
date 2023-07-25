import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  fn: () => void;
  isDisabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, className, fn }) => {
  return (
    <button
      className={`py-[1rem] w-full relative bg-[#13A456] rounded-lg text-[16px] text-white font-[500] my-4 ${className}`}
      onClick={fn}
    >
      {children}
    </button>
  );
};

export default Button;

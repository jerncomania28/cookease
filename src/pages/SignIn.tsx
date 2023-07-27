import React from 'react';

//components
import SignInForm from '../components/SignIn/SignInForm';

const SignIn: React.FC = () => {
  return (
    <div className="w-[90%] md:w-[80%] mx-auto relative flex flex-col">
      <div>
        <h1 className="text-[#1A202C] font-[600] text-[18px] md:text-[24px]">
          Fill in your details to log in
        </h1>
        <small className="text-[#A6B7D4] text-[14px] md:text-[16px] my-3">
          Enter your email and password to access your account
        </small>
      </div>
      <SignInForm />
    </div>
  );
};

export default SignIn;

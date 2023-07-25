import React from 'react';

//components
import AuthLayout from '../Layout/AuthLayout';
import SignUpForm from '../components/SignUp/SignUpForm';

const SignUp: React.FC = () => {
  return (
    <AuthLayout>
      <div className="w-[90%] md:w-[80%] mx-auto relative flex flex-col">
        <div>
          <h1 className="text-[#1A202C] font-[600] text-[18px] md:text-[24px]">
            Fill in your details to get started
          </h1>
          <small className="text-[#A6B7D4] text-[14px] md:text-[16px] my-3">
            Enter your email and choose a password to get started
          </small>
        </div>
        <SignUpForm />
      </div>
    </AuthLayout>
  );
};

export default SignUp;

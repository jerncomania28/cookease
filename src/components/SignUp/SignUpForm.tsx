import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

//components
import InputField from '../InputField';

//validation
import validation, { ErrorProps } from './SignUpValidation';

//utils
import {
  createUserViaEmailAndPassword,
  signOutUser,
} from '../../utils/firebase';

export interface SignUpProps {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

const defaultSignUpProps = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  confirm_password: '',
};

const SignUpForm: React.FC = () => {
  const [signUpParameters, setSignUpParameters] = React.useState<SignUpProps>(
    defaultSignUpProps,
  );

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [viewPassword, setViewPassword] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<ErrorProps>({});

  const navigate = useNavigate();

  const handleViewPassword = () => {
    setViewPassword(!viewPassword);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignUpParameters({ ...signUpParameters, [name]: value });
  };

  const handleSubmit = () => {
    const errors = validation(signUpParameters);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      createUserViaEmailAndPassword(signUpParameters)
        .then((response) => {
          setSignUpParameters(defaultSignUpProps);
          console.log('response', response);
          signOutUser();
          navigate('/signin');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="w-full relative">
      <div className="flex flex-col md:flex-row w-full relative gap-0 md:gap-2 mt-6 md:my-6">
        <div className="w-full md:w-1/2 ">
          <InputField
            type="text"
            name="first_name"
            label="First Name"
            value={signUpParameters.first_name}
            handleChange={handleChange}
            error={errors.first_name}
            className="my-6 md:my-0"
          />
        </div>
        <div className="w-full md:w-1/2 ">
          <InputField
            type="text"
            name="last_name"
            label="Last Name"
            value={signUpParameters.last_name}
            handleChange={handleChange}
            error={errors.last_name}
          />
        </div>
      </div>
      <InputField
        type="email"
        name="email"
        label="Email"
        value={signUpParameters.email}
        handleChange={handleChange}
        error={errors.email}
        className="my-6"
      />
      <InputField
        type={viewPassword ? 'text' : 'password'}
        name="password"
        label="Password"
        viewPassword={viewPassword}
        handleViewPassword={handleViewPassword}
        value={signUpParameters.password}
        handleChange={handleChange}
        isPassword
        error={errors.password}
        className="my-6"
      />
      <InputField
        type="password"
        name="confirm_password"
        label="Confirm Password"
        value={signUpParameters.confirm_password}
        handleChange={handleChange}
        error={errors.confirm_password}
        className="my-6"
      />
      <button
        className={`w-full py-4 text-center text-white bg-[#13A456] text-[16px] font-[600] rounded-md outline-none border-none ${
          isLoading ? 'opacity-50' : ''
        }`}
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? 'Continuing...' : 'Continue'}
      </button>
      <div className="flex justify-center my-3">
        <span className="mr-1">Already have an account ? </span>{' '}
        <Link to="signin" className="font-[600]">
          {' '}
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default SignUpForm;

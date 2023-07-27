import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AuthContext } from '../../context/auth';

//components
import InputField from '../InputField';

//validation
import validation, { ErrorProps } from './SignUpValidation';

//utils
import {
  createUserViaEmailAndPassword,
  getCurrentUser,
} from '../../utils/firebase';
import storageUtils from '../../utils/storageUtils';

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
  const [viewConfirmPassword, setViewConfirmPassword] = React.useState<boolean>(
    false,
  );
  const [errors, setErrors] = React.useState<ErrorProps>({});

  const navigate = useNavigate();
  const { handleCurrentUser } = useContext(AuthContext);

  const handleViewPassword = () => {
    setViewPassword(!viewPassword);
  };
  const handleViewConfirmPassword = () => {
    setViewConfirmPassword(!viewConfirmPassword);
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
          return getCurrentUser(response as string);
        })
        .then((currentUser) => {
          if (currentUser) {
            const { email, displayName } = currentUser;
            handleCurrentUser({ email, displayName });
            storageUtils.setItem({ email, displayName });
            toast.success('🦄 account succesfully created!!', {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            });
            navigate('/dashboard');
          }
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
        type={viewConfirmPassword ? 'text' : 'password'}
        name="confirm_password"
        label="Confirm Password"
        value={signUpParameters.confirm_password}
        handleChange={handleChange}
        error={errors.confirm_password}
        className="my-6"
        isPassword
        viewPassword={viewConfirmPassword}
        handleViewPassword={handleViewConfirmPassword}
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

import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../context/auth';

//components
import InputField from '../InputField';

// utils
import {
  signInViaEmailAndPassword,
  getCurrentUser,
} from '../../utils/firebase';
import storageUtils from '../../utils/storageUtils';

export interface SignInProps {
  email: string;
  password: string;
}

const defaultSignIn = {
  email: '',
  password: '',
};

const SignInForm: React.FC = () => {
  const [signInParameters, setSignInParameters] = React.useState<SignInProps>(
    defaultSignIn,
  );
  const [viewPassword, setViewPassword] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const navigate = useNavigate();

  const { handleCurrentUser } = useContext(AuthContext);

  const handleViewPassword = () => {
    setViewPassword(!viewPassword);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignInParameters({ ...signInParameters, [name]: value });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const { email, password } = signInParameters;
    setIsLoading(true);
    signInViaEmailAndPassword(email, password)
      .then((response) => {
        return getCurrentUser(response.user.uid);
      })
      .then((currentUser) => {
        if (currentUser) {
          console.log('current user', currentUser);
          const { email, displayName } = currentUser;
          handleCurrentUser({ email, displayName });
          storageUtils.setItem({ email, displayName });
          navigate('/dashboard');
        }
      })
      .catch((err) => {
        console.log('error signing in', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="w-full relative">
      <InputField
        type="email"
        name="email"
        label="Email"
        value={signInParameters.email}
        handleChange={handleChange}
        className="my-6"
      />
      <InputField
        type={viewPassword ? 'text' : 'password'}
        name="password"
        label="Password"
        value={signInParameters.password}
        handleChange={handleChange}
        viewPassword={viewPassword}
        handleViewPassword={handleViewPassword}
        isPassword
        className="my-6"
      />
      <button
        className={`w-full py-4 text-center text-white bg-[#13A456] text-[16px] font-[600] rounded-md outline-none border-none ${
          isLoading || !signInParameters.email || !signInParameters.password
            ? 'opacity-30'
            : ''
        }`}
        onClick={handleSubmit}
        disabled={
          isLoading || !signInParameters.email || !signInParameters.password
        }
      >
        {isLoading ? 'Continuing...' : 'Continue'}
      </button>
      <div className="flex justify-center my-6">
        <span className="mr-1">New here ? </span>{' '}
        <Link to="/" className="font-[600]">
          {' '}
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default SignInForm;

import React from 'react';
import { Link } from 'react-router-dom';

//assets
import ErrorImage from '../assets/error.svg';

const ErrorPage: React.FC = () => {
  return (
    <div className="w-full relative h-screen flex flex-col justify-center items-center">
      <div className="w-[90%] md:w-[40%] h-[50%] relative">
        <img src={ErrorImage} alt="error-image" className="w-full h-full" />
      </div>
      <Link
        to="/dashboard"
        className="text-[20px] py-2 px-4 rounded-md text-white bg-[#13A456] cursor-pointer flex items-center justify-center"
      >
        Back To Dashboard
      </Link>
    </div>
  );
};

export default ErrorPage;

import React from 'react';

//assets
import HeroImage from '../assets/hero-img.png';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="w-full relative h-[100vh] flex">
      <div className="w-full h-full md:w-1/2 relative bg-transparent md:bg-white">
        <div className="w-[90%] md:w-[80%] h-[70px] items-end flex mx-auto">
          <h1 className="font-[600] text-[#101225] text-[28px]">Cookease.</h1>
        </div>
        <div className="w-[90%] md:w-[80%] pt-[2rem] mx-auto relative">
          {children}
        </div>
      </div>
      <div className="w-full hidden md:w-1/2 bg-background-cover bg-cover bg-no-repeat md:flex md:flex-col pt-[30px] pl-[50px] overflow-hidden">
        <div className="flex flex-col">
          <h1 className="font-[600] text-[32px] text-[#101225]">
            Welcome to cookease
          </h1>
          <p className="font-[400] text-[24px] text-[#4A5568] mt-2">
            Setup your account and be on your way to complete control of your
            finances
          </p>
        </div>
        <div className="w-full relative mt-[50px]">
          <img src={HeroImage} alt="hero-image" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

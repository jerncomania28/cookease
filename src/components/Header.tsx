/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import { AuthContext } from '../context/auth';

//components
import SearchBar from './SearchBar';

//assets
import Avatar from '../assets/avatar.svg';
import Logo from '../assets/logo.svg';

const Header: React.FC = () => {
  const [searchValue, setSearchValue] = React.useState<string>('');
  const location = useLocation();
  const header = location.pathname.slice(1).split('-').join(' ');

  const { handleMobile } = useContext(AuthContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchValue(value);
  };

  return (
    <>
      <div className="w-full relative py-4 px-6 flex justify-between items-center bg-[#0C1325] md:hidden">
        <FontAwesomeIcon
          icon={faBars}
          className="text-white h-[24px] w-[24px]"
          onClick={handleMobile}
        />
        <img src={Logo} className="w-[90px] h-[40px]" />
        <img src={Avatar} className="w-[28px] h-[28px] rounded-full" />
      </div>
      <header className="w-full relative h-[160px] flex flex-col md:flex-row justify-around md:justify-between items-center py-4 md:py-auto px-6 shadow bg-white">
        <div className="self-start w-full md:w-1/2 relative md:self-center">
          <h4 className="text-[#67748E] font-[400] text-[12px] leading-[16px]">
            Welcome,
          </h4>
          <h1 className="text-[#1A1D23] font-[700] text-[26px] md:text-[32px] leading-[45px] capitalize whitespace-nowrap">
            {header}
          </h1>
        </div>
        <div className="flex justify-end w-full relative md:w-1/2">
          <SearchBar value={searchValue} handleChange={handleChange} />
          <Link to="#" className="cursor-pointer mx-2 hidden md:flex">
            <img src={Avatar} alt="avatar" className="w-[36px] h-[36px]" />
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;

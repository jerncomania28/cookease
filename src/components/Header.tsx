import React from 'react';
import { Link } from 'react-router-dom';

//components
import SearchBar from './SearchBar';

//assets
import Avatar from '../assets/avatar.svg';

const Header: React.FC = () => {
  const [searchValue, setSearchValue] = React.useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchValue(value);
  };

  return (
    <header className="w-full relative h-[160px] flex justify-between items-center px-4 md:px-6 shadow bg-white">
      <div>
        <h4 className="text-[#67748E] font-[400] text-[12px] leading-[16px]">
          Welcome,
        </h4>
        <h1 className="text-[#1A1D23] font-[700] text-[26px] md:text-[32px] leading-[45px]">
          Dashboard
        </h1>
      </div>
      <div className="flex justify-end">
        <SearchBar value={searchValue} handleChange={handleChange} />
        <Link to="#" className="cursor-pointer mx-2">
          <img src={Avatar} alt="avatar" className="w-[36px] h-[36px]" />
        </Link>
      </div>
    </header>
  );
};

export default Header;

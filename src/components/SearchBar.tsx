import React from 'react';

//icon
import Iconly from '../assets/Iconly.svg';

interface SearchBarProps {
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, handleChange }) => {
  return (
    <div className="w-[50%] md:w-full max-w-[270px] relative rounded-md ">
      <input
        type="text"
        name="search"
        placeholder="Search..."
        className="w-full py-[0.5rem] px-2 outline-none rounded-md bg-[#F3F4F6]"
        value={value}
        onChange={handleChange}
      />
      <img
        src={Iconly}
        alt="search-iconly"
        className="absolute top-1/2 transform -translate-y-1/2 right-[10px]"
      />
    </div>
  );
};

export default SearchBar;

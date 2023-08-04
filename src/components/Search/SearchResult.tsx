import React, { SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';

// assets
import Dish from '../../assets/dish.svg';

interface SearchResultProps {
  image: string;
  recipe_name: string;
  cuisine_type: string;
  cooking_time: string;
  uniqueId: string;
  setSearchValue: React.Dispatch<SetStateAction<string>>;
}

const SearchResult: React.FC<SearchResultProps> = ({
  image,
  recipe_name,
  cuisine_type,
  cooking_time,
  uniqueId,
  setSearchValue,
}) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/discover-recipe?id=${uniqueId}`);
    setSearchValue('');
  };

  return (
    <div
      className="w-full relative grid grid-cols-4 hover:bg-[#E4FAEE] gap-2 rounded-md cursor-pointer px-2 my-3"
      onClick={handleNavigate}
    >
      <div className="w-full relative col-span-1 h-[70px] flex justify-end items-center">
        <img
          src={image}
          alt="search-result-image"
          className="w-full h-full object-cover rounded-[10px]"
        />
      </div>
      <div className="col-span-3 relative flex flex-col items-start justify-start px-2">
        <h3 className="font-[500] text-[14px] text-[#262F40] my-2">
          {recipe_name}
        </h3>
        <div className="flex">
          <div className="flex text-[#A3A3A3] items-center justify-center">
            <img src={Dish} alt="dish" />
            <span className="text-[#67748E] text-[10px] mx-2">
              {cuisine_type}
            </span>
          </div>
          <div className="flex text-[#A3A3A3] items-center justify-center ">
            <FontAwesomeIcon icon={faClock} className="w-[12px] h-[12px]" />
            <span className="text-[#67748E] text-[10px] mx-2">
              {`${cooking_time} mins`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;

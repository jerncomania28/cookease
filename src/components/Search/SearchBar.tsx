/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

//icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

//components
import SearchResult from './SearchResult';

// utils
import { readAllRecipe } from '../../utils/firebase';

import { isEmpty } from 'lodash';

interface SearchResultProps {
  cooking_time: string;
  createdAt: any;
  cuisine_type: string;
  dish_overview: string;
  displayName: string;
  email: string;
  id: string;
  image: {
    image_ref: string;
    image_url: string;
  };
  ingredients: string;
  instructions: string;
  rating: {
    uid: string;
    rating: number;
  };
  recipe_name: string;
  uniqueId: string;
}

interface searchMapProps {
  name: string;
  ingredients: string;
  'cuisine type': string;
  'cooking time': string;
}

const SearchBar: React.FC = () => {
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [searchResult, setSearchResult] = React.useState<SearchResultProps[]>(
    [],
  );
  const [isDropDown, setIsDropDown] = React.useState<boolean>(false);
  const [searchKey, setSearchKey] = React.useState<string>('Name');

  const searchMap: searchMapProps = {
    name: 'recipe_name',
    ingredients: 'ingredients',
    'cuisine type': 'cuisine_type',
    'cooking time': 'cooking_time',
  };

  const handleSearchResult = (value: string) => {
    readAllRecipe().then((response: any) => {
      const searchResponse = response.filter((result: any) => {
        return result[
          searchMap[searchKey.toLocaleLowerCase() as keyof searchMapProps]
        ]
          .toLowerCase()
          .includes(value.toLowerCase());
      });

      setSearchResult(searchResponse);
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    handleSearchResult(event.target.value);
  };

  const handleDropDown = () => {
    setIsDropDown(!isDropDown);
  };

  const handleSearchKey = (event: any) => {
    const { innerText } = event.target;
    setSearchKey(innerText);
    handleDropDown();
  };

  return (
    <div className="w-full relative">
      <div className="w-full relative rounded-xl flex bg-[#F3F4F6] ">
        <div className="w-[65%] md:w-[70%] relative">
          <input
            type="text"
            name="search"
            placeholder="Search..."
            className="w-full py-[0.5rem] px-2 outline-none rounded-tl-xl rounded-bl-xl bg-[#F3F4F6]  indent-[10px] focus:outline-[]"
            value={searchValue}
            onChange={handleChange}
          />
        </div>
        <div className="w-[35%] md:w-[30%] relative">
          <div
            className="flex border-[1px] border-solid border-[#ddd] py-[0.6rem] rounded-tr-xl rounded-br-xl items-center justify-center px-2 cursor-pointer text-gray-500"
            onClick={handleDropDown}
          >
            <span className="text-[13px] whitespace-nowrap">{searchKey}</span>
            <FontAwesomeIcon
              icon={isDropDown ? faChevronUp : faChevronDown}
              className="text-[10px] mx-2"
            />
          </div>
          {isDropDown && (
            <ul className="w-full absolute top-[3rem] z-10 bg-[#F3F4F6] shadow-sm rounded-md">
              <li
                className="rounded-tr-md rounded-tl-md py-2 px-2 text-[12px] hover:bg-black hover:bg-opacity-10 text-gray-800 cursor-pointer"
                onClick={handleSearchKey}
              >
                Name
              </li>
              <li
                className="py-2 px-2 text-[12px] hover:bg-black hover:bg-opacity-10 text-gray-800 cursor-pointer"
                onClick={handleSearchKey}
              >
                Ingredients
              </li>
              <li
                className="py-2 px-2 text-[12px] hover:bg-black hover:bg-opacity-10 text-gray-800 cursor-pointer"
                onClick={handleSearchKey}
              >
                Cuisine Type
              </li>
              <li
                className="rounded-br-md rounded-bl-md py-2 px-2 text-[12px] hover:bg-black hover:bg-opacity-10 text-gray-800 cursor-pointer whitespace-nowrap"
                onClick={handleSearchKey}
              >
                Cooking Time
              </li>
            </ul>
          )}
        </div>
      </div>
      {searchValue && (
        <div className="h-[200px] w-full absolute bg-white rounded-md shadow-md shadow-black-500 top-[3rem] z-10 p-2 ">
          <div className="h-[180px] overflow-y-scroll relative scroll">
            {!isEmpty(searchResult) ? (
              searchResult.map((item) => (
                <SearchResult
                  image={item.image.image_url}
                  recipe_name={item.recipe_name}
                  cuisine_type={item.cuisine_type}
                  cooking_time={item.cooking_time}
                  uniqueId={item.uniqueId}
                  setSearchValue={setSearchValue}
                />
              ))
            ) : (
              <div className="flex items-center justify-center">
                <h3 className="text-[15px] text-gray-400 ">No Recipe Found</h3>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;

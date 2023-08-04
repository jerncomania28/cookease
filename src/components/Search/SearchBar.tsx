/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

//icon

import Iconly from '../../assets/Iconly.svg';

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

const SearchBar: React.FC = () => {
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [searchResult, setSearchResult] = React.useState<SearchResultProps[]>(
    [],
  );

  const handleSearchResult = (value: string) => {
    readAllRecipe().then((response: any) => {
      console.log('response', response);
      const searchResponse = response.filter((result: any) =>
        result.recipe_name.includes(value),
      );

      setSearchResult(searchResponse);
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    handleSearchResult(event.target.value);
  };
  return (
    <div className="w-full relative">
      <div className="w-full relative rounded-xl bg-[#F3F4F6] ">
        <div className="w-[90%] relative">
          <input
            type="text"
            name="search"
            placeholder="Search..."
            className="w-full py-[0.5rem] px-2 outline-none rounded-tl-xl rounded-bl-xl bg-[#F3F4F6]  indent-[10px] focus:outline-[]"
            value={searchValue}
            onChange={handleChange}
          />
        </div>
        <img
          src={Iconly}
          alt="search-iconly"
          className="w-[20px] absolute top-1/2 transform -translate-y-1/2 right-[10px] cursor-pointer"
        />
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
                <h3 className="text-2xl text-[#1A202C]s">No Recipe Found</h3>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;

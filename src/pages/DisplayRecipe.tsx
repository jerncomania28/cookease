/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faAdd } from '@fortawesome/free-solid-svg-icons';

//components
import Tag from '../components/Tag';
// import RecipeCard from '../components/RecipeCard';

import queryString from 'query-string';
import { isEmpty } from 'lodash';

//assets
import DisplayRecipeImage from '../assets/display-image.svg';
import Reserve from '../assets/reserve.svg';

// utils
import { readCurrentRecipe } from '../utils/firebase';
import { DocumentData } from 'firebase/firestore';

const DisplayRecipe: React.FC = () => {
  const [recipeInformation, setRecipeInformation] = React.useState<
    DocumentData
  >({});

  const searchParam = useLocation();

  const parsedParam = queryString.parse(searchParam.search);

  React.useEffect(() => {
    readCurrentRecipe(parsedParam?.id as string).then((response) =>
      setRecipeInformation(response as DocumentData),
    );
  }, []);

  if (isEmpty(recipeInformation)) {
    return (
      <div className="w-full flex justify-center items-center text-2xl">
        {' '}
        loading recipe information ...
      </div>
    );
  }

  return (
    <div className="w-full relative grid grid-cols-8 gap-4">
      <div className="w-full relative col-span-8 md:col-span-6 flex flex-col bg-white rounded-md shadow px-4 py-3">
        {/* recipe display image */}
        <div className="w-full relative h-[350px]">
          <img
            src={recipeInformation.image_url}
            alt="display-recipe_image"
            className="w-full h-full object-cover rounded-md"
          />
        </div>

        {/* recipe tags and favorite button display */}
        <div className="my-4 flex justify-between items-center">
          <div className="flex ">
            <Tag className="flex px-3 py-2 rounded-[125px] justify-center items-center bg-[#E4FAEE] w-[110px] h-[40px]">
              <FontAwesomeIcon
                icon={faClock}
                className="text-[#0D9D50] h-[20px] w-[20px] "
              />
              <span className="text-[#0D9D50] font-[600] text-[15px] ml-2">
                {`${recipeInformation.cooking_time} mins`}
              </span>
            </Tag>
            <Tag className="flex px-3 py-2 rounded-[125px] justify-center items-center bg-[#E4FAEE] w-[110px] h-[40px] mx-2">
              <img src={Reserve} alt="reserve-icon h-[20px] w-[20px] " />
              <span className="text-[#0D9D50] font-[600] text-[15px] ml-2">
                {recipeInformation.cuisine_type}
              </span>
            </Tag>
          </div>
          <button
            className="px-4 py-2 md:bg-[#13A456] rounded-[12px] flex justify-center items-center opacity-50"
            disabled
          >
            <span className="text-white font-[600] text-[14px] hidden md:inline whitespace-nowrap">
              Add to favorite
            </span>
            <FontAwesomeIcon
              icon={faStar}
              className="text-[#13A456] md:text-white ml-2 h-[25px] w-[25px] md:w-[20px] md:h-[20px]"
            />
          </button>
        </div>

        <div className="w-full relative px-2">
          <div className="w-full border-b-[1px] border-solid border-[#EAECF0] py-2">
            <h2 className="w-[100px] font-[600] text-[14px] text-[#13A456]">
              Overview
            </h2>
          </div>

          {/* recipe description section */}

          <div className="text-[#1A202C] my-6">
            <h3 className="font-[700] text-[16px] my-2">Description</h3>
            <p className="font-[400] text-[14px]">
              {recipeInformation.dish_overview}
            </p>
          </div>

          {/* recipe ingredient section */}

          <div className="text-[#1A202C] my-6">
            <h3 className="font-[700] text-[16px] my-2">Ingredients</h3>
            <div className="font-[400] text-[14px] flex flex-wrap flex-auto">
              {recipeInformation.ingredients
                .split(',')
                .map((ingredient: string) => (
                  <Tag className="flex rounded-[125px] justify-center items-center bg-[#E4FAEE] my-2 mr-2 px-4 py-2 font-[600] text-[#0D9D50]">
                    {ingredient}
                  </Tag>
                ))}
            </div>
          </div>

          {/* recipe instructions */}
          <div className="text-[#1A202C] my-6">
            <h3 className="font-[700] text-[16px] my-2">Instructions</h3>
            <ul className="font-[400] text-[14px] flex flex-col border-[1px] border-solid border-[#0D9D50] rounded-[12px] bg-[#F8FDFB] px-4 py-3 list-disc list-inside">
              {recipeInformation.instructions
                .split(',')
                .map((instruction: string) => (
                  <li className="my-1 text-black">{instruction}</li>
                ))}
            </ul>
          </div>
        </div>
      </div>

      {/* user profile section */}
      <div className="w-full relative hidden md:flex col-span-2 flex flex-col">
        <div className="w-full reltive flex flex-col shadow py-4 bg-white justify-center items-center rounded-md">
          <div className="w-[82px] h-[82px] relative">
            <img
              src={DisplayRecipeImage}
              className="w-full h-full rounded-full  object-cover"
            />
          </div>
          <div className="my-3 flex justify-center flex-col items-center">
            <h3 className="font-[700] text-[18px] text-[#27272E]">
              {recipeInformation.displayName}
            </h3>
            <small className="font-[400] text-[14px] text-[#27272E]">
              Recipe creator
            </small>
          </div>
          <div className="flex justify-center items-center my-3">
            <button className="flex px-2 py-1 rounded-md justify-center items-center border-[1px] border-solid border-[#A0AEC0] ">
              <FontAwesomeIcon icon={faAdd} className="w-[11px] h-[11px]" />
              <span className="font-[500] text-[12px] mx-2">Send mail</span>
            </button>
            <button
              className="font-[500] text-[12px] mx-2 px-2 py-1 rounded-md text-white bg-[#13A456] opacity-50"
              disabled
            >
              copy number
            </button>
          </div>
        </div>

        {/* <div className="w-full relative flex flex-col bg-white rounded-md px-2 py-4 my-8 gap-6">
        </div> */}
      </div>
    </div>
  );
};

export default DisplayRecipe;

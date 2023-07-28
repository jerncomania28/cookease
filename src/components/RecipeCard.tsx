import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';

//components
import Rate from './Rate';

//assets
import RecipeImage from '../assets/recipe-image.svg';

const RecipeCard: React.FC = () => {
  const [rating, setRating] = React.useState<number>(0);

  return (
    <div className="w-full relative p-3 rounded-md bg-white flex flex-col shadow">
      <div className="w-full relative">
        <img
          src={RecipeImage}
          alt="recipe-image"
          className="rounded-md w-full"
        />
      </div>
      <div className="flex flex-col px-1">
        <h1 className="my-3 font-[700] text-[16px] text-[#1A202C]">
          Rainbow Spagehetti
        </h1>
        <div className="flex justify-between py-2">
          <div className="flex justify-center items-center">
            <FontAwesomeIcon
              icon={faClock}
              className="w-[15px] h-[15px] text-[#DCDCDC]"
            />
            <span className="ml-1 font-[500] text-[14px] text-[#1A202C]">
              20 min
            </span>
          </div>
          <Rate rating={rating} onRating={(idx) => setRating(idx)} />
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;

import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';

//components
import Rate from './Rate';
import { DocumentData } from 'firebase/firestore';

//assets
import defaultImage from '../assets/default-image.jpg';

interface RecipeCardItem {
  recipe: DocumentData;
}

const RecipeCard: React.FC<RecipeCardItem> = ({ recipe }) => {
  const [rating, setRating] = React.useState<number>(0);
  return (
    <Link
      to={`/discover-recipe?id=${recipe.uniqueId}`}
      className="w-full relative p-3 rounded-md bg-white flex flex-col shadow h-[240px]"
    >
      <div className="w-full relative h-[121px]">
        <img
          src={recipe.image_url || defaultImage}
          alt="recipe-image"
          className="rounded-md w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col px-1">
        <h1 className="my-3 font-[700] text-[16px] text-[#1A202C]">
          {recipe.recipe_name}
        </h1>
        <div className="flex justify-between py-2">
          <div className="flex justify-center items-center">
            <FontAwesomeIcon
              icon={faClock}
              className="w-[15px] h-[15px] text-[#DCDCDC]"
            />
            <span className="ml-1 font-[500] text-[14px] text-[#1A202C]">
              {`${recipe.cooking_time} mins`}
            </span>
          </div>
          <Rate rating={rating} onRating={(idx) => setRating(idx)} />
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;

import React from 'react';

//components
import RecipeCard from '../components/RecipeCard';

//utils

import { readMyRecipe, userHasRated } from '../utils/firebase';

//types
import { NewRecipeProps } from '../components/modals/NewRecipe';
import { DocumentData } from 'firebase/firestore';
import { isEmpty } from 'lodash';

// assets
import NoRecipe from '../assets/no-recipe.svg';

export interface RecipeProps extends NewRecipeProps {
  id: string;
  uniqueId: string;
  displayName: string;
  email: string;
  createdAt: unknown;
}

const Recipes: React.FC = () => {
  const [selectedKey, setSelectedKey] = React.useState<string>('ingredient');
  const [recipes, setRecipes] = React.useState<DocumentData[]>([]);
  const [isCreated, setIsCreated] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setSelectedKey(value);
  };

  React.useEffect(() => {
    setIsLoading(true);
    readMyRecipe()
      .then((response) => {
        if (!isEmpty(response)) {
          setIsCreated(true);
          setRecipes(response as DocumentData[]);
        } else {
          setIsCreated(false);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  console.log('selected key', selectedKey);

  if (isLoading) {
    return (
      <div className="w-full h-1/2 flex justify-center items-center">
        <svg
          className="mr-3 h-[40px] w-[40px] animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    );
  }

  if (!isCreated) {
    return (
      <div className="w-full h-full relative flex justify-center items-center">
        <img
          src={NoRecipe}
          alt="no-recipe"
          className="w-[80%] mx-auto h-full"
        />
      </div>
    );
  }

  return (
    <div className="w-full relative h-full">
      <div className="w-full relative my-4 h-[50px]">
        <select
          className="py-3 px-4 bg-transparent rounded-md outline-none shadow"
          onChange={handleChange}
        >
          <option value="ingredient">Ingredient</option>
          <option value="cooking_time">Cooking time</option>
          <option value="cuisine_type">Cusine Type</option>
        </select>
      </div>
      <div className="w-full h-recipe grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3 overflow-y-scroll scroll py-3 px-3">
        {recipes?.map((recipe, _idx) => {
          const userRating =
            userHasRated(recipe).length !== 0
              ? userHasRated(recipe)[0].rating
              : 0;

          return (
            <RecipeCard recipe={recipe} key={_idx} userRating={userRating} />
          );
        })}
      </div>
    </div>
  );
};

export default Recipes;

import React from 'react';
import { isEmpty } from 'lodash';

//components
import RecipeCard from '../components/RecipeCard';
import WeekRecipe from '../components/WeekRecipe';

// utils
import { readAllRecipe, userHasRated } from '../utils/firebase';
import { DocumentData } from 'firebase/firestore';

const Dashboard: React.FC = () => {
  const [allRecipe, setAllRecipe] = React.useState<DocumentData[]>([]);
  const [isCreated, setIsCreated] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsLoading(true);
    readAllRecipe()
      .then((response) => {
        if (!isEmpty(response)) {
          setIsCreated(true);
          setAllRecipe(response as DocumentData[]);
        } else {
          setIsCreated(false);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-1/2 flex justify-center items-center ">
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
      <div className="w-full flex justify-center items-center text-2xl">
        {' '}
        No Recipe in Database.
      </div>
    );
  }

  return (
    <div className="w-full relative">
      <WeekRecipe />
      <h1 className="font-[700] text-[20px] text-[#1A1D23] my-4">
        🔥Featured recipes
      </h1>
      <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3">
        {allRecipe.map((recipe, _idx) => {
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

export default Dashboard;

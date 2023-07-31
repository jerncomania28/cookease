import React from 'react';
import { isEmpty } from 'lodash';

//components
import RecipeCard from '../components/RecipeCard';
import WeekRecipe from '../components/WeekRecipe';

// utils
import { readAllRecipe } from '../utils/firebase';
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
      <div className="w-full flex justify-center items-center text-2xl">
        {' '}
        loading recipe ...
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
        {allRecipe.map((recipe) => (
          <RecipeCard recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

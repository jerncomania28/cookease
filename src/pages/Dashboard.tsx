import React from 'react';

//components
import RecipeCard from '../components/RecipeCard';
import WeekRecipe from '../components/WeekRecipe';

// utils
import { readAllRecipe } from '../utils/firebase';
import { DocumentData } from 'firebase/firestore';

const Dashboard: React.FC = () => {
  const [allRecipe, setAllRecipe] = React.useState<DocumentData[]>([]);

  React.useEffect(() => {
    readAllRecipe().then((response) =>
      setAllRecipe(response as DocumentData[]),
    );
  }, []);

  if (allRecipe.length === 0) {
    return (
      <div className="w-full flex justify-center items-center text-2xl">
        {' '}
        loading recipe ...
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

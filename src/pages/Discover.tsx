import React from 'react';

//components
import RecipeCard from '../components/RecipeCard';

// utils
import { readAllRecipe } from '../utils/firebase';
import { DocumentData } from 'firebase/firestore';

const Discover: React.FC = () => {
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
      <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3">
        {allRecipe.map((recipe) => (
          <RecipeCard recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Discover;

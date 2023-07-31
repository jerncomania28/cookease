import React from 'react';
import { isEmpty } from 'lodash';

//components
import RecipeCard from '../components/RecipeCard';

// utils
import { readAllRecipe } from '../utils/firebase';
import { DocumentData } from 'firebase/firestore';

const Discover: React.FC = () => {
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
      <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3">
        {allRecipe.map((recipe) => (
          <RecipeCard recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Discover;

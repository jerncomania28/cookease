import React from 'react';

//components
import RecipeCard from '../components/RecipeCard';

//utils

import { readMyRecipe } from '../utils/firebase';

//types
import { NewRecipeProps } from '../components/modals/NewRecipe';
import { DocumentData } from 'firebase/firestore';
import { isEmpty } from 'lodash';

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
        No Recipe Created.
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
        {recipes?.map((recipe) => (
          <RecipeCard recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Recipes;

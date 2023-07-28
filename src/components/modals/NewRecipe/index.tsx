import React, { useContext } from 'react';
import { AuthContext } from '../../../context/auth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

// component
import ImageFileUpload from './ImageFileUpload';
import RecipeInput from './RecipeInput';
import RecipeDropDown from './RecipeDropDown';
import RecipeTextArea from './RecipeTextArea';

interface NewRecipeProps {
  image_url: string;
  recipe_name: string;
  dish_overview: string;
  cooking_time: string;
  ingredients: string;
  cuisine_type: string;
}

const defaultNewRecipeProps = {
  image_url: '',
  recipe_name: '',
  dish_overview: '',
  cooking_time: '',
  ingredients: '',
  cuisine_type: '',
};

const NewRecipe: React.FC = () => {
  const [newRecipe, setNewRecipe] = React.useState<NewRecipeProps>(
    defaultNewRecipeProps,
  );
  const { handleNewRecipe } = useContext(AuthContext);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;

    setNewRecipe({ ...newRecipe, [name]: value });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-black bg-opacity-70">
      <div className="w-[90%] relative mx-auto md:w-[60%] rounded-md bg-white py-2 px-6">
        <div className="flex justify-between my-2">
          <h1 className="text-[#1A202C] text-[18px] font-[700]">
            Add New Recipe
          </h1>
          <FontAwesomeIcon
            icon={faXmark}
            className="w-[20px] h-[20px] cursor-pointer"
            onClick={handleNewRecipe}
          />
        </div>
        <ImageFileUpload />
        <RecipeInput
          label="Recipe name"
          type="text"
          name="recipe_name"
          id="recipe_name"
          handleChange={handleChange}
        />
        <RecipeDropDown
          label="Cooking time"
          name="cooking_time"
          handleChange={handleChange}
          options={['10', '20', '30', '40', '50', '60']}
        />
        <RecipeTextArea
          label="ingredients"
          name="ingredients"
          handleChange={handleChange}
        />
        <RecipeDropDown
          label="Cuisine type"
          name="cuisine_type"
          handleChange={handleChange}
          options={['Italian', 'Mexican', 'French', 'Chinese']}
        />
        <button
          role="button"
          className=" w-full py-2 rounded-md text-white bg-[#13A456] flex justify-center items-center my-3"
        >
          Create Recipe
        </button>
      </div>
    </div>
  );
};

export default NewRecipe;

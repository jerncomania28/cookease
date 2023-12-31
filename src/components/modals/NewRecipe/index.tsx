/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../context/auth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

// component
import ImageFileUpload from './ImageFileUpload';
import RecipeInput from './RecipeInput';
import RecipeDropDown from './RecipeDropDown';
import RecipeTextArea from './RecipeTextArea';

// validation
import validation, { ErrorProps } from './NewRecipeValidation';

//utils
import { createRecipeDocument } from '../../../utils/firebase';

// cusine data
import { cusineType } from '../../../constants/cusine_options';

export interface NewRecipeProps {
  image: {
    image_url: string;
    image_ref: string;
  };
  recipe_name: string;
  dish_overview: string;
  cooking_time: string;
  ingredients: string;
  cuisine_type: string;
  instructions: string;
  uniqueId?: string;
}

interface NewRecipeEditProps {
  recipe?: any;
  isEdit?: boolean;
}

const defaultNewRecipeProps = {
  image: {
    image_url: '',
    image_ref: '',
  },
  recipe_name: '',
  dish_overview: '',
  cooking_time: '10',
  ingredients: '',
  cuisine_type: 'Italian',
  instructions: '',
};

const NewRecipe: React.FC<NewRecipeEditProps> = ({ recipe, isEdit }) => {
  const [newRecipe, setNewRecipe] = React.useState<NewRecipeProps>(
    recipe || defaultNewRecipeProps,
  );

  const [errors, setErrors] = React.useState<ErrorProps>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const navigate = useNavigate();

  const { handleNewRecipe, handleEditRecipe } = useContext(AuthContext);

  const handleCancel = () => {
    handleEditRecipe({});
    handleNewRecipe();
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;

    setNewRecipe({ ...newRecipe, [name]: value });
  };

  const handleSubmit = () => {
    const errors = validation(newRecipe);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      createRecipeDocument(newRecipe)
        .then(() => {
          toast.success('🦄 recipe succesfully added!!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
          handleNewRecipe();
          handleEditRecipe({});
        })
        .finally(() => {
          setIsLoading(false);
          navigate('/my-recipes');
        });
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-black bg-opacity-70">
      <div className="w-[90%] max-h-[600px] relative mx-auto md:w-[60%] rounded-md bg-white py-2 px-6">
        <div className="flex justify-between my-2">
          <h1 className="text-[#1A202C] text-[18px] font-[700]">
            {isEdit ? 'Edit Recipe' : ' Add New Recipe'}
          </h1>
          <FontAwesomeIcon
            icon={faXmark}
            className="w-[20px] h-[20px] cursor-pointer"
            onClick={handleCancel}
          />
        </div>
        <div className="relative h-[500px] overflow-y-scroll px-2 md:px-4 py-2 scroll">
          <ImageFileUpload
            setNewRecipe={setNewRecipe}
            newRecipe={newRecipe}
            error={errors?.image_url}
            value={newRecipe.image}
          />
          <RecipeInput
            label="Recipe name"
            type="text"
            name="recipe_name"
            id="recipe_name"
            handleChange={handleChange}
            error={errors?.recipe_name}
            value={newRecipe.recipe_name}
          />
          <RecipeTextArea
            label="Dish Overview"
            name="dish_overview"
            handleChange={handleChange}
            error={errors?.dish_overview}
            value={newRecipe.dish_overview}
          />
          <RecipeDropDown
            label="Cooking time"
            name="cooking_time"
            handleChange={handleChange}
            options={['10', '20', '30', '40', '50', '60']}
            error={errors?.cooking_time}
            isLabel
            value={newRecipe.cooking_time}
          />
          <RecipeTextArea
            label="ingredients"
            name="ingredients"
            handleChange={handleChange}
            error={errors?.ingredients}
            isSubtext
            subtext="separate ingredients with semi-colon"
            value={newRecipe.ingredients}
          />
          <RecipeDropDown
            label="Cuisine type"
            name="cuisine_type"
            handleChange={handleChange}
            options={cusineType}
            error={errors?.cuisine_type}
            isLabel
            value={newRecipe.cuisine_type}
          />
          <RecipeTextArea
            label="Instructions"
            name="instructions"
            handleChange={handleChange}
            error={errors?.instructions}
            isSubtext
            subtext="separate instructions with semi-colon"
            value={newRecipe.instructions}
          />
        </div>
        <button
          className={`w-full  py-2 text-white bg-[#13A456] text-[16px] font-[600] rounded-md  ${
            isLoading ? 'opacity-50' : ''
          }`}
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? 'Creating recipe...' : 'Create Recipe'}
        </button>
      </div>
    </div>
  );
};

export default NewRecipe;

import { NewRecipeProps } from '.';

export interface ErrorProps {
  image_url?: string;
  recipe_name?: string;
  dish_overview?: string;
  cooking_time?: string;
  ingredients?: string;
  cuisine_type?: string;
  instructions?: string;
}

const validation = (values: NewRecipeProps) => {
  const errors: ErrorProps = {};
  const ingredientsRegex = new RegExp('.*[,].*');

  if (!values.image?.image_url) {
    errors.image_url = 'upload an image!';
  }

  if (!values.recipe_name) {
    errors.recipe_name = 'recipe name is required!';
  }
  if (!values.dish_overview) {
    errors.dish_overview = 'dish overview information required!';
  }
  if (!values.cooking_time) {
    errors.cooking_time = 'cooking time is required!';
  }

  if (!values.ingredients) {
    errors.ingredients = 'list of ingredients required.';
  } else if (!ingredientsRegex.test(values.ingredients)) {
    errors.ingredients = 'use comma separated format to pass in ingredients';
  }
  if (!values.cuisine_type) {
    errors.cuisine_type = 'select a cuisine type.';
  }
  if (!values.instructions) {
    errors.instructions = 'instructions are required.';
  } else if (!ingredientsRegex.test(values.instructions)) {
    errors.instructions = 'use comma separated format to pass in instructions';
  }

  return errors;
};

export default validation;

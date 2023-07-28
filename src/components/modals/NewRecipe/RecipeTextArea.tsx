import React from 'react';

interface RecipeTextAreaProps {
  label: string;
  name: string;
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isIngredient?: boolean;
  error?: string;
}

const RecipeTextArea: React.FC<RecipeTextAreaProps> = ({
  label,
  name,
  handleChange,
  error,
  isIngredient,
}) => {
  return (
    <div className="w-full relative flex flex-col my-4">
      <label
        htmlFor={name}
        className="my-2 font-[500] text-[14px] text-[#344054] capitalize"
      >
        {label}
      </label>
      <textarea
        name={name}
        id={name}
        className="py-3 px-4 border border-solid border-gray-300 rounded-md outline-none resize-y"
        placeholder="Enter recipe instructions"
        onChange={handleChange}
      ></textarea>
      {error ? (
        <small className="text-red-600 font-[500]">{error}</small>
      ) : (
        isIngredient && (
          <small className="font-[400] text-[#667085] text-[14px] my-1">
            Separate ingredients with a comma
          </small>
        )
      )}
    </div>
  );
};

export default RecipeTextArea;

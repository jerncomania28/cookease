import React from 'react';

interface RecipeInputProps {
  label: string;
  type: string;
  id: string;
  name: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RecipeInput: React.FC<RecipeInputProps> = ({
  label,
  type,
  name,
  id,
  handleChange,
}) => {
  return (
    <div className="w-full relative flex flex-col my-2">
      <label
        htmlFor="recipe_name"
        className="my-2 font-[500] text-[14px] text-[#344054] capitalize"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        className="py-2 px-3 border-[1px] border-solid border-[#D0D5DD] rounded-md outline-none break-all"
        onChange={handleChange}
      />
    </div>
  );
};

export default RecipeInput;

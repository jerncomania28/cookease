import React from 'react';

interface RecipeInputProps {
  label: string;
  type: string;
  id: string;
  name: string;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const RecipeInput: React.FC<RecipeInputProps> = ({
  label,
  type,
  name,
  id,
  handleChange,
  error,
  value,
}) => {
  return (
    <div className="w-full relative flex flex-col my-4">
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
        value={value}
        className="py-4 px-6 border-[1px] border-solid border-[#D0D5DD] rounded-md outline-none break-all"
        onChange={handleChange}
      />
      {error && <small className="text-red-600 font-[500]">{error}</small>}
    </div>
  );
};

export default RecipeInput;

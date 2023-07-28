import React from 'react';

interface RecipeDropDownProps {
  label: string;
  name: string;
  options: string[];
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
}

const RecipeDropDown: React.FC<RecipeDropDownProps> = ({
  label,
  name,
  options,
  handleChange,
  error,
}) => {
  return (
    <div className="w-full relative flex flex-col my-4">
      <label
        htmlFor={name}
        className="my-2 font-[500] text-[14px] text-[#344054] capitalize"
      >
        {label}
      </label>
      <select
        name={name}
        id={name}
        className="py-3 px-4 border border-solid bg-white border-gray-300 rounded-md outline-none"
        onChange={handleChange}
      >
        {options.map((option, _idx) => (
          <option key={_idx} value={option}>
            {name === 'cooking_time' ? `${option} mins` : option}
          </option>
        ))}
      </select>
      {error && <small className="text-red-600 font-[500]">{error}</small>}
    </div>
  );
};

export default RecipeDropDown;

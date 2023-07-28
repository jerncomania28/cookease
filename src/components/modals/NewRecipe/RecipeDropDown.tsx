import React from 'react';

interface RecipeDropDownProps {
  label: string;
  name: string;
  options: string[];
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const RecipeDropDown: React.FC<RecipeDropDownProps> = ({
  label,
  name,
  options,
  handleChange,
}) => {
  return (
    <div className="w-full relative flex flex-col my-2">
      <label
        htmlFor={name}
        className="my-2 font-[500] text-[14px] text-[#344054] capitalize"
      >
        {label}
      </label>
      <select
        name={name}
        id={name}
        className="py-2 px-3 border border-solid bg-white border-gray-300 rounded-md outline-none"
        onChange={handleChange}
      >
        {options.map((option, _idx) => (
          <option key={_idx} value={option}>
            {name === 'cooking_time' ? `${option} mins` : option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RecipeDropDown;

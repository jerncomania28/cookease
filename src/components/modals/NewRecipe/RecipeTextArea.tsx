import React from 'react';

interface RecipeTextAreaProps {
  label: string;
  name: string;
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const RecipeTextArea: React.FC<RecipeTextAreaProps> = ({
  label,
  name,
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
      <textarea
        name={name}
        id={name}
        className="py-1 px-3 border border-solid border-gray-300 rounded-md outline-none resize-y"
        placeholder="Enter recipe instructions"
        onChange={handleChange}
      ></textarea>
      <small className="font-[400] text-[#667085] text-[14px] my-1">
        Separate ingredients with a comma
      </small>
    </div>
  );
};

export default RecipeTextArea;

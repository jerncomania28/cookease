import React, { useContext } from 'react';
import { AuthContext } from '../../context/auth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

// component
import ImageFileUpload from '../ImageFileUpload';

const NewRecipe: React.FC = () => {
  const { handleNewRecipe } = useContext(AuthContext);

  return (
    <div className="w-full h-screen absolute top-0 left-0">
      <div className="w-full h-full absolute top-0 left-0 bg-black bg-opacity-40"></div>
      <div className="w-[90%] mx-auto md:w-[60%] rounded-md bg-white p-3 z-5">
        <div className="flex justify-between">
          <h1 className="text-[#1A202C] text-[24px] font-[700]">
            Add New Recipe
          </h1>
          <FontAwesomeIcon
            icon={faXmark}
            className="w-[24px] h-[24px]"
            onClick={handleNewRecipe}
          />
        </div>
        <ImageFileUpload />
      </div>
    </div>
  );
};

export default NewRecipe;

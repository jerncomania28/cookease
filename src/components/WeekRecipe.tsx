import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';

//components
import Rate from './Rate';
import Tag from './Tag';

const WeekRecipe: React.FC = () => {
  const [rating, setRating] = React.useState<number>(0);

  return (
    <div className="w-full relative bg-week-recipe bg-cover py-8 px-8 mb-10">
      <div className="w-full h-full absolute top-0 left-0 bg-[#000000CC] opacity-70 rounded-md"></div>
      <div className="w-[80%] md:w-[50%] relative">
        <Tag className="px-2 py-1 uppercase bg-white bg-opacity-40 text-white font-[700] text-[12px]">
          Recipe of The Week
        </Tag>
        <h3 className="text-white my-6 font-[700] text-[20px]">
          Savor the week's finest recipe—a delightful culinary masterpiece
          awaits!
        </h3>
        <div className="w-[50%] relative flex justify-between py-2">
          <div className="flex justify-center items-center">
            <FontAwesomeIcon
              icon={faClock}
              className="w-[15px] h-[15px] text-white"
            />
            <span className="ml-1 font-[500] text-[14px] text-white">
              20 min
            </span>
          </div>
          <Rate rating={rating} onRating={(idx) => setRating(idx)} />
        </div>
      </div>
    </div>
  );
};

export default WeekRecipe;

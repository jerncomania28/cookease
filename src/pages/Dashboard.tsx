import React from 'react';

//components
import RecipeCard from '../components/RecipeCard';
import WeekRecipe from '../components/WeekRecipe';

const Dashboard: React.FC = () => {
  return (
    <div className="w-full relative">
      <WeekRecipe />
      <h1 className="font-[700] text-[20px] text-[#1A1D23] my-4">
        🔥Featured recipes
      </h1>
      <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3 ">
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
      </div>
    </div>
  );
};

export default Dashboard;

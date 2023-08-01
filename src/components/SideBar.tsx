/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../context/auth';

//components
import Tag from './Tag';

//assets
import Logo from '../assets/logo.svg';
import Dashboard from '../assets/dashboard.svg';
import Discover from '../assets/discover.svg';
import Recipes from '../assets/recipe.svg';
import Favorite from '../assets/favorites.svg';
import Settings from '../assets/settings.svg';
import Plus from '../assets/plus.svg';
import Logout from '../assets/logout.svg';

// utils
import { signOutUser } from '../utils/firebase';
import storageUtils from '../utils/storageUtils';

interface SideLinkProp {
  icon: string;
  href: string;
  text: string;
  isDisabled: boolean;
}

const sideBarLinks: SideLinkProp[] = [
  {
    icon: Dashboard,
    href: '/dashboard',
    text: 'Dashboard',
    isDisabled: false,
  },
  {
    icon: Discover,
    href: '/discover',
    text: 'Discover',
    isDisabled: false,
  },
  {
    icon: Recipes,
    href: '/my-recipes',
    text: 'My Recipes',
    isDisabled: false,
  },
  {
    icon: Favorite,
    href: '/my-favorite',
    text: 'My favourites',
    isDisabled: true,
  },
  {
    icon: Settings,
    href: '/settings',
    text: 'Settings',
    isDisabled: true,
  },
];

const SideBar: React.FC = () => {
  const navigate = useNavigate();

  const {
    currentUser,
    handleMobile,
    handleNewRecipe,
    setIsMobile,
  } = useContext(AuthContext);

  const handleLogOut = () => {
    signOutUser();
    storageUtils.clearStorage();
    toast.info('🦄 logged out user!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
    navigate('/');
  };

  const handleAddNewRecipe = () => {
    setIsMobile(false);
    handleNewRecipe();
  };

  return (
    <div className="w-full h-[100vh] relative flex flex-col justify-between shadow bg-white">
      {/* dashbord nav */}
      <div className="block">
        <div className="h-[160px] relative bg-[#0C1325] flex flex-col justify-center items-center">
          {/* dashboard cancel button on mobile */}
          <FontAwesomeIcon
            icon={faXmark}
            className="text-white w-[32px] h-[32px] self-end pb-5 px-4 md:hidden"
            onClick={handleMobile}
          />
          <img src={Logo} alt="logo-img" className="py-4" />
        </div>

        {/* dashboard menu items list */}
        <div className="my-4 h-custom relative">
          <h1 className="uppercase text-[#586474] font-[400] text-[16px] px-4 py-1">
            {' '}
            Menu
          </h1>
          {sideBarLinks.map((linkItem, _idx) => (
            <NavLink
              onClick={() => setIsMobile(false)}
              key={_idx}
              to={linkItem.href}
              className={({ isActive }) =>
                `w-full flex px-4 py-3 items-center ${
                  linkItem.isDisabled && 'pointer-events-none'
                }   ${
                  isActive
                    ? 'border-r-[4px] border-solid border-[#13A456] text-[#13A456] bg-[#ECF8F2] font-[700] filter-[#13A456]'
                    : 'text-[#586474] font-[400] filter-[#586474]'
                }`
              }
            >
              <img
                src={linkItem.icon}
                alt="dashboard-icon"
                className="w-[20px] h-[20px]"
              />
              <span className="mx-4 whitespace-nowrap  text-[14px] md:text-[16px]">
                {linkItem.text}
              </span>
              {linkItem.isDisabled && (
                <Tag className="mx-2 text-[8px] md:text-[12px] py-1 px-2 bg-[#F2F4F7] text-[#344054] font-[500]">
                  coming soon
                </Tag>
              )}
            </NavLink>
          ))}

          {/* adding new recipe pop-up trigger */}
          <button
            role="button"
            className="w-[90%] mx-auto py-2 px-6 rounded-md text-white bg-[#13A456] flex justify-center items-center my-3"
            onClick={handleAddNewRecipe}
          >
            <span>New Recipe</span>
            <img src={Plus} alt="recipe-plus" className="mx-2" />
          </button>
        </div>
      </div>

      {/* profile info and sign out */}

      <div className="w-full relative flex justify-center items-center py-2">
        <FontAwesomeIcon
          icon={faCircleUser}
          className="w-[40px] h-[40px] rounded-full"
        />
        <div className="flex flex-col mx-2 md:mx-4 text-[14px] md:text-[16px]">
          <h3>{currentUser.displayName}</h3>
          <h4 className="text-center">
            {currentUser.email.length >= 15
              ? currentUser.email.substring(0, 15) + '...'
              : currentUser.email}
          </h4>
        </div>
        <img
          src={Logout}
          alt="log-out"
          className="w-[36px] h-[36px] cursor-pointer"
          onClick={handleLogOut}
        />
      </div>
    </div>
  );
};

export default SideBar;

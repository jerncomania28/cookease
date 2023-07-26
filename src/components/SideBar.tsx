import React from 'react';
import { NavLink, Link } from 'react-router-dom';

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
import Avatar from '../assets/avatar.svg';
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
  const handleLogOut = () => {
    signOutUser();
    storageUtils.clearStorage();
  };

  return (
    <div className="w-full h-[100vh] relative hidden md:flex md:flex-col md:justify-between shadow">
      {/* dashbord nav */}
      <div className="block">
        <div className="h-[160px] bg-[#0C1325] flex justify-center items-center">
          <img src={Logo} alt="logo-img" />
        </div>
        <div className="my-6">
          <h1 className="uppercase text-[#586474] font-[400] text-[16px] px-6 py-4">
            {' '}
            Menu
          </h1>
          {sideBarLinks.map((linkItem, _idx) => (
            <NavLink
              key={_idx}
              to={linkItem.href}
              className={({ isActive }) =>
                `w-full text-[18px] flex px-6 py-3 items-center ${
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
              <span className="mx-4">{linkItem.text}</span>
              {linkItem.isDisabled && <Tag tagContent="coming soon" />}
            </NavLink>
          ))}
          <Link
            to="#"
            className="w-[90%] mx-auto py-3 px-6 rounded-md text-white bg-[#13A456] flex justify-center items-center my-3"
          >
            <span>New Recipe</span>
            <img src={Plus} alt="recipe-plus" className="mx-2" />
          </Link>
        </div>
      </div>

      {/* profile info and sign out */}

      <div className="w-full relative flex justify-center items-center py-2">
        <img
          src={Avatar}
          alt="avatar"
          className="w-[40px] h-[40px] rounded-full"
        />
        <div className="flex flex-col mx-4">
          <h3>Bola Olaniyan</h3>
          <h4>bolaolaniyan@qa.team</h4>
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

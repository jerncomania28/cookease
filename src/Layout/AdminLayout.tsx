/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
import { AuthContext } from '../context/auth';

//components
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import NewRecipe from '../components/modals/NewRecipe';

//utils
import { authStateChange } from '../utils/firebase';
import storageUtils from '../utils/storageUtils';
import { isEmpty } from 'lodash';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const {
    isMobile,
    handleIsLoggedIn,
    handleCurrentUser,
    isNewRecipe,
    editRecipe,
  } = useContext(AuthContext);

  React.useEffect(() => {
    const unsubscribeFn = () => {
      const unsubscribe = authStateChange((user) => {
        const _ac = user ? true : false;
        handleIsLoggedIn(_ac);
        handleCurrentUser(storageUtils.getItem());
      });

      return unsubscribe;
    };

    unsubscribeFn();
  }, []);

  return (
    <>
      <div className="w-full h-screen relative grid grid-cols-8">
        <div className="hidden w-full relative md:col-span-2 md:block">
          <SideBar />
        </div>
        <div className="w-full relative col-span-8 md:col-span-6 flex flex-col items-center">
          <Header />
          <div className="w-full h-layout relative overflow-y-scroll bg-[#F3F4F6] py-4 px-3 md:px-6">
            {children}
          </div>
        </div>
      </div>
      {isMobile && (
        <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-black bg-opacity-70">
          <div className="top-0 left-0 fixed w-[70%] md:hidden z-10 ">
            <SideBar />
          </div>
        </div>
      )}
      {isNewRecipe && (
        <NewRecipe
          recipe={!isEmpty(editRecipe) && editRecipe}
          isEdit={!isEmpty(editRecipe)}
        />
      )}
    </>
  );
};

export default AdminLayout;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
import { AuthContext } from '../context/auth';

//components
import Header from '../components/Header';
import SideBar from '../components/SideBar';

//assets
import Hamburger from '../assets/hamburger.svg';

//utils
import { authStateChange } from '../utils/firebase';
import storageUtils from '../utils/storageUtils';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const {
    isMobile,
    handleMobile,
    handleIsLoggedIn,
    handleCurrentUser,
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
        <div className="hidden w-full relative md:col-span-2 md:flex">
          <div className="w-full sticky top-0 left-0">
            <SideBar />
          </div>
        </div>
        <div className="w-full relative col-span-8 md:col-span-6 flex flex-col items-center">
          <div className="w-full sticky top-0">
            <Header />
          </div>
          <div className="w-full">{children}</div>
        </div>
        <div className="w-full flex justify-end fixed bottom-0 py-4 px-3 shadow-md md:hidden">
          <img
            src={Hamburger}
            alt="hamburger-icon"
            className="w-[30px] h-[30px]"
            onClick={handleMobile}
          />
        </div>
      </div>
      {isMobile && (
        <div className="fixed h-screen top-0 left-0  w-[70%] md:hidden z-10 bg-white">
          <SideBar />
        </div>
      )}
    </>
  );
};

export default AdminLayout;

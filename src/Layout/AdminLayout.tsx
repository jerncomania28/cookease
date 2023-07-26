import React from 'react';

//components
import Header from '../components/Header';
import SideBar from '../components/SideBar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="w-full h-screen relative grid grid-cols-8">
      <div className="w-full relative md:col-span-2">
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
    </div>
  );
};

export default AdminLayout;

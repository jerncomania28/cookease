import React from 'react';
import { Navigate } from 'react-router-dom';

//utils
import storageUtils from '../utils/storageUtils';

interface ProtectedRoutesProps {
  children: React.ReactNode;
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ children }) => {
  const currentUser = storageUtils.getItem();

  if (!currentUser) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;

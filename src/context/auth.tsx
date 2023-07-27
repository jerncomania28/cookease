import React, { createContext, useState } from 'react';

const defaultCurrentUser = {
  createdAt: '',
  displayName: '',
  email: '',
};

export interface CurrentUserProps {
  displayName: string;
  email: string;
}

interface InitialStateProps {
  isLoggedIn: boolean;
  currentUser: CurrentUserProps;
  isMobile: boolean;
  handleCurrentUser: (currentUser: CurrentUserProps) => void;
  handleIsLoggedIn: (_ac: boolean) => void;
  handleMobile: () => void;
}

const initialState = {
  isLoggedIn: false,
  currentUser: defaultCurrentUser,
  isMobile: false,
  handleCurrentUser: () => null,
  handleIsLoggedIn: () => null,
  handleLightBox: () => null,
  handleMobile: () => null,
};

export const AuthContext = createContext<InitialStateProps>(initialState);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<CurrentUserProps>(
    defaultCurrentUser,
  );
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  const handleIsLoggedIn = (_ac: boolean) => {
    setIsLoggedIn(_ac);
  };

  const handleCurrentUser = (currentUser: CurrentUserProps) => {
    setCurrentUser(currentUser);
  };

  const handleMobile = () => {
    setIsMobile(!isMobile);
  };

  const value = {
    currentUser,
    handleCurrentUser,
    isLoggedIn,
    handleIsLoggedIn,
    isMobile,
    handleMobile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

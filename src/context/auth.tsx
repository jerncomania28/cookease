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
  handleCurrentUser: (currentUser: CurrentUserProps) => void;
  handleIsLoggedIn: (_ac: boolean) => void;
}

const initialState = {
  isLoggedIn: false,
  currentUser: defaultCurrentUser,
  handleCurrentUser: () => null,
  handleIsLoggedIn: () => null,
  handleLightBox: () => null,
};

export const AuthContext = createContext<InitialStateProps>(initialState);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<CurrentUserProps>(
    defaultCurrentUser,
  );

  const handleIsLoggedIn = (_ac: boolean) => {
    setIsLoggedIn(_ac);
  };

  const handleCurrentUser = (currentUser: CurrentUserProps) => {
    setCurrentUser(currentUser);
  };

  const value = {
    currentUser,
    handleCurrentUser,
    isLoggedIn,
    handleIsLoggedIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

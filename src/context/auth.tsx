import React, { createContext, useState } from 'react';

import { DocumentData } from 'firebase/firestore';

const defaultCurrentUser = {
  createdAt: '',
  displayName: '',
  email: '',
  id: '',
};

export interface CurrentUserProps {
  displayName: string;
  email: string;
  id: string;
}

interface InitialStateProps {
  isLoggedIn: boolean;
  currentUser: CurrentUserProps;
  isMobile: boolean;
  editRecipe: DocumentData | undefined;
  setIsMobile: React.Dispatch<React.SetStateAction<boolean>>;
  setIsNewRecipe: React.Dispatch<React.SetStateAction<boolean>>;
  isNewRecipe: boolean;
  handleCurrentUser: (currentUser: CurrentUserProps) => void;
  handleIsLoggedIn: (_ac: boolean) => void;
  handleMobile: () => void;
  handleNewRecipe: () => void;
  handleEditRecipe: (item: DocumentData) => void;
}

const initialState = {
  isLoggedIn: false,
  currentUser: defaultCurrentUser,
  isMobile: false,
  isNewRecipe: false,
  editRecipe: {},
  setIsMobile: () => null,
  setIsNewRecipe: () => null,
  handleCurrentUser: () => null,
  handleIsLoggedIn: () => null,
  handleLightBox: () => null,
  handleMobile: () => null,
  handleNewRecipe: () => null,
  handleEditRecipe: () => null,
};

export const AuthContext = createContext<InitialStateProps>(initialState);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<CurrentUserProps>(
    defaultCurrentUser,
  );
  const [isMobile, setIsMobile] = React.useState<boolean>(false);
  const [isNewRecipe, setIsNewRecipe] = React.useState<boolean>(false);
  const [editRecipe, setEditRecipe] = React.useState<DocumentData | undefined>(
    {},
  );

  const handleIsLoggedIn = (_ac: boolean) => {
    setIsLoggedIn(_ac);
  };

  const handleCurrentUser = (currentUser: CurrentUserProps) => {
    setCurrentUser(currentUser);
  };

  const handleMobile = () => {
    setIsMobile(!isMobile);
  };

  const handleNewRecipe = () => {
    setIsNewRecipe(!isNewRecipe);
  };

  const handleEditRecipe = (item: DocumentData) => {
    setEditRecipe(item);
  };

  const value = {
    currentUser,
    handleCurrentUser,
    isLoggedIn,
    handleIsLoggedIn,
    isMobile,
    handleMobile,
    isNewRecipe,
    handleNewRecipe,
    setIsMobile,
    editRecipe,
    handleEditRecipe,
    setIsNewRecipe,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

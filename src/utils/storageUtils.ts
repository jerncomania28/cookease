import { CurrentUserProps } from '../context/auth';

const storageUtils = {
  setItem: (currentUser: CurrentUserProps) => {
    localStorage.setItem('CURRENT_USER', JSON.stringify(currentUser));
  },
  getItem: () => {
    const currentUser = localStorage.getItem('CURRENT_USER');
    return JSON.parse(currentUser as string);
  },
  clearStorage: () => localStorage.clear(),
};

export default storageUtils;

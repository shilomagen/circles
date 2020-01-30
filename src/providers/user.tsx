import React, { createContext, useContext } from 'react';
import { User } from 'firebase';

const UserContext = createContext<User | null>(null);
export const UserProvider: React.FC<{ user: User | null }> = ({ children, user }) => (
  <UserContext.Provider value={user}>
    {children}
  </UserContext.Provider>
);

export const useUserContext = () => useContext(UserContext);

import React, { createContext, useContext } from 'react';
import { IAuthService } from '../services/auth';
import { IFirebaseService } from '../services/firebase';

interface AppServices {
  auth: IAuthService;
  firebase: IFirebaseService
}

const ServicesContext = createContext<AppServices>(null);
export const ServicesProvider: React.FC<{ services: AppServices }> = ({ children, services }) => (
  <ServicesContext.Provider value={services}>
    {children}
  </ServicesContext.Provider>
);
export const useServices = () => useContext(ServicesContext);

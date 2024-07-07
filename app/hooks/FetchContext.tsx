import React, { createContext, ReactNode,useContext } from 'react';

import useFetch, { ApiResponse } from './useFetchHook';

interface FetchContextType {
  data: ApiResponse[] | null;
  loading: boolean;
  error: string | null;
}


const FetchContext = createContext<FetchContextType | undefined>(undefined);

interface FetchProviderProps {
  children: ReactNode;
  url: string;
}

export const FetchProvider: React.FC<FetchProviderProps> = ({ children, url }) => {
  const { data, loading, error } = useFetch(url);

  return (
    <FetchContext.Provider value={{ data, loading, error }}>
      {children}
    </FetchContext.Provider>
  );
};

export const useFetchContext = () => {
  const context = useContext(FetchContext);
  if (!context) {
    throw new Error('useFetchContext must be used within a FetchProvider');
  }
  return context;
};

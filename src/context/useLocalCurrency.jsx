  //TODO set the useLocalCurrency with the store information value in Context.

import { createContext, useContext } from 'react';

const UseLocalCurrencyContext = createContext(true);

export function UseLocalCurrencyProvider({ children, value }) {
  return (
    <UseLocalCurrencyContext.Provider value={value}>
      {children}
    </UseLocalCurrencyContext.Provider>
  );
}

export function useLocalCurrencyContext() {
  return useContext(UseLocalCurrencyContext);
}

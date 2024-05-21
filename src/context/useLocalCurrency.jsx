  //TODO set the useLocalCurrency with the store information value.
// context/LocalCurrencyContext.jsx
import { createContext, useContext } from 'react';

const UseLocalCurrencyContext = createContext(false);

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

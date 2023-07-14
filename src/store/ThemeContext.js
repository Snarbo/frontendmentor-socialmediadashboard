import { useState, createContext, useContext } from 'react';

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('theme') || 'light');

  return (
    <StateContext.Provider
      value={{
        currentTheme,
        setCurrentTheme,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);

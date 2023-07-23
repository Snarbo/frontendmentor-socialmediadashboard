import { useState, createContext, useContext } from 'react';

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [totalFollowers, setTotalFollowers] = useState(0);

  return (
    <StateContext.Provider
      value={{
        currentTheme,
        setCurrentTheme,
        totalFollowers,
        setTotalFollowers,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);

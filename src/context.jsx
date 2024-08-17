import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

const getInitialDarkMode = () => {
  const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const storedDarkMode = localStorage.getItem("darkTheme");
  // Return the stored preference if it exists, otherwise return the system preference
  return storedDarkMode !== null ? storedDarkMode === "true" : prefersDarkMode;
};

export const AppProvider = ({ children }) => {
  const [search, setSearch] = useState("dog");
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode());
  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme);
    // const body = document.querySelector("body");
    // body.classList.toggle("dark-theme", newDarkTheme);
  };
  useEffect(() => {
    document.body.classList.toggle("dark-theme", isDarkTheme);
  }, [isDarkTheme]);

  return (
    <AppContext.Provider
      value={{ isDarkTheme, toggleDarkTheme, setSearch, search }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

import { createContext, useContext, useState, useEffect } from 'react';

export const AppCtx = createContext({});

export function AppProvider({ children }) {
  const [page,         setPage]         = useState('home');
  const [theme,        setTheme]        = useState('light');
  const [caseProject,  setCaseProject]  = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [page]);

  return (
    <AppCtx.Provider value={{ page, setPage, theme, setTheme, caseProject, setCaseProject }}>
      {children}
    </AppCtx.Provider>
  );
}

export function useApp() {
  return useContext(AppCtx);
}
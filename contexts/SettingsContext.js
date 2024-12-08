import { createContext } from 'react';

export const SettingsContext = createContext({
  theme: null,
  setTheme: () => {},
  language: 'en',
  setLanguage: () => {},
});


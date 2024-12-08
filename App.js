import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@rneui/themed';
import { theme as baseTheme } from './theme';
import AppNavigator from './AppNavigator'; 
import { SettingsContext } from './contexts/SettingsContext';

export default function App() {
  const [theme, setTheme] = useState(baseTheme);
  const [language, setLanguage] = useState('en');

  const settingsContext = {
    theme,
    setTheme,
    language,
    setLanguage,
  };

  return (
    <SettingsContext.Provider value={settingsContext}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </SettingsContext.Provider>
  );
}

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator'; // Adjust the path if needed

const App = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;
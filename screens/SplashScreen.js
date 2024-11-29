import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

const SplashScreenComponent = ({ navigation }) => {
  useEffect(() => {
    SplashScreen.preventAutoHideAsync();

    
    setTimeout(() => {
      SplashScreen.hideAsync(); 
      navigation.replace('Login');  
    }, 2000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Your App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  title: {
    fontSize: 30,
    color: '#FFF',
  },
});

export default SplashScreenComponent;

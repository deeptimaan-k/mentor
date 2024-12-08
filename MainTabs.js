import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Keyboard, Platform } from 'react-native';
import { theme } from './theme';

// Import all necessary screens
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import MentorScreen from './screens/MentorScreen';
import ShortsScreen from './screens/ShortsScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import AIMentorScreen from './screens/AIMentorScreen';
import SettingsScreen from './screens/SettingsScreen';
import ChatListScreen from './screens/ChatListScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ProfileMain" component={ProfileScreen} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
  </Stack.Navigator>
);

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeMain" component={HomeScreen} />
    <Stack.Screen name="ChatList" component={ChatListScreen} />
  </Stack.Navigator>
);

const MainTabs = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Mentors') {
            iconName = focused ? 'account-group' : 'account-group-outline';
          } else if (route.name === 'Shorts') {
            iconName = focused ? 'play-box-multiple' : 'play-box-multiple-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account' : 'account-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          display: isKeyboardVisible ? 'none' : 'flex',
          backgroundColor: theme.colors.cardBackground,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 60,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen 
        name="Mentors" 
        component={MentorScreen} 
        options={{
          tabBarLabel: 'Mentors',
        }}
      />
      <Tab.Screen 
        name="Shorts" 
        component={ShortsScreen}
        options={{
          tabBarLabel: 'Shorts',
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name={focused ? 'play-box-multiple' : 'play-box-multiple-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="AIMentor" 
        component={AIMentorScreen} 
        options={{
          tabBarLabel: 'AI Mentor',
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name={focused ? 'robot' : 'robot-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileStack} 
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;


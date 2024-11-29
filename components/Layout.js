import React from 'react'
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { Home, User, Search, Briefcase, MessageCircle, Bell } from 'react-native-vector-icons/Feather' // Using Feather icons
import { useNavigationState } from '@react-navigation/native'

const Tab = createBottomTabNavigator()

// Navigation items configuration
const navItems = [
  { icon: Home, label: 'Home', screen: 'Home' },
  { icon: Search, label: 'Explore', screen: 'Explore' },
  { icon: Briefcase, label: 'Jobs', screen: 'Jobs' },
  { icon: MessageCircle, label: 'Messages', screen: 'Messages' },
  { icon: User, label: 'Profile', screen: 'Profile' },
]

const Layout = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <Header />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              const item = navItems.find((item) => item.screen === route.name)
              return <item.icon name={item.icon.name} size={size} color={color} />
            },
            tabBarActiveTintColor: 'purple',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          {navItems.map((item) => (
            <Tab.Screen key={item.screen} name={item.screen} component={Screen} />
          ))}
        </Tab.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  )
}

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>ProNet</Text>
      <View style={styles.icons}>
        <MessageCircle size={24} color="#4A4A4A" />
        <Bell size={24} color="#4A4A4A" />
      </View>
    </View>
  )
}

const Screen = ({ route }) => {
  return (
    <SafeAreaView style={styles.main}>
      <Text>{route.name} Screen</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'purple',
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    spaceX: 10,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
})

export default Layout

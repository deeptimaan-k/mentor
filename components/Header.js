import React from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import { Bell, MessageCircle } from 'react-native-feather';

export default function Header({ theme, toggleTheme }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ProNet</Text>
      <View style={styles.rightSection}>
        <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
        <TouchableOpacity style={styles.iconButton}>
          <Bell strokeWidth={2} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <MessageCircle strokeWidth={2} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'purple',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 10,
  },
});

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, useTheme } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function CustomHeader() {
  const { theme } = useTheme();
  const navigation = useNavigation();

  return (
    <View style={[styles.headerContainer, { backgroundColor: theme.colors.surface }]}>
      <Text style={[styles.headerTitle, { color: theme.colors.primary }]}>MentorConnect</Text>
      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.navigate('Notifications')}>
          <Ionicons name="notifications" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
  },
  headerIcon: {
    marginLeft: 15,
  },
});


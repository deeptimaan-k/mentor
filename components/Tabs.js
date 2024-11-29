import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Tabs({ activeTab, setActiveTab }) {
  const tabs = ['Feed', 'Profile', 'Explore', 'Mentors', 'Jobs'];
  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          onPress={() => setActiveTab(tab)}
          style={[
            styles.tab,
            activeTab === tab && styles.activeTab,
          ]}
        >
          <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    backgroundColor: '#f0f0f0',
  },
  tab: {
    padding: 12,
    flex: 1,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'purple',
  },
  tabText: {
    color: '#777',
  },
  activeTabText: {
    color: 'purple',
    fontWeight: 'bold',
  },
});

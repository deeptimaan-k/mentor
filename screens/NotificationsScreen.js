import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../theme';

const NotificationsScreen = ({ navigation }) => {
  const notifications = [
    { 
      id: '1', 
      type: 'follow', 
      content: 'started following you', 
      time: '5m ago',
      user: {
        name: 'Sarah Johnson',
        image: 'https://randomuser.me/api/portraits/women/1.jpg'
      }
    },
    { 
      id: '2', 
      type: 'like', 
      content: 'liked your post', 
      time: '15m ago',
      user: {
        name: 'Michael Chen',
        image: 'https://randomuser.me/api/portraits/men/2.jpg'
      }
    },
    { 
      id: '3', 
      type: 'comment', 
      content: 'commented on your post: "Great insight!"', 
      time: '1h ago',
      user: {
        name: 'Emily Davis',
        image: 'https://randomuser.me/api/portraits/women/3.jpg'
      }
    },
    { 
      id: '4', 
      type: 'mention', 
      content: 'mentioned you in a comment', 
      time: '2h ago',
      user: {
        name: 'Alex Turner',
        image: 'https://randomuser.me/api/portraits/men/4.jpg'
      }
    },
  ];

  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity style={styles.notificationItem}>
      <Image source={{ uri: item.user.image }} style={styles.userImage} />
      <View style={styles.notificationContent}>
        <Text style={styles.notificationText}>
          <Text style={styles.userName}>{item.user.name}</Text> {item.content}
        </Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
      {item.type === 'follow' && (
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>Follow</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Activity</Text>
      </View>
      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.notificationList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.containerPadding,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginLeft: 16,
  },
  notificationList: {
    padding: theme.spacing.containerPadding,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  userImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationText: {
    fontSize: 14,
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  userName: {
    fontWeight: 'bold',
  },
  notificationTime: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  followButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  followButtonText: {
    color: theme.colors.buttonText,
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default NotificationsScreen;


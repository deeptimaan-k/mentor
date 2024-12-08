import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../theme';

const MentorshipDashboardScreen = ({ navigation }) => {
  const upcomingSessions = [
    {
      id: 1,
      mentorName: 'Sarah Johnson',
      topic: 'Career Development',
      time: '2:00 PM Today',
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
      id: 2,
      mentorName: 'Michael Chen',
      topic: 'Technical Skills',
      time: '4:30 PM Tomorrow',
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
  ];

  const mentorshipProgress = [
    { id: 1, name: 'Leadership Skills', progress: 0.7 },
    { id: 2, name: 'Public Speaking', progress: 0.5 },
    { id: 3, name: 'Project Management', progress: 0.3 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Mentorship Dashboard</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Icon name="cog" size={24} color={theme.colors.textPrimary} />
          </TouchableOpacity>
        </View>

        <LinearGradient
          colors={[theme.colors.buttonGradientStart, theme.colors.buttonGradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.overviewCard}
        >
          <Text style={styles.overviewTitle}>Your Progress</Text>
          <View style={styles.overviewStats}>
            <View style={styles.overviewItem}>
              <Text style={styles.overviewNumber}>12</Text>
              <Text style={styles.overviewLabel}>Sessions</Text>
            </View>
            <View style={styles.overviewItem}>
              <Text style={styles.overviewNumber}>3</Text>
              <Text style={styles.overviewLabel}>Mentors</Text>
            </View>
            <View style={styles.overviewItem}>
              <Text style={styles.overviewNumber}>24</Text>
              <Text style={styles.overviewLabel}>Hours</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Sessions</Text>
          {upcomingSessions.map((session) => (
            <TouchableOpacity key={session.id} style={styles.sessionCard}>
              <Image source={{ uri: session.image }} style={styles.mentorImage} />
              <View style={styles.sessionInfo}>
                <Text style={styles.mentorName}>{session.mentorName}</Text>
                <Text style={styles.sessionTopic}>{session.topic}</Text>
                <Text style={styles.sessionTime}>{session.time}</Text>
              </View>
              <Icon name="video" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mentorship Progress</Text>
          {mentorshipProgress.map((item) => (
            <View key={item.id} style={styles.progressCard}>
              <Text style={styles.progressName}>{item.name}</Text>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${item.progress * 100}%` }]} />
              </View>
              <Text style={styles.progressPercentage}>{`${Math.round(item.progress * 100)}%`}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.findMentorButton}>
          <Icon name="account-search" size={20} color={theme.colors.buttonText} />
          <Text style={styles.findMentorText}>Find a New Mentor</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    padding: theme.spacing.containerPadding,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  overviewCard: {
    borderRadius: theme.borderRadius.medium,
    padding: 20,
    marginBottom: 24,
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.buttonText,
    marginBottom: 16,
  },
  overviewStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  overviewItem: {
    alignItems: 'center',
  },
  overviewNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.buttonText,
  },
  overviewLabel: {
    fontSize: 14,
    color: theme.colors.buttonText,
    opacity: 0.8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: 16,
  },
  sessionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.medium,
    padding: 16,
    marginBottom: 12,
  },
  mentorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  sessionInfo: {
    flex: 1,
  },
  mentorName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  sessionTopic: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 2,
  },
  sessionTime: {
    fontSize: 12,
    color: theme.colors.primary,
  },
  progressCard: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.medium,
    padding: 16,
    marginBottom: 12,
  },
  progressName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: theme.colors.inputBackground,
    borderRadius: 4,
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
  },
  progressPercentage: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    textAlign: 'right',
  },
  findMentorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.medium,
    padding: 16,
    marginTop: 12,
  },
  findMentorText: {
    color: theme.colors.buttonText,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default MentorshipDashboardScreen;

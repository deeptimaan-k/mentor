import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../theme';

const MentorScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = ['All', 'Software', 'Design', 'Business', 'Marketing'];

  const mentors = [
    {
      id: '1',
      name: 'Sarah Johnson',
      expertise: 'Software Engineering',
      rating: 4.9,
      reviews: 120,
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
      id: '2',
      name: 'Michael Chen',
      expertise: 'Product Management',
      rating: 4.8,
      reviews: 98,
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    {
      id: '3',
      name: 'Emily Davis',
      expertise: 'UX Design',
      rating: 4.7,
      reviews: 85,
      image: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
      id: '4',
      name: 'David Wilson',
      expertise: 'Data Science',
      rating: 4.9,
      reviews: 110,
      image: 'https://randomuser.me/api/portraits/men/4.jpg',
    },
    {
      id: '5',
      name: 'Olivia Brown',
      expertise: 'Marketing Strategy',
      rating: 4.6,
      reviews: 75,
      image: 'https://randomuser.me/api/portraits/women/5.jpg',
    },
  ];

  const recommendations = [
    {
      id: '6',
      name: 'Alex Turner',
      expertise: 'Artificial Intelligence',
      rating: 4.9,
      reviews: 150,
      image: 'https://randomuser.me/api/portraits/men/6.jpg',
    },
    {
      id: '7',
      name: 'Sophia Lee',
      expertise: 'Blockchain Development',
      rating: 4.8,
      reviews: 92,
      image: 'https://randomuser.me/api/portraits/women/7.jpg',
    },
  ];

  const renderMentorItem = ({ item }) => (
    <TouchableOpacity style={styles.mentorCard}>
      <Image source={{ uri: item.image }} style={styles.mentorImage} />
      <View style={styles.mentorInfo}>
        <Text style={styles.mentorName}>{item.name}</Text>
        <Text style={styles.mentorExpertise}>{item.expertise}</Text>
        <View style={styles.ratingContainer}>
          <Icon name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>{item.rating}</Text>
          <Text style={styles.reviewsText}>({item.reviews} reviews)</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.connectButton}>
        <Text style={styles.connectButtonText}>Connect</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Find a Mentor</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.searchContainer}>
          <Icon name="magnify" size={20} color={theme.colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search mentors by name or expertise"
            placeholderTextColor={theme.colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                selectedFilter === filter && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  selectedFilter === filter && styles.filterButtonTextActive,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended for You</Text>
          {recommendations.map((mentor) => renderMentorItem({ item: mentor }))}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Mentors</Text>
          <FlatList
            data={mentors}
            renderItem={renderMentorItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.containerPadding,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  scrollContent: {
    padding: theme.spacing.containerPadding,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.inputBackground,
    borderRadius: theme.borderRadius.medium,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: theme.colors.textPrimary,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.medium,
    marginRight: 8,
    backgroundColor: theme.colors.cardBackground,
  },
  filterButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  filterButtonText: {
    color: theme.colors.textPrimary,
    fontWeight: '600',
  },
  filterButtonTextActive: {
    color: theme.colors.buttonText,
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
  mentorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.medium,
    padding: 16,
    marginBottom: 16,
  },
  mentorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  mentorInfo: {
    flex: 1,
  },
  mentorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  mentorExpertise: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginLeft: 4,
  },
  connectButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.small,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  connectButtonText: {
    color: theme.colors.buttonText,
    fontWeight: 'bold',
  },
});

export default MentorScreen;

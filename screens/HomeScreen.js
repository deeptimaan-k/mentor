import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Dimensions,
  TextInput,
  FlatList,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LottieView from 'lottie-react-native';
import { theme } from '../theme';

const { width } = Dimensions.get('window');

const LikeButton = ({ itemId, isPost = true, onLike }) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const animationRef = useRef(null);

  const handlePress = () => {
    setShowAnimation(true);
    onLike(itemId);
    if (animationRef.current) {
      animationRef.current.play();
    }
    setTimeout(() => {
      setShowAnimation(false);
    }, 1000);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.likeButtonContainer}>
      <Icon
        name={isPost ? "heart-outline" : "heart"}
        size={28}
        color={theme.colors.textPrimary}
      />
      {showAnimation && (
        <LottieView
          ref={animationRef}
          source={require('../assets/heart-animation.json')}
          style={styles.heartAnimation}
          autoPlay={false}
          loop={false}
        />
      )}
    </TouchableOpacity>
  );
};

const AddPostButton = ({ onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.addPostButtonContainer}
    >
      <Animated.View style={[styles.addPostButton, { transform: [{ scale: scaleAnim }] }]}>
        <Icon name="plus" size={24} color={theme.colors.buttonText} />
      </Animated.View>
    </TouchableOpacity>
  );
};

const HomeScreen = ({ navigation }) => {
  const [likedPosts, setLikedPosts] = useState({});
  const [likedComments, setLikedComments] = useState({});

  const togglePostLike = (itemId) => {
    setLikedPosts(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const toggleCommentLike = (itemId) => {
    setLikedComments(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const handleAddPost = () => {
    navigation.navigate('AddPost');
  };

  const feedItems = [
    {
      id: 1,
      author: 'Sarah Johnson',
      verified: true,
      content: 'Just finished mentoring a group of aspiring software engineers. It\'s incredible to see their progress and enthusiasm for coding! #CodeMentor',
      likes: 342,
      comments: 28,
      shares: 15,
      time: '2 hours ago',
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
      postImage: 'https://picsum.photos/seed/mentor1/400/400',
    },
    {
      id: 2,
      author: 'Michael Chen',
      verified: true,
      content: 'Excited to announce our upcoming webinar on "Navigating Your Tech Career in 2024". Don\'t miss out on valuable insights and tips! Register now. #CareerGrowth',
      likes: 189,
      comments: 42,
      shares: 31,
      time: '5 hours ago',
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
      postImage: 'https://picsum.photos/seed/webinar1/400/400',
    },
    {
      id: 3,
      author: 'Emily Davis',
      verified: false,
      content: 'Just published a new article on "5 Essential Skills for UX Designers in 2024". Check it out and let me know your thoughts! #UXDesign',
      likes: 276,
      comments: 19,
      shares: 24,
      time: '1 day ago',
      image: 'https://randomuser.me/api/portraits/women/3.jpg',
      postImage: 'https://picsum.photos/seed/uxdesign1/400/400',
    },
    {
      id: 4,
      author: 'Alex Turner',
      verified: true,
      content: 'Proud to have mentored 50+ students this year. Seeing them succeed in their careers is the greatest reward. #MentorshipMatters',
      likes: 512,
      comments: 37,
      shares: 18,
      time: '2 days ago',
      image: 'https://randomuser.me/api/portraits/men/4.jpg',
      postImage: 'https://picsum.photos/seed/mentorship1/400/400',
    },
    {
      id: 5,
      author: 'Olivia Martinez',
      verified: false,
      content: 'Hosting a Q&A session on "Breaking into Tech as a Career Changer" next week. Drop your questions below! #CareerTransition',
      likes: 157,
      comments: 63,
      shares: 9,
      time: '3 days ago',
      image: 'https://randomuser.me/api/portraits/women/5.jpg',
      postImage: 'https://picsum.photos/seed/qasession1/400/400',
    },
    {
      id: 6,
      author: 'David Lee',
      verified: true,
      content: 'Just launched a new course on "Advanced JavaScript Patterns". Use code MENTOR20 for 20% off! #JavaScript #WebDev',
      likes: 423,
      comments: 51,
      shares: 37,
      time: '4 days ago',
      image: 'https://randomuser.me/api/portraits/men/6.jpg',
      postImage: 'https://picsum.photos/seed/jspatterns1/400/400',
    },
    {
      id: 7,
      author: 'Sophia Patel',
      verified: true,
      content: 'Reflecting on my journey from mentee to mentor. Grateful for all the guidance I\'ve received and now able to pay it forward. #GrowthMindset',
      likes: 298,
      comments: 22,
      shares: 13,
      time: '5 days ago',
      image: 'https://randomuser.me/api/portraits/women/7.jpg',
      postImage: 'https://picsum.photos/seed/journey1/400/400',
    },
    {
      id: 8,
      author: 'Chris Anderson',
      verified: false,
      content: 'Excited to be speaking at the upcoming Tech Mentorship Summit. Who else is attending? Let\'s connect! #TechMentorship',
      likes: 176,
      comments: 29,
      shares: 8,
      time: '1 week ago',
      image: 'https://randomuser.me/api/portraits/men/8.jpg',
      postImage: 'https://picsum.photos/seed/summit1/400/400',
    },
    {
      id: 9,
      author: 'Rachel Kim',
      verified: true,
      content: 'New blog post: "The Impact of AI on Software Development Careers". Read now to stay ahead of the curve! #AI #TechCareers',
      likes: 387,
      comments: 46,
      shares: 29,
      time: '1 week ago',
      image: 'https://randomuser.me/api/portraits/women/9.jpg',
      postImage: 'https://picsum.photos/seed/aiblog1/400/400',
    },
    {
      id: 10,
      author: 'Daniel Brown',
      verified: true,
      content: 'Celebrating 5 years as a mentor on this platform! Thank you to all my mentees for your trust and hard work. Here\'s to many more years of learning together! #MentorshipMilestone',
      likes: 631,
      comments: 72,
      shares: 41,
      time: '2 weeks ago',
      image: 'https://randomuser.me/api/portraits/men/10.jpg',
      postImage: 'https://picsum.photos/seed/celebration1/400/400',
    },
  ];

  const renderFeedItem = ({ item, index }) => (
    <View style={styles.feedItem}>
      {index === 0 && (
        <TouchableOpacity style={styles.createPostContainer} onPress={handleAddPost}>
          <View style={styles.createPostContent}>
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
              style={styles.createPostAvatar}
            />
            <Text style={styles.createPostText}>Share your thoughts or ask a question...</Text>
          </View>
          <View style={styles.createPostActions}>
            <TouchableOpacity style={styles.createPostAction}>
              <Icon name="image" size={24} color={theme.colors.primary} />
              <Text style={styles.createPostActionText}>Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.createPostAction}>
              <Icon name="video" size={24} color={theme.colors.primary} />
              <Text style={styles.createPostActionText}>Video</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.createPostAction}>
              <Icon name="file-document" size={24} color={theme.colors.primary} />
              <Text style={styles.createPostActionText}>Document</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
      <View style={styles.feedHeader}>
        <View style={styles.authorContainer}>
          <Image source={{ uri: item.image }} style={styles.authorImage} />
          <Text style={styles.authorName}>{item.author}</Text>
        </View>
        <TouchableOpacity>
          <Icon name="bookmark-outline" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <Image source={{ uri: item.postImage }} style={styles.postImage} />

      <View style={styles.actionsContainer}>
        <View style={styles.leftActions}>
          <LikeButton itemId={item.id} isPost={true} onLike={togglePostLike} />
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="comment-outline" size={28} color={theme.colors.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="share-outline" size={28} color={theme.colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.captionContainer}>
        <Text style={styles.caption}>
          <Text style={styles.authorName}>{item.author} </Text>
          {item.content}
        </Text>
      </View>

      <View style={styles.topCommentContainer}>
        <View style={styles.topCommentContent}>
          <Text style={styles.topCommentText}>
            <Text style={styles.topCommentAuthor}>tech_enthusiast</Text> Great post! This is really insightful.
          </Text>
        </View>
        <LikeButton itemId={item.id} isPost={false} onLike={toggleCommentLike} />
      </View>

      <View style={styles.commentBoxContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Add a comment..."
          placeholderTextColor={theme.colors.textSecondary}
        />
        <TouchableOpacity style={styles.postCommentButton}>
          <Text style={styles.postCommentText}>Post</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.timeText}>{item.time}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <Icon name="magnify" size={20} color={theme.colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search mentors, topics..."
            placeholderTextColor={theme.colors.textSecondary}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={styles.headerIcon}>
          <Icon name="bell-outline" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ChatList')} style={styles.headerIcon}>
          <Icon name="chat-outline" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={feedItems}
        renderItem={renderFeedItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.feedList}
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
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.inputBackground,
    borderRadius: theme.borderRadius.medium,
    paddingHorizontal: 12,
    height: 40,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: theme.colors.textPrimary,
  },
  headerIcon: {
    marginLeft: 12,
  },
  feedList: {
    paddingBottom: 20,
  },
  feedItem: {
    marginBottom: 16,
  },
  createPostContainer: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.medium,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  createPostContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  createPostAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  createPostText: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
  createPostActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  createPostAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  createPostActionText: {
    marginLeft: 8,
    fontSize: 14,
    color: theme.colors.textPrimary,
  },
  feedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  authorName: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  postImage: {
    width: width,
    height: width,
    resizeMode: 'cover',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginLeft: 16,
  },
  captionContainer: {
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  caption: {
    fontSize: 14,
    color: theme.colors.textPrimary,
    lineHeight: 18,
  },
  timeText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  topCommentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.medium,
    padding: 12,
    marginHorizontal: 12,
    marginBottom: 8,
  },
  topCommentContent: {
    flex: 1,
    marginRight: 8,
  },
  topCommentText: {
    fontSize: 14,
    color: theme.colors.textPrimary,
  },
  topCommentAuthor: {
    fontWeight: '600',
  },
  commentBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  commentInput: {
    flex: 1,
    height: 40,
    backgroundColor: theme.colors.inputBackground,
    borderRadius: theme.borderRadius.small,
    paddingHorizontal: 12,
    color: theme.colors.textPrimary,
  },
  postCommentButton: {
    marginLeft: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.small,
  },
  postCommentText: {
    color: theme.colors.buttonText,
    fontWeight: '600',
  },
  likeButtonContainer: {
    position: 'relative',
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartAnimation: {
    position: 'absolute',
    width: 80,
    height: 80,
    top: '50%',
    left: '50%',
    transform: [
      { translateX: -40 },
      { translateY: -40 }
    ],
  },
  addPostButtonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'center',
  },
  addPostButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  addPostText: {
    marginTop: 4,
    color: theme.colors.textPrimary,
    fontSize: 12,
    fontWeight: '600',
  },
});

export default HomeScreen;

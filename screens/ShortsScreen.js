import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../theme';

const { width, height } = Dimensions.get('window');

const shorts = [
  {
    id: '1',
    author: 'Sarah Johnson',
    authorImage: 'https://randomuser.me/api/portraits/women/1.jpg',
    title: 'Quick Tip: Effective Code Reviews',
    likes: 1200,
    comments: 45,
    shares: 78,
    thumbnail: 'https://picsum.photos/seed/short1/720/1280',
  },
  {
    id: '2',
    author: 'Michael Chen',
    authorImage: 'https://randomuser.me/api/portraits/men/2.jpg',
    title: '5 Project Management Hacks',
    likes: 980,
    comments: 32,
    shares: 56,
    thumbnail: 'https://picsum.photos/seed/short2/720/1280',
  },
  {
    id: '3',
    author: 'Emily Davis',
    authorImage: 'https://randomuser.me/api/portraits/women/3.jpg',
    title: 'UX Design Trends 2023',
    likes: 1500,
    comments: 67,
    shares: 92,
    thumbnail: 'https://picsum.photos/seed/short3/720/1280',
  },
];

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const ShortsScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const likeAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: currentIndex, animated: true });
    }
  }, [currentIndex]);

  const handleLike = () => {
    Animated.sequence([
      Animated.timing(likeAnimation, { toValue: 1.2, duration: 100, useNativeDriver: true }),
      Animated.timing(likeAnimation, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  const renderShortItem = ({ item, index }) => (
    <View style={styles.shortItem}>
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.7)']}
        style={styles.gradient}
      />
      <View style={styles.contentContainer}>
        <View style={styles.authorInfo}>
          <Image source={{ uri: item.authorImage }} style={styles.authorImage} />
          <Text style={styles.authorName}>{item.author}</Text>
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followButtonText}>Follow</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.shortTitle}>{item.title}</Text>
      </View>
      <View style={styles.interactionPanel}>
        <TouchableOpacity style={styles.interactionButton} onPress={handleLike}>
          <AnimatedIcon
            name="heart"
            size={30}
            color={theme.colors.primary}
            style={[styles.interactionIcon, { transform: [{ scale: likeAnimation }] }]}
          />
          <Text style={styles.interactionText}>{item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.interactionButton}>
          <Icon name="comment-outline" size={30} color={theme.colors.buttonText} style={styles.interactionIcon} />
          <Text style={styles.interactionText}>{item.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.interactionButton}>
          <Icon name="share-outline" size={30} color={theme.colors.buttonText} style={styles.interactionIcon} />
          <Text style={styles.interactionText}>{item.shares}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${((index + 1) / shorts.length) * 100}%` }]} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={shorts}
        renderItem={renderShortItem}
        keyExtractor={(item) => item.id}
        pagingEnabled
        vertical
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.y / height);
          setCurrentIndex(index);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  shortItem: {
    width: width,
    height: height,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
  },
  contentContainer: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 80,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  authorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  authorName: {
    color: theme.colors.buttonText,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 12,
  },
  followButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  followButtonText: {
    color: theme.colors.buttonText,
    fontSize: 12,
    fontWeight: 'bold',
  },
  shortTitle: {
    color: theme.colors.buttonText,
    fontSize: 16,
    fontWeight: '500',
  },
  interactionPanel: {
    position: 'absolute',
    right: 16,
    bottom: 100,
    alignItems: 'center',
  },
  interactionButton: {
    alignItems: 'center',
    marginBottom: 16,
  },
  interactionIcon: {
    marginBottom: 4,
  },
  interactionText: {
    color: theme.colors.buttonText,
    fontSize: 12,
  },
  progressContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  progressBar: {
    height: '100%',
    backgroundColor: theme.colors.primary,
  },
});

export default ShortsScreen;


import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../theme';

const AddPostScreen = ({ navigation }) => {
  const [postContent, setPostContent] = useState('');

  const handlePost = () => {
    // Implement post creation logic here
    console.log('Post content:', postContent);
    // Reset the input and navigate back to the feed
    setPostContent('');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Post</Text>
        <TouchableOpacity
          style={[styles.postButton, !postContent && styles.postButtonDisabled]}
          onPress={handlePost}
          disabled={!postContent}
        >
          <Text style={[styles.postButtonText, !postContent && styles.postButtonTextDisabled]}>
            Post
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>
        <TextInput
          style={styles.input}
          multiline
          placeholder="What's on your mind?"
          placeholderTextColor={theme.colors.textSecondary}
          value={postContent}
          onChangeText={setPostContent}
        />
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Icon name="image" size={24} color={theme.colors.primary} />
          <Text style={styles.footerButtonText}>Add Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Icon name="video" size={24} color={theme.colors.primary} />
          <Text style={styles.footerButtonText}>Add Video</Text>
        </TouchableOpacity>
      </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.containerPadding,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  postButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.small,
    backgroundColor: theme.colors.primary,
  },
  postButtonDisabled: {
    backgroundColor: theme.colors.inputBackground,
  },
  postButtonText: {
    color: theme.colors.buttonText,
    fontWeight: 'bold',
  },
  postButtonTextDisabled: {
    color: theme.colors.textSecondary,
  },
  content: {
    flex: 1,
    padding: theme.spacing.containerPadding,
  },
  input: {
    fontSize: 16,
    color: theme.colors.textPrimary,
    minHeight: 100,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: theme.spacing.containerPadding,
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerButtonText: {
    marginLeft: 8,
    color: theme.colors.primary,
    fontWeight: '600',
  },
});

export default AddPostScreen;


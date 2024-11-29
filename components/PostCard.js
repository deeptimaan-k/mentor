import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ThumbsUp, MessageCircle, Repeat, Send } from 'react-native-feather';

export default function PostCard({ post }) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image source={{ uri: post.avatar }} style={styles.avatar} />
        <View>
          <Text style={styles.name}>{post.name}</Text>
          <Text style={styles.role}>{post.role}</Text>
        </View>
      </View>
      <Text style={styles.content}>{post.content}</Text>
      {post.image && <Image source={{ uri: post.image }} style={styles.postImage} />}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <ThumbsUp strokeWidth={1.5} color="#666" />
          <Text style={styles.actionText}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <MessageCircle strokeWidth={1.5} color="#666" />
          <Text style={styles.actionText}>Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Repeat strokeWidth={1.5} color="#666" />
          <Text style={styles.actionText}>Repost</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Send strokeWidth={1.5} color="#666" />
          <Text style={styles.actionText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  role: {
    fontSize: 12,
    color: '#555',
  },
  content: {
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 4,
    color: '#555',
  },
});

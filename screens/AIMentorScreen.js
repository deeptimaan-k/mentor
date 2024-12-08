import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Easing,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../theme';

const QuickActionButton = ({ icon, label, color, onPress }) => (
  <TouchableOpacity style={styles.quickActionButton} onPress={onPress}>
    <View style={[styles.quickActionIcon, { backgroundColor: `${color}15` }]}>
      <Icon name={icon} size={24} color={color} />
    </View>
    <Text style={styles.quickActionLabel}>{label}</Text>
  </TouchableOpacity>
);

const TypingAnimation = () => {
  const [dot1] = useState(new Animated.Value(0));
  const [dot2] = useState(new Animated.Value(0));
  const [dot3] = useState(new Animated.Value(0));

  useEffect(() => {
    const animation = (dot, delay) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(dot, {
            toValue: 1,
            duration: 400,
            delay,
            useNativeDriver: true,
            easing: Easing.ease,
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
            easing: Easing.ease,
          }),
        ])
      );
    };

    Animated.parallel([
      animation(dot1, 0),
      animation(dot2, 200),
      animation(dot3, 400),
    ]).start();
  }, [dot1, dot2, dot3]);

  const dotStyle = (animatedValue) => ({
    opacity: animatedValue,
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -5],
        }),
      },
    ],
  });

  return (
    <View style={styles.typingContainer}>
      <Animated.View style={[styles.typingDot, dotStyle(dot1)]} />
      <Animated.View style={[styles.typingDot, dotStyle(dot2)]} />
      <Animated.View style={[styles.typingDot, dotStyle(dot3)]} />
    </View>
  );
};

const AIMentorScreen = () => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hi! I'm your AI Mentor Assistant. I can help you find the perfect mentor and guide your career journey. How can I assist you today?", 
      sender: 'ai' 
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef(null);

  const handleSend = () => {
    if (inputText.trim()) {
      setShowQuickActions(false);
      const newMessage = { id: Date.now(), text: inputText, sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputText('');
      setIsTyping(true);
      
      setTimeout(() => {
        setIsTyping(false);
        const aiResponse = { 
          id: Date.now() + 1, 
          text: "I'll help you find the right mentor. Could you tell me more about your interests and goals?", 
          sender: 'ai' 
        };
        setMessages((prevMessages) => [...prevMessages, aiResponse]);
      }, 2000);
    }
  };

  const handleQuickAction = (action) => {
    setShowQuickActions(false);
    const actionMessages = {
      findMentor: "I'd like to find a mentor who can guide me in my career.",
      skillAssessment: "I want to assess my current skills and identify areas for improvement.",
      careerAdvice: "I need advice on my career path and professional development.",
      schedule: "I'd like to schedule a mentoring session.",
    };
    
    if (actionMessages[action]) {
      setInputText(actionMessages[action]);
      handleSend();
    }
  };

  const renderMessage = ({ item }) => (
    <View 
      style={[
        styles.messageBubble, 
        item.sender === 'user' ? styles.userMessage : styles.aiMessage,
      ]}
    >
      {item.sender === 'ai' && (
        <View style={styles.aiIconContainer}>
          <Icon name="robot" size={20} color={theme.colors.buttonText} />
        </View>
      )}
      <View style={styles.messageContent}>
        <Text style={[styles.messageText, item.sender === 'user' && styles.userMessageText]}>
          {item.text}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="menu" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI Mentor</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerButton}>
            <Icon name="square-edit-outline" size={24} color={theme.colors.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Icon name="dots-vertical" size={24} color={theme.colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.messageList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      {/* Typing Indicator */}
      {isTyping && (
        <View style={styles.typingIndicator}>
          <TypingAnimation />
        </View>
      )}

      {/* Quick Actions */}
      {showQuickActions && messages.length === 1 && (
        <View style={styles.quickActionsContainer}>
          <Text style={styles.quickActionsTitle}>What can I help with?</Text>
          <View style={styles.quickActionsGrid}>
            <QuickActionButton
              icon="account-search"
              label="Find Mentor"
              color={theme.colors.primary}
              onPress={() => handleQuickAction('findMentor')}
            />
            <QuickActionButton
              icon="clipboard-check"
              label="Skill Assessment"
              color="#4CAF50"
              onPress={() => handleQuickAction('skillAssessment')}
            />
            <QuickActionButton
              icon="lightbulb"
              label="Career Advice"
              color="#FF9800"
              onPress={() => handleQuickAction('careerAdvice')}
            />
            <QuickActionButton
              icon="calendar"
              label="Schedule Session"
              color="#2196F3"
              onPress={() => handleQuickAction('schedule')}
            />
          </View>
        </View>
      )}

      {/* Input Area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachButton}>
            <Icon name="plus" size={24} color={theme.colors.textSecondary} />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Message"
            placeholderTextColor={theme.colors.textSecondary}
            multiline
          />
          {inputText.trim() ? (
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Icon name="send" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.micButton}>
              <Icon name="microphone" size={24} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
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
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    marginLeft: 16,
  },
  messageList: {
    padding: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  messageContent: {
    padding: 12,
    borderRadius: 20,
  },
  userMessage: {
    alignSelf: 'flex-end',
  },
  aiMessage: {
    alignSelf: 'flex-start',
  },
  aiIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  messageText: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    lineHeight: 22,
  },
  userMessageText: {
    color: theme.colors.buttonText,
  },
  quickActionsContainer: {
    padding: 20,
    alignItems: 'center',
  },
  quickActionsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: 24,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
  quickActionButton: {
    width: '45%',
    backgroundColor: theme.colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    alignItems: 'flex-start',
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionLabel: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: theme.colors.background,
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
  },
  attachButton: {
    padding: 8,
  },
  input: {
    flex: 1,
    backgroundColor: theme.colors.cardBackground,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    color: theme.colors.textPrimary,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    padding: 8,
  },
  micButton: {
    padding: 8,
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    backgroundColor: theme.colors.cardBackground,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginLeft: 16,
    marginBottom: 12,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
    marginHorizontal: 2,
  },
  typingIndicator: {
    alignSelf: 'flex-start',
    marginLeft: 16,
    marginBottom: 12,
  },
});

export default AIMentorScreen;


import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import {theme} from '../theme';

// Configure web browser for authentication
WebBrowser.maybeCompleteAuthSession();

const API_BASE_URL = 'http://192.168.183.88:5000/api/auth'; // Centralized API endpoint

const logToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    console.log('Token:', token);
  } catch (error) {
    console.error('Error retrieving token:', error);
  }
};

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigation = useNavigation();

  // Google OAuth Configuration
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: Platform.select({
      ios: '355138840950-b5elm1o3craf3oqpuu1vpqk20smenhmv.apps.googleusercontent.com',
      android: '355138840950-fpv4sia21alud0untklrnqjmgtl5rc7l.apps.googleusercontent.com',
      default: '355138840950-9l1ld5nrm48560a1irijn3al9hufcp7d.apps.googleusercontent.com',
    }),
    scopes: ['openid', 'profile', 'email'],
  });

  // Handle manual login
  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        username,
        password,
      });

      const { token, userId, email } = response.data;

      // Save user credentials
      await AsyncStorage.multiSet([
        ['token', token],
        ['userId', userId],
        ['userEmail', email],
      ]);

      navigation.replace('Home');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handle Google OAuth
  useEffect(() => {
    const handleGoogleAuth = async () => {
      if (response?.type === 'success') {
        const { authentication } = response;
        
        if (authentication) {
          try {
            const idToken = authentication.idToken;
            console.log('Google ID Token:', idToken); // Debug log

            const googleResponse = await axios.post(
              `${API_BASE_URL}/google/callback`, 
              { token: idToken }
            );

            const { token, userId, email } = googleResponse.data;

            await AsyncStorage.multiSet([
              ['token', token],
              ['userId', userId],
              ['userEmail', email],
            ]);

            navigation.replace('Home');
          } catch (error) {
            console.error('Google Auth Backend Error:', error.response?.data);
            Alert.alert(
              'Authentication Failed', 
              error.response?.data?.message || 'Google authentication failed'
            );
          }
        }
      }
    };

    handleGoogleAuth();
  }, [response]);


  const handleGoogleAuthentication = async (accessToken) => {
    setGoogleLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/google/callback`, { token: accessToken });
      const { token, userId, email } = response.data;

      await AsyncStorage.multiSet([
        ['token', token],
        ['userId', userId],
        ['userEmail', email],
      ]);

      navigation.replace('Home');
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Google authentication failed. Please try again.';
      Alert.alert('Error', errorMessage);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />

      <View style={styles.profileContainer}>
        <View style={styles.profileImageContainer}>
          <Image source={require('../assets/images/mentor.png')} style={styles.profileImage} />
        </View>
      </View>

      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>Welcome back, we missed you.</Text>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Icon name="account-outline" size={20} color={theme.colors.textSecondary} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor={theme.colors.textSecondary}
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Icon name="key-outline" size={20} color={theme.colors.textSecondary} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={theme.colors.textSecondary}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon name={showPassword ? 'eye-outline' : 'eye-off-outline'} size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.forgotContainer}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <LinearGradient
          colors={[theme.colors.buttonGradientStart, theme.colors.buttonGradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.signInButton}
        >
          <TouchableOpacity style={styles.signInTouchable} onPress={handleLogin}>
            {loading ? (
              <ActivityIndicator color={theme.colors.buttonText} />
            ) : (
              <Text style={styles.signInText}>Sign in</Text>
            )}
          </TouchableOpacity>
        </LinearGradient>

        <View style={styles.dividerContainer}>
          <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
        </View>

        <TouchableOpacity
          style={styles.googleButton}
          onPress={() => promptAsync()}
          disabled={!request || googleLoading}
        >
          {googleLoading ? (
            <ActivityIndicator color={theme.colors.googleButtonText} />
          ) : (
            <>
              <Icon name="google" size={20} color={theme.colors.googleButtonText} />
              <Text style={styles.googleText}>Google</Text>
            </>
          )}
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.registerLink}>Register</Text>
          </TouchableOpacity>
        </View>
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
  contentContainer: {
    flexGrow: 1,
    padding: theme.spacing.containerPadding,
    paddingTop: 60,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.elementSpacing,
  },
  profileImageContainer: {
    width: theme.spacing.profileImageSize,
    height: theme.spacing.profileImageSize,
    borderRadius: theme.borderRadius.large,
    backgroundColor: theme.colors.inputBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: theme.spacing.profileImageSize,
    height: theme.spacing.profileImageSize,
    borderRadius: theme.borderRadius.large,
  },
  title: {
    fontSize: theme.fontSizes.title,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: theme.fontSizes.subtitle,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    width: '100%',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.inputBackground,
    borderRadius: theme.borderRadius.small,
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: theme.fontSizes.input,
    color: theme.colors.textPrimary,
  },
  forgotContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  forgotText: {
    color: theme.colors.primary,
    fontSize: theme.fontSizes.forgot,
  },
  signInButton: {
    borderRadius: theme.borderRadius.medium,
    paddingVertical: 14,
    marginBottom: 20,
  },
  signInTouchable: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInText: {
    color: theme.colors.buttonText,
    fontSize: theme.fontSizes.buttonText,
    fontWeight: 'bold',
  },
  dividerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.dividerText,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.googleButton,
    paddingVertical: 14,
    borderRadius: theme.borderRadius.medium,
  },
  googleText: {
    color: theme.colors.googleButtonText,
    fontSize: theme.fontSizes.buttonText,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.registerText,
  },
  registerLink: {
    color: theme.colors.primary,
    fontSize: theme.fontSizes.registerLink,
  },
});

export default LoginScreen;

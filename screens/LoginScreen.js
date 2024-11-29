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
  ActivityIndicator 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import theme from '../theme';

// Configure web browser for authentication
WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigation = useNavigation();

  // Configure Google OAuth
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: '355138840950-9l1ld5nrm48560a1irijn3al9hufcp7d.apps.googleusercontent.com', // Your Android client ID
      scopes: ['openid', 'profile', 'email'],
      redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    },
    { authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth' }
  );

  // Manual Login Function
  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://192.168.183.88:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        await AsyncStorage.setItem('token', data.token);
        navigation.replace('Home');
      } else {
        Alert.alert('Error', data.message || 'Login failed');
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  // Google Login Handler
  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      // Start Google OAuth flow
      const result = await promptAsync();
  
      if (result.type === 'success') {
        const { authentication } = result;
  
        if (!authentication || !authentication.accessToken) {
          throw new Error('Authentication token not received');
        }
  
        // Send Google token to the backend for verification and JWT generation
        const backendResponse = await fetch('http://192.168.183.88:5000/api/auth/google/callback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: authentication.accessToken, // Include accessToken for backend processing
          }),
        });
  
        const data = await backendResponse.json();
  
        if (backendResponse.ok && data.token) {
          // Save the JWT token locally and navigate to Home
          await AsyncStorage.setItem('token', data.token);
          navigation.replace('Home');
        } else {
          throw new Error(data.message || 'Google authentication failed');
        }
      } else if (result.type === 'cancel') {
        Alert.alert('Login Cancelled', 'Google sign-in was cancelled');
      }
    } catch (error) {
      console.error('Google Login Error:', error);
      Alert.alert('Error', error.message || 'Failed to authenticate with Google');
    } finally {
      setGoogleLoading(false);
    }
  };
  
  // Render the rest of the component (same as previous implementation)
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
            onPress={handleGoogleLogin}
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
    marginBottom: theme.spacing.elementSpacing,
    paddingHorizontal: 15,
    height: theme.spacing.inputHeight,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.input,
  },
  forgotContainer: {
    alignItems: 'flex-end',
    marginBottom: theme.spacing.elementSpacing,
  },
  forgotText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.register,
  },
  signInButton: {
    borderRadius: theme.borderRadius.small,
    marginBottom: theme.spacing.elementSpacing,
    overflow: 'hidden',
  },
  signInTouchable: {
    paddingVertical: theme.spacing.buttonPadding,
    alignItems: 'center',
  },
  signInText: {
    color: theme.colors.buttonText,
    fontSize: theme.fontSizes.button,
    fontWeight: '600',
  },
  dividerContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.elementSpacing,
  },
  dividerText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.divider,
    letterSpacing: 1,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.googleButtonBackground,
    borderRadius: theme.borderRadius.small,
    paddingVertical: theme.spacing.buttonPadding,
    gap: 10,
    marginBottom: theme.spacing.elementSpacing,
  },
  googleText: {
    color: theme.colors.googleButtonText,
    fontSize: theme.fontSizes.button,
    marginLeft: 8,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.register,
  },
  registerLink: {
    color: theme.colors.registerLink,
    fontSize: theme.fontSizes.register,
    fontWeight: '600',
  },
});

export default LoginScreen;
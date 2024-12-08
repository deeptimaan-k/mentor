import React, { useState } from 'react';
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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../theme'; // Adjust the path as needed
import { useNavigation } from '@react-navigation/native'; // Import hook

const SignupScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigation = useNavigation(); // Move the hook inside the component

  // Local profile image path
  const profileImage = require('../assets/images/mentor.png'); // Adjust the path if necessary

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
        {/* Profile Image */}
        <View style={styles.profileContainer}>
          <View style={styles.profileImageContainer}>
            <Image source={profileImage} style={styles.profileImage} />
          </View>
        </View>

        {/* Welcome Text */}
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Please fill in the details to get started</Text>

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Icon name="account-outline" size={20} color={theme.colors.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor={theme.colors.textSecondary}
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Icon name="email-outline" size={20} color={theme.colors.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              placeholderTextColor={theme.colors.textSecondary}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

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
              <Icon
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                size={20}
                color={theme.colors.textSecondary}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputWrapper}>
            <Icon name="key-outline" size={20} color={theme.colors.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor={theme.colors.textSecondary}
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Icon
                name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                size={20}
                color={theme.colors.textSecondary}
              />
            </TouchableOpacity>
          </View>

          {/* Terms and Conditions */}
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>By signing up, you agree to our </Text>
            <TouchableOpacity>
              <Text style={styles.termsLink}>Terms and Conditions</Text>
            </TouchableOpacity>
          </View>

          {/* Sign Up Button */}
          <LinearGradient
            colors={[theme.colors.buttonGradientStart, theme.colors.buttonGradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.signUpButton}
          >
            <TouchableOpacity style={styles.signUpTouchable}>
              <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableOpacity>
          </LinearGradient>

          {/* Already Have Account Link */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Login</Text>
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
    marginBottom: 30,
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
    width: theme.spacing.profileImageSize * 0.8,
    height: theme.spacing.profileImageSize * 0.8,
    borderRadius: theme.borderRadius.large * 0.8,
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
  termsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  termsText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.register,
  },
  termsLink: {
    color: theme.colors.registerLink,
    fontSize: theme.fontSizes.register,
    fontWeight: '600',
  },
  signUpButton: {
    borderRadius: theme.borderRadius.small,
    marginBottom: 30,
    overflow: 'hidden',
  },
  signUpTouchable: {
    paddingVertical: theme.spacing.buttonPadding,
    alignItems: 'center',
  },
  signUpText: {
    color: theme.colors.buttonText,
    fontSize: theme.fontSizes.button,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.register,
  },
  loginLink: {
    color: theme.colors.registerLink,
    fontSize: theme.fontSizes.register,
    fontWeight: '600',
  },
});

export default SignupScreen;

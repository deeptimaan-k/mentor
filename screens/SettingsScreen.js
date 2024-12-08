import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../theme';

const SettingsScreen = ({ navigation }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const SettingsItem = ({ icon, title, value, onPress, showToggle = false }) => (
    <TouchableOpacity style={styles.settingsItem} onPress={onPress}>
      <View style={styles.settingsItemLeft}>
        <Icon name={icon} size={24} color={theme.colors.primary} style={styles.settingsItemIcon} />
        <Text style={styles.settingsItemTitle}>{title}</Text>
      </View>
      {showToggle ? (
        <Switch
          value={value}
          onValueChange={onPress}
          trackColor={{ false: theme.colors.inputBackground, true: theme.colors.primary }}
          thumbColor={theme.colors.buttonText}
        />
      ) : (
        <Icon name="chevron-right" size={24} color={theme.colors.textSecondary} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          <SettingsItem
            icon="theme-light-dark"
            title="Dark Mode"
            value={darkMode}
            onPress={() => setDarkMode(!darkMode)}
            showToggle
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <SettingsItem
            icon="bell-outline"
            title="Push Notifications"
            value={notifications}
            onPress={() => setNotifications(!notifications)}
            showToggle
          />
          <SettingsItem
            icon="email-outline"
            title="Email Notifications"
            value={emailNotifications}
            onPress={() => setEmailNotifications(!emailNotifications)}
            showToggle
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <SettingsItem
            icon="account-outline"
            title="Edit Profile"
            onPress={() => navigation.navigate('EditProfile')}
          />
          <SettingsItem
            icon="lock-outline"
            title="Change Password"
            onPress={() => navigation.navigate('ChangePassword')}
          />
          <SettingsItem
            icon="credit-card-outline"
            title="Payment Methods"
            onPress={() => navigation.navigate('PaymentMethods')}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <SettingsItem
            icon="help-circle-outline"
            title="Help Center"
            onPress={() => navigation.navigate('HelpCenter')}
          />
          <SettingsItem
            icon="file-document-outline"
            title="Terms of Service"
            onPress={() => navigation.navigate('TermsOfService')}
          />
          <SettingsItem
            icon="shield-outline"
            title="Privacy Policy"
            onPress={() => navigation.navigate('PrivacyPolicy')}
          />
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Icon name="logout" size={20} color={theme.colors.error} />
          <Text style={styles.logoutText}>Log Out</Text>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: 16,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.medium,
    padding: 16,
    marginBottom: 12,
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsItemIcon: {
    marginRight: 16,
  },
  settingsItemTitle: {
    fontSize: 16,
    color: theme.colors.textPrimary,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.medium,
    padding: 16,
    marginTop: 24,
  },
  logoutText: {
    color: theme.colors.error,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default SettingsScreen;

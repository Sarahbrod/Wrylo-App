import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

const AccountScreen = ({ navigation }) => {
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const accountOptions = [
    {
      icon: 'person-outline',
      title: 'Edit Profile',
      subtitle: 'Update your personal information',
      action: () => navigation.navigate('EditProfile'),
      color: '#2E0A09',
    },
    {
      icon: 'settings-outline',
      title: 'Preferences',
      subtitle: 'Reading goals, notifications, and more',
      action: () => {},
      color: '#2E0A09',
    },
    {
      icon: 'book-outline',
      title: 'Reading Statistics',
      subtitle: 'View your reading progress and history',
      action: () => {},
      color: '#2E0A09',
    },
    {
      icon: 'heart-outline',
      title: 'Favorites',
      subtitle: 'Your favorite books and authors',
      action: () => {},
      color: '#2E0A09',
    },
    {
      icon: 'help-circle-outline',
      title: 'Help & Support',
      subtitle: 'Get help and contact support',
      action: () => {},
      color: '#2E0A09',
    },
    {
      icon: 'information-circle-outline',
      title: 'About Wrylo',
      subtitle: 'App version and information',
      action: () => {},
      color: '#2E0A09',
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Account</Text>
        <Text style={styles.subtitle}>Manage your profile and preferences</Text>
      </View>

      <View style={styles.profileSection}>
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={32} color="#FFFFFF" />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>
              {user?.firstName && user?.lastName 
                ? `${user.firstName} ${user.lastName}` 
                : user?.username || 'Book Lover'}
            </Text>
            <Text style={styles.profileEmail}>
              {user?.email || 'reader@wrylo.com'}
            </Text>
          </View>
          <TouchableOpacity style={styles.editProfileButton}>
            <Ionicons name="pencil" size={16} color="#2E0A09" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.optionsContainer}>
        {accountOptions.map((option, index) => (
          <TouchableOpacity key={index} style={styles.optionCard} onPress={option.action}>
            <View style={[styles.optionIcon, { backgroundColor: `${option.color}15` }]}>
              <Ionicons name={option.icon} size={24} color={option.color} />
            </View>
            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>{option.title}</Text>
              <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#71727A" />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.logoutSection}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#DC3545" />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  contentContainer: {
    paddingBottom: 110,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 30,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E0A09',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#71727A',
  },
  profileSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2E0A09',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E0A09',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#71727A',
  },
  editProfileButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionsContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  optionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E0A09',
    marginBottom: 4,
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#71727A',
    lineHeight: 18,
  },
  logoutSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#DC3545',
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#DC3545',
  },
});

export default AccountScreen;
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AccountScreenRefactored = ({ navigation }) => {
  const profileOptions = [
    { id: 'profile', icon: 'person-circle', label: 'Edit Profile', color: '#8B4513' },
    { id: 'reading-goals', icon: 'trophy', label: 'Reading Goals', color: '#2F855A' },
    { id: 'preferences', icon: 'settings', label: 'Preferences', color: '#4A5568' },
    { id: 'notifications', icon: 'notifications', label: 'Notifications', color: '#2C5282' },
    { id: 'privacy', icon: 'shield-checkmark', label: 'Privacy & Security', color: '#744210' },
    { id: 'help', icon: 'help-circle', label: 'Help & Support', color: '#2D3748' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Account</Text>
        <Text style={styles.subtitle}>Manage your profile and settings</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarCircle}>
              <Ionicons name="person" size={48} color="#2E0A09" />
            </View>
            <TouchableOpacity style={styles.editAvatarButton}>
              <Ionicons name="camera" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>Reader Name</Text>
          <Text style={styles.userEmail}>reader@example.com</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Books Read</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Reading</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>23</Text>
            <Text style={styles.statLabel}>Wishlist</Text>
          </View>
        </View>

        <View style={styles.optionsContainer}>
          {profileOptions.map((option) => (
            <TouchableOpacity key={option.id} style={styles.optionCard}>
              <View style={[styles.optionIconContainer, { backgroundColor: `${option.color}15` }]}>
                <Ionicons name={option.icon} size={24} color={option.color} />
              </View>
              <Text style={styles.optionLabel}>{option.label}</Text>
              <Ionicons name="chevron-forward" size={20} color="#71727A" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={20} color="#DC2626" />
          <Text style={styles.logoutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F4F1',
  },
  contentContainer: {
    paddingBottom: 110,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 12,
    backgroundColor: '#F8F9FA',
  },
  title: {
    fontSize: 38,
    fontWeight: '700',
    color: '#2E0A09',
    marginBottom: 4,
    fontFamily: 'Playfair Display',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#71727A',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    padding: 32,
    borderRadius: 24,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatarCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#F8F4F0',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#E8DFD7',
  },
  editAvatarButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#2E0A09',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E0A09',
    marginBottom: 4,
    fontFamily: 'Playfair Display',
    letterSpacing: 0.3,
  },
  userEmail: {
    fontSize: 14,
    color: '#71727A',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E0A09',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#71727A',
    textAlign: 'center',
  },
  optionsContainer: {
    gap: 12,
    marginBottom: 20,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  optionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  optionLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#2E0A09',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
    borderWidth: 2,
    borderColor: '#FEE2E2',
    shadowColor: '#DC2626',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#DC2626',
    letterSpacing: 0.3,
  },
});

export default AccountScreenRefactored;
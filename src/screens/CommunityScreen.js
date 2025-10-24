import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const CommunityScreen = () => {
  const sampleGroups = [
    {
      id: 1,
      name: 'Mystery Lovers',
      members: 234,
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop'
    },
    {
      id: 2,
      name: 'Sci-Fi Enthusiasts',
      members: 187,
      image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=400&fit=crop'
    },
    {
      id: 3,
      name: 'Romance Readers',
      members: 456,
      image: 'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=400&h=400&fit=crop'
    },
  ];

  const communityFeatures = [
    {
      icon: 'chatbubbles',
      title: 'Book Discussions',
      subtitle: 'Join conversations about your favorite books',
      gradient: ['#EB5E3A', '#D94826'],
    },
    {
      icon: 'star',
      title: 'Reviews & Ratings',
      subtitle: 'Share your thoughts and discover new books',
      gradient: ['#7CA2E0', '#5B8DD6'],
    },
    {
      icon: 'trophy',
      title: 'Reading Challenges',
      subtitle: 'Compete with friends and track progress',
      gradient: ['#EB5E3A', '#D94826'],
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.headerSection}>
        <Text style={styles.headerTitle}>Forum</Text>
      </View>

      {/* Reading Groups Section with Preview */}
      <View style={styles.previewSection}>
        <View style={styles.previewHeader}>
          <View style={styles.previewHeaderLeft}>
            <View>
              <Text style={styles.previewTitle}>Reading Groups</Text>
              <Text style={styles.previewSubtitle}>Find local and online book clubs</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Ionicons name="chevron-forward" size={20} color="#71727A" />
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.groupsScrollContainer}
        >
          {sampleGroups.map((group) => (
            <TouchableOpacity key={group.id} style={styles.groupCard}>
              <View style={styles.groupImageContainer}>
                <Image
                  source={{ uri: group.image }}
                  style={styles.groupImage}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.groupInfo}>
                <Text style={styles.groupName}>{group.name}</Text>
                <Text style={styles.groupMembers}>{group.members} members</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.featuresContainer}>
        {communityFeatures.map((feature, index) => (
          <TouchableOpacity key={index} style={styles.featureCard}>
            <LinearGradient
              colors={feature.gradient}
              style={styles.iconContainer}
            >
              <Ionicons name={feature.icon} size={24} color="#FFFFFF" />
            </LinearGradient>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureSubtitle}>{feature.subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#71727A" />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.comingSoonSection}>
        <View style={styles.comingSoonCard}>
          <Ionicons name="rocket-outline" size={48} color="#7CA2E0" />
          <Text style={styles.comingSoonTitle}>Community Features Coming Soon!</Text>
          <Text style={styles.comingSoonText}>
            We're building an amazing community experience where you can connect with other readers,
            share recommendations, and discover your next favorite book together.
          </Text>
          <TouchableOpacity style={styles.notifyButton}>
            <Ionicons name="notifications" size={16} color="#FFFFFF" />
            <Text style={styles.notifyButtonText}>Notify Me When Ready</Text>
          </TouchableOpacity>
        </View>
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
  headerSection: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#481825',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  previewSection: {
    marginBottom: 32,
  },
  previewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  previewHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#481825',
    marginBottom: 2,
  },
  previewSubtitle: {
    fontSize: 12,
    color: '#71727A',
  },
  groupsScrollContainer: {
    paddingHorizontal: 20,
    gap: 16,
    paddingVertical: 8,
  },
  groupCard: {
    width: 160,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  groupImageContainer: {
    width: '100%',
    height: 120,
    backgroundColor: '#F6F4F1',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
  },
  groupImage: {
    width: '100%',
    height: '100%',
  },
  groupInfo: {
    gap: 4,
  },
  groupName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#481825',
    textAlign: 'left',
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  groupMembers: {
    fontSize: 12,
    color: '#71727A',
    textAlign: 'left',
    letterSpacing: 0.1,
  },
  featuresContainer: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 20,
    gap: 12,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 18,
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
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#481825',
    marginBottom: 4,
  },
  featureSubtitle: {
    fontSize: 14,
    color: '#71727A',
    lineHeight: 18,
  },
  comingSoonSection: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  comingSoonCard: {
    backgroundColor: '#FFFFFF',
    padding: 32,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  comingSoonTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#481825',
    marginTop: 16,
    marginBottom: 12,
    textAlign: 'center',
    fontFamily: 'Playfair Display',
    letterSpacing: 0.3,
  },
  comingSoonText: {
    fontSize: 14,
    color: '#71727A',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  notifyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#481825',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
    shadowColor: '#481825',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  notifyButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
});

export default CommunityScreen;
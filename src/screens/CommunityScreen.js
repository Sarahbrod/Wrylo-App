import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const CommunityScreen = () => {
  const sampleGroups = [
    {
      id: 1,
      name: 'Mystery Lovers',
      members: 234,
      emoji: '🔍',
      gradient: ['#4A148C', '#7B1FA2'],
      image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=400&fit=crop'
    },
    {
      id: 2,
      name: 'Sci-Fi Enthusiasts',
      members: 187,
      emoji: '🚀',
      gradient: ['#0D47A1', '#1976D2'],
      image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=400&fit=crop'
    },
    {
      id: 3,
      name: 'Romance Readers',
      members: 456,
      emoji: '💕',
      gradient: ['#C2185B', '#E91E63'],
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop'
    },
    {
      id: 4,
      name: 'Fantasy Realm',
      members: 312,
      emoji: '⚔️',
      gradient: ['#1B5E20', '#388E3C'],
      image: 'https://images.unsplash.com/photo-1618328474085-3628ea603e47?w=400&h=400&fit=crop'
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
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.7)']}
                  style={styles.groupImageOverlay}
                />
              </View>
              <View style={styles.groupInfo}>
                <Text style={styles.groupName}>{group.name}</Text>
                <View style={styles.groupMembersRow}>
                  <Ionicons name="people" size={14} color="#7CA2E0" />
                  <Text style={styles.groupMembers}>{group.members} members</Text>
                </View>
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
    marginBottom: 16,
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
    paddingVertical: 16,
  },
  groupCard: {
    width: 180,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  groupImageContainer: {
    width: '100%',
    height: 140,
    backgroundColor: '#F6F4F1',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    position: 'relative',
  },
  groupImage: {
    width: '100%',
    height: '100%',
  },
  groupImageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  groupEmojiContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  groupEmojiGradient: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  groupEmoji: {
    fontSize: 24,
  },
  groupInfo: {
    gap: 6,
  },
  groupName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#481825',
    textAlign: 'left',
    letterSpacing: 0.2,
    lineHeight: 22,
  },
  groupMembersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  groupMembers: {
    fontSize: 13,
    color: '#71727A',
    fontWeight: '600',
    letterSpacing: 0.1,
  },
  featuresContainer: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 20,
    gap: 16,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 16,
    marginHorizontal: 2,
    marginVertical: 4,
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
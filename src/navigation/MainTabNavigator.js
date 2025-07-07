import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts, LibreBaskerville_400Regular, LibreBaskerville_700Bold } from '@expo-google-fonts/libre-baskerville';

import Home from '../screens/Home';
import RecommendationsScreen from '../screens/RecommendationsScreen';
import LibraryScreen from '../screens/LibraryScreen';
import AccountScreen from '../screens/AccountScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
    const [fontsLoaded] = useFonts({
        LibreBaskerville_400Regular,
        LibreBaskerville_700Bold,
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#2E0A09',
                tabBarInactiveTintColor: '#8D6E63',
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 30,
                    marginLeft: 20,
                    marginRight: 20,
                    backgroundColor: '#FFFFFF',
                    borderTopWidth: 0,
                    borderRadius: 16,
                    paddingBottom: 12,
                    paddingTop: 8,
                    height: 70,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 5 },
                    shadowOpacity: 0.15,
                    shadowRadius: 10,
                    elevation: 8,
                    zIndex: 1000,
                    borderWidth: 1,
                    borderColor: '#F0F0F0',
                },
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontFamily: 'LibreBaskerville_400Regular',
                    marginTop: 4,
                },
                tabBarItemStyle: {
                    paddingHorizontal: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <TabIcon name="📖" color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Discover"
                component={RecommendationsScreen}
                options={{
                    tabBarLabel: 'Discover',
                    tabBarIcon: ({ color }) => (
                        <TabIcon name="✨" color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Library"
                component={LibraryScreen}
                options={{
                    tabBarLabel: 'Library',
                    tabBarIcon: ({ color }) => (
                        <TabIcon name="📚" color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Account"
                component={AccountScreen}
                options={{
                    tabBarLabel: 'Account',
                    tabBarIcon: ({ color }) => (
                        <TabIcon name="📝" color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const TabIcon = ({ name, color }) => {
    const isActive = color === '#2E0A09';
    return (
        <Text style={{
            fontSize: isActive ? 22 : 20,
            color: color,
            opacity: isActive ? 1 : 0.7,
            textShadowColor: isActive ? '#2E0A09' : 'transparent',
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: isActive ? 2 : 0,
        }}>
            {name}
        </Text>
    );
};

export default MainTabNavigator;
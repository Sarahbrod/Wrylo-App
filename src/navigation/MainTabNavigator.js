import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/Home';
import RecommendationsScreen from '../screens/RecommendationsScreen';
import LibraryScreen from '../screens/LibraryScreen';
import AccountScreen from '../screens/AccountScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
    //const paddingHorizontal = 12; // Padding on each side

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#7FABC7',
                tabBarInactiveTintColor: '#1D1D1D',
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 30,
                    marginLeft: 20,
                    marginRight: 20,
                    backgroundColor: '#F6F4F1',
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
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
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
                        <TabIcon name="🏠" color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Discover"
                component={RecommendationsScreen}
                options={{
                    tabBarLabel: 'Discover',
                    tabBarIcon: ({ color }) => (
                        <TabIcon name="🔍" color={color} />
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
                        <TabIcon name="👤" color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const TabIcon = ({ name, color }) => {
    return (
        <Text style={{
            fontSize: 20,
            color: color,
            opacity: color === '#7FABC7' ? 1 : 0.6
        }}>
            {name}
        </Text>
    );
};

export default MainTabNavigator;
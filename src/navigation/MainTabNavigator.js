import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Home from '../screens/Home';
import LibraryScreen from '../screens/LibraryScreen';
import RecommendationsScreen from '../screens/RecommendationsScreen';
import CommunityScreen from '../screens/CommunityScreen';
import StatsScreen from '../screens/StatsScreen';
import AccountScreen from '../screens/AccountScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Library') {
            iconName = focused ? 'library' : 'library-outline';
          } else if (route.name === 'Forum') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === 'Discover') {
            iconName = focused ? 'compass' : 'compass-outline';
          } else if (route.name === 'Account') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2E0A09',
        tabBarInactiveTintColor: '#71727A',
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          marginHorizontal: 20,
          marginBottom: 20,
          paddingTop: 12,
          paddingBottom: 12,
          height: 68,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.15,
          shadowRadius: 10,
          borderTopWidth: 0,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={Home}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen 
        name="Library" 
        component={LibraryScreen}
        options={{
          tabBarLabel: 'Library',
        }}
      />
      <Tab.Screen 
        name="Forum" 
        component={RecommendationsScreen}
        options={{
          tabBarLabel: 'Forum',
        }}
      />
      <Tab.Screen 
        name="Discover" 
        component={CommunityScreen}
        options={{
          tabBarLabel: 'Discover',
        }}
      />
      <Tab.Screen 
        name="Account" 
        component={AccountScreen}
        options={{
          tabBarLabel: 'Account',
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
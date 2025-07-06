import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import SplashScreen from './src/screens/SplashScreen';
import LogInScreen from './src/screens/LogInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import MoodFlowScreen from './src/screens/MoodFlowScreen';
import MoodResultsScreen from './src/screens/MoodResultsScreen';
import BookForumScreen from './src/screens/BookForumScreen';
import MainTabNavigator from './src/navigation/MainTabNavigator';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Auth" component={AuthNavigator} />
          <Stack.Screen name="Main" component={MainTabNavigator} />
          <Stack.Screen name="MoodFlow" component={MoodFlowScreen} />
          <Stack.Screen name="MoodResults" component={MoodResultsScreen} />
          <Stack.Screen name="BookForum" component={BookForumScreen} />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const AuthStack = createStackNavigator();

function AuthNavigator() {
  return (
    <AuthStack.Navigator
      initialRouteName="LogIn"
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="LogIn" component={LogInScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    </AuthStack.Navigator>
  );
}


import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import SplashScreen from './src/screens/SplashScreen';
import LogInScreen from './src/screens/LogInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import MoodFlowScreen from './src/screens/MoodFlowScreen';
import MoodResultsScreen from './src/screens/MoodResultsScreen';
import BookForumScreen from './src/screens/BookForumScreen';
import BookDetailScreen from './src/screens/BookDetailScreen';
import YearInReadingScreen from './src/screens/YearInReadingScreen';
import GenreBooksScreen from './src/screens/GenreBooksScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';
import CategoryDetailScreen from './src/screens/CategoryDetailScreen';
import MainTabNavigator from './src/navigation/MainTabNavigator';
import { AuthProvider } from './src/context/AuthContext';
import ErrorBoundary from './src/components/ErrorBoundary';

const Stack = createStackNavigator();

// Auth Navigator for authentication screens
function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LogIn" component={LogInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <SafeAreaProvider>
          <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{
              headerShown: false,
              animationEnabled: true,
              cardStyleInterpolator: ({ current }) => ({
                cardStyle: {
                  opacity: current.progress,
                },
              }),
            }}
          >
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Auth" component={AuthNavigator} />
            <Stack.Screen name="Main" component={MainTabNavigator} />
            <Stack.Screen name="MoodFlow" component={MoodFlowScreen} />
            <Stack.Screen name="MoodResults" component={MoodResultsScreen} />
            <Stack.Screen name="BookForum" component={BookForumScreen} />
            <Stack.Screen name="BookDetail" component={BookDetailScreen} />
            <Stack.Screen name="YearInReading" component={YearInReadingScreen} />
            <Stack.Screen name="GenreBooks" component={GenreBooksScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="CategoryDetail" component={CategoryDetailScreen} />
          </Stack.Navigator>
          <StatusBar style="auto" />
          </NavigationContainer>
          <Toast />
        </SafeAreaProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

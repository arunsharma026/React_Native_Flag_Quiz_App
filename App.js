import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, BackHandler } from 'react-native'; // Import BackHandler
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/component/Home';
import Stage from './src/component/Stage';
import Quiz from './src/component/Quiz';
import ResultsScreen from './src/component/ResultsScreen';
import { Dimensions } from 'react-native';
import React, { useEffect, useRef } from "react";
import Level from './src/component/Level';

const Stack = createNativeStackNavigator();
const navigationRef = React.createRef();

export default function App() {
  const isResultsScreen = useRef(false); // Track whether the current screen is the "Results" screen

  useEffect(() => {
    const backAction = () => {
      const currentRouteName = navigationRef.current?.getCurrentRoute().name;

      if (currentRouteName === 'Results') {
        // If on the "Results" screen, prevent the back action
        return true;
      } else if (currentRouteName !== 'Home') {
        // If not on the "Home" screen, navigate back to "Home"
        navigationRef.current?.navigate('Home');
        return true;
      }
      // Allow the default back button behavior (exit the app if on the "Home" screen)
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
      backHandler.remove(); // Cleanup the event listener when the component unmounts
    };
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Stage" component={Stage} />
        <Stack.Screen name="Quiz" component={Quiz} />
        <Stack.Screen name="Level" component={Level} />
        <Stack.Screen
          name="Results"
          component={ResultsScreen}
          listeners={({ navigation }) => ({
            focus: () => {
              // When the "Results" screen is focused, set the isResultsScreen flag to true
              isResultsScreen.current = true;
            },
            blur: () => {
              // When leaving the "Results" screen, set the isResultsScreen flag to false
              isResultsScreen.current = false;
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

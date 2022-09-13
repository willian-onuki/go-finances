//LIBRARY
import 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR'

import React from 'react';
import { StatusBar } from 'react-native';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components' // is a context, and enable to components that's inside, the theme
import { NavigationContainer } from '@react-navigation/native';

//COMPONENTS
import {
  useFonts, //useFonts loads the fonts
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'


import theme from './src/global/theme' // does not need the brackets because has the export default

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider, useAuth } from './src/hooks/auth';
import { Routes } from './src/routes';

export default function App(): JSX.Element {
  const [fontsLoaded] = useFonts({ // the useFonts return a boolean vector and sometimes does not have time to load all fonts imported
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  })

  const { userInfoLoading } = useAuth();

  if (!fontsLoaded || userInfoLoading) {
    // add a delay at splash screen
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      {/* the Dashboard needs to be involved in the ThemeProvider to use the colors theme */}
      <GestureHandlerRootView style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}>
        <StatusBar barStyle='light-content' />
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}

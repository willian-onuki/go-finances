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

import { AppRoutes } from './src/routes/app.routes';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SignIn } from './src/screens/SignIn';
import { AuthProvider } from './src/hooks/auth';

export default function App(): JSX.Element {
  const [fontsLoaded] = useFonts({ // the useFonts return a boolean vector and sometimes does not have time to load all fonts imported
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  })

  if (!fontsLoaded) {
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
        <NavigationContainer>
          <StatusBar barStyle='light-content' />
          <AuthProvider>
            {/* <AppRoutes /> */}
            <SignIn />
          </AuthProvider>
        </NavigationContainer>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}

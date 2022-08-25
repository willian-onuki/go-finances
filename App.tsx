//LIBRARY
import React from 'react';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components' // is a context, and enable to components that's inside, the theme

//COMPONENTS
import {
  useFonts, //useFonts loads the fonts
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'


import theme from './src/global/theme' // does not need the brackets because has the export default

import { Dashboard } from './src/screens/Dashboard'; //Under the Dashboard folder has a file with index name, because when access this folder by default search the index file
import { Register } from './src/screens/Register';
import { CategorySelect } from './src/screens/CategorySelect';

export default function App(): JSX.Element {
  const [fontsLoaded] = useFonts({ // the useFonts return a boolean vector and sometimes does not have time to load all fonts imported
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  })

  if (!fontsLoaded) {
    // add a delay at splash screen
    return <AppLoading/>
  }
  return (
    <ThemeProvider theme={theme}>
      {/* the Dashboard needs to be involved in the ThemeProvider to use the colors theme */}
      <Register />
    </ThemeProvider>
  );
}

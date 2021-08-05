import React from 'react';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import { StatusBar } from 'react-native';
import {ThemeProvider} from 'styled-components';
import theme from './src/global/styles/theme';
import AppLoading  from 'expo-app-loading';
import {AuthProvider} from './src/hooks/auth'
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'
import {useFonts} from 'expo-font';
import { Routes } from './src/routes'


export default function App() {

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if(!fontsLoaded){
    return <AppLoading/>
  }

  return (
    <ThemeProvider theme={theme} >
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthProvider>
        <Routes/>
      </AuthProvider>
    </ThemeProvider>
  );
}


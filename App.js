import React, { useEffect} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { initDB } from "./database/database";
import './Taal/i18n';

import Tabs from './Navigation/TabNavigator';
import Header from './components/Header';
import ThemeProvider from './theme/themeProvider'; // zorg dat het pad klopt

const App = () => {

  useEffect(() => {
    initDB();
  }, []);

  return (
    <ThemeProvider>
      <NavigationContainer>
        <Header />
        <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
          <Tabs />
        </SafeAreaView>
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;

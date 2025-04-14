import React from "react";
import { NavigationContainer} from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';

import Tabs from './Navigation/TabNavigator';
import Header from './components/Header';

const App = () => {
  return(
    <NavigationContainer>
      <Header />
      <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
        <Tabs />
      </SafeAreaView>
  </NavigationContainer>
  )
}

export default App;


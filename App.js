import React from "react";
import { NavigationContainer} from "@react-navigation/native";
import Tabs from './Navigation/TabNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';


const App = () => {
  return(
    <NavigationContainer>
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
      <Tabs />
    </SafeAreaView>
  </NavigationContainer>
  )
}

export default App;


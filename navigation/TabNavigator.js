import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import HomeScreen from "../screens/homeScreen";
import MoodPickerScreen from "../screens/MoodPickerScreen";
import StatisticsScreen from "../screens/StatisticsScreen";
import SettingScreen from "../screens/SettingsScreen";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: styles.tabBar,
            tabBarItemStyle: styles.tabBarItem,
            tabBarActiveTintColor: "#5F67EA",
            tabBarInactiveTintColor: "#aaa",
            tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
                case "Home":
                iconName = focused ? "home" : "home-outline";
                break;
                case "Mood":
                iconName = focused ? "happy" : "happy-outline";
                break;
                case "Stats":
                iconName = focused ? "bar-chart" : "bar-chart-outline";
                break;
                case "Setting":
                iconName = focused ? "settings" : "settings-outline";
                break;
            }

            return <Ionicons name={iconName} size={24} color={color} />;
            },
        })}
        >

      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Mood" component={MoodPickerScreen} />
      <Tab.Screen name="Stats" component={StatisticsScreen} />
      <Tab.Screen name="Setting" component={SettingScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
    tabBar: {
        position: "absolute",
        bottom: 30,
        left: 20,
        right: 20,
        marginHorizontal: 20,
        backgroundColor: "#ffffff",
        borderRadius: 25,
        height: 60,
        paddingBottom: 10,
        elevation: 8, 
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },

      tabBarItem: {
        justifyContent: "center",
        alignItems: 'center',
        alignContent: 'center',
        marginTop: 10,
      },
});

export default Tabs;

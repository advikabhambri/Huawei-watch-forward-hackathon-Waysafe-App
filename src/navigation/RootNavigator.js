import React from "react";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "../screens/WelcomeScreen";
import ActiveAlertScreen from "../screens/ActiveAlertScreen";
import SOSConfirmationScreen from "../screens/SOSConfirmationScreen";
import SafeRouteScreen from "../screens/SafeRouteScreen";
import MainTabs from "./MainTabs";
import { colors } from "../theme/colors";

const Stack = createNativeStackNavigator();

const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.navyDark,
    card: colors.navyDark,
    text: colors.white,
    border: colors.border,
    primary: colors.red,
  },
};

export default function RootNavigator() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "transparent" },
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="ActiveAlert" component={ActiveAlertScreen} />
        <Stack.Screen name="SOSConfirmation" component={SOSConfirmationScreen} />
        <Stack.Screen name="SafeRoute" component={SafeRouteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import AccessibilityProfileScreen from "../screens/AccessibilityProfileScreen";
import EmergencyContactsScreen from "../screens/EmergencyContactsScreen";
import AlertHistoryScreen from "../screens/AlertHistoryScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { colors } from "../theme/colors";

const Tab = createBottomTabNavigator();

const icons = {
  Home: "view-dashboard",
  Profile: "account-heart",
  Contacts: "account-group",
  History: "timeline-clock-outline",
  Settings: "cog-outline",
};

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.red,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.border,
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "700",
        },
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name={icons[route.name]} color={color} size={size} />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={AccessibilityProfileScreen} />
      <Tab.Screen name="Contacts" component={EmergencyContactsScreen} />
      <Tab.Screen name="History" component={AlertHistoryScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
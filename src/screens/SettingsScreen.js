import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import SectionCard from "../components/SectionCard";
import ScreenHeader from "../components/ScreenHeader";
import { colors } from "../theme/colors";

const settingsItems = [
  { title: "Edit profile", icon: "account-edit-outline" },
  { title: "Change emergency contact", icon: "account-switch-outline" },
  { title: "Notifications", icon: "bell-outline" },
  { title: "Accessibility preferences", icon: "accessibility" },
  { title: "App info", icon: "information-outline" },
];

export default function SettingsScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <ScreenHeader
        title="Settings"
        subtitle="Manage preferences, contact options, and app information."
      />

      <SectionCard>
        <View style={styles.list}>
          {settingsItems.map((item) => (
            <View key={item.title} style={styles.row}>
              <View style={styles.iconWrap}>
                <MaterialCommunityIcons name={item.icon} size={22} color={colors.white} />
              </View>
              <Text style={styles.label}>{item.title}</Text>
              <MaterialCommunityIcons name="chevron-right" size={22} color={colors.muted} />
            </View>
          ))}
        </View>
      </SectionCard>

      <SectionCard>
        <Text style={styles.infoTitle}>WaySafe</Text>
        <Text style={styles.infoText}>
          Frontend-only hackathon prototype for an accessible emergency companion app built with
          React Native and Expo.
        </Text>
      </SectionCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 24,
    gap: 16,
  },
  list: {
    gap: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: colors.navy,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    flex: 1,
    fontSize: 15,
    fontWeight: "800",
    color: colors.navy,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.navy,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.muted,
    fontWeight: "600",
  },
});
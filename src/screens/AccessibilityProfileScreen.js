import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useApp } from "../context/AppContext";
import ProfileOptionCard from "../components/ProfileOptionCard";
import SectionCard from "../components/SectionCard";
import ScreenHeader from "../components/ScreenHeader";
import { colors } from "../theme/colors";

export default function AccessibilityProfileScreen() {
  const { accessibilityProfiles, selectedProfileId, setSelectedProfileId } = useApp();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <ScreenHeader
        title="Accessibility Profile"
        subtitle="Choose the support mode that best matches the traveler."
      />

      <SectionCard>
        <View style={styles.summaryRow}>
          <View style={styles.summaryIcon}>
            <MaterialCommunityIcons name="account-check-outline" size={24} color={colors.white} />
          </View>
          <View style={styles.summaryCopy}>
            <Text style={styles.summaryTitle}>Current profile</Text>
            <Text style={styles.summaryName}>
              {accessibilityProfiles.find((profile) => profile.id === selectedProfileId)?.title}
            </Text>
          </View>
        </View>
      </SectionCard>

      <View style={styles.list}>
        {accessibilityProfiles.map((profile) => (
          <ProfileOptionCard
            key={profile.id}
            profile={profile}
            selected={selectedProfileId === profile.id}
            onPress={() => setSelectedProfileId(profile.id)}
          />
        ))}
      </View>
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
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  summaryIcon: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: colors.navy,
    alignItems: "center",
    justifyContent: "center",
  },
  summaryCopy: {
    flex: 1,
  },
  summaryTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.muted,
    textTransform: "uppercase",
  },
  summaryName: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: "900",
    color: colors.navy,
  },
  list: {
    gap: 12,
  },
});
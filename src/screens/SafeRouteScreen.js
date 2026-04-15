import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import SectionCard from "../components/SectionCard";
import PrimaryButton from "../components/PrimaryButton";
import { colors } from "../theme/colors";

const routeSteps = [
  "Move 20 meters straight ahead.",
  "Turn right toward the nearest help point.",
  "Proceed to the illuminated exit sign.",
  "Reach the safe assistance desk.",
];

export default function SafeRouteScreen({ navigation }) {
  return (
    <View style={styles.screen}>
      <LinearGradient colors={[colors.navy, colors.navyDark]} style={styles.hero}>
        <Text style={styles.heroLabel}>Navigation / Safe Route</Text>
        <Text style={styles.heroTitle}>Nearest Safe Exit</Text>
        <View style={styles.destinationRow}>
          <View style={styles.directionBadge}>
            <MaterialCommunityIcons name="arrow-top-right" size={26} color={colors.white} />
          </View>
          <View style={styles.destinationCopy}>
            <Text style={styles.destinationLabel}>Destination</Text>
            <Text style={styles.destinationName}>Help Point B - West Corridor</Text>
          </View>
          <View style={styles.distanceBox}>
            <Text style={styles.distanceValue}>180 m</Text>
            <Text style={styles.distanceLabel}>Away</Text>
          </View>
        </View>
      </LinearGradient>

      <SectionCard>
        <Text style={styles.sectionTitle}>Map Preview</Text>
        <View style={styles.mapPlaceholder}>
          <MaterialCommunityIcons name="map-outline" size={42} color={colors.navy} />
          <Text style={styles.mapText}>Map preview available in the next build</Text>
        </View>
      </SectionCard>

      <SectionCard>
        <Text style={styles.sectionTitle}>Route Steps</Text>
        <View style={styles.stepsList}>
          {routeSteps.map((step, index) => (
            <View key={step} style={styles.stepRow}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>
      </SectionCard>

      <PrimaryButton
        label="Back to Dashboard"
        variant="primary"
        icon={<MaterialCommunityIcons name="arrow-left" size={20} color={colors.white} />}
        onPress={() => navigation.navigate("MainTabs", { screen: "Home" })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    gap: 16,
  },
  hero: {
    borderRadius: 28,
    padding: 20,
    gap: 16,
  },
  heroLabel: {
    color: "rgba(255,255,255,0.72)",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    fontSize: 12,
    fontWeight: "800",
  },
  heroTitle: {
    color: colors.white,
    fontSize: 30,
    lineHeight: 34,
    fontWeight: "900",
  },
  destinationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  directionBadge: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  destinationCopy: {
    flex: 1,
  },
  destinationLabel: {
    color: "rgba(255,255,255,0.72)",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  destinationName: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "900",
    marginTop: 4,
  },
  distanceBox: {
    minWidth: 74,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 18,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  distanceValue: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "900",
  },
  distanceLabel: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 11,
    fontWeight: "700",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.navy,
    marginBottom: 12,
  },
  mapPlaceholder: {
    minHeight: 180,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.navySoft,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  mapText: {
    color: colors.navy,
    fontSize: 14,
    fontWeight: "800",
  },
  stepsList: {
    gap: 12,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  stepNumber: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.redSoft,
  },
  stepNumberText: {
    color: colors.red,
    fontWeight: "900",
  },
  stepText: {
    flex: 1,
    color: colors.navy,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700",
  },
});
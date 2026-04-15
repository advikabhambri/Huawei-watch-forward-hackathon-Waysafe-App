import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import PrimaryButton from "../components/PrimaryButton";
import { colors } from "../theme/colors";

export default function WelcomeScreen({ navigation }) {
  return (
    <LinearGradient colors={[colors.navyDark, colors.navy, "#122A46"]} style={styles.screen}>
      <View style={styles.orbTop} />
      <View style={styles.orbBottom} />

      <View style={styles.hero}>
        <View style={styles.logoWrap}>
          <MaterialCommunityIcons name="shield-alert-outline" size={44} color={colors.white} />
        </View>
        <Text style={styles.brand}>WaySafe</Text>
        <Text style={styles.slogan}>Accessible Safety, Right on Your Wrist</Text>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Emergency companion for travelers</Text>
        <Text style={styles.panelText}>
          Manage accessibility profiles, alert caregivers, and guide the user through
          serious incidents with large, clear controls.
        </Text>

        <View style={styles.featureRow}>
          <View style={styles.featureChip}>
            <MaterialCommunityIcons name="theme-light-dark" size={18} color={colors.navy} />
            <Text style={styles.featureText}>High contrast</Text>
          </View>
          <View style={styles.featureChip}>
            <MaterialCommunityIcons name="gesture-tap-button" size={18} color={colors.navy} />
            <Text style={styles.featureText}>One-tap SOS</Text>
          </View>
        </View>

        <PrimaryButton
          label="Get Started"
          variant="danger"
          icon={<MaterialCommunityIcons name="arrow-right" size={20} color={colors.white} />}
          onPress={() => navigation.replace("MainTabs")}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 80,
    paddingBottom: 24,
    justifyContent: "space-between",
    overflow: "hidden",
  },
  orbTop: {
    position: "absolute",
    top: -60,
    right: -50,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  orbBottom: {
    position: "absolute",
    bottom: 120,
    left: -40,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(247,115,22,0.16)",
  },
  hero: {
    alignItems: "center",
    marginTop: 20,
  },
  logoWrap: {
    width: 90,
    height: 90,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.22)",
    backgroundColor: "rgba(255,255,255,0.08)",
    marginBottom: 18,
  },
  brand: {
    fontSize: 40,
    lineHeight: 46,
    fontWeight: "900",
    color: colors.white,
    letterSpacing: -0.8,
  },
  slogan: {
    marginTop: 10,
    fontSize: 17,
    lineHeight: 24,
    color: "rgba(255,255,255,0.9)",
    textAlign: "center",
    fontWeight: "700",
    maxWidth: 300,
  },
  panel: {
    backgroundColor: colors.white,
    borderRadius: 30,
    padding: 22,
    gap: 16,
  },
  panelTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: colors.navy,
  },
  panelText: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.muted,
    fontWeight: "600",
  },
  featureRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  featureChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: colors.navySoft,
  },
  featureText: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.navy,
  },
});
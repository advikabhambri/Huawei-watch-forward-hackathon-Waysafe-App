import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { useApp } from "../context/AppContext";
import PrimaryButton from "../components/PrimaryButton";
import SectionCard from "../components/SectionCard";
import { colors } from "../theme/colors";
import { formatDateTime } from "../utils/formatters";

export default function SOSConfirmationScreen({ navigation, route }) {
  const { lastSOS } = useApp();
  const emergencyType = route.params?.emergencyType || lastSOS?.emergencyType || "SOS Request";

  return (
    <View style={styles.screen}>
      <LinearGradient colors={[colors.navyDark, colors.navy]} style={styles.hero}>
        <View style={styles.iconWrap}>
          <MaterialCommunityIcons name="check-decagram" size={48} color={colors.white} />
        </View>
        <Text style={styles.title}>SOS Sent Successfully</Text>
        <Text style={styles.subtitle}>Caregiver notified and live location shared.</Text>
      </LinearGradient>

      <SectionCard style={styles.detailsCard}>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="alert-circle-outline" size={20} color={colors.red} />
          <Text style={styles.detailText}>{emergencyType}</Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="account-group-outline" size={20} color={colors.navy} />
          <Text style={styles.detailText}>{lastSOS?.caregiverName || "Primary caregiver notified"}</Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="map-marker-radius" size={20} color={colors.orange} />
          <Text style={styles.detailText}>Live location shared</Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="clock-outline" size={20} color={colors.navy} />
          <Text style={styles.detailText}>{formatDateTime(lastSOS?.sentAt || new Date().toISOString())}</Text>
        </View>
      </SectionCard>

      <PrimaryButton
        label="Return Home"
        variant="primary"
        icon={<MaterialCommunityIcons name="home-outline" size={20} color={colors.white} />}
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
    padding: 24,
    alignItems: "center",
    gap: 14,
  },
  iconWrap: {
    width: 92,
    height: 92,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
    color: colors.white,
    fontWeight: "900",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: "rgba(255,255,255,0.9)",
    textAlign: "center",
    fontWeight: "600",
  },
  detailsCard: {
    gap: 14,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  detailText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "800",
    color: colors.navy,
  },
});
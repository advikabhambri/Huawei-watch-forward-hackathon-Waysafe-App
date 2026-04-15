import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { useApp } from "../context/AppContext";
import PrimaryButton from "../components/PrimaryButton";
import SectionCard from "../components/SectionCard";
import StatusPill from "../components/StatusPill";
import { colors } from "../theme/colors";

const supportCopy = {
  vision: ["Voice guidance enabled", "Strong vibration active"],
  hearing: ["Visual alert mode enabled", "High-contrast screen active"],
  speech: ["One-tap SOS ready", "Caregiver messaging streamlined"],
  mobility: ["Accessible route recommended", "Low-effort navigation enabled"],
  cognitive: ["Step-by-step guidance enabled", "Simple instructions on screen"],
};

const profileIcon = {
  vision: "eye",
  hearing: "ear-hearing",
  speech: "message-text-outline",
  mobility: "wheelchair-accessibility",
  cognitive: "account-heart-outline",
};

export default function ActiveAlertScreen({ navigation, route }) {
  const { activeAlert, selectedProfile, markSafe, sendSOS } = useApp();
  const emergencyType = route.params?.emergencyType || activeAlert?.type || "Emergency Alert";
  const supportMessages = supportCopy[selectedProfile.id] || selectedProfile.supportMessages;

  const handleSendSOS = () => {
    sendSOS(emergencyType);
    navigation.navigate("SOSConfirmation", { emergencyType });
  };

  const handleMarkSafe = () => {
    markSafe();
    navigation.navigate("MainTabs", { screen: "Home" });
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <LinearGradient colors={[colors.red, colors.navyDark]} style={styles.hero}>
        <View style={styles.topRow}>
          <StatusPill label="Emergency Active" tone="active" />
          <Text style={styles.severity}>Severity: {activeAlert?.severity || "Urgent"}</Text>
        </View>
        <View style={styles.iconWrap}>
          <MaterialCommunityIcons name="alert-octagon" size={44} color={colors.white} />
        </View>
        <Text style={styles.title}>{emergencyType}</Text>
        <Text style={styles.subtitle}>Immediate response is in progress. Keep the interface clear and simple.</Text>
      </LinearGradient>

      <SectionCard>
        <View style={styles.supportHeader}>
          <View style={styles.supportBadge}>
            <MaterialCommunityIcons name={profileIcon[selectedProfile.id]} size={20} color={colors.white} />
          </View>
          <View style={styles.supportCopy}>
            <Text style={styles.supportTitle}>{selectedProfile.title}</Text>
            <Text style={styles.supportSubtitle}>Adaptive support is tailored to this profile</Text>
          </View>
        </View>

        <View style={styles.supportList}>
          {supportMessages.map((message) => (
            <View key={message} style={styles.supportItem}>
              <MaterialCommunityIcons name="check-circle" size={18} color={colors.success} />
              <Text style={styles.supportText}>{message}</Text>
            </View>
          ))}
        </View>
      </SectionCard>

      <SectionCard>
        <Text style={styles.sectionTitle}>Emergency controls</Text>
        <View style={styles.buttonStack}>
          <PrimaryButton
            label="View Safe Route"
            variant="secondary"
            icon={<MaterialCommunityIcons name="map-marker-path" size={20} color={colors.navy} />}
            onPress={() => navigation.navigate("SafeRoute")}
          />
          <PrimaryButton
            label="Send SOS"
            variant="danger"
            icon={<MaterialCommunityIcons name="send-circle" size={20} color={colors.white} />}
            onPress={handleSendSOS}
          />
          <PrimaryButton
            label="Mark Safe"
            variant="primary"
            icon={<MaterialCommunityIcons name="shield-check" size={20} color={colors.white} />}
            onPress={handleMarkSafe}
          />
        </View>
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
  hero: {
    borderRadius: 28,
    padding: 20,
    gap: 14,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  severity: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "800",
  },
  iconWrap: {
    width: 84,
    height: 84,
    borderRadius: 28,
    backgroundColor: "rgba(255,255,255,0.14)",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: colors.white,
    fontSize: 30,
    lineHeight: 34,
    fontWeight: "900",
    letterSpacing: -0.5,
  },
  subtitle: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "600",
  },
  supportHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  supportBadge: {
    width: 50,
    height: 50,
    borderRadius: 18,
    backgroundColor: colors.navy,
    alignItems: "center",
    justifyContent: "center",
  },
  supportCopy: {
    flex: 1,
  },
  supportTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: colors.navy,
  },
  supportSubtitle: {
    marginTop: 4,
    fontSize: 12,
    color: colors.muted,
    fontWeight: "600",
  },
  supportList: {
    gap: 10,
  },
  supportItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: colors.background,
    borderRadius: 16,
  },
  supportText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    color: colors.navy,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.navy,
    marginBottom: 12,
  },
  buttonStack: {
    gap: 12,
  },
});
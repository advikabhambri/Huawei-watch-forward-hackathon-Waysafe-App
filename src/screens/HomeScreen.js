import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { useApp } from "../context/AppContext";
import { colors, shadows } from "../theme/colors";
import { caregiverStatus, quickActions } from "../data/mockData";
import PrimaryButton from "../components/PrimaryButton";
import SectionCard from "../components/SectionCard";
import StatusPill from "../components/StatusPill";
import ScreenHeader from "../components/ScreenHeader";
import { formatRelativeTime } from "../utils/formatters";

export default function HomeScreen({ navigation }) {
  const { selectedProfile, alertRecords, triggerAlert, sendSOS, activeAlert } = useApp();

  const handleAction = async (type) => {
    if (type === "SOS Request") {
      await sendSOS(type);
      navigation.navigate("SOSConfirmation", { emergencyType: type });
      return;
    }

    await triggerAlert(type);
    navigation.navigate("ActiveAlert", { emergencyType: type });
  };

  const recentAlerts = alertRecords.slice(0, 3);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <LinearGradient colors={[colors.navy, colors.navyDark]} style={styles.hero}>
        <View style={styles.heroTopRow}>
          <View>
            <Text style={styles.greeting}>Good morning</Text>
            <Text style={styles.name}>Traveler Ready</Text>
          </View>
          <View style={styles.profileBadge}>
            <MaterialCommunityIcons name={selectedProfile.icon} size={18} color={colors.white} />
          </View>
        </View>

        <View style={styles.statusRow}>
          <View>
            <Text style={styles.statusLabel}>System Status</Text>
            <Text style={styles.statusValue}>{activeAlert ? "Active alert" : "Safe / No active alert"}</Text>
          </View>
          <StatusPill label={activeAlert ? "Alert live" : "Safe"} tone={activeAlert ? "active" : "safe"} />
        </View>

        <View style={styles.profileCard}>
          <Text style={styles.profileTitle}>Selected Accessibility Profile</Text>
          <Text style={styles.profileName}>{selectedProfile.title}</Text>
          <Text style={styles.profileDescription}>{selectedProfile.description}</Text>
        </View>
      </LinearGradient>

      <SectionCard>
        <ScreenHeader title="Quick Actions" subtitle="Large controls for immediate emergency support." />
        <View style={styles.actionGrid}>
          {quickActions.map((action) => (
            <Pressable
              key={action.type}
              onPress={() => handleAction(action.type)}
              style={({ pressed }) => [
                styles.actionButton,
                action.type === "SOS Request" && styles.sosButton,
                pressed && styles.actionPressed,
              ]}
            >
              <MaterialCommunityIcons
                name={action.icon}
                size={24}
                color={action.type === "SOS Request" ? colors.white : colors.navy}
              />
              <Text style={[styles.actionLabel, action.type === "SOS Request" && styles.sosLabel]}>
                {action.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </SectionCard>

      <SectionCard>
        <ScreenHeader title="Recent Alerts" subtitle="Latest activity from the companion system." />
        <View style={styles.alertList}>
          {recentAlerts.map((alert) => (
            <View key={alert.id} style={styles.alertRow}>
              <View style={styles.alertIcon}>
                <MaterialCommunityIcons name="alert-circle-outline" size={20} color={colors.red} />
              </View>
              <View style={styles.alertCopy}>
                <Text style={styles.alertTitle}>{alert.title || alert.type}</Text>
                <Text style={styles.alertTime}>
                  {formatRelativeTime(alert.timestamp || alert.createdAt || alert.resolvedAt)}
                </Text>
              </View>
              <StatusPill
                label={alert.status}
                tone={String(alert.status).toLowerCase() === "resolved" ? "resolved" : "pending"}
              />
            </View>
          ))}
        </View>
      </SectionCard>

      <SectionCard>
        <ScreenHeader title="Caregiver Status" subtitle="Keep family and caregivers informed." />
        <View style={styles.caregiverCard}>
          <View style={styles.caregiverAvatar}>
            <MaterialCommunityIcons name="account-check" size={26} color={colors.white} />
          </View>
          <View style={styles.caregiverCopy}>
            <Text style={styles.caregiverName}>{caregiverStatus.name}</Text>
            <Text style={styles.caregiverNote}>{caregiverStatus.note}</Text>
          </View>
        </View>

        <View style={styles.caregiverMetaRow}>
          <View style={styles.metaChip}>
            <MaterialCommunityIcons name="circle-slice-8" size={16} color={colors.success} />
            <Text style={styles.metaText}>{caregiverStatus.availability}</Text>
          </View>
          <View style={styles.metaChip}>
            <MaterialCommunityIcons name="clock-outline" size={16} color={colors.navy} />
            <Text style={styles.metaText}>{caregiverStatus.responseTime}</Text>
          </View>
        </View>
      </SectionCard>

      <PrimaryButton
        label="Open Safe Route Guidance"
        variant="secondary"
        icon={<MaterialCommunityIcons name="map-marker-path" size={20} color={colors.navy} />}
        onPress={() => navigation.navigate("SafeRoute")}
      />
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
    padding: 18,
    gap: 16,
    ...shadows.card,
  },
  heroTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  greeting: {
    color: "rgba(255,255,255,0.76)",
    fontSize: 13,
    fontWeight: "700",
  },
  name: {
    color: colors.white,
    fontSize: 24,
    fontWeight: "900",
    marginTop: 4,
  },
  profileBadge: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 14,
  },
  statusLabel: {
    color: "rgba(255,255,255,0.72)",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.7,
  },
  statusValue: {
    marginTop: 6,
    color: colors.white,
    fontSize: 18,
    fontWeight: "800",
  },
  profileCard: {
    padding: 16,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
  },
  profileTitle: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  profileName: {
    color: colors.white,
    fontSize: 22,
    fontWeight: "900",
    marginTop: 6,
  },
  profileDescription: {
    color: "rgba(255,255,255,0.84)",
    marginTop: 6,
    lineHeight: 20,
    fontWeight: "600",
  },
  actionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  actionButton: {
    flexBasis: "48%",
    backgroundColor: colors.background,
    borderRadius: 22,
    paddingVertical: 18,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 112,
    gap: 12,
  },
  sosButton: {
    backgroundColor: colors.red,
  },
  actionPressed: {
    opacity: 0.9,
  },
  actionLabel: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.navy,
    textAlign: "center",
    lineHeight: 18,
  },
  sosLabel: {
    color: colors.white,
  },
  alertList: {
    gap: 12,
  },
  alertRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  alertIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.redSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  alertCopy: {
    flex: 1,
  },
  alertTitle: {
    color: colors.navy,
    fontSize: 15,
    fontWeight: "800",
  },
  alertTime: {
    marginTop: 2,
    color: colors.muted,
    fontSize: 12,
    fontWeight: "600",
  },
  caregiverCard: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  caregiverAvatar: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: colors.navy,
    alignItems: "center",
    justifyContent: "center",
  },
  caregiverCopy: {
    flex: 1,
  },
  caregiverName: {
    fontSize: 16,
    fontWeight: "900",
    color: colors.navy,
  },
  caregiverNote: {
    marginTop: 4,
    fontSize: 13,
    lineHeight: 19,
    color: colors.muted,
    fontWeight: "600",
  },
  caregiverMetaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 14,
  },
  metaChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: colors.background,
  },
  metaText: {
    color: colors.navy,
    fontSize: 12,
    fontWeight: "800",
  },
});
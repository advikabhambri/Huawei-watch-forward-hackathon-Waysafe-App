import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { useApp } from "../context/AppContext";
import AlertListItem from "../components/AlertListItem";
import SectionCard from "../components/SectionCard";
import ScreenHeader from "../components/ScreenHeader";
import { colors } from "../theme/colors";

export default function AlertHistoryScreen() {
  const { alertRecords } = useApp();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <ScreenHeader
        title="Alert History"
        subtitle="Review previous emergencies and their current resolution state."
      />

      <SectionCard>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>{alertRecords.length}</Text>
            <Text style={styles.summaryLabel}>Total alerts</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>{alertRecords.filter((item) => item.status === "Resolved").length}</Text>
            <Text style={styles.summaryLabel}>Resolved</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>{alertRecords.filter((item) => item.status !== "Resolved").length}</Text>
            <Text style={styles.summaryLabel}>Pending</Text>
          </View>
        </View>
      </SectionCard>

      <SectionCard>
        <View style={styles.list}>
          {alertRecords.map((alert) => (
            <AlertListItem key={alert.id} alert={alert} />
          ))}
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
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  summaryItem: {
    flex: 1,
    padding: 14,
    borderRadius: 18,
    backgroundColor: colors.background,
    alignItems: "center",
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: "900",
    color: colors.navy,
  },
  summaryLabel: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: "700",
    color: colors.muted,
    textAlign: "center",
  },
  list: {
    gap: 0,
  },
});
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { colors } from "../theme/colors";
import { formatRelativeTime } from "../utils/formatters";

const badgeTheme = {
  Resolved: { backgroundColor: "#E7F7F1", color: "#127C56" },
  Pending: { backgroundColor: "#FFF4D6", color: "#B45309" },
  Active: { backgroundColor: "#FEE4E2", color: "#B42318" },
};

export default function AlertListItem({ alert }) {
  const theme = badgeTheme[alert.status] || badgeTheme.Pending;

  return (
    <View style={styles.item}>
      <View style={styles.iconWrap}>
        <MaterialCommunityIcons name="alert-octagon" size={22} color={colors.red} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{alert.type}</Text>
        <Text style={styles.meta}>{formatRelativeTime(alert.timestamp)}</Text>
      </View>
      <View style={[styles.badge, { backgroundColor: theme.backgroundColor }]}>
        <Text style={[styles.badgeText, { color: theme.color }]}>{alert.status}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.redSoft,
  },
  content: {
    flex: 1,
    gap: 3,
  },
  title: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.navy,
  },
  meta: {
    fontSize: 12,
    color: colors.muted,
    fontWeight: "600",
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
  },
});
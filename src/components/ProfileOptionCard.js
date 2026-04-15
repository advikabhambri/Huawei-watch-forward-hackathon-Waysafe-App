import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { colors, shadows } from "../theme/colors";

export default function ProfileOptionCard({ profile, selected, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        selected && { borderColor: profile.accent, backgroundColor: profile.accent + "12" },
        pressed && styles.pressed,
      ]}
    >
      <View style={[styles.iconWrap, { backgroundColor: profile.accent + "18" }]}>
        <MaterialCommunityIcons name={profile.icon} size={26} color={profile.accent} />
      </View>
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.title}>{profile.title}</Text>
          {selected ? <Text style={styles.selected}>Selected</Text> : null}
        </View>
        <Text style={styles.description}>{profile.description}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    gap: 14,
    padding: 16,
    borderRadius: 22,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.card,
  },
  pressed: {
    opacity: 0.9,
  },
  iconWrap: {
    width: 54,
    height: 54,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    gap: 6,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "900",
    color: colors.navy,
    flex: 1,
  },
  selected: {
    fontSize: 12,
    color: colors.navy,
    fontWeight: "800",
  },
  description: {
    fontSize: 13,
    lineHeight: 19,
    color: colors.muted,
    fontWeight: "600",
  },
});
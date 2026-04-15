import React from "react";
import { StyleSheet, Text, View } from "react-native";

const palette = {
  safe: { backgroundColor: "#E7F7F1", color: "#127C56" },
  active: { backgroundColor: "#FEE4E2", color: "#B42318" },
  pending: { backgroundColor: "#FFF4D6", color: "#B45309" },
  resolved: { backgroundColor: "#EAF0F8", color: "#0B1F36" },
  online: { backgroundColor: "#E7F7F1", color: "#127C56" },
};

export default function StatusPill({ label, tone = "safe" }) {
  const theme = palette[tone] || palette.safe;

  return (
    <View style={[styles.pill, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.text, { color: theme.color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
  },
  text: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
});
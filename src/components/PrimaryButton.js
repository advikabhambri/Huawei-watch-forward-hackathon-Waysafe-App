import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "../theme/colors";

const variants = {
  primary: {
    backgroundColor: colors.navy,
    color: colors.white,
  },
  danger: {
    backgroundColor: colors.red,
    color: colors.white,
  },
  warning: {
    backgroundColor: colors.orange,
    color: colors.white,
  },
  secondary: {
    backgroundColor: colors.white,
    color: colors.navy,
    borderColor: colors.border,
    borderWidth: 1,
  },
};

export default function PrimaryButton({
  label,
  onPress,
  variant = "primary",
  icon,
  loading = false,
  fullWidth = true,
  small = false,
}) {
  const theme = variants[variant] || variants.primary;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: theme.backgroundColor, borderColor: theme.borderColor },
        fullWidth && styles.fullWidth,
        small && styles.small,
        pressed && styles.pressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator color={theme.color} />
        ) : (
          <>
            {icon}
            <Text style={[styles.label, { color: theme.color }, small && styles.smallLabel]}>
              {label}
            </Text>
          </>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 18,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 56,
  },
  fullWidth: {
    width: "100%",
  },
  small: {
    minHeight: 48,
    paddingVertical: 12,
  },
  pressed: {
    opacity: 0.86,
    transform: [{ scale: 0.99 }],
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
  smallLabel: {
    fontSize: 14,
  },
});
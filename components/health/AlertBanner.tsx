import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Icon from "@/components/Icon";
import { colors, borderRadius, spacing } from "@/constants/theme";

interface AlertBannerProps {
    level: "info" | "warning" | "critical";
    message: string;
    onPress?: () => void;
}

const levelConfig = {
    info: {
        icon: "information-circle",
        bg: `${colors.info}10`,
        border: colors.info,
        text: colors.info,
    },
    warning: {
        icon: "warning",
        bg: `${colors.warning}10`,
        border: colors.warning,
        text: colors.warning,
    },
    critical: {
        icon: "alert-circle",
        bg: `${colors.error}10`,
        border: colors.error,
        text: colors.error,
    },
};

/**
 * 预警横幅组件 - Glassmorphism 风格
 */
export function AlertBanner({ level, message, onPress }: AlertBannerProps) {
    const config = levelConfig[level];

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.container,
                { backgroundColor: config.bg, borderLeftColor: config.border },
                pressed && styles.pressed,
            ]}
        >
            <Icon name={config.icon} size={20} color={config.text} />
            <Text style={[styles.message, { color: config.text }]} numberOfLines={2}>
                {message}
            </Text>
            <Icon name="chevron-forward" size={16} color={config.text} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        padding: spacing.md,
        borderRadius: borderRadius.lg,
        borderLeftWidth: 4,
        gap: spacing.sm,
    },
    pressed: {
        opacity: 0.9,
    },
    message: {
        flex: 1,
        fontSize: 14,
        fontWeight: "500",
        lineHeight: 20,
    },
});

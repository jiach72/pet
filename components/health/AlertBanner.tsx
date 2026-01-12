import React from "react";
import { View, Text, Pressable, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, borderRadius, shadows, spacing } from "@/constants/theme";
import type { AlertLevel } from "@/types";

interface AlertBannerProps {
    level: AlertLevel;
    message: string;
    onPress?: () => void;
    onDismiss?: () => void;
}

/**
 * 预警横幅组件 (玻璃态风格)
 * - Soft shadow
 * - 彩色左边框
 * - 图标替换 Emoji
 */
export function AlertBanner({
    level,
    message,
    onPress,
    onDismiss,
}: AlertBannerProps) {
    const getConfig = () => {
        switch (level) {
            case "critical":
                return {
                    bg: "rgba(239, 68, 68, 0.08)",
                    color: colors.error,
                    icon: "alert-circle" as const,
                    label: "紧急",
                };
            case "warning":
                return {
                    bg: "rgba(249, 115, 22, 0.08)",
                    color: colors.warning,
                    icon: "warning" as const,
                    label: "警告",
                };
            default:
                return {
                    bg: "rgba(59, 130, 246, 0.08)",
                    color: colors.info,
                    icon: "information-circle" as const,
                    label: "注意",
                };
        }
    };

    const config = getConfig();

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.container,
                { backgroundColor: config.bg, borderLeftColor: config.color },
                pressed && styles.pressed,
            ]}
        >
            <View style={[styles.iconContainer, { backgroundColor: `${config.color}15` }]}>
                <Ionicons name={config.icon} size={20} color={config.color} />
            </View>
            <View style={styles.content}>
                <Text style={[styles.label, { color: config.color }]}>
                    {config.label}
                </Text>
                <Text style={styles.message} numberOfLines={1}>
                    {message}
                </Text>
            </View>
            {onDismiss && (
                <Pressable onPress={onDismiss} style={styles.dismissBtn}>
                    <Ionicons name="close" size={20} color={colors.muted} />
                </Pressable>
            )}
            <Ionicons name="chevron-forward" size={18} color={colors.muted} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        borderRadius: borderRadius.lg,
        borderLeftWidth: 4,
        ...shadows.card,
    },
    pressed: {
        opacity: 0.9,
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: borderRadius.md,
        alignItems: "center",
        justifyContent: "center",
    },
    content: {
        flex: 1,
        marginLeft: spacing.md,
    },
    label: {
        fontSize: 12,
        fontWeight: "700",
        letterSpacing: 0.5,
    },
    message: {
        color: colors.foreground,
        fontSize: 14,
        marginTop: 2,
    },
    dismissBtn: {
        padding: spacing.xs,
    },
});

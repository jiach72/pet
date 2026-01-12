import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import Icon from "@/components/Icon";
import { colors, borderRadius, shadows, spacing } from "@/constants/theme";

interface VitalGaugeProps {
    type: "temperature" | "respiratory" | "activity";
    value: number;
    unit: string;
}

const gaugeConfig = {
    temperature: {
        icon: "thermometer",
        label: "体温",
        color: colors.warning,
        min: 37,
        max: 40,
        normal: { min: 38, max: 39.2 },
        route: "/health/details/temperature",
    },
    respiratory: {
        icon: "pulse",
        label: "呼吸率",
        color: colors.info,
        min: 10,
        max: 40,
        normal: { min: 15, max: 30 },
        route: "/health/details/respiratory",
    },
    activity: {
        icon: "flash",
        label: "活动量",
        color: colors.secondary,
        min: 0,
        max: 100,
        normal: { min: 30, max: 80 },
        route: "/health/details/activity",
    },
};

/**
 * 体征仪表组件 - Claymorphism 风格 + SVG 图标 (支持下钻)
 */
export function VitalGauge({ type, value, unit }: VitalGaugeProps) {
    const router = useRouter();
    const config = gaugeConfig[type];
    const percentage = Math.min(
        100,
        Math.max(0, ((value - config.min) / (config.max - config.min)) * 100)
    );
    const isNormal = value >= config.normal.min && value <= config.normal.max;

    return (
        <Pressable
            onPress={() => router.push(config.route as any)}
            style={({ pressed }) => [
                styles.container,
                pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] }
            ]}
        >
            <View style={[styles.iconBg, { backgroundColor: `${config.color}15` }]}>
                <Icon name={config.icon as any} size={20} color={config.color} />
            </View>
            <Text style={styles.label}>{config.label}</Text>
            <View style={styles.valueRow}>
                <Text style={[styles.value, { color: isNormal ? config.color : colors.error }]}>
                    {value.toFixed(1)}
                </Text>
                <Text style={styles.unit}>{unit}</Text>
            </View>
            <View style={styles.progressBg}>
                <View
                    style={[
                        styles.progressFill,
                        {
                            width: `${percentage}%`,
                            backgroundColor: isNormal ? config.color : colors.error,
                        },
                    ]}
                />
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        borderRadius: borderRadius.xl,
        padding: spacing.md,
        alignItems: "center",
        ...shadows.card,
    },
    iconBg: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: spacing.sm,
    },
    label: {
        color: colors.muted,
        fontSize: 12,
        marginBottom: spacing.xs,
    },
    valueRow: {
        flexDirection: "row",
        alignItems: "baseline",
        marginBottom: spacing.sm,
    },
    value: {
        fontSize: 20,
        fontWeight: "bold",
    },
    unit: {
        color: colors.muted,
        fontSize: 11,
        marginLeft: 2,
    },
    progressBg: {
        width: "100%",
        height: 4,
        backgroundColor: colors.background,
        borderRadius: 2,
        overflow: "hidden",
    },
    progressFill: {
        height: "100%",
        borderRadius: 2,
    },
});

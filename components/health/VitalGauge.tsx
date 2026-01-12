import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
import { colors, borderRadius, shadows, spacing } from "@/constants/theme";

interface VitalGaugeProps {
    type: "temperature" | "respiratory" | "activity";
    value: number;
    unit: string;
}

const gaugeConfig = {
    temperature: {
        icon: "thermometer" as const,
        label: "体温",
        min: 36,
        max: 42,
        normalMin: 38,
        normalMax: 39.5,
        gradientColors: ["#F97316", "#FB923C"],
    },
    respiratory: {
        icon: "pulse" as const,
        label: "呼吸",
        min: 10,
        max: 50,
        normalMin: 15,
        normalMax: 35,
        gradientColors: ["#3B82F6", "#60A5FA"],
    },
    activity: {
        icon: "flash" as const,
        label: "活动量",
        min: 0,
        max: 100,
        normalMin: 30,
        normalMax: 80,
        gradientColors: ["#10B981", "#34D399"],
    },
};

/**
 * 体征仪表盘组件 (Claymorphism 风格)
 * - 移除 Emoji，使用 Ionicons
 * - 渐变进度条
 * - Soft shadow
 */
export function VitalGauge({ type, value, unit }: VitalGaugeProps) {
    const config = gaugeConfig[type];
    const progress = ((value - config.min) / (config.max - config.min)) * 100;
    const isNormal = value >= config.normalMin && value <= config.normalMax;

    // SVG 圆弧参数
    const size = 80;
    const strokeWidth = 8;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progressOffset =
        circumference - (Math.min(Math.max(progress, 0), 100) / 100) * circumference;

    return (
        <View style={styles.container}>
            <View style={styles.gaugeWrapper}>
                <Svg width={size} height={size}>
                    <Defs>
                        <LinearGradient id={`gradient-${type}`} x1="0" y1="0" x2="1" y2="1">
                            <Stop offset="0" stopColor={config.gradientColors[0]} />
                            <Stop offset="1" stopColor={config.gradientColors[1]} />
                        </LinearGradient>
                    </Defs>

                    {/* 背景圆环 */}
                    <Circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke={colors.backgroundSecondary}
                        strokeWidth={strokeWidth}
                        fill="none"
                    />

                    {/* 进度圆环 - 渐变 */}
                    <Circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke={`url(#gradient-${type})`}
                        strokeWidth={strokeWidth}
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={progressOffset}
                        strokeLinecap="round"
                        rotation={-90}
                        origin={`${size / 2}, ${size / 2}`}
                    />
                </Svg>

                <View style={styles.iconOverlay}>
                    <View
                        style={[
                            styles.iconBg,
                            { backgroundColor: `${config.gradientColors[0]}15` },
                        ]}
                    >
                        <Ionicons
                            name={config.icon}
                            size={22}
                            color={config.gradientColors[0]}
                        />
                    </View>
                </View>
            </View>

            <Text style={styles.label}>{config.label}</Text>
            <View style={styles.valueRow}>
                <Text style={[styles.value, !isNormal && styles.valueWarning]}>
                    {type === "temperature" ? value.toFixed(1) : value}
                </Text>
                <Text style={styles.unit}>{unit}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: colors.white,
        borderRadius: borderRadius.xl,
        padding: spacing.md,
        flex: 1,
        ...shadows.card,
    },
    gaugeWrapper: {
        position: "relative",
        width: 80,
        height: 80,
        alignItems: "center",
        justifyContent: "center",
    },
    iconOverlay: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
    },
    iconBg: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    label: {
        color: colors.muted,
        fontSize: 13,
        marginTop: spacing.sm,
    },
    valueRow: {
        flexDirection: "row",
        alignItems: "baseline",
        marginTop: 4,
    },
    value: {
        color: colors.foreground,
        fontSize: 18,
        fontWeight: "bold",
    },
    valueWarning: {
        color: colors.warning,
    },
    unit: {
        color: colors.muted,
        fontSize: 12,
        marginLeft: 2,
    },
});

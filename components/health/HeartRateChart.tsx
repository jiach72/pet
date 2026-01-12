import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "@/components/Icon";
import { colors, borderRadius, shadows, spacing } from "@/constants/theme";

interface HeartRateChartProps {
    points: number[];
    heartRate: number;
}

/**
 * 心率曲线图 - Soft UI 风格 + SVG 图标
 */
export function HeartRateChart({ points, heartRate }: HeartRateChartProps) {
    // 简化的 ECG 曲线渲染
    const renderECG = () => {
        const width = 280;
        const height = 80;
        const step = width / (points.length - 1);

        let path = "";
        points.forEach((point, index) => {
            const x = index * step;
            const y = height / 2 - (point - 0.5) * height * 0.8;
            if (index === 0) {
                path += `M ${x} ${y}`;
            } else {
                path += ` L ${x} ${y}`;
            }
        });

        return (
            <View style={styles.chartContainer}>
                <svg width={width} height={height} style={{ overflow: "visible" }}>
                    <defs>
                        <linearGradient id="ecgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor={colors.error} stopOpacity="0.3" />
                            <stop offset="100%" stopColor={colors.error} stopOpacity="1" />
                        </linearGradient>
                    </defs>
                    <path
                        d={path}
                        fill="none"
                        stroke="url(#ecgGradient)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.titleRow}>
                    <View style={styles.iconBg}>
                        <Icon name="heart" size={18} color={colors.error} />
                    </View>
                    <Text style={styles.title}>心率监测</Text>
                </View>
                <View style={styles.valueRow}>
                    <Text style={styles.value}>{heartRate}</Text>
                    <Text style={styles.unit}>BPM</Text>
                </View>
            </View>
            {renderECG()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.xl,
        padding: spacing.xl,
        ...shadows.card,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: spacing.lg,
    },
    titleRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
    },
    iconBg: {
        width: 32,
        height: 32,
        borderRadius: borderRadius.sm,
        backgroundColor: `${colors.error}15`,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        color: colors.foreground,
        fontSize: 16,
        fontWeight: "600",
    },
    valueRow: {
        flexDirection: "row",
        alignItems: "baseline",
    },
    value: {
        color: colors.error,
        fontSize: 28,
        fontWeight: "bold",
    },
    unit: {
        color: colors.muted,
        fontSize: 14,
        marginLeft: spacing.xs,
    },
    chartContainer: {
        alignItems: "center",
        justifyContent: "center",
        height: 80,
    },
});

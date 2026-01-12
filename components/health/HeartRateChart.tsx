import React, { useMemo } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Svg, { Path, Line, Defs, LinearGradient, Stop } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
import { colors, borderRadius, shadows, spacing } from "@/constants/theme";

const { width: screenWidth } = Dimensions.get("window");
const CHART_WIDTH = screenWidth - 64;
const CHART_HEIGHT = 140;
const PADDING = 10;

interface HeartRateChartProps {
    points: number[];
    heartRate: number;
}

/**
 * 心率曲线组件 (Soft UI 风格)
 * - 移除 Emoji，使用 Ionicons
 * - Soft shadow + 渐变背景
 * - 圆角优化
 */
export function HeartRateChart({ points, heartRate }: HeartRateChartProps) {
    const pathData = useMemo(() => {
        if (points.length === 0) return "";

        const xStep = (CHART_WIDTH - PADDING * 2) / (points.length - 1);
        const yCenter = CHART_HEIGHT / 2;
        const yScale = (CHART_HEIGHT - PADDING * 2) / 2;

        let d = `M ${PADDING} ${yCenter - points[0] * yScale}`;

        for (let i = 1; i < points.length; i++) {
            const x = PADDING + i * xStep;
            const y = yCenter - points[i] * yScale;
            d += ` L ${x} ${y}`;
        }

        return d;
    }, [points]);

    // 心率状态判断
    const getHeartRateStatus = () => {
        if (heartRate > 110) return { color: colors.warning, label: "偏高" };
        if (heartRate < 60) return { color: colors.info, label: "偏低" };
        return { color: colors.secondary, label: "正常" };
    };

    const status = getHeartRateStatus();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.labelRow}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="heart" size={20} color={colors.error} />
                    </View>
                    <View>
                        <Text style={styles.label}>心率监测</Text>
                        <Text style={styles.sublabel}>实时 ECG</Text>
                    </View>
                </View>
                <View style={styles.valueRow}>
                    <Text style={styles.value}>{heartRate}</Text>
                    <View>
                        <Text style={styles.unit}>bpm</Text>
                        <View style={[styles.statusBadge, { backgroundColor: `${status.color}15` }]}>
                            <Text style={[styles.statusText, { color: status.color }]}>
                                {status.label}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.chartContainer}>
                <Svg width={CHART_WIDTH} height={CHART_HEIGHT}>
                    <Defs>
                        <LinearGradient id="ecgGradient" x1="0" y1="0" x2="1" y2="0">
                            <Stop offset="0" stopColor={colors.secondary} stopOpacity="0.8" />
                            <Stop offset="1" stopColor={colors.secondaryLight} stopOpacity="1" />
                        </LinearGradient>
                    </Defs>

                    {/* 网格线 */}
                    {[0, 1, 2, 3, 4].map((i) => (
                        <Line
                            key={`h-${i}`}
                            x1={PADDING}
                            y1={PADDING + (i * (CHART_HEIGHT - PADDING * 2)) / 4}
                            x2={CHART_WIDTH - PADDING}
                            y2={PADDING + (i * (CHART_HEIGHT - PADDING * 2)) / 4}
                            stroke={colors.border}
                            strokeWidth={0.5}
                            strokeDasharray="4,4"
                        />
                    ))}

                    {/* ECG 曲线 - 渐变色 */}
                    <Path
                        d={pathData}
                        stroke="url(#ecgGradient)"
                        strokeWidth={2.5}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </Svg>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.xl,
        padding: spacing.lg,
        ...shadows.card,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: spacing.md,
    },
    labelRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: borderRadius.md,
        backgroundColor: `${colors.error}15`,
        alignItems: "center",
        justifyContent: "center",
    },
    label: {
        color: colors.foreground,
        fontSize: 16,
        fontWeight: "600",
    },
    sublabel: {
        color: colors.muted,
        fontSize: 12,
        marginTop: 2,
    },
    valueRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: spacing.xs,
    },
    value: {
        color: colors.foreground,
        fontSize: 36,
        fontWeight: "bold",
        lineHeight: 40,
    },
    unit: {
        color: colors.muted,
        fontSize: 14,
        marginTop: 4,
    },
    statusBadge: {
        paddingVertical: 2,
        paddingHorizontal: 8,
        borderRadius: borderRadius.sm,
        marginTop: 4,
    },
    statusText: {
        fontSize: 12,
        fontWeight: "600",
    },
    chartContainer: {
        backgroundColor: colors.backgroundSecondary,
        borderRadius: borderRadius.lg,
        overflow: "hidden",
    },
});

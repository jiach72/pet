import React from "react";
import { View, Text, ScrollView, Pressable, StyleSheet, Dimensions } from "react-native";
import Icon from "@/components/Icon";
import Svg, { Line, Circle, Polyline, Text as SvgText } from "react-native-svg";
import type { WeightRecord } from "@/types";

const colors = {
    primary: "#3B82F6",
    background: "#F8FAFC",
    foreground: "#1E293B",
    muted: "#64748B",
    border: "#E2E8F0",
    white: "#FFFFFF",
    green: "#10B981",
    orange: "#F97316",
};

const { width: screenWidth } = Dimensions.get("window");
const CHART_WIDTH = screenWidth - 64;
const CHART_HEIGHT = 180;
const PADDING = 30;

// Mock 体重数据
const mockWeightData: WeightRecord[] = [
    { date: "11/01", weight: 27.5 },
    { date: "11/15", weight: 27.8 },
    { date: "12/01", weight: 28.0 },
    { date: "12/15", weight: 28.2 },
    { date: "01/01", weight: 28.0 },
    { date: "01/12", weight: 28.0 },
];

/**
 * 体重趋势�?(Task 4.5)
 */
export default function WeightScreen() {
    const currentWeight = mockWeightData[mockWeightData.length - 1].weight;
    const previousWeight = mockWeightData[mockWeightData.length - 2].weight;
    const change = currentWeight - previousWeight;

    // 计算图表�?
    const minWeight = Math.min(...mockWeightData.map((d) => d.weight)) - 1;
    const maxWeight = Math.max(...mockWeightData.map((d) => d.weight)) + 1;
    const xStep = (CHART_WIDTH - PADDING * 2) / (mockWeightData.length - 1);
    const yScale = (CHART_HEIGHT - PADDING * 2) / (maxWeight - minWeight);

    const points = mockWeightData
        .map((d, i) => {
            const x = PADDING + i * xStep;
            const y = CHART_HEIGHT - PADDING - (d.weight - minWeight) * yScale;
            return `${x},${y}`;
        })
        .join(" ");

    return (
        <ScrollView style={styles.container}>
            {/* 当前体重�?*/}
            <View style={styles.currentCard}>
                <View style={styles.currentContent}>
                    <Text style={styles.currentLabel}>当前体重</Text>
                    <View style={styles.currentRow}>
                        <Text style={styles.currentValue}>{currentWeight}</Text>
                        <Text style={styles.currentUnit}>kg</Text>
                    </View>
                    <View style={styles.changeRow}>
                        <Icon
                            name={change >= 0 ? "arrow-up" : "arrow-down"}
                            size={16}
                            color={Math.abs(change) > 0.5 ? colors.orange : colors.green}
                        />
                        <Text
                            style={[
                                styles.changeText,
                                { color: Math.abs(change) > 0.5 ? colors.orange : colors.green },
                            ]}
                        >
                            {change >= 0 ? "+" : ""}
                            {change.toFixed(1)} kg 较上�?
                        </Text>
                    </View>
                </View>
                <View style={styles.currentIcon}>
                    <Icon name="fitness" size={40} color={colors.primary} />
                </View>
            </View>

            {/* 趋势�?*/}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>近期趋势</Text>
                <View style={styles.chartCard}>
                    <Svg width={CHART_WIDTH} height={CHART_HEIGHT}>
                        {/* Y轴标�?*/}
                        {[0, 1, 2, 3, 4].map((i) => {
                            const value = minWeight + ((maxWeight - minWeight) / 4) * (4 - i);
                            const y = PADDING + (i * (CHART_HEIGHT - PADDING * 2)) / 4;
                            return (
                                <React.Fragment key={`y-${i}`}>
                                    <Line
                                        x1={PADDING}
                                        y1={y}
                                        x2={CHART_WIDTH - PADDING}
                                        y2={y}
                                        stroke={colors.border}
                                        strokeWidth={1}
                                        strokeDasharray="4,4"
                                    />
                                    <SvgText
                                        x={PADDING - 8}
                                        y={y + 4}
                                        fontSize={10}
                                        fill={colors.muted}
                                        textAnchor="end"
                                    >
                                        {value.toFixed(0)}
                                    </SvgText>
                                </React.Fragment>
                            );
                        })}

                        {/* 折线 */}
                        <Polyline
                            points={points}
                            stroke={colors.primary}
                            strokeWidth={2}
                            fill="none"
                        />

                        {/* 数据�?*/}
                        {mockWeightData.map((d, i) => {
                            const x = PADDING + i * xStep;
                            const y = CHART_HEIGHT - PADDING - (d.weight - minWeight) * yScale;
                            return (
                                <React.Fragment key={`point-${i}`}>
                                    <Circle cx={x} cy={y} r={4} fill={colors.primary} />
                                    <SvgText
                                        x={x}
                                        y={CHART_HEIGHT - 8}
                                        fontSize={10}
                                        fill={colors.muted}
                                        textAnchor="middle"
                                    >
                                        {d.date}
                                    </SvgText>
                                </React.Fragment>
                            );
                        })}
                    </Svg>
                </View>
            </View>

            {/* 健康建议 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>健康建议</Text>
                <View style={styles.tipCard}>
                    <Icon name="bulb" size={20} color={colors.green} />
                    <Text style={styles.tipText}>
                        体重保持稳定，继续保持当前的饮食和运动习惯。建议每月测量一次体重�?
                    </Text>
                </View>
            </View>

            {/* 添加记录按钮 */}
            <View style={styles.section}>
                <Pressable style={styles.addBtn}>
                    <Icon name="add-circle" size={24} color={colors.white} />
                    <Text style={styles.addBtnText}>记录体重</Text>
                </Pressable>
            </View>

            <View style={{ height: 32 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    currentCard: {
        flexDirection: "row",
        backgroundColor: colors.white,
        margin: 16,
        borderRadius: 16,
        padding: 20,
    },
    currentContent: {
        flex: 1,
    },
    currentLabel: {
        color: colors.muted,
        fontSize: 14,
    },
    currentRow: {
        flexDirection: "row",
        alignItems: "baseline",
        marginTop: 4,
    },
    currentValue: {
        color: colors.foreground,
        fontSize: 42,
        fontWeight: "bold",
    },
    currentUnit: {
        color: colors.muted,
        fontSize: 18,
        marginLeft: 4,
    },
    changeRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
        gap: 4,
    },
    changeText: {
        fontSize: 14,
    },
    currentIcon: {
        justifyContent: "center",
    },
    section: {
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    sectionTitle: {
        color: colors.foreground,
        fontSize: 17,
        fontWeight: "bold",
        marginBottom: 12,
    },
    chartCard: {
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 12,
    },
    tipCard: {
        flexDirection: "row",
        backgroundColor: "#DCFCE7",
        borderRadius: 12,
        padding: 14,
        gap: 10,
    },
    tipText: {
        flex: 1,
        color: colors.foreground,
        fontSize: 14,
        lineHeight: 20,
    },
    addBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.primary,
        paddingVertical: 14,
        borderRadius: 12,
        gap: 8,
    },
    addBtnText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "600",
    },
});

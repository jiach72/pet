import React from "react";
import { View, Text, ScrollView, Pressable, StyleSheet, Dimensions } from "react-native";
import Icon from "@/components/Icon";
import Svg, { Line, Circle, Polyline, Text as SvgText } from "react-native-svg";
import type { WeightRecord } from "@/types";
import { Theme } from "@/constants/theme";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";

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
 * 体重趋势页 - 重构版
 */
export default function WeightScreen() {
    const currentWeight = mockWeightData[mockWeightData.length - 1].weight;
    const previousWeight = mockWeightData[mockWeightData.length - 2].weight;
    const change = currentWeight - previousWeight;

    // 计算图表点
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
            {/* 当前体重卡 */}
            <Card style={styles.currentCard} padding="lg">
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
                            color={Math.abs(change) > 0.5 ? Theme.colors.accent : Theme.colors.secondary}
                        />
                        <Text
                            style={[
                                styles.changeText,
                                { color: Math.abs(change) > 0.5 ? Theme.colors.accent : Theme.colors.secondary },
                            ]}
                        >
                            {change >= 0 ? "+" : ""}
                            {change.toFixed(1)} kg 较上次
                        </Text>
                    </View>
                </View>
                <View style={styles.currentIcon}>
                    <Icon name="fitness" size={40} color={Theme.colors.primary} />
                </View>
            </Card>

            {/* 趋势图 */}
            <Section title="近期趋势" containerStyle={styles.sectionPadding}>
                <Card padding="sm">
                    <Svg width={CHART_WIDTH} height={CHART_HEIGHT}>
                        {/* Y轴标签 */}
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
                                        stroke={Theme.colors.border}
                                        strokeWidth={1}
                                        strokeDasharray="4,4"
                                    />
                                    <SvgText
                                        x={PADDING - 8}
                                        y={y + 4}
                                        fontSize={10}
                                        fill={Theme.colors.text.secondary}
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
                            stroke={Theme.colors.primary}
                            strokeWidth={2}
                            fill="none"
                        />

                        {/* 数据点 */}
                        {mockWeightData.map((d, i) => {
                            const x = PADDING + i * xStep;
                            const y = CHART_HEIGHT - PADDING - (d.weight - minWeight) * yScale;
                            return (
                                <React.Fragment key={`point-${i}`}>
                                    <Circle cx={x} cy={y} r={4} fill={Theme.colors.primary} />
                                    <SvgText
                                        x={x}
                                        y={CHART_HEIGHT - 8}
                                        fontSize={10}
                                        fill={Theme.colors.text.secondary}
                                        textAnchor="middle"
                                    >
                                        {d.date}
                                    </SvgText>
                                </React.Fragment>
                            );
                        })}
                    </Svg>
                </Card>
            </Section>

            {/* 健康建议 */}
            <Section title="健康建议" containerStyle={styles.sectionPadding}>
                <Card variant="flat" style={styles.tipCard} padding="md">
                    <Icon name="bulb" size={20} color={Theme.colors.status.health} />
                    <Text style={styles.tipText}>
                        体重保持稳定，继续保持当前的饮食和运动习惯。建议每月测量一次体重。
                    </Text>
                </Card>
            </Section>

            {/* 添加记录按钮 */}
            <View style={styles.sectionPadding}>
                <Pressable style={styles.addBtn}>
                    <Icon name="add-circle" size={24} color={Theme.colors.surface} />
                    <Text style={styles.addBtnText}>记录体重</Text>
                </Pressable>
            </View>

            <View style={{ height: Theme.spacing.xl }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.background,
    },
    sectionPadding: {
        paddingHorizontal: Theme.spacing.md,
    },
    currentCard: {
        flexDirection: "row",
        margin: Theme.spacing.md,
    },
    currentContent: {
        flex: 1,
    },
    currentLabel: {
        ...Theme.typography.caption,
        color: Theme.colors.text.secondary,
    },
    currentRow: {
        flexDirection: "row",
        alignItems: "baseline",
        marginTop: 4,
    },
    currentValue: {
        ...Theme.typography.h1,
        fontSize: 42,
    },
    currentUnit: {
        ...Theme.typography.body,
        color: Theme.colors.text.secondary,
        marginLeft: 4,
    },
    changeRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
        gap: 4,
    },
    changeText: {
        ...Theme.typography.caption,
    },
    currentIcon: {
        justifyContent: "center",
    },
    tipCard: {
        flexDirection: "row",
        backgroundColor: '#F0FDF4',
        gap: 10,
    },
    tipText: {
        flex: 1,
        ...Theme.typography.body,
        fontSize: 14,
        lineHeight: 20,
    },
    addBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Theme.colors.primary,
        paddingVertical: Theme.spacing.md,
        borderRadius: Theme.radius.md,
        gap: 8,
    },
    addBtnText: {
        ...Theme.typography.h3,
        color: Theme.colors.surface,
        fontSize: 16,
    },
});

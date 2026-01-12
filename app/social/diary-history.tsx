import React, { useState, useMemo } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    RefreshControl,
} from "react-native";
import { MoodDiaryCard } from "@/components/social/MoodDiaryCard";
import { generateHistoryDiaries } from "@/services/moodEngine";
import type { MoodDiary } from "@/types";

const colors = {
    background: "#F8FAFC",
    foreground: "#1E293B",
    muted: "#64748B",
};

/**
 * 日记历史列表页 (Task 2.2)
 */
export default function DiaryHistoryScreen() {
    const [refreshing, setRefreshing] = useState(false);
    const [diaries, setDiaries] = useState<MoodDiary[]>(() =>
        generateHistoryDiaries("pet-001", 30)
    );

    const handleRefresh = async () => {
        setRefreshing(true);
        // 模拟刷新
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setDiaries(generateHistoryDiaries("pet-001", 30));
        setRefreshing(false);
    };

    // 统计数据
    const stats = useMemo(() => {
        const totalSteps = diaries.reduce((sum, d) => sum + d.steps, 0);
        const avgSteps = Math.round(totalSteps / diaries.length);
        const happyDays = diaries.filter(
            (d) => d.mood === "开心" || d.mood === "兴奋"
        ).length;

        return { totalSteps, avgSteps, happyDays };
    }, [diaries]);

    return (
        <View style={styles.container}>
            {/* 统计头部 */}
            <View style={styles.statsHeader}>
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>
                        {stats.totalSteps.toLocaleString()}
                    </Text>
                    <Text style={styles.statLabel}>总步数</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>
                        {stats.avgSteps.toLocaleString()}
                    </Text>
                    <Text style={styles.statLabel}>日均步数</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>{stats.happyDays}</Text>
                    <Text style={styles.statLabel}>开心天数</Text>
                </View>
            </View>

            {/* 日记列表 */}
            <FlatList
                data={diaries}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.cardWrapper}>
                        <MoodDiaryCard diary={item} />
                    </View>
                )}
                contentContainerStyle={styles.listContent}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                }
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    statsHeader: {
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
    },
    statItem: {
        flex: 1,
        alignItems: "center",
    },
    statValue: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors.foreground,
    },
    statLabel: {
        fontSize: 12,
        color: colors.muted,
        marginTop: 4,
    },
    statDivider: {
        width: 1,
        backgroundColor: "#E2E8F0",
    },
    listContent: {
        padding: 16,
    },
    cardWrapper: {
        marginBottom: 12,
    },
});

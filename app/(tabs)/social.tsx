import React, { useState, useCallback } from "react";
import {
    View,
    Text,
    ScrollView,
    Pressable,
    StyleSheet,
    RefreshControl,
} from "react-native";
import { useRouter } from "expo-router";
import Icon from "@/components/Icon";
import { MoodDiaryCard } from "@/components/social/MoodDiaryCard";
import { GreenShieldBadge } from "@/components/social/GreenShieldBadge";
import { LeaderboardCard } from "@/components/social/LeaderboardCard";
import { mockMoodDiaries, mockLeaderboard, mockGreenShield } from "@/data/mockData";

const colors = {
    primary: "#3B82F6",
    background: "#F8FAFC",
    foreground: "#1E293B",
    muted: "#64748B",
    border: "#E2E8F0",
    white: "#FFFFFF",
};

/**
 * 社交�?- 整合情感日记 + 绿盾认证 + 活力挑战�?
 * Task 5.1, 5.2, 5.3
 */
export default function SocialScreen() {
    const router = useRouter();
    const [refreshing, setRefreshing] = useState(false);

    // 下拉刷新
    const handleRefresh = useCallback(async () => {
        setRefreshing(true);
        // 模拟刷新
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setRefreshing(false);
    }, []);

    // 今日日记
    const todayDiary = mockMoodDiaries[0];

    return (
        <ScrollView
            style={styles.container}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            }
        >
            {/* 顶部标题 */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>社交�?/Text>
            </View>

            {/* 绿盾认证状�?*/}
            <View style={styles.section}>
                <GreenShieldBadge info={mockGreenShield} />
            </View>

            {/* 情感日记 */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>情感日记</Text>
                    <Pressable
                        onPress={() => router.push("/social/diary-history")}
                        style={styles.viewAllBtn}
                    >
                        <Text style={styles.viewAllText}>查看全部</Text>
                        <Icon name="chevron-forward" size={16} color={colors.primary} />
                    </Pressable>
                </View>
                {todayDiary && (
                    <MoodDiaryCard
                        diary={todayDiary}
                        onPress={() => router.push("/social/diary-history")}
                    />
                )}
            </View>

            {/* 活力挑战�?*/}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>活力挑战�?/Text>
                <LeaderboardCard
                    data={mockLeaderboard}
                    showToggle={true}
                    showViewAll={true}
                    limit={3}
                />
            </View>

            {/* 发起 PK 按钮 */}
            <View style={[styles.section, { marginBottom: 32 }]}>
                <Pressable
                    onPress={() => router.push("/social/challenge")}
                    style={({ pressed }) => [
                        styles.pkButton,
                        pressed && styles.pkButtonPressed,
                    ]}
                >
                    <Icon name="flash" size={24} color="white" />
                    <Text style={styles.pkButtonText}>发起 1V1 挑战</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        paddingTop: 48,
        paddingBottom: 16,
        paddingHorizontal: 16,
    },
    headerTitle: {
        color: colors.foreground,
        fontSize: 24,
        fontWeight: "bold",
    },
    section: {
        paddingHorizontal: 16,
        marginBottom: 20,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    sectionTitle: {
        color: colors.foreground,
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 12,
    },
    viewAllBtn: {
        flexDirection: "row",
        alignItems: "center",
    },
    viewAllText: {
        color: colors.primary,
        fontSize: 14,
    },
    pkButton: {
        backgroundColor: colors.primary,
        borderRadius: 16,
        paddingVertical: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    pkButtonPressed: {
        opacity: 0.8,
    },
    pkButtonText: {
        color: colors.white,
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 8,
    },
});

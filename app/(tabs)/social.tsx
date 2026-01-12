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
import { Theme } from "@/constants/theme";
import { Section } from "@/components/ui/Section";

/**
 * 社交页 - 重构版
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
                <Text style={styles.headerTitle}>社区</Text>
                <Pressable onPress={() => router.push("/(tabs)/map")} style={styles.mapIcon}>
                    <Icon name="map-outline" size={24} color={Theme.colors.primary} />
                </Pressable>
            </View>

            {/* 快速功能入口 */}
            <View style={styles.quickActions}>
                <Pressable onPress={() => router.push("/community/matching")} style={styles.actionItem}>
                    <View style={[styles.actionIcon, { backgroundColor: '#FFEDD5' }]}>
                        <Icon name="matching" size={24} color="#F97316" />
                    </View>
                    <Text style={styles.actionText}>宠物配对</Text>
                </Pressable>
                <Pressable onPress={() => router.push("/community/charity")} style={styles.actionItem}>
                    <View style={[styles.actionIcon, { backgroundColor: '#DCFCE7' }]}>
                        <Icon name="charity" size={24} color="#22C55E" />
                    </View>
                    <Text style={styles.actionText}>爱心公益</Text>
                </Pressable>
                <Pressable onPress={() => router.push("/community/events")} style={styles.actionItem}>
                    <View style={[styles.actionIcon, { backgroundColor: '#DBEAFE' }]}>
                        <Icon name="calendar-outline" size={24} color="#3B82F6" />
                    </View>
                    <Text style={styles.actionText}>宠友活动</Text>
                </Pressable>
                <Pressable onPress={() => router.push("/community/wedding")} style={styles.actionItem}>
                    <View style={[styles.actionIcon, { backgroundColor: '#FCE7F3' }]}>
                        <Icon name="infinite-outline" size={24} color="#EC4899" />
                    </View>
                    <Text style={styles.actionText}>宠物婚礼</Text>
                </Pressable>
            </View>

            {/* 绿盾认证状态 */}
            <View style={styles.sectionPadding}>
                <GreenShieldBadge info={mockGreenShield} />
            </View>

            {/* 情感日记 */}
            <Section
                title="情感日记"
                containerStyle={styles.sectionPadding}
                style={styles.sectionContent}
            >
                <View style={styles.titleActionContainer}>
                    <Pressable
                        onPress={() => router.push("/social/diary-history")}
                        style={styles.viewAllBtn}
                    >
                        <Text style={styles.viewAllText}>查看全部</Text>
                        <Icon name="chevron-forward" size={16} color={Theme.colors.primary} />
                    </Pressable>
                </View>
                {todayDiary && (
                    <MoodDiaryCard
                        diary={todayDiary}
                        onPress={() => router.push("/social/diary-history")}
                    />
                )}
            </Section>

            {/* 活力挑战赛 */}
            <Section title="活力挑战赛" containerStyle={styles.sectionPadding}>
                <LeaderboardCard
                    data={mockLeaderboard}
                    showToggle={true}
                    showViewAll={true}
                    limit={3}
                />
            </Section>

            {/* 发起 PK 按钮 */}
            <View style={[styles.sectionPadding, { marginBottom: Theme.spacing.xl }]}>
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
        backgroundColor: Theme.colors.background,
    },
    header: {
        paddingTop: 48,
        paddingBottom: Theme.spacing.md,
        paddingHorizontal: Theme.spacing.md,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        ...Theme.typography.h1,
    },
    mapIcon: {
        padding: 4,
    },
    quickActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: Theme.spacing.md,
        marginBottom: Theme.spacing.xl,
    },
    actionItem: {
        alignItems: 'center',
        flex: 1,
    },
    actionIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    actionText: {
        fontSize: 12,
        color: '#475569',
        fontWeight: '500',
    },
    sectionPadding: {
        paddingHorizontal: Theme.spacing.md,
        marginBottom: Theme.spacing.md,
    },
    sectionContent: {
        marginTop: -Theme.spacing.md, // 抵消 Section Title 默认间距，因为我们要放自定义操作项
    },
    titleActionContainer: {
        position: 'absolute',
        top: -Theme.spacing.xl - 4, // 精确对齐标题右侧
        right: 0,
        zIndex: 1,
    },
    viewAllBtn: {
        flexDirection: "row",
        alignItems: "center",
    },
    viewAllText: {
        ...Theme.typography.caption,
        color: Theme.colors.primary,
        fontSize: 14,
    },
    pkButton: {
        backgroundColor: Theme.colors.primary,
        borderRadius: Theme.radius.md,
        paddingVertical: Theme.spacing.md,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        ...Theme.shadows.sm,
    },
    pkButtonPressed: {
        opacity: 0.8,
    },
    pkButtonText: {
        ...Theme.typography.h2,
        color: Theme.colors.surface,
        marginLeft: Theme.spacing.sm,
    },
});

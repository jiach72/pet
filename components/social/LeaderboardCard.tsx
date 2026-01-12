import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import type { LeaderboardEntry, LeaderboardType } from "@/types";

const colors = {
    primary: "#3B82F6",
    background: "#F8FAFC",
    foreground: "#1E293B",
    muted: "#64748B",
    border: "#E2E8F0",
    white: "#FFFFFF",
    gold: "#F59E0B",
    silver: "#94A3B8",
    bronze: "#D97706",
};

interface LeaderboardCardProps {
    data: LeaderboardEntry[];
    initialType?: LeaderboardType;
    showToggle?: boolean;
    showViewAll?: boolean;
    limit?: number;
    onViewAll?: () => void;
}

/**
 * 排行榜卡片组件 (Task 4.1)
 */
export function LeaderboardCard({
    data,
    initialType = "weekly",
    showToggle = true,
    showViewAll = true,
    limit = 5,
    onViewAll,
}: LeaderboardCardProps) {
    const router = useRouter();
    const [type, setType] = useState<LeaderboardType>(initialType);

    const displayData = data.slice(0, limit);

    const getRankIcon = (rank: number) => {
        switch (rank) {
            case 1:
                return "🥇";
            case 2:
                return "🥈";
            case 3:
                return "🥉";
            default:
                return `${rank}`;
        }
    };

    const handleViewAll = () => {
        if (onViewAll) {
            onViewAll();
        } else {
            // 可以跳转到完整排行榜页面
        }
    };

    return (
        <View style={styles.container}>
            {/* 标题栏 */}
            <View style={styles.header}>
                {showToggle ? (
                    <View style={styles.toggle}>
                        <Pressable
                            onPress={() => setType("weekly")}
                            style={[
                                styles.toggleBtn,
                                type === "weekly" && styles.toggleBtnActive,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.toggleText,
                                    type === "weekly" && styles.toggleTextActive,
                                ]}
                            >
                                周榜
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={() => setType("monthly")}
                            style={[
                                styles.toggleBtn,
                                type === "monthly" && styles.toggleBtnActive,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.toggleText,
                                    type === "monthly" && styles.toggleTextActive,
                                ]}
                            >
                                月榜
                            </Text>
                        </Pressable>
                    </View>
                ) : (
                    <Text style={styles.title}>
                        {type === "weekly" ? "本周活力榜" : "本月活力榜"}
                    </Text>
                )}

                {showViewAll && (
                    <Pressable onPress={handleViewAll} style={styles.viewAllBtn}>
                        <Text style={styles.viewAllText}>查看全部</Text>
                        <Ionicons name="chevron-forward" size={16} color={colors.primary} />
                    </Pressable>
                )}
            </View>

            {/* 排行榜列表 */}
            <View style={styles.list}>
                {displayData.map((item, index) => (
                    <View
                        key={item.petId}
                        style={[
                            styles.item,
                            index !== displayData.length - 1 && styles.itemBorder,
                            item.isMe && styles.itemHighlight,
                        ]}
                    >
                        <Text style={styles.rank}>{getRankIcon(item.rank)}</Text>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarEmoji}>🐕</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.name}>
                                {item.petName}
                                {item.isMe && <Text style={styles.meTag}> (我)</Text>}
                            </Text>
                            <Text style={styles.owner}>{item.ownerName}</Text>
                        </View>
                        <Text style={styles.value}>
                            {item.value.toLocaleString()}
                            <Text style={styles.unit}> 步</Text>
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.border,
        overflow: "hidden",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    title: {
        color: colors.foreground,
        fontSize: 16,
        fontWeight: "bold",
    },
    toggle: {
        flexDirection: "row",
        backgroundColor: colors.background,
        borderRadius: 8,
        padding: 4,
    },
    toggleBtn: {
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 6,
    },
    toggleBtnActive: {
        backgroundColor: colors.white,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    toggleText: {
        color: colors.muted,
        fontSize: 14,
    },
    toggleTextActive: {
        color: colors.foreground,
        fontWeight: "600",
    },
    viewAllBtn: {
        flexDirection: "row",
        alignItems: "center",
    },
    viewAllText: {
        color: colors.primary,
        fontSize: 14,
    },
    list: {
        paddingHorizontal: 16,
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
    },
    itemBorder: {
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    itemHighlight: {
        backgroundColor: "rgba(59, 130, 246, 0.05)",
        marginHorizontal: -16,
        paddingHorizontal: 16,
    },
    rank: {
        fontSize: 18,
        width: 32,
        textAlign: "center",
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.background,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 8,
    },
    avatarEmoji: {
        fontSize: 20,
    },
    info: {
        flex: 1,
        marginLeft: 12,
    },
    name: {
        color: colors.foreground,
        fontSize: 15,
        fontWeight: "500",
    },
    meTag: {
        color: colors.primary,
        fontWeight: "600",
    },
    owner: {
        color: colors.muted,
        fontSize: 13,
    },
    value: {
        color: colors.foreground,
        fontSize: 16,
        fontWeight: "bold",
    },
    unit: {
        fontSize: 12,
        fontWeight: "normal",
        color: colors.muted,
    },
});

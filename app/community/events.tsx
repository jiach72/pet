import React from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const colors = {
    primary: "#8B5CF6",
    background: "#F8FAFC",
    foreground: "#1E293B",
    muted: "#64748B",
    border: "#E2E8F0",
    white: "#FFFFFF",
    pink: "#EC4899",
    gray: "#374151",
    green: "#10B981",
    orange: "#F97316",
};

// 活动入口
const eventEntries = [
    { id: "meetup", icon: "people", label: "团建活动", color: colors.primary },
    { id: "matching", icon: "heart", label: "宠物配对", color: colors.pink },
    { id: "wedding", icon: "heart-circle", label: "宠物婚礼", color: "#F472B6" },
    { id: "memorial", icon: "flower", label: "宠物纪念", color: colors.gray },
];

// Mock 活动数据
const upcomingEvents = [
    {
        id: "1",
        type: "meetup",
        title: "周末狗狗派对",
        date: "1月15日 14:00",
        location: "朝阳公园",
        participants: 23,
    },
    {
        id: "2",
        type: "wedding",
        title: "豆豆 & 萌萌 的婚礼",
        date: "1月20日 10:00",
        location: "宠物乐园",
        participants: 15,
    },
    {
        id: "3",
        type: "meetup",
        title: "猫咪下午茶",
        date: "1月18日 15:00",
        location: "喵星人咖啡馆",
        participants: 12,
    },
];

/**
 * 社区活动页 (Task 4.1, 4.2)
 */
export default function EventsScreen() {
    const router = useRouter();

    const handleEntryPress = (id: string) => {
        switch (id) {
            case "matching":
                router.push("/community/matching");
                break;
            case "wedding":
                router.push("/community/wedding");
                break;
            case "memorial":
                router.push("/community/memorial");
                break;
            default:
                // 团建活动列表
                break;
        }
    };

    const getEventIcon = (type: string) => {
        switch (type) {
            case "wedding":
                return { icon: "heart-circle", color: "#F472B6" };
            case "memorial":
                return { icon: "flower", color: colors.gray };
            default:
                return { icon: "people", color: colors.primary };
        }
    };

    return (
        <ScrollView style={styles.container}>
            {/* 功能入口 */}
            <View style={styles.entryGrid}>
                {eventEntries.map((entry) => (
                    <Pressable
                        key={entry.id}
                        onPress={() => handleEntryPress(entry.id)}
                        style={({ pressed }) => [
                            styles.entryItem,
                            pressed && styles.entryItemPressed,
                        ]}
                    >
                        <View style={[styles.entryIcon, { backgroundColor: `${entry.color}15` }]}>
                            <Ionicons name={entry.icon as any} size={28} color={entry.color} />
                        </View>
                        <Text style={styles.entryLabel}>{entry.label}</Text>
                    </Pressable>
                ))}
            </View>

            {/* 爱心公益入口 */}
            <Pressable
                onPress={() => router.push("/community/charity")}
                style={styles.charityBanner}
            >
                <View style={styles.charityBannerContent}>
                    <View style={styles.charityIcon}>
                        <Ionicons name="heart" size={28} color={colors.pink} />
                    </View>
                    <View>
                        <Text style={styles.charityTitle}>爱心公益</Text>
                        <Text style={styles.charitySubtitle}>
                            救助流浪动物，传递温暖
                        </Text>
                    </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.pink} />
            </Pressable>

            {/* 即将举办的活动 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>即将举办</Text>

                {upcomingEvents.map((event) => {
                    const { icon, color } = getEventIcon(event.type);
                    return (
                        <Pressable key={event.id} style={styles.eventCard}>
                            <View style={[styles.eventIcon, { backgroundColor: `${color}15` }]}>
                                <Ionicons name={icon as any} size={24} color={color} />
                            </View>
                            <View style={styles.eventContent}>
                                <Text style={styles.eventTitle}>{event.title}</Text>
                                <View style={styles.eventMeta}>
                                    <Ionicons name="calendar" size={14} color={colors.muted} />
                                    <Text style={styles.eventMetaText}>{event.date}</Text>
                                    <View style={styles.metaDot} />
                                    <Ionicons name="location" size={14} color={colors.muted} />
                                    <Text style={styles.eventMetaText}>{event.location}</Text>
                                </View>
                                <View style={styles.eventFooter}>
                                    <View style={styles.participants}>
                                        <Ionicons name="people" size={14} color={colors.muted} />
                                        <Text style={styles.participantsText}>
                                            {event.participants} 人参与
                                        </Text>
                                    </View>
                                    <Pressable style={styles.joinBtn}>
                                        <Text style={styles.joinBtnText}>报名参加</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </Pressable>
                    );
                })}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    entryGrid: {
        flexDirection: "row",
        backgroundColor: colors.white,
        padding: 16,
        margin: 16,
        borderRadius: 16,
    },
    entryItem: {
        flex: 1,
        alignItems: "center",
    },
    entryItemPressed: {
        opacity: 0.7,
    },
    entryIcon: {
        width: 56,
        height: 56,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
    },
    entryLabel: {
        color: colors.foreground,
        fontSize: 13,
    },
    charityBanner: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.white,
        marginHorizontal: 16,
        padding: 16,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: "#FBCFE8",
    },
    charityBannerContent: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    charityIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#FDF2F8",
        alignItems: "center",
        justifyContent: "center",
    },
    charityTitle: {
        color: colors.foreground,
        fontSize: 16,
        fontWeight: "bold",
    },
    charitySubtitle: {
        color: colors.muted,
        fontSize: 13,
    },
    section: {
        padding: 16,
    },
    sectionTitle: {
        color: colors.foreground,
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 12,
    },
    eventCard: {
        flexDirection: "row",
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: colors.border,
    },
    eventIcon: {
        width: 48,
        height: 48,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    eventContent: {
        flex: 1,
        marginLeft: 12,
    },
    eventTitle: {
        color: colors.foreground,
        fontSize: 15,
        fontWeight: "600",
    },
    eventMeta: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 6,
        gap: 4,
    },
    eventMetaText: {
        color: colors.muted,
        fontSize: 13,
    },
    metaDot: {
        width: 3,
        height: 3,
        borderRadius: 1.5,
        backgroundColor: colors.muted,
        marginHorizontal: 6,
    },
    eventFooter: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10,
    },
    participants: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    participantsText: {
        color: colors.muted,
        fontSize: 13,
    },
    joinBtn: {
        backgroundColor: colors.primary,
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 16,
    },
    joinBtnText: {
        color: colors.white,
        fontSize: 13,
        fontWeight: "600",
    },
});

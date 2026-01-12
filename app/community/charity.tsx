import React from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import Icon from "@/components/Icon";

const colors = {
    primary: "#EC4899",
    background: "#F8FAFC",
    foreground: "#1E293B",
    muted: "#64748B",
    border: "#E2E8F0",
    white: "#FFFFFF",
    green: "#10B981",
};

// Mock 救助数据
const rescueCampaigns = [
    {
        id: "1",
        title: "流浪狗小黑急需手术",
        story: "小黑在街头被车撞伤，急需手术费用...",
        target: 5000,
        raised: 3200,
        donors: 89,
    },
    {
        id: "2",
        title: "救助受伤流浪猫",
        story: "一只受伤的流浪猫需要您的帮助...",
        target: 2000,
        raised: 1800,
        donors: 45,
    },
];

// Mock 领养数据
const adoptionListings = [
    { id: "1", name: "毛毛", type: "狗狗", age: "1岁", location: "北京" },
    { id: "2", name: "咪咪", type: "猫咪", age: "6个月", location: "上海" },
];

/**
 * 爱心公益页 (Task 3.1, 3.2, 3.3)
 */
export default function CharityScreen() {
    return (
        <ScrollView style={styles.container}>
            {/* 统计卡片 */}
            <View style={styles.statsCard}>
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>1,234</Text>
                    <Text style={styles.statLabel}>已救助</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>856</Text>
                    <Text style={styles.statLabel}>已领养</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>¥32万</Text>
                    <Text style={styles.statLabel}>已筹集</Text>
                </View>
            </View>

            {/* 救助众筹 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>救助众筹</Text>
                {rescueCampaigns.map((campaign) => {
                    const progress = (campaign.raised / campaign.target) * 100;
                    return (
                        <View key={campaign.id} style={styles.rescueCard}>
                            <View style={styles.rescueImage}>
                                <Text style={styles.rescueEmoji}>🐕</Text>
                            </View>
                            <View style={styles.rescueContent}>
                                <Text style={styles.rescueTitle}>{campaign.title}</Text>
                                <Text style={styles.rescueStory} numberOfLines={2}>
                                    {campaign.story}
                                </Text>
                                <View style={styles.progressBar}>
                                    <View style={[styles.progressFill, { width: `${progress}%` }]} />
                                </View>
                                <View style={styles.rescueMeta}>
                                    <Text style={styles.raised}>
                                        已筹 ¥{campaign.raised.toLocaleString()}
                                    </Text>
                                    <Text style={styles.target}>
                                        目标 ¥{campaign.target.toLocaleString()}
                                    </Text>
                                </View>
                                <Pressable style={styles.donateBtn}>
                                    <Ionicons name="heart" size={16} color={colors.white} />
                                    <Text style={styles.donateBtnText}>我要捐助</Text>
                                </Pressable>
                            </View>
                        </View>
                    );
                })}
            </View>

            {/* 待领养 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>等待领养</Text>
                <View style={styles.adoptionGrid}>
                    {adoptionListings.map((pet) => (
                        <View key={pet.id} style={styles.adoptionCard}>
                            <View style={styles.adoptionImage}>
                                <Text style={styles.adoptionEmoji}>
                                    {pet.type === "猫咪" ? "🐱" : "🐕"}
                                </Text>
                            </View>
                            <Text style={styles.adoptionName}>{pet.name}</Text>
                            <Text style={styles.adoptionInfo}>
                                {pet.type} · {pet.age}
                            </Text>
                            <Text style={styles.adoptionLocation}>{pet.location}</Text>
                        </View>
                    ))}
                </View>
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
    statsCard: {
        flexDirection: "row",
        backgroundColor: colors.primary,
        margin: 16,
        borderRadius: 16,
        padding: 20,
    },
    statItem: {
        flex: 1,
        alignItems: "center",
    },
    statValue: {
        color: colors.white,
        fontSize: 22,
        fontWeight: "bold",
    },
    statLabel: {
        color: "rgba(255,255,255,0.8)",
        fontSize: 13,
        marginTop: 4,
    },
    statDivider: {
        width: 1,
        backgroundColor: "rgba(255,255,255,0.3)",
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
    rescueCard: {
        flexDirection: "row",
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: colors.border,
    },
    rescueImage: {
        width: 80,
        height: 80,
        borderRadius: 12,
        backgroundColor: colors.background,
        alignItems: "center",
        justifyContent: "center",
    },
    rescueEmoji: {
        fontSize: 36,
    },
    rescueContent: {
        flex: 1,
        marginLeft: 12,
    },
    rescueTitle: {
        color: colors.foreground,
        fontSize: 15,
        fontWeight: "600",
    },
    rescueStory: {
        color: colors.muted,
        fontSize: 13,
        marginTop: 4,
    },
    progressBar: {
        height: 6,
        backgroundColor: colors.border,
        borderRadius: 3,
        marginTop: 10,
    },
    progressFill: {
        height: "100%",
        backgroundColor: colors.primary,
        borderRadius: 3,
    },
    rescueMeta: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8,
    },
    raised: {
        color: colors.primary,
        fontSize: 14,
        fontWeight: "600",
    },
    target: {
        color: colors.muted,
        fontSize: 13,
    },
    donateBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.primary,
        paddingVertical: 8,
        borderRadius: 20,
        marginTop: 10,
        gap: 4,
    },
    donateBtnText: {
        color: colors.white,
        fontSize: 14,
        fontWeight: "600",
    },
    adoptionGrid: {
        flexDirection: "row",
        gap: 12,
    },
    adoptionCard: {
        flex: 1,
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 12,
        alignItems: "center",
    },
    adoptionImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: colors.background,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
    },
    adoptionEmoji: {
        fontSize: 40,
    },
    adoptionName: {
        color: colors.foreground,
        fontSize: 16,
        fontWeight: "bold",
    },
    adoptionInfo: {
        color: colors.muted,
        fontSize: 13,
        marginTop: 4,
    },
    adoptionLocation: {
        color: colors.muted,
        fontSize: 12,
        marginTop: 2,
    },
});

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
    blue: "#3B82F6",
};

// Mock 配对候选
const matchCandidates = [
    {
        id: "1",
        petName: "萌萌",
        breed: "金毛寻回犬",
        age: "2岁",
        gender: "female",
        location: "北京朝阳",
        compatibility: 95,
        ownerName: "小红",
    },
    {
        id: "2",
        petName: "大黄",
        breed: "金毛寻回犬",
        age: "3岁",
        gender: "male",
        location: "北京海淀",
        compatibility: 88,
        ownerName: "小李",
    },
    {
        id: "3",
        petName: "花花",
        breed: "拉布拉多",
        age: "2岁",
        gender: "female",
        location: "北京丰台",
        compatibility: 82,
        ownerName: "小张",
    },
];

/**
 * 宠物配对页 (Task 4.5)
 */
export default function MatchingScreen() {
    return (
        <ScrollView style={styles.container}>
            {/* 我的宠物卡片 */}
            <View style={styles.myPetCard}>
                <View style={styles.myPetAvatar}>
                    <Text style={styles.myPetEmoji}>🐕</Text>
                </View>
                <View style={styles.myPetInfo}>
                    <Text style={styles.myPetName}>豆豆</Text>
                    <Text style={styles.myPetBreed}>金毛寻回犬 · 2岁 · ♂</Text>
                </View>
                <Pressable style={styles.editBtn}>
                    <Ionicons name="settings" size={20} color={colors.muted} />
                </Pressable>
            </View>

            {/* 配对设置 */}
            <View style={styles.filterCard}>
                <Text style={styles.filterTitle}>配对偏好</Text>
                <View style={styles.filterTags}>
                    {["同品种", "年龄相近", "附近5km", "已绿盾认证"].map((tag) => (
                        <View key={tag} style={styles.filterTag}>
                            <Text style={styles.filterTagText}>{tag}</Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* 推荐配对 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>推荐配对</Text>

                {matchCandidates.map((candidate) => (
                    <View key={candidate.id} style={styles.matchCard}>
                        <View style={styles.matchHeader}>
                            <View style={styles.matchAvatar}>
                                <Text style={styles.matchEmoji}>🐕</Text>
                            </View>
                            <View style={styles.matchInfo}>
                                <View style={styles.matchNameRow}>
                                    <Text style={styles.matchName}>{candidate.petName}</Text>
                                    <Ionicons
                                        name={candidate.gender === "male" ? "male" : "female"}
                                        size={16}
                                        color={candidate.gender === "male" ? colors.blue : colors.primary}
                                    />
                                </View>
                                <Text style={styles.matchBreed}>{candidate.breed}</Text>
                                <Text style={styles.matchMeta}>
                                    {candidate.age} · {candidate.location}
                                </Text>
                            </View>
                            <View style={styles.compatibilityBadge}>
                                <Text style={styles.compatibilityValue}>
                                    {candidate.compatibility}%
                                </Text>
                                <Text style={styles.compatibilityLabel}>匹配度</Text>
                            </View>
                        </View>

                        <View style={styles.matchActions}>
                            <Pressable style={styles.passBtn}>
                                <Ionicons name="close" size={24} color={colors.muted} />
                            </Pressable>
                            <Pressable style={styles.likeBtn}>
                                <Ionicons name="heart" size={24} color={colors.white} />
                            </Pressable>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    myPetCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.white,
        margin: 16,
        padding: 16,
        borderRadius: 16,
    },
    myPetAvatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: "rgba(236, 72, 153, 0.1)",
        alignItems: "center",
        justifyContent: "center",
    },
    myPetEmoji: {
        fontSize: 36,
    },
    myPetInfo: {
        flex: 1,
        marginLeft: 12,
    },
    myPetName: {
        color: colors.foreground,
        fontSize: 18,
        fontWeight: "bold",
    },
    myPetBreed: {
        color: colors.muted,
        fontSize: 14,
        marginTop: 4,
    },
    editBtn: {
        padding: 8,
    },
    filterCard: {
        backgroundColor: colors.white,
        marginHorizontal: 16,
        padding: 16,
        borderRadius: 16,
    },
    filterTitle: {
        color: colors.foreground,
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 12,
    },
    filterTags: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },
    filterTag: {
        backgroundColor: "rgba(236, 72, 153, 0.1)",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
    },
    filterTagText: {
        color: colors.primary,
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
    matchCard: {
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
    },
    matchHeader: {
        flexDirection: "row",
        alignItems: "center",
    },
    matchAvatar: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: colors.background,
        alignItems: "center",
        justifyContent: "center",
    },
    matchEmoji: {
        fontSize: 40,
    },
    matchInfo: {
        flex: 1,
        marginLeft: 12,
    },
    matchNameRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    matchName: {
        color: colors.foreground,
        fontSize: 18,
        fontWeight: "bold",
    },
    matchBreed: {
        color: colors.foreground,
        fontSize: 14,
        marginTop: 4,
    },
    matchMeta: {
        color: colors.muted,
        fontSize: 13,
        marginTop: 2,
    },
    compatibilityBadge: {
        alignItems: "center",
        backgroundColor: "rgba(236, 72, 153, 0.1)",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 12,
    },
    compatibilityValue: {
        color: colors.primary,
        fontSize: 20,
        fontWeight: "bold",
    },
    compatibilityLabel: {
        color: colors.primary,
        fontSize: 11,
    },
    matchActions: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 16,
        gap: 32,
    },
    passBtn: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: colors.background,
        alignItems: "center",
        justifyContent: "center",
    },
    likeBtn: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },
});

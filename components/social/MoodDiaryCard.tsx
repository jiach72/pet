import React from "react";
import { View, Text, Pressable, StyleSheet, Share } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { MoodDiary } from "@/types";

const colors = {
    primary: "#3B82F6",
    background: "#F8FAFC",
    foreground: "#1E293B",
    muted: "#64748B",
    border: "#E2E8F0",
    white: "#FFFFFF",
};

// 心情对应的 emoji
const moodEmojis: Record<string, string> = {
    开心: "😄",
    平静: "😊",
    无聊: "😐",
    兴奋: "🤩",
    疲惫: "😴",
    焦虑: "😰",
};

interface MoodDiaryCardProps {
    diary: MoodDiary;
    onPress?: () => void;
    showShareButton?: boolean;
}

/**
 * 情感日记卡片组件
 */
export function MoodDiaryCard({
    diary,
    onPress,
    showShareButton = true,
}: MoodDiaryCardProps) {
    const moodEmoji = moodEmojis[diary.mood] || "📝";

    const handleShare = async () => {
        try {
            await Share.share({
                message: `【${diary.date}】${diary.content}\n\n—— ${diary.mood} · ${diary.steps.toLocaleString()} 步\n\n来自 PetPulse 智宠脉动`,
            });
        } catch (error) {
            console.error("分享失败:", error);
        }
    };

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        >
            <View style={styles.header}>
                <Text style={styles.emoji}>{moodEmoji}</Text>
                <Text style={styles.date}>{diary.date}</Text>
                <View style={styles.moodBadge}>
                    <Text style={styles.moodText}>{diary.mood}</Text>
                </View>
            </View>

            <Text style={styles.content} numberOfLines={3}>
                {diary.content}
            </Text>

            <View style={styles.footer}>
                <View style={styles.stats}>
                    <Ionicons name="footsteps" size={16} color={colors.muted} />
                    <Text style={styles.statsText}>
                        {diary.steps.toLocaleString()} 步
                    </Text>
                    <View style={styles.statsDivider} />
                    <Ionicons name="heart" size={16} color={colors.muted} />
                    <Text style={styles.statsText}>HRV {diary.hrv}</Text>
                </View>

                {showShareButton && (
                    <Pressable onPress={handleShare} style={styles.shareBtn}>
                        <Ionicons name="share-outline" size={20} color={colors.primary} />
                    </Pressable>
                )}
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: colors.border,
    },
    cardPressed: {
        opacity: 0.9,
        transform: [{ scale: 0.99 }],
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    emoji: {
        fontSize: 24,
        marginRight: 8,
    },
    date: {
        color: colors.muted,
        fontSize: 14,
        flex: 1,
    },
    moodBadge: {
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
    },
    moodText: {
        color: colors.primary,
        fontSize: 14,
    },
    content: {
        color: colors.foreground,
        fontSize: 16,
        lineHeight: 24,
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
    stats: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    statsText: {
        color: colors.muted,
        fontSize: 14,
        marginLeft: 4,
    },
    statsDivider: {
        width: 1,
        height: 12,
        backgroundColor: colors.border,
        marginHorizontal: 12,
    },
    shareBtn: {
        padding: 8,
    },
});

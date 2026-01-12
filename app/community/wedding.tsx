import React from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import Icon from "@/components/Icon";

const colors = {
    primary: "#F472B6",
    background: "#FDF2F8",
    foreground: "#1E293B",
    muted: "#64748B",
    white: "#FFFFFF",
};

/**
 * 宠物婚礼�?- 喜庆粉色主题 (Task 4.3)
 */
export default function WeddingScreen() {
    return (
        <ScrollView style={styles.container}>
            {/* 婚礼邀请卡预览 */}
            <View style={styles.invitationCard}>
                <View style={styles.hearts}>
                    <Text style={styles.heartEmoji}>💕</Text>
                </View>
                <Text style={styles.title}>恭贺新婚</Text>
                <View style={styles.coupleRow}>
                    <View style={styles.petCard}>
                        <Text style={styles.petEmoji}>🐕</Text>
                        <Text style={styles.petName}>豆豆</Text>
                    </View>
                    <Text style={styles.andText}>&</Text>
                    <View style={styles.petCard}>
                        <Text style={styles.petEmoji}>🐕</Text>
                        <Text style={styles.petName}>萌萌</Text>
                    </View>
                </View>
                <Text style={styles.dateText}>2026�?�?0�?/Text>
                <Text style={styles.venueText}>宠物乐园 · 婚礼草坪</Text>
            </View>

            {/* 操作按钮 */}
            <View style={styles.actions}>
                <Pressable style={styles.createBtn}>
                    <Icon name="create" size={24} color={colors.white} />
                    <Text style={styles.createBtnText}>创建婚礼邀�?/Text>
                </Pressable>

                <View style={styles.actionRow}>
                    <Pressable style={styles.actionBtn}>
                        <Icon name="share-social" size={20} color={colors.primary} />
                        <Text style={styles.actionBtnText}>分享邀�?/Text>
                    </Pressable>
                    <Pressable style={styles.actionBtn}>
                        <Icon name="images" size={20} color={colors.primary} />
                        <Text style={styles.actionBtnText}>婚礼相册</Text>
                    </Pressable>
                </View>
            </View>

            {/* 婚礼服务 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>婚礼服务</Text>
                <View style={styles.serviceGrid}>
                    {[
                        { icon: "camera", label: "婚礼摄影" },
                        { icon: "musical-notes", label: "现场音乐" },
                        { icon: "gift", label: "婚礼蛋糕" },
                        { icon: "flower", label: "鲜花装饰" },
                    ].map((item, index) => (
                        <Pressable key={index} style={styles.serviceItem}>
                            <View style={styles.serviceIcon}>
                                <Icon name={item.icon as any} size={24} color={colors.primary} />
                            </View>
                            <Text style={styles.serviceLabel}>{item.label}</Text>
                        </Pressable>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    invitationCard: {
        backgroundColor: colors.white,
        margin: 16,
        borderRadius: 24,
        padding: 32,
        alignItems: "center",
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 8,
    },
    hearts: {
        marginBottom: 16,
    },
    heartEmoji: {
        fontSize: 48,
    },
    title: {
        color: colors.primary,
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 24,
    },
    coupleRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 24,
    },
    petCard: {
        alignItems: "center",
    },
    petEmoji: {
        fontSize: 48,
        marginBottom: 8,
    },
    petName: {
        color: colors.foreground,
        fontSize: 18,
        fontWeight: "600",
    },
    andText: {
        color: colors.primary,
        fontSize: 32,
        fontWeight: "bold",
        marginHorizontal: 24,
    },
    dateText: {
        color: colors.foreground,
        fontSize: 18,
        fontWeight: "500",
    },
    venueText: {
        color: colors.muted,
        fontSize: 14,
        marginTop: 8,
    },
    actions: {
        padding: 16,
    },
    createBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.primary,
        paddingVertical: 16,
        borderRadius: 16,
        gap: 8,
    },
    createBtnText: {
        color: colors.white,
        fontSize: 18,
        fontWeight: "bold",
    },
    actionRow: {
        flexDirection: "row",
        marginTop: 12,
        gap: 12,
    },
    actionBtn: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.white,
        paddingVertical: 12,
        borderRadius: 12,
        gap: 6,
    },
    actionBtnText: {
        color: colors.primary,
        fontSize: 15,
        fontWeight: "500",
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
    serviceGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
    },
    serviceItem: {
        width: "48%",
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 16,
        alignItems: "center",
    },
    serviceIcon: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: colors.background,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
    },
    serviceLabel: {
        color: colors.foreground,
        fontSize: 14,
        fontWeight: "500",
    },
});

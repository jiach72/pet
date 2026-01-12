import React from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import Icon from "@/components/Icon";

const colors = {
    primary: "#374151",
    background: "#1F2937",
    foreground: "#F9FAFB",
    muted: "#9CA3AF",
    white: "#FFFFFF",
    candle: "#FCD34D",
};

/**
 * 宠物纪念�?- 庄重灰黑主题 (Task 4.4)
 */
export default function MemorialScreen() {
    return (
        <ScrollView style={styles.container}>
            {/* 纪念卡片 */}
            <View style={styles.memorialCard}>
                {/* 蜡烛动画（静态） */}
                <View style={styles.candleRow}>
                    <Text style={styles.candleEmoji}>🕯�?/Text>
                    <Text style={styles.candleEmoji}>🕯�?/Text>
                </View>

                <View style={styles.photoFrame}>
                    <Text style={styles.petEmoji}>🐕</Text>
                </View>

                <Text style={styles.petName}>豆豆</Text>
                <Text style={styles.lifeSpan}>2015 - 2025</Text>
                <Text style={styles.memorial}>
                    你永远活在我们心�?
                </Text>

                <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>10�?/Text>
                        <Text style={styles.statLabel}>陪伴时光</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>3,650�?/Text>
                        <Text style={styles.statLabel}>快乐日子</Text>
                    </View>
                </View>
            </View>

            {/* 操作按钮 */}
            <View style={styles.actions}>
                <Pressable style={styles.createBtn}>
                    <Icon name="flower" size={24} color={colors.foreground} />
                    <Text style={styles.createBtnText}>创建纪念�?/Text>
                </Pressable>

                <View style={styles.actionRow}>
                    <Pressable style={styles.actionBtn}>
                        <Icon name="images" size={20} color={colors.muted} />
                        <Text style={styles.actionBtnText}>回忆相册</Text>
                    </Pressable>
                    <Pressable style={styles.actionBtn}>
                        <Icon name="chatbubble-ellipses" size={20} color={colors.muted} />
                        <Text style={styles.actionBtnText}>留言悼念</Text>
                    </Pressable>
                </View>
            </View>

            {/* 纪念服务 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>纪念服务</Text>
                <View style={styles.serviceList}>
                    {[
                        { icon: "leaf", label: "生态安�?, desc: "回归自然，绿色环�? },
                        { icon: "sparkles", label: "宗教仪式", desc: "专业仪式，庄重告�? },
                        { icon: "diamond", label: "纪念钻石", desc: "毛发制成永恒珍藏" },
                    ].map((item, index) => (
                        <Pressable key={index} style={styles.serviceItem}>
                            <View style={styles.serviceIcon}>
                                <Icon name={item.icon as any} size={24} color={colors.muted} />
                            </View>
                            <View style={styles.serviceContent}>
                                <Text style={styles.serviceLabel}>{item.label}</Text>
                                <Text style={styles.serviceDesc}>{item.desc}</Text>
                            </View>
                            <Icon name="chevron-forward" size={20} color={colors.muted} />
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
    memorialCard: {
        backgroundColor: colors.primary,
        margin: 16,
        borderRadius: 24,
        padding: 32,
        alignItems: "center",
    },
    candleRow: {
        flexDirection: "row",
        gap: 100,
        marginBottom: 24,
    },
    candleEmoji: {
        fontSize: 32,
    },
    photoFrame: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: "#4B5563",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 3,
        borderColor: "#6B7280",
        marginBottom: 16,
    },
    petEmoji: {
        fontSize: 56,
    },
    petName: {
        color: colors.foreground,
        fontSize: 28,
        fontWeight: "bold",
    },
    lifeSpan: {
        color: colors.muted,
        fontSize: 18,
        marginTop: 4,
    },
    memorial: {
        color: colors.muted,
        fontSize: 16,
        fontStyle: "italic",
        marginTop: 16,
        textAlign: "center",
    },
    statsRow: {
        flexDirection: "row",
        marginTop: 24,
        paddingTop: 24,
        borderTopWidth: 1,
        borderTopColor: "#4B5563",
    },
    statItem: {
        flex: 1,
        alignItems: "center",
    },
    statValue: {
        color: colors.foreground,
        fontSize: 20,
        fontWeight: "bold",
    },
    statLabel: {
        color: colors.muted,
        fontSize: 13,
        marginTop: 4,
    },
    statDivider: {
        width: 1,
        backgroundColor: "#4B5563",
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
        color: colors.foreground,
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
        backgroundColor: colors.primary,
        paddingVertical: 12,
        borderRadius: 12,
        gap: 6,
    },
    actionBtnText: {
        color: colors.muted,
        fontSize: 15,
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
    serviceList: {
        gap: 12,
    },
    serviceItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.primary,
        borderRadius: 16,
        padding: 16,
    },
    serviceIcon: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: "#4B5563",
        alignItems: "center",
        justifyContent: "center",
    },
    serviceContent: {
        flex: 1,
        marginLeft: 12,
    },
    serviceLabel: {
        color: colors.foreground,
        fontSize: 16,
        fontWeight: "500",
    },
    serviceDesc: {
        color: colors.muted,
        fontSize: 13,
        marginTop: 2,
    },
});

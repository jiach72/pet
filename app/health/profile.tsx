import React from "react";
import { View, Text, ScrollView, Pressable, StyleSheet, Image } from "react-native";
import Icon from "@/components/Icon";
import { mockPet } from "@/data/mockData";

const colors = {
    primary: "#3B82F6",
    background: "#F8FAFC",
    foreground: "#1E293B",
    muted: "#64748B",
    border: "#E2E8F0",
    white: "#FFFFFF",
    green: "#10B981",
};

/**
 * 宠物档案页 (Task 4.2)
 */
export default function ProfileScreen() {
    return (
        <ScrollView style={styles.container}>
            {/* 宠物头像卡 */}
            <View style={styles.profileCard}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarEmoji}>🐕</Text>
                </View>
                <Text style={styles.petName}>{mockPet.name}</Text>
                <Text style={styles.petBreed}>{mockPet.breed}</Text>

                {/* 基本信息 */}
                <View style={styles.infoGrid}>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoValue}>{mockPet.age}</Text>
                        <Text style={styles.infoLabel}>年龄</Text>
                    </View>
                    <View style={styles.infoDivider} />
                    <View style={styles.infoItem}>
                        <Text style={styles.infoValue}>{mockPet.weight}</Text>
                        <Text style={styles.infoLabel}>体重</Text>
                    </View>
                    <View style={styles.infoDivider} />
                    <View style={styles.infoItem}>
                        <Text style={styles.infoValue}>♂</Text>
                        <Text style={styles.infoLabel}>性别</Text>
                    </View>
                </View>
            </View>

            {/* 健康状态 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>健康状态</Text>
                <View style={styles.healthCard}>
                    <View style={styles.healthItem}>
                        <View style={styles.healthIcon}>
                            <Icon name="shield-checkmark" size={20} color={colors.green} />
                        </View>
                        <View style={styles.healthContent}>
                            <Text style={styles.healthLabel}>健康评分</Text>
                            <Text style={styles.healthValue}>
                                {mockPet.health_status.health_score} 分
                            </Text>
                        </View>
                    </View>

                    <View style={styles.healthDivider} />

                    <View style={styles.healthItem}>
                        <View style={[styles.healthIcon, { backgroundColor: "#DCFCE7" }]}>
                            <Icon name="checkmark-circle" size={20} color={colors.green} />
                        </View>
                        <View style={styles.healthContent}>
                            <Text style={styles.healthLabel}>疫苗状态</Text>
                            <Text style={styles.healthValue}>已完成</Text>
                        </View>
                    </View>

                    <View style={styles.healthDivider} />

                    <View style={styles.healthItem}>
                        <View style={[styles.healthIcon, { backgroundColor: "#EFF6FF" }]}>
                            <Icon name="trending-up" size={20} color={colors.primary} />
                        </View>
                        <View style={styles.healthContent}>
                            <Text style={styles.healthLabel}>体重趋势</Text>
                            <Text style={styles.healthValue}>稳定</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* 设备信息 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>设备绑定</Text>
                <View style={styles.deviceCard}>
                    <View style={styles.deviceIcon}>
                        <Icon name="bluetooth" size={24} color={colors.primary} />
                    </View>
                    <View style={styles.deviceInfo}>
                        <Text style={styles.deviceName}>PetPulse Pro</Text>
                        <Text style={styles.deviceStatus}>已连接 · 电量 85%</Text>
                    </View>
                    <View style={styles.connectedBadge}>
                        <Text style={styles.connectedText}>在线</Text>
                    </View>
                </View>
            </View>

            {/* 操作按钮 */}
            <View style={styles.section}>
                <Pressable style={styles.editBtn}>
                    <Icon name="create" size={20} color={colors.primary} />
                    <Text style={styles.editBtnText}>编辑档案</Text>
                </Pressable>
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
    profileCard: {
        backgroundColor: colors.white,
        margin: 16,
        borderRadius: 20,
        padding: 24,
        alignItems: "center",
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#EFF6FF",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
    },
    avatarEmoji: {
        fontSize: 56,
    },
    petName: {
        color: colors.foreground,
        fontSize: 24,
        fontWeight: "bold",
    },
    petBreed: {
        color: colors.muted,
        fontSize: 15,
        marginTop: 4,
    },
    infoGrid: {
        flexDirection: "row",
        marginTop: 24,
        paddingTop: 24,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        width: "100%",
    },
    infoItem: {
        flex: 1,
        alignItems: "center",
    },
    infoValue: {
        color: colors.foreground,
        fontSize: 18,
        fontWeight: "bold",
    },
    infoLabel: {
        color: colors.muted,
        fontSize: 13,
        marginTop: 4,
    },
    infoDivider: {
        width: 1,
        backgroundColor: colors.border,
    },
    section: {
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    sectionTitle: {
        color: colors.foreground,
        fontSize: 17,
        fontWeight: "bold",
        marginBottom: 12,
    },
    healthCard: {
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 16,
    },
    healthItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
    },
    healthIcon: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: "#DCFCE7",
        alignItems: "center",
        justifyContent: "center",
    },
    healthContent: {
        marginLeft: 12,
    },
    healthLabel: {
        color: colors.muted,
        fontSize: 13,
    },
    healthValue: {
        color: colors.foreground,
        fontSize: 16,
        fontWeight: "600",
        marginTop: 2,
    },
    healthDivider: {
        height: 1,
        backgroundColor: colors.border,
    },
    deviceCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 16,
    },
    deviceIcon: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: "#EFF6FF",
        alignItems: "center",
        justifyContent: "center",
    },
    deviceInfo: {
        flex: 1,
        marginLeft: 12,
    },
    deviceName: {
        color: colors.foreground,
        fontSize: 16,
        fontWeight: "600",
    },
    deviceStatus: {
        color: colors.muted,
        fontSize: 13,
        marginTop: 2,
    },
    connectedBadge: {
        backgroundColor: "#DCFCE7",
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 12,
    },
    connectedText: {
        color: colors.green,
        fontSize: 13,
        fontWeight: "500",
    },
    editBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.white,
        paddingVertical: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.primary,
        gap: 8,
    },
    editBtnText: {
        color: colors.primary,
        fontSize: 16,
        fontWeight: "600",
    },
});

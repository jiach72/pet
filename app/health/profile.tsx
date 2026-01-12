import React from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import Icon from "@/components/Icon";
import { mockPet } from "@/data/mockData";
import { Theme } from "@/constants/theme";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";

/**
 * 宠物档案页 - 重构版
 */
export default function ProfileScreen() {
    return (
        <ScrollView style={styles.container}>
            {/* 宠物头像卡 */}
            <Card style={styles.profileCard} padding="xl">
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
            </Card>

            {/* 健康状态 */}
            <Section title="健康状态" containerStyle={styles.sectionPadding}>
                <Card>
                    <View style={styles.healthItem}>
                        <View style={[styles.healthIcon, { backgroundColor: '#F0FDF4' }]}>
                            <Icon name="shield-checkmark" size={20} color={Theme.colors.status.health} />
                        </View>
                        <View style={styles.healthContent}>
                            <Text style={styles.healthLabel}>健康评分</Text>
                            <Text style={styles.healthValue}>
                                {mockPet.health_status.health_score} 分
                            </Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.healthItem}>
                        <View style={[styles.healthIcon, { backgroundColor: '#F0FDF4' }]}>
                            <Icon name="checkmark-circle" size={20} color={Theme.colors.status.health} />
                        </View>
                        <View style={styles.healthContent}>
                            <Text style={styles.healthLabel}>疫苗状态</Text>
                            <Text style={styles.healthValue}>已完成</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.healthItem}>
                        <View style={[styles.healthIcon, { backgroundColor: '#EFF6FF' }]}>
                            <Icon name="trending-up" size={20} color={Theme.colors.primary} />
                        </View>
                        <View style={styles.healthContent}>
                            <Text style={styles.healthLabel}>体重趋势</Text>
                            <Text style={styles.healthValue}>稳定</Text>
                        </View>
                    </View>
                </Card>
            </Section>

            {/* 设备信息 */}
            <Section title="设备绑定" containerStyle={styles.sectionPadding}>
                <Card variant="elevated" style={styles.deviceCard}>
                    <View style={styles.deviceIcon}>
                        <Icon name="bluetooth" size={24} color={Theme.colors.primary} />
                    </View>
                    <View style={styles.deviceInfo}>
                        <Text style={styles.deviceName}>PetPulse Pro</Text>
                        <Text style={styles.deviceStatus}>已连接 · 电量 85%</Text>
                    </View>
                    <View style={styles.statusBadge}>
                        <Text style={styles.statusText}>在线</Text>
                    </View>
                </Card>
            </Section>

            {/* 操作按钮 */}
            <View style={styles.sectionPadding}>
                <Pressable style={styles.editBtn}>
                    <Icon name="create" size={20} color={Theme.colors.primary} />
                    <Text style={styles.editBtnText}>编辑档案</Text>
                </Pressable>
            </View>

            <View style={{ height: Theme.spacing.xl }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.background,
    },
    sectionPadding: {
        paddingHorizontal: Theme.spacing.md,
    },
    profileCard: {
        margin: Theme.spacing.md,
        alignItems: "center",
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: Theme.radius.full,
        backgroundColor: "#EFF6FF",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: Theme.spacing.md,
    },
    avatarEmoji: {
        fontSize: 56,
    },
    petName: {
        ...Theme.typography.h1,
    },
    petBreed: {
        ...Theme.typography.body,
        fontSize: 15,
        marginTop: Theme.spacing.xs,
    },
    infoGrid: {
        flexDirection: "row",
        marginTop: Theme.spacing.lg,
        paddingTop: Theme.spacing.lg,
        borderTopWidth: 1,
        borderTopColor: Theme.colors.border,
        width: "100%",
    },
    infoItem: {
        flex: 1,
        alignItems: "center",
    },
    infoValue: {
        ...Theme.typography.h3,
    },
    infoLabel: {
        ...Theme.typography.caption,
        marginTop: Theme.spacing.xs,
    },
    infoDivider: {
        width: 1,
        backgroundColor: Theme.colors.border,
    },
    healthItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: Theme.spacing.sm,
    },
    healthIcon: {
        width: 40,
        height: 40,
        borderRadius: Theme.radius.sm,
        alignItems: "center",
        justifyContent: "center",
    },
    healthContent: {
        marginLeft: Theme.spacing.md,
    },
    healthLabel: {
        ...Theme.typography.caption,
    },
    healthValue: {
        ...Theme.typography.h3,
        fontSize: 16,
        marginTop: 2,
    },
    divider: {
        height: 1,
        backgroundColor: Theme.colors.border,
        marginVertical: 4,
    },
    deviceCard: {
        flexDirection: "row",
        alignItems: "center",
        padding: Theme.spacing.md,
    },
    deviceIcon: {
        width: 48,
        height: 48,
        borderRadius: Theme.radius.md,
        backgroundColor: "#EFF6FF",
        alignItems: "center",
        justifyContent: "center",
    },
    deviceInfo: {
        flex: 1,
        marginLeft: Theme.spacing.md,
    },
    deviceName: {
        ...Theme.typography.h3,
        fontSize: 16,
    },
    deviceStatus: {
        ...Theme.typography.caption,
        marginTop: 2,
    },
    statusBadge: {
        backgroundColor: '#F0FDF4',
        paddingVertical: Theme.spacing.xs,
        paddingHorizontal: Theme.spacing.sm,
        borderRadius: Theme.radius.full,
    },
    statusText: {
        color: Theme.colors.status.health,
        fontSize: 13,
        fontWeight: "600",
    },
    editBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Theme.colors.surface,
        paddingVertical: Theme.spacing.md,
        borderRadius: Theme.radius.md,
        borderWidth: 1,
        borderColor: Theme.colors.primary,
        gap: Theme.spacing.sm,
    },
    editBtnText: {
        ...Theme.typography.h3,
        color: Theme.colors.primary,
        fontSize: 16,
    },
});

import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors, borderRadius, shadows, spacing } from "@/constants/theme";
import {
    getDevices,
    deviceConfig,
    presetScenes,
    applyScene,
    executeAction,
    SmartDevice,
} from "@/services/smartHomeService";

/**
 * 智能家居主页（Task 4.2）
 * F-13: 设备列表 + 预设场景
 */
export default function SmartHomeScreen() {
    const router = useRouter();
    const [devices] = useState<SmartDevice[]>(getDevices());
    const [executing, setExecuting] = useState<string | null>(null);

    const handleQuickAction = async (device: SmartDevice) => {
        if (!device.isOnline) {
            Alert.alert("设备离线", "请检查设备连接状态");
            return;
        }

        setExecuting(device.id);
        const action = deviceConfig[device.type].actions[0];
        const result = await executeAction(device.id, action.type);
        setExecuting(null);

        if (result.success) {
            Alert.alert("执行成功", `${device.name} ${action.label}`);
        } else {
            Alert.alert("执行失败", result.message);
        }
    };

    const handleApplyScene = (sceneId: string) => {
        const rules = applyScene(sceneId);
        if (rules.length > 0) {
            Alert.alert("场景已启用", `已创建 ${rules.length} 条自动化规则`);
        }
    };

    const formatLastAction = (device: SmartDevice) => {
        if (!device.lastAction) return "暂无操作记录";
        const time = device.lastAction.timestamp;
        const hours = Math.floor((Date.now() - time.getTime()) / 3600000);
        if (hours < 1) return `${device.lastAction.name} · 刚刚`;
        return `${device.lastAction.name} · ${hours}小时前`;
    };

    return (
        <ScrollView style={styles.container}>
            {/* 设备列表 */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>我的设备</Text>
                    <Pressable style={styles.addBtn}>
                        <Ionicons name="add" size={20} color={colors.primary} />
                        <Text style={styles.addBtnText}>添加</Text>
                    </Pressable>
                </View>

                {devices.map((device) => {
                    const config = deviceConfig[device.type];
                    return (
                        <Pressable
                            key={device.id}
                            onPress={() => handleQuickAction(device)}
                            style={({ pressed }) => [
                                styles.deviceCard,
                                pressed && styles.cardPressed,
                            ]}
                        >
                            <View
                                style={[
                                    styles.deviceIcon,
                                    { backgroundColor: device.isOnline ? `${colors.primary}15` : `${colors.muted}15` },
                                ]}
                            >
                                <Ionicons
                                    name={config.icon as any}
                                    size={24}
                                    color={device.isOnline ? colors.primary : colors.muted}
                                />
                            </View>
                            <View style={styles.deviceInfo}>
                                <View style={styles.deviceNameRow}>
                                    <Text style={styles.deviceName}>{device.name}</Text>
                                    <View
                                        style={[
                                            styles.onlineIndicator,
                                            { backgroundColor: device.isOnline ? colors.secondary : colors.muted },
                                        ]}
                                    />
                                </View>
                                <Text style={styles.deviceStatus}>
                                    {device.isOnline ? formatLastAction(device) : "设备离线"}
                                </Text>
                                {device.batteryLevel !== undefined && device.batteryLevel < 20 && (
                                    <View style={styles.batteryWarning}>
                                        <Ionicons name="battery-dead" size={14} color={colors.error} />
                                        <Text style={styles.batteryText}>电量低 {device.batteryLevel}%</Text>
                                    </View>
                                )}
                            </View>
                            {executing === device.id ? (
                                <Ionicons name="sync" size={20} color={colors.primary} />
                            ) : (
                                <Ionicons name="chevron-forward" size={20} color={colors.muted} />
                            )}
                        </Pressable>
                    );
                })}
            </View>

            {/* 预设场景 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>快捷场景</Text>
                <View style={styles.scenesGrid}>
                    {presetScenes.map((scene) => (
                        <Pressable
                            key={scene.id}
                            onPress={() => handleApplyScene(scene.id)}
                            style={({ pressed }) => [
                                styles.sceneCard,
                                pressed && styles.cardPressed,
                            ]}
                        >
                            <View style={styles.sceneIcon}>
                                <Ionicons name={scene.icon as any} size={28} color={colors.secondary} />
                            </View>
                            <Text style={styles.sceneName}>{scene.name}</Text>
                            <Text style={styles.sceneDesc}>{scene.description}</Text>
                        </Pressable>
                    ))}
                </View>
            </View>

            {/* 自动化入口 */}
            <View style={styles.section}>
                <Pressable
                    onPress={() => router.push("/smart-home/rules")}
                    style={({ pressed }) => [styles.rulesEntry, pressed && styles.cardPressed]}
                >
                    <View style={styles.rulesIcon}>
                        <Ionicons name="git-branch" size={24} color={colors.accent} />
                    </View>
                    <View style={styles.rulesInfo}>
                        <Text style={styles.rulesTitle}>自动化规则</Text>
                        <Text style={styles.rulesDesc}>创建和管理自定义规则</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color={colors.muted} />
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
    section: {
        padding: spacing.lg,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: spacing.md,
    },
    sectionTitle: {
        color: colors.foreground,
        fontSize: 17,
        fontWeight: "700",
    },
    addBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
    },
    addBtnText: {
        color: colors.primary,
        fontSize: 14,
        fontWeight: "600",
    },
    deviceCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.white,
        padding: spacing.lg,
        borderRadius: borderRadius.lg,
        marginBottom: spacing.md,
        ...shadows.card,
    },
    cardPressed: {
        opacity: 0.9,
        transform: [{ scale: 0.99 }],
    },
    deviceIcon: {
        width: 48,
        height: 48,
        borderRadius: borderRadius.md,
        alignItems: "center",
        justifyContent: "center",
    },
    deviceInfo: {
        flex: 1,
        marginLeft: spacing.md,
    },
    deviceNameRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
    },
    deviceName: {
        color: colors.foreground,
        fontSize: 16,
        fontWeight: "600",
    },
    onlineIndicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    deviceStatus: {
        color: colors.muted,
        fontSize: 13,
        marginTop: 4,
    },
    batteryWarning: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
        marginTop: 4,
    },
    batteryText: {
        color: colors.error,
        fontSize: 12,
    },
    scenesGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: spacing.md,
    },
    sceneCard: {
        width: "47%",
        backgroundColor: colors.white,
        padding: spacing.lg,
        borderRadius: borderRadius.xl,
        ...shadows.card,
    },
    sceneIcon: {
        width: 48,
        height: 48,
        borderRadius: borderRadius.md,
        backgroundColor: `${colors.secondary}15`,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: spacing.md,
    },
    sceneName: {
        color: colors.foreground,
        fontSize: 15,
        fontWeight: "600",
    },
    sceneDesc: {
        color: colors.muted,
        fontSize: 12,
        marginTop: 4,
        lineHeight: 16,
    },
    rulesEntry: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.white,
        padding: spacing.lg,
        borderRadius: borderRadius.xl,
        ...shadows.card,
    },
    rulesIcon: {
        width: 48,
        height: 48,
        borderRadius: borderRadius.md,
        backgroundColor: `${colors.accent}15`,
        alignItems: "center",
        justifyContent: "center",
    },
    rulesInfo: {
        flex: 1,
        marginLeft: spacing.md,
    },
    rulesTitle: {
        color: colors.foreground,
        fontSize: 16,
        fontWeight: "600",
    },
    rulesDesc: {
        color: colors.muted,
        fontSize: 13,
        marginTop: 4,
    },
});

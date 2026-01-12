import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    Text,
    ScrollView,
    Pressable,
    StyleSheet,
    Share,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors, borderRadius, shadows, spacing } from "@/constants/theme";
import { mockPet } from "@/data/mockData";
import {
    HardwareType,
    LocationPoint,
    CrowdsourceReport,
    startGPSTracking,
    stopGPSTracking,
    startCrowdsourceSearch,
    stopCrowdsourceSearch,
    generatePosterData,
} from "@/services/safetyService";

/**
 * 丢失模式页面 (增强版)
 * F-07 Pro 主动追踪 / F-08 Lite 众包寻宠 / F-09 黑匣子海报
 */
export default function LostModeScreen() {
    const router = useRouter();
    const [isActive, setIsActive] = useState(false);
    const [hardwareType] = useState<HardwareType>(mockPet.hardware_type);

    // Pro 追踪状态
    const [trajectory, setTrajectory] = useState<LocationPoint[]>([]);

    // Lite 众包状态
    const [reports, setReports] = useState<CrowdsourceReport[]>([]);
    const [nearbyUsers, setNearbyUsers] = useState(0);

    // 电量模拟
    const [battery] = useState(Math.floor(60 + Math.random() * 30));

    const handleActivate = useCallback(() => {
        setIsActive(true);

        if (hardwareType === "pro") {
            startGPSTracking((points) => setTrajectory(points));
        } else {
            startCrowdsourceSearch(
                (newReports) => setReports(newReports),
                (count) => setNearbyUsers(count)
            );
        }
    }, [hardwareType]);

    const handleDeactivate = useCallback(() => {
        setIsActive(false);
        stopGPSTracking();
        stopCrowdsourceSearch();
        setTrajectory([]);
        setReports([]);
    }, []);

    useEffect(() => {
        return () => {
            stopGPSTracking();
            stopCrowdsourceSearch();
        };
    }, []);

    const handleGeneratePoster = async () => {
        const posterData = generatePosterData(
            { name: mockPet.name, breed: mockPet.breed, photo: "" },
            { heartRate: 85, temperature: 38.5 },
            battery
        );

        // 模拟分享
        try {
            await Share.share({
                message: `🆘 寻宠启事\n\n宠物：${posterData.petName}（${posterData.petBreed}）\n最后位置：北京市朝阳区\n电量：${posterData.batteryLevel}%\n联系方式：${posterData.contactPhone}\n\n如有发现请联系，万分感谢！`,
                title: "寻宠启事",
            });
        } catch (error) {
            console.error(error);
        }
    };

    const formatTime = (date: Date) => {
        return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
    };

    return (
        <ScrollView style={styles.container}>
            {/* 头部 */}
            <View style={styles.header}>
                <Pressable onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color={colors.foreground} />
                </Pressable>
                <Text style={styles.title}>丢失模式</Text>
                <View style={{ width: 40 }} />
            </View>

            {/* 设备状态 */}
            <View style={styles.section}>
                <View style={styles.deviceCard}>
                    <View style={styles.deviceInfo}>
                        <View
                            style={[
                                styles.deviceBadge,
                                { backgroundColor: hardwareType === "pro" ? colors.primary : colors.secondary },
                            ]}
                        >
                            <Text style={styles.deviceBadgeText}>
                                {hardwareType === "pro" ? "Pro" : "Lite"}
                            </Text>
                        </View>
                        <View style={styles.deviceMeta}>
                            <Text style={styles.deviceName}>{mockPet.name} 的设备</Text>
                            <View style={styles.batteryRow}>
                                <Ionicons
                                    name={battery > 20 ? "battery-half" : "battery-dead"}
                                    size={16}
                                    color={battery > 20 ? colors.secondary : colors.error}
                                />
                                <Text
                                    style={[
                                        styles.batteryText,
                                        { color: battery > 20 ? colors.muted : colors.error },
                                    ]}
                                >
                                    {battery}%
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View
                        style={[
                            styles.statusIndicator,
                            { backgroundColor: isActive ? colors.error : colors.muted },
                        ]}
                    />
                </View>
            </View>

            {/* 模式说明 */}
            <View style={styles.section}>
                <View style={styles.modeCard}>
                    <Ionicons
                        name={hardwareType === "pro" ? "locate" : "people-circle"}
                        size={32}
                        color={hardwareType === "pro" ? colors.primary : colors.secondary}
                    />
                    <View style={styles.modeInfo}>
                        <Text style={styles.modeTitle}>
                            {hardwareType === "pro" ? "GPS 主动追踪" : "众包寻宠"}
                        </Text>
                        <Text style={styles.modeDesc}>
                            {hardwareType === "pro"
                                ? "高频 GPS 上报，实时显示位置并记录轨迹"
                                : "向附近宠友广播 BLE 信标，协助定位"}
                        </Text>
                    </View>
                </View>
            </View>

            {/* 激活按钮 */}
            <View style={styles.section}>
                <Pressable
                    onPress={isActive ? handleDeactivate : handleActivate}
                    style={({ pressed }) => [
                        styles.activateBtn,
                        isActive && styles.deactivateBtn,
                        pressed && styles.btnPressed,
                    ]}
                >
                    <Ionicons
                        name={isActive ? "stop-circle" : "radio"}
                        size={24}
                        color={colors.white}
                    />
                    <Text style={styles.activateBtnText}>
                        {isActive ? "停止追踪" : "启动丢失模式"}
                    </Text>
                </Pressable>
            </View>

            {/* 实时状态 */}
            {isActive && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>实时状态</Text>

                    {/* Pro: GPS 轨迹 */}
                    {hardwareType === "pro" && (
                        <View style={styles.trackingCard}>
                            <View style={styles.trackingHeader}>
                                <Ionicons name="navigate-circle" size={24} color={colors.primary} />
                                <Text style={styles.trackingTitle}>轨迹追踪中</Text>
                                <View style={styles.pulseIndicator} />
                            </View>
                            <Text style={styles.trackingStats}>
                                已记录 {trajectory.length} 个位置点
                            </Text>

                            {/* 最新位置 */}
                            {trajectory.length > 0 && (
                                <View style={styles.lastLocation}>
                                    <Text style={styles.lastLocationLabel}>最新位置</Text>
                                    <Text style={styles.lastLocationTime}>
                                        {formatTime(trajectory[trajectory.length - 1].timestamp)}
                                    </Text>
                                    <Text style={styles.lastLocationCoords}>
                                        {trajectory[trajectory.length - 1].latitude.toFixed(4)},
                                        {trajectory[trajectory.length - 1].longitude.toFixed(4)}
                                    </Text>
                                </View>
                            )}
                        </View>
                    )}

                    {/* Lite: 众包状态 */}
                    {hardwareType === "lite" && (
                        <View style={styles.crowdsourceCard}>
                            <View style={styles.crowdsourceHeader}>
                                <Ionicons name="radio-outline" size={24} color={colors.secondary} />
                                <Text style={styles.crowdsourceTitle}>信标广播中</Text>
                            </View>
                            <Text style={styles.crowdsourceStats}>
                                正在向附近 <Text style={styles.highlight}>{nearbyUsers}</Text> 位宠友求助
                            </Text>

                            {/* 上报记录 */}
                            {reports.length > 0 && (
                                <View style={styles.reportsList}>
                                    <Text style={styles.reportsTitle}>收到 {reports.length} 条目击报告</Text>
                                    {reports.slice(-3).map((report) => (
                                        <View key={report.id} style={styles.reportItem}>
                                            <Ionicons name="location" size={16} color={colors.warning} />
                                            <Text style={styles.reportText}>
                                                {report.reporterName} 在 {report.distance.toFixed(1)}km 外发现疑似目标
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                            )}
                        </View>
                    )}
                </View>
            )}

            {/* 急救海报 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>急救工具</Text>
                <Pressable
                    onPress={handleGeneratePoster}
                    style={({ pressed }) => [styles.posterBtn, pressed && styles.btnPressed]}
                >
                    <View style={styles.posterIcon}>
                        <Ionicons name="document-attach" size={24} color={colors.warning} />
                    </View>
                    <View style={styles.posterInfo}>
                        <Text style={styles.posterTitle}>生成急救海报</Text>
                        <Text style={styles.posterDesc}>包含最后位置、电量、生理状态</Text>
                    </View>
                    <Ionicons name="share-outline" size={20} color={colors.muted} />
                </Pressable>
            </View>

            <View style={{ height: 40 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 56,
        paddingBottom: spacing.lg,
        paddingHorizontal: spacing.lg,
    },
    backBtn: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        color: colors.foreground,
        fontSize: 18,
        fontWeight: "700",
    },
    section: {
        paddingHorizontal: spacing.lg,
        marginBottom: spacing.lg,
    },
    sectionTitle: {
        color: colors.foreground,
        fontSize: 16,
        fontWeight: "700",
        marginBottom: spacing.md,
    },
    deviceCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.white,
        padding: spacing.lg,
        borderRadius: borderRadius.xl,
        ...shadows.card,
    },
    deviceInfo: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.md,
    },
    deviceBadge: {
        paddingVertical: spacing.xs,
        paddingHorizontal: spacing.md,
        borderRadius: borderRadius.sm,
    },
    deviceBadgeText: {
        color: colors.white,
        fontSize: 12,
        fontWeight: "700",
    },
    deviceMeta: {},
    deviceName: {
        color: colors.foreground,
        fontSize: 16,
        fontWeight: "600",
    },
    batteryRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.xs,
        marginTop: 4,
    },
    batteryText: {
        fontSize: 13,
    },
    statusIndicator: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    modeCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.white,
        padding: spacing.lg,
        borderRadius: borderRadius.xl,
        gap: spacing.md,
        ...shadows.card,
    },
    modeInfo: {
        flex: 1,
    },
    modeTitle: {
        color: colors.foreground,
        fontSize: 16,
        fontWeight: "600",
    },
    modeDesc: {
        color: colors.muted,
        fontSize: 13,
        marginTop: 4,
        lineHeight: 18,
    },
    activateBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.error,
        paddingVertical: spacing.lg,
        borderRadius: borderRadius.xl,
        gap: spacing.sm,
        ...shadows.button,
    },
    deactivateBtn: {
        backgroundColor: colors.muted,
    },
    btnPressed: {
        opacity: 0.9,
        transform: [{ scale: 0.98 }],
    },
    activateBtnText: {
        color: colors.white,
        fontSize: 17,
        fontWeight: "bold",
    },
    trackingCard: {
        backgroundColor: colors.white,
        padding: spacing.lg,
        borderRadius: borderRadius.xl,
        ...shadows.card,
    },
    trackingHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
    },
    trackingTitle: {
        color: colors.foreground,
        fontSize: 16,
        fontWeight: "600",
        flex: 1,
    },
    pulseIndicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.error,
    },
    trackingStats: {
        color: colors.muted,
        fontSize: 14,
        marginTop: spacing.sm,
    },
    lastLocation: {
        backgroundColor: colors.background,
        padding: spacing.md,
        borderRadius: borderRadius.md,
        marginTop: spacing.md,
    },
    lastLocationLabel: {
        color: colors.muted,
        fontSize: 12,
    },
    lastLocationTime: {
        color: colors.foreground,
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 4,
    },
    lastLocationCoords: {
        color: colors.muted,
        fontSize: 13,
        marginTop: 4,
    },
    crowdsourceCard: {
        backgroundColor: colors.white,
        padding: spacing.lg,
        borderRadius: borderRadius.xl,
        ...shadows.card,
    },
    crowdsourceHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
    },
    crowdsourceTitle: {
        color: colors.foreground,
        fontSize: 16,
        fontWeight: "600",
    },
    crowdsourceStats: {
        color: colors.muted,
        fontSize: 14,
        marginTop: spacing.sm,
    },
    highlight: {
        color: colors.secondary,
        fontWeight: "bold",
    },
    reportsList: {
        marginTop: spacing.md,
        paddingTop: spacing.md,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
    reportsTitle: {
        color: colors.foreground,
        fontSize: 14,
        fontWeight: "600",
        marginBottom: spacing.sm,
    },
    reportItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
        paddingVertical: spacing.xs,
    },
    reportText: {
        color: colors.muted,
        fontSize: 13,
    },
    posterBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.white,
        padding: spacing.lg,
        borderRadius: borderRadius.xl,
        gap: spacing.md,
        ...shadows.card,
    },
    posterIcon: {
        width: 48,
        height: 48,
        borderRadius: borderRadius.md,
        backgroundColor: `${colors.warning}15`,
        alignItems: "center",
        justifyContent: "center",
    },
    posterInfo: {
        flex: 1,
    },
    posterTitle: {
        color: colors.foreground,
        fontSize: 16,
        fontWeight: "600",
    },
    posterDesc: {
        color: colors.muted,
        fontSize: 13,
        marginTop: 4,
    },
});

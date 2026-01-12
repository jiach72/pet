import React, { useState, useCallback } from "react";
import {
    View,
    Text,
    ScrollView,
    Pressable,
    StyleSheet,
    RefreshControl,
} from "react-native";
import { useRouter } from "expo-router";
import Icon from "@/components/Icon";
import { HeartRateChart } from "@/components/health/HeartRateChart";
import { VitalGauge } from "@/components/health/VitalGauge";
import { AlertBanner } from "@/components/health/AlertBanner";
import { AlertModal } from "@/components/health/AlertModal";
import { useVitals } from "@/hooks/useVitals";
import { mockPet } from "@/data/mockData";
import { colors, borderRadius, shadows, spacing } from "@/constants/theme";

/**
 * 守护页 - 实时体征监测 (Soft UI 风格)
 * - 使用 react-icons SVG 图标
 * - Soft shadow + 大圆角
 * - 按钮微交互
 */
export default function GuardScreen() {
    const router = useRouter();
    const { vitals, ecgPoints, alert, isLoading, refresh } = useVitals("pet-001");
    const [refreshing, setRefreshing] = useState(false);
    const [showCriticalAlert, setShowCriticalAlert] = useState(false);

    const handleRefresh = useCallback(async () => {
        setRefreshing(true);
        await refresh();
        setRefreshing(false);
    }, [refresh]);

    React.useEffect(() => {
        if (alert?.level === "critical") {
            setShowCriticalAlert(true);
        }
    }, [alert]);

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        tintColor={colors.primary}
                    />
                }
            >
                {/* 顶部标题 */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>守护中心</Text>
                        <View style={styles.petInfoRow}>
                            <View style={styles.onlineDot} />
                            <Text style={styles.petInfo}>
                                {mockPet.name} · {mockPet.breed}
                            </Text>
                        </View>
                    </View>
                    <Pressable
                        onPress={() => router.push("/health/alerts")}
                        style={({ pressed }) => [styles.alertBtn, pressed && styles.btnPressed]}
                    >
                        <Icon name="notifications" size={22} color={colors.foreground} />
                    </Pressable>
                </View>

                {/* 预警横幅 */}
                {alert && alert.level !== "none" && (
                    <View style={styles.section}>
                        <AlertBanner
                            level={alert.level as any}
                            message={alert.message}
                            onPress={() => router.push("/health/alerts")}
                        />
                    </View>
                )}

                {/* 健康评分卡 */}
                <View style={styles.section}>
                    <View style={styles.scoreCard}>
                        <View style={styles.scoreContent}>
                            <View style={styles.scoreLabelRow}>
                                <View style={styles.scoreIconBg}>
                                    <Icon name="shield-checkmark" size={18} color={colors.secondary} />
                                </View>
                                <Text style={styles.scoreLabel}>健康评分</Text>
                            </View>
                            <View style={styles.scoreRow}>
                                <Text style={styles.scoreValue}>
                                    {mockPet.health_status.health_score}
                                </Text>
                                <Text style={styles.scoreMax}>/100</Text>
                            </View>
                            <View style={styles.statusBadge}>
                                <Icon name="checkmark-circle" size={14} color={colors.secondary} />
                                <Text style={styles.statusText}>状态良好</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* 心率曲线 */}
                <View style={styles.section}>
                    <HeartRateChart points={ecgPoints} heartRate={vitals.heartRate} />
                </View>

                {/* 体征仪表盘 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>实时体征</Text>
                    <View style={styles.gaugeRow}>
                        <VitalGauge type="temperature" value={vitals.temperature} unit="°C" />
                        <VitalGauge type="respiratory" value={vitals.respiratoryRate} unit="次/分" />
                        <VitalGauge type="activity" value={vitals.activityLevel} unit="%" />
                    </View>
                </View>

                {/* 快捷入口 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>健康管理</Text>
                    <View style={styles.quickLinks}>
                        {[
                            { icon: "analytics", label: "AI 诊断", route: "/diagnosis/stool", color: colors.accent },
                            { icon: "document-text", label: "健康档案", route: "/health/profile", color: colors.primary },
                            { icon: "medical", label: "就医记录", route: "/health/records", color: colors.secondary },
                            { icon: "fitness", label: "体重趋势", route: "/health/weight", color: colors.warning },
                        ].map((item) => (
                            <Pressable
                                key={item.route}
                                onPress={() => router.push(item.route as any)}
                                style={({ pressed }) => [styles.quickLink, pressed && styles.btnPressed]}
                            >
                                <View style={[styles.quickLinkIcon, { backgroundColor: `${item.color}15` }]}>
                                    <Icon name={item.icon} size={22} color={item.color} />
                                </View>
                                <Text style={styles.quickLinkLabel}>{item.label}</Text>
                                <Icon name="chevron-forward" size={16} color={colors.muted} />
                            </Pressable>
                        ))}
                    </View>
                </View>

                {/* 丢失模式入口 */}
                <View style={[styles.section, { marginBottom: 32 }]}>
                    <Pressable
                        onPress={() => router.push("/lost-mode")}
                        style={({ pressed }) => [styles.lostModeBtn, pressed && styles.lostModeBtnPressed]}
                    >
                        <View style={styles.lostModeIcon}>
                            <Icon name="radio" size={22} color={colors.white} />
                        </View>
                        <Text style={styles.lostModeBtnText}>启动丢失模式</Text>
                        <Icon name="chevron-forward" size={20} color="rgba(255,255,255,0.7)" />
                    </Pressable>
                </View>
            </ScrollView>

            {/* 紧急预警弹窗 */}
            <AlertModal
                visible={showCriticalAlert}
                title="紧急预警"
                message={alert?.message || "检测到异常体征，请立即关注！"}
                onClose={() => setShowCriticalAlert(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        paddingTop: 56,
        paddingBottom: spacing.lg,
        paddingHorizontal: spacing.lg,
    },
    greeting: {
        color: colors.foreground,
        fontSize: 26,
        fontWeight: "bold",
    },
    petInfoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: spacing.xs,
    },
    onlineDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.secondary,
        marginRight: spacing.xs,
    },
    petInfo: {
        color: colors.muted,
        fontSize: 14,
    },
    alertBtn: {
        width: 44,
        height: 44,
        borderRadius: borderRadius.lg,
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "center",
        ...shadows.card,
    },
    btnPressed: {
        opacity: 0.9,
        transform: [{ scale: 0.98 }],
    },
    section: {
        paddingHorizontal: spacing.lg,
        marginBottom: spacing.lg,
    },
    sectionTitle: {
        color: colors.foreground,
        fontSize: 17,
        fontWeight: "700",
        marginBottom: spacing.md,
    },
    scoreCard: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.xl,
        padding: spacing.xl,
        ...shadows.card,
    },
    scoreContent: {},
    scoreLabelRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
    },
    scoreIconBg: {
        width: 32,
        height: 32,
        borderRadius: borderRadius.sm,
        backgroundColor: `${colors.secondary}15`,
        alignItems: "center",
        justifyContent: "center",
    },
    scoreLabel: {
        color: colors.muted,
        fontSize: 14,
    },
    scoreRow: {
        flexDirection: "row",
        alignItems: "baseline",
        marginTop: spacing.sm,
    },
    scoreValue: {
        color: colors.secondary,
        fontSize: 48,
        fontWeight: "bold",
    },
    scoreMax: {
        color: colors.muted,
        fontSize: 20,
        marginLeft: spacing.xs,
    },
    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: `${colors.secondary}15`,
        paddingVertical: spacing.xs,
        paddingHorizontal: spacing.md,
        borderRadius: borderRadius.full,
        alignSelf: "flex-start",
        marginTop: spacing.md,
        gap: spacing.xs,
    },
    statusText: {
        color: colors.secondary,
        fontSize: 13,
        fontWeight: "600",
    },
    gaugeRow: {
        flexDirection: "row",
        gap: spacing.md,
    },
    quickLinks: {
        gap: spacing.md,
    },
    quickLink: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.white,
        padding: spacing.lg,
        borderRadius: borderRadius.lg,
        ...shadows.card,
    },
    quickLinkIcon: {
        width: 44,
        height: 44,
        borderRadius: borderRadius.md,
        alignItems: "center",
        justifyContent: "center",
    },
    quickLinkLabel: {
        flex: 1,
        color: colors.foreground,
        fontSize: 15,
        fontWeight: "600",
        marginLeft: spacing.md,
    },
    lostModeBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.error,
        paddingVertical: spacing.lg,
        paddingHorizontal: spacing.xl,
        borderRadius: borderRadius.xl,
        ...shadows.button,
    },
    lostModeBtnPressed: {
        opacity: 0.95,
        transform: [{ scale: 0.99 }],
    },
    lostModeIcon: {
        width: 40,
        height: 40,
        borderRadius: borderRadius.md,
        backgroundColor: "rgba(255,255,255,0.2)",
        alignItems: "center",
        justifyContent: "center",
    },
    lostModeBtnText: {
        flex: 1,
        color: colors.white,
        fontSize: 17,
        fontWeight: "bold",
        marginLeft: spacing.md,
    },
});

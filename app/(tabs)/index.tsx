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
import { ActivityRings } from "@/components/health/ActivityRings";
import { SleepCard } from "@/components/health/SleepCard";
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

                {/* 核心看板：健康评分 + 运动三环 */}
                <View style={styles.dashboardRow}>
                    <View style={styles.scoreCardHalf}>
                        <View style={styles.scoreHeader}>
                            <View style={styles.scoreIconSmall}>
                                <Icon name="shield-checkmark" size={14} color={colors.secondary} />
                            </View>
                            <Text style={styles.scoreLabelSmall}>健康评分</Text>
                        </View>
                        <View style={styles.scoreValueRow}>
                            <Text style={styles.scoreValueBig}>{mockPet.health_status.health_score}</Text>
                        </View>
                        <View style={styles.scoreTag}>
                            <Text style={styles.scoreTagText}>状态优</Text>
                        </View>
                    </View>
                    <View style={styles.activityHalf}>
                        <ActivityRings
                            steps={8520}
                            calories={320}
                            activeMinutes={45}
                            goals={{ steps: 10000, calories: 500, activeMinutes: 60 }}
                        />
                    </View>
                </View>

                {/* 睡眠与环境 */}
                <View style={styles.sectionRow}>
                    <View style={{ flex: 1.2 }}>
                        <SleepCard duration="8h 30m" deepSleep="3h 15m" quality="良好" score={88} />
                    </View>
                    <View style={styles.envCard}>
                        <Text style={styles.envTitle}>所处环境</Text>
                        <View style={styles.envItem}>
                            <Icon name="thermometer" size={16} color="#F97316" />
                            <Text style={styles.envValue}>24.5°C</Text>
                        </View>
                        <View style={styles.envItem}>
                            <Icon name="water" size={16} color="#3B82F6" />
                            <Text style={styles.envValue}>52%</Text>
                        </View>
                        <View style={styles.envStatus}>
                            <Text style={styles.envStatusText}>体感舒适</Text>
                        </View>
                    </View>
                </View>

                {/* 心率曲线 (点击下钻) */}
                <Pressable
                    onPress={() => router.push("/health/details/heart-rate")}
                    style={styles.section}
                >
                    <HeartRateChart points={ecgPoints} heartRate={vitals.heartRate} />
                </Pressable>

                {/* 体征仪表盘 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>实时体征</Text>
                    <View style={styles.gaugeRow}>
                        <VitalGauge type="temperature" value={vitals.temperature} unit="°C" />
                        <VitalGauge type="respiratory" value={vitals.respiratoryRate} unit="次/分" />
                        <VitalGauge type="activity" value={vitals.activityLevel} unit="%" />
                    </View>
                </View>

                {/* 快捷入口 (专业垂直领域) */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>守护工具箱</Text>
                    <View style={styles.quickLinks}>
                        {[
                            { icon: "analytics", label: "健康深度报告", route: "/health/reports", color: colors.accent },
                            { icon: "location", label: "实时安全定位", route: "/health/map-realtime", color: colors.secondary },
                            { icon: "notifications", label: "异常告警中心", route: "/health/alerts", color: colors.error },
                            { icon: "happy", label: "情绪与行为日志", route: "/health/emotions", color: colors.warning },
                        ].map((item) => (
                            <Pressable
                                key={item.route}
                                onPress={() => router.push(item.route as any)}
                                style={({ pressed }) => [styles.quickLink, pressed && styles.btnPressed]}
                            >
                                <View style={[styles.quickLinkIcon, { backgroundColor: `${item.color}15` }]}>
                                    <Icon name={item.icon as any} size={22} color={item.color} />
                                </View>
                                <View style={styles.quickLinkContent}>
                                    <Text style={styles.quickLinkLabel}>{item.label}</Text>
                                    <Text style={styles.quickLinkSub}>{item.route === '/health/reports' ? 'HRV与对比分析' : item.route === '/health/map-realtime' ? '轨迹回放与围栏' : item.route === '/health/alerts' ? '异常记录追踪' : '情绪日历与AI宠语'}</Text>
                                </View>
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
        marginTop: spacing.sm,
    },
    dashboardRow: {
        flexDirection: 'row',
        paddingHorizontal: spacing.lg,
        gap: 12,
        marginBottom: 12,
    },
    scoreCardHalf: {
        flex: 0.8,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        justifyContent: 'center',
    },
    activityHalf: {
        flex: 1.2,
    },
    scoreHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 8,
    },
    scoreIconSmall: {
        width: 24,
        height: 24,
        backgroundColor: `${colors.secondary}15`,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scoreLabelSmall: {
        fontSize: 12,
        color: '#64748B',
    },
    scoreValueBig: {
        fontSize: 42,
        fontWeight: 'bold',
        color: colors.secondary,
    },
    scoreTag: {
        backgroundColor: `${colors.secondary}15`,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
        alignSelf: 'flex-start',
        marginTop: 4,
    },
    scoreTagText: {
        fontSize: 11,
        color: colors.secondary,
        fontWeight: '600',
    },
    sectionRow: {
        flexDirection: 'row',
        paddingHorizontal: spacing.lg,
        gap: 12,
        marginBottom: 20,
    },
    envCard: {
        flex: 0.8,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    envTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1E293B',
        marginBottom: 12,
    },
    envItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 8,
    },
    envValue: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1E293B',
    },
    envStatus: {
        marginTop: 'auto',
        backgroundColor: '#F0F9FF',
        paddingVertical: 4,
        borderRadius: 6,
        alignItems: 'center',
    },
    envStatusText: {
        fontSize: 11,
        color: '#0369A1',
        fontWeight: '600',
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
    quickLinkContent: {
        flex: 1,
        marginLeft: spacing.md,
    },
    quickLinkLabel: {
        color: colors.foreground,
        fontSize: 15,
        fontWeight: "600",
    },
    quickLinkSub: {
        color: colors.muted,
        fontSize: 11,
        marginTop: 2,
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

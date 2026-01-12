import React, { useMemo } from "react";
import { View, Text, FlatList, Pressable, StyleSheet, Linking, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import Icon from "@/components/Icon";
import { useAlerts } from "@/hooks/useVitals";
import type { HealthAlert, AlertLevel } from "@/types";
import { Theme } from "@/constants/theme";

const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.getMonth() + 1}月${date.getDate()}日`;
};

/**
 * 智能告警中心 - 守护级异常时间线
 */
export default function AlertsScreen() {
    const { alerts, isLoading } = useAlerts("pet-001");
    const router = useRouter();

    const handleCallVet = () => {
        Linking.openURL("tel:400-888-8888");
    };

    const groupedAlerts = useMemo(() => {
        const groups: { [key: string]: HealthAlert[] } = {};
        alerts.forEach(alert => {
            const dateStr = formatDate(alert.timestamp);
            if (!groups[dateStr]) groups[dateStr] = [];
            groups[dateStr].push(alert);
        });
        return Object.keys(groups).map(date => ({ date, data: groups[date] }));
    }, [alerts]);

    const renderAlertItem = (alert: HealthAlert, index: number, isLast: boolean) => {
        const isCritical = alert.level === 'critical';
        const isWarning = alert.level === 'warning';

        return (
            <View key={alert.id} style={styles.timelineItem}>
                <View style={styles.timelineLeft}>
                    <Text style={styles.timeText}>{formatTime(alert.timestamp)}</Text>
                    <View style={[styles.timelineLine, isLast && { height: 0 }]} />
                    <View style={[
                        styles.timelineDot,
                        isCritical && styles.dotCritical,
                        isWarning && styles.dotWarning
                    ]} />
                </View>

                <Pressable
                    onPress={() => {/* TODO: 进入异常详情分析 */ }}
                    style={({ pressed }) => [
                        styles.alertCard,
                        pressed && styles.cardPressed,
                        isCritical && styles.cardCritical
                    ]}
                >
                    <View style={styles.cardHeader}>
                        <View style={styles.titleRow}>
                            <Icon
                                name={isCritical ? "alert-circle" : isWarning ? "warning" : "information-circle"}
                                size={18}
                                color={isCritical ? Theme.colors.error : isWarning ? "#F59E0B" : Theme.colors.primary}
                            />
                            <Text style={[styles.alertTitle, isCritical && { color: Theme.colors.error }]}>
                                {alert.title}
                            </Text>
                        </View>
                        {isCritical && <View style={styles.criticalBadge}><Text style={styles.criticalBadgeText}>紧急</Text></View>}
                    </View>
                    <Text style={styles.alertMessage}>{alert.message}</Text>

                    <View style={styles.cardFooter}>
                        <View style={styles.tag}>
                            <Text style={styles.tagText}>{alert.vitalType === 'heartRate' ? '心率异常' : '环境预警'}</Text>
                        </View>
                        <Pressable style={styles.actionBtn}>
                            <Text style={styles.actionBtnText}>查看详情</Text>
                            <Icon name="chevron-forward" size={14} color={Theme.colors.muted} />
                        </Pressable>
                    </View>
                </Pressable>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.topStats}>
                <View style={styles.statItem}>
                    <Text style={styles.statVal}>{alerts.length}</Text>
                    <Text style={styles.statLab}>总记录</Text>
                </View>
                <View style={styles.dividerV} />
                <View style={styles.statItem}>
                    <Text style={[styles.statVal, { color: Theme.colors.error }]}>
                        {alerts.filter(a => a.level === 'critical').length}
                    </Text>
                    <Text style={styles.statLab}>紧急预警</Text>
                </View>
                <View style={styles.dividerV} />
                <Pressable onPress={handleCallVet} style={styles.contactBtn}>
                    <Icon name="call" size={18} color={Theme.colors.white} />
                    <Text style={styles.contactBtnText}>咨询客服</Text>
                </Pressable>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {groupedAlerts.map((group) => (
                    <View key={group.date} style={styles.dateGroup}>
                        <View style={styles.dateHeader}>
                            <View style={styles.dateDot} />
                            <Text style={styles.dateTitle}>{group.date === formatDate(Date.now()) ? '今天' : group.date}</Text>
                        </View>
                        {group.data.map((item, index) =>
                            renderAlertItem(item, index, index === group.data.length - 1)
                        )}
                    </View>
                ))}

                {alerts.length === 0 && (
                    <View style={styles.emptyContainer}>
                        <Icon name="shield-checkmark" size={64} color="#E2E8F0" />
                        <Text style={styles.emptyText}>一切正常，守护进行中</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    topStats: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statVal: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1E293B',
    },
    statLab: {
        fontSize: 11,
        color: '#64748B',
        marginTop: 2,
    },
    dividerV: {
        width: 1,
        height: 24,
        backgroundColor: '#F1F5F9',
    },
    contactBtn: {
        flex: 1.5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Theme.colors.primary,
        paddingVertical: 8,
        borderRadius: 20,
        gap: 6,
        marginLeft: 12,
    },
    contactBtnText: {
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: 'bold',
    },
    scrollContent: {
        padding: 16,
    },
    dateGroup: {
        marginBottom: 24,
    },
    dateHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
    },
    dateDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#CBD5E1',
    },
    dateTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#475569',
    },
    timelineItem: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 16,
    },
    timelineLeft: {
        width: 44,
        alignItems: 'center',
        paddingTop: 4,
    },
    timeText: {
        fontSize: 12,
        color: '#64748B',
        fontWeight: '600',
    },
    timelineDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Theme.colors.primary,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        position: 'absolute',
        left: 31,
        top: 8,
        zIndex: 2,
    },
    dotCritical: {
        backgroundColor: Theme.colors.error,
    },
    dotWarning: {
        backgroundColor: '#F59E0B',
    },
    timelineLine: {
        width: 2,
        flex: 1,
        backgroundColor: '#E2E8F0',
        position: 'absolute',
        top: 20,
        left: 35,
    },
    alertCard: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        ...Theme.shadows.card,
    },
    cardPressed: {
        transform: [{ scale: 0.98 }],
        opacity: 0.9,
    },
    cardCritical: {
        borderColor: 'rgba(239, 68, 68, 0.2)',
        backgroundColor: '#FFF1F2',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    alertTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#1E293B',
    },
    criticalBadge: {
        backgroundColor: Theme.colors.error,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    criticalBadgeText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: 'bold',
    },
    alertMessage: {
        fontSize: 13,
        color: '#64748B',
        lineHeight: 18,
        marginBottom: 12,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
        paddingTop: 12,
    },
    tag: {
        backgroundColor: '#F1F5F9',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    tagText: {
        fontSize: 11,
        color: '#475569',
    },
    actionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    actionBtnText: {
        fontSize: 12,
        color: Theme.colors.muted,
    },
    emptyContainer: {
        alignItems: 'center',
        paddingVertical: 80,
    },
    emptyText: {
        marginTop: 16,
        fontSize: 14,
        color: '#94A3B8',
    },
});

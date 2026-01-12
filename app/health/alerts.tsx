import React from "react";
import { View, Text, FlatList, Pressable, StyleSheet, Linking } from "react-native";
import Icon from "@/components/Icon";
import { useAlerts } from "@/hooks/useVitals";
import type { HealthAlert, AlertLevel } from "@/types";

const colors = {
    primary: "#3B82F6",
    info: "#3B82F6",
    warning: "#F97316",
    critical: "#EF4444",
    background: "#F8FAFC",
    foreground: "#1E293B",
    muted: "#64748B",
    border: "#E2E8F0",
    white: "#FFFFFF",
};

const getAlertConfig = (level: AlertLevel) => {
    switch (level) {
        case "critical":
            return { bg: "#FEE2E2", color: colors.critical, icon: "alert-circle" };
        case "warning":
            return { bg: "#FFF7ED", color: colors.warning, icon: "warning" };
        default:
            return { bg: "#EFF6FF", color: colors.info, icon: "information-circle" };
    }
};

const formatTime = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    if (diff < 3600000) return `${Math.round(diff / 60000)} 分钟前`;
    if (diff < 86400000) return `${Math.round(diff / 3600000)} 小时前`;
    return `${Math.round(diff / 86400000)} 天前`;
};

/**
 * 预警历史页 (Task 3.3)
 */
export default function AlertsScreen() {
    const { alerts, isLoading } = useAlerts("pet-001");

    const handleCallVet = () => {
        Linking.openURL("tel:400-888-8888");
    };

    const renderAlert = ({ item }: { item: HealthAlert }) => {
        const config = getAlertConfig(item.level);
        return (
            <View style={[styles.alertCard, { borderLeftColor: config.color }]}>
                <View style={[styles.alertIcon, { backgroundColor: config.bg }]}>
                    <Icon name={config.icon as any} size={20} color={config.color} />
                </View>
                <View style={styles.alertContent}>
                    <Text style={styles.alertTitle}>{item.title}</Text>
                    <Text style={styles.alertMessage}>{item.message}</Text>
                    <Text style={styles.alertTime}>{formatTime(item.timestamp)}</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* 紧急联系 */}
            <Pressable onPress={handleCallVet} style={styles.emergencyBtn}>
                <Icon name="call" size={20} color={colors.white} />
                <Text style={styles.emergencyBtnText}>紧急联系兽医</Text>
            </Pressable>

            {/* 预警列表 */}
            <FlatList
                data={alerts}
                keyExtractor={(item) => item.id}
                renderItem={renderAlert}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Icon name="checkmark-circle" size={48} color={colors.muted} />
                        <Text style={styles.emptyText}>暂无预警记录</Text>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    emergencyBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.critical,
        margin: 16,
        paddingVertical: 14,
        borderRadius: 12,
        gap: 8,
    },
    emergencyBtnText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "600",
    },
    list: {
        padding: 16,
        paddingTop: 0,
    },
    alertCard: {
        flexDirection: "row",
        backgroundColor: colors.white,
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        borderLeftWidth: 4,
    },
    alertIcon: {
        width: 40,
        height: 40,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    alertContent: {
        flex: 1,
        marginLeft: 12,
    },
    alertTitle: {
        color: colors.foreground,
        fontSize: 16,
        fontWeight: "600",
    },
    alertMessage: {
        color: colors.muted,
        fontSize: 14,
        marginTop: 4,
    },
    alertTime: {
        color: colors.muted,
        fontSize: 12,
        marginTop: 6,
    },
    empty: {
        alignItems: "center",
        paddingVertical: 60,
    },
    emptyText: {
        color: colors.muted,
        fontSize: 16,
        marginTop: 12,
    },
});

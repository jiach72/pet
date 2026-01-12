import React from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import Icon from "@/components/Icon";
import type { VaccineRecord } from "@/types";

const colors = {
    primary: "#3B82F6",
    background: "#F8FAFC",
    foreground: "#1E293B",
    muted: "#64748B",
    border: "#E2E8F0",
    white: "#FFFFFF",
    green: "#10B981",
    orange: "#F97316",
};

// Mock 疫苗记录
const mockVaccines: VaccineRecord[] = [
    {
        id: "1",
        petId: "pet-001",
        name: "犬五联疫苗",
        date: "2025-12-15",
        nextDate: "2026-12-15",
        hospital: "宠爱动物医院",
        batchNo: "VAC2025121501",
    },
    {
        id: "2",
        petId: "pet-001",
        name: "狂犬疫苗",
        date: "2025-12-15",
        nextDate: "2026-12-15",
        hospital: "宠爱动物医院",
        batchNo: "RAB2025121502",
    },
    {
        id: "3",
        petId: "pet-001",
        name: "犬五联疫苗",
        date: "2024-12-10",
        hospital: "萌宠诊所",
    },
];

const getDaysUntilNext = (nextDate?: string) => {
    if (!nextDate) return null;
    const diff = new Date(nextDate).getTime() - Date.now();
    return Math.round(diff / 86400000);
};

/**
 * 疫苗记录页 (Task 4.4)
 */
export default function VaccinesScreen() {
    const renderVaccine = ({ item }: { item: VaccineRecord }) => {
        const daysUntil = getDaysUntilNext(item.nextDate);
        const isUpcoming = daysUntil !== null && daysUntil <= 30;

        return (
            <View style={styles.vaccineCard}>
                <View style={styles.vaccineIcon}>
                    <Ionicons name="shield-checkmark" size={24} color={colors.green} />
                </View>
                <View style={styles.vaccineContent}>
                    <Text style={styles.vaccineName}>{item.name}</Text>
                    <Text style={styles.vaccineDate}>接种日期：{item.date}</Text>
                    <Text style={styles.vaccineHospital}>{item.hospital}</Text>
                    {item.batchNo && (
                        <Text style={styles.batchNo}>批号：{item.batchNo}</Text>
                    )}
                </View>
                {item.nextDate && (
                    <View style={[styles.nextBadge, isUpcoming && styles.nextBadgeWarning]}>
                        <Text style={[styles.nextText, isUpcoming && styles.nextTextWarning]}>
                            {daysUntil! > 0 ? `${daysUntil}天后` : "已到期"}
                        </Text>
                    </View>
                )}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* 添加按钮 */}
            <Pressable style={styles.addBtn}>
                <Ionicons name="add-circle" size={24} color={colors.white} />
                <Text style={styles.addBtnText}>添加疫苗记录</Text>
            </Pressable>

            {/* 提醒卡 */}
            <View style={styles.reminderCard}>
                <Ionicons name="notifications" size={20} color={colors.orange} />
                <Text style={styles.reminderText}>
                    狂犬疫苗将于 2026-12-15 到期，请提前预约接种
                </Text>
            </View>

            <FlatList
                data={mockVaccines}
                keyExtractor={(item) => item.id}
                renderItem={renderVaccine}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    addBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.green,
        margin: 16,
        paddingVertical: 14,
        borderRadius: 12,
        gap: 8,
    },
    addBtnText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "600",
    },
    reminderCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF7ED",
        marginHorizontal: 16,
        padding: 12,
        borderRadius: 12,
        gap: 10,
    },
    reminderText: {
        flex: 1,
        color: colors.foreground,
        fontSize: 14,
    },
    list: {
        padding: 16,
    },
    vaccineCard: {
        flexDirection: "row",
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
    },
    vaccineIcon: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: "#DCFCE7",
        alignItems: "center",
        justifyContent: "center",
    },
    vaccineContent: {
        flex: 1,
        marginLeft: 12,
    },
    vaccineName: {
        color: colors.foreground,
        fontSize: 16,
        fontWeight: "600",
    },
    vaccineDate: {
        color: colors.muted,
        fontSize: 14,
        marginTop: 4,
    },
    vaccineHospital: {
        color: colors.muted,
        fontSize: 13,
        marginTop: 2,
    },
    batchNo: {
        color: colors.muted,
        fontSize: 12,
        marginTop: 4,
    },
    nextBadge: {
        alignSelf: "flex-start",
        backgroundColor: "#EFF6FF",
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 12,
    },
    nextBadgeWarning: {
        backgroundColor: "#FFF7ED",
    },
    nextText: {
        color: colors.primary,
        fontSize: 12,
        fontWeight: "500",
    },
    nextTextWarning: {
        color: colors.orange,
    },
});

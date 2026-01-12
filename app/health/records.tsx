import React from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import Icon from "@/components/Icon";
import type { MedicalRecord } from "@/types";

const colors = {
    primary: "#3B82F6",
    background: "#F8FAFC",
    foreground: "#1E293B",
    muted: "#64748B",
    border: "#E2E8F0",
    white: "#FFFFFF",
    green: "#10B981",
    orange: "#F97316",
    red: "#EF4444",
};

// Mock 就医记录
const mockRecords: MedicalRecord[] = [
    {
        id: "1",
        petId: "pet-001",
        date: "2026-01-08",
        type: "checkup",
        hospital: "宠爱动物医院",
        doctor: "张医生",
        diagnosis: "常规体检，各项指标正常",
        cost: 280,
    },
    {
        id: "2",
        petId: "pet-001",
        date: "2025-12-15",
        type: "treatment",
        hospital: "宠爱动物医院",
        diagnosis: "轻微肠胃不适",
        treatment: "口服益生菌，调整饮食",
        cost: 350,
    },
    {
        id: "3",
        petId: "pet-001",
        date: "2025-10-20",
        type: "checkup",
        hospital: "萌宠诊所",
        diagnosis: "年度体检，健康状况良好",
        cost: 450,
    },
];

const typeConfig = {
    checkup: { icon: "medical", color: colors.primary, label: "体检" },
    treatment: { icon: "bandage", color: colors.orange, label: "治疗" },
    surgery: { icon: "cut", color: colors.red, label: "手术" },
    emergency: { icon: "alert-circle", color: colors.red, label: "急诊" },
};

/**
 * 就医记录页 (Task 4.3)
 */
export default function RecordsScreen() {
    const renderRecord = ({ item }: { item: MedicalRecord }) => {
        const config = typeConfig[item.type];
        return (
            <View style={styles.recordCard}>
                <View style={[styles.typeIcon, { backgroundColor: `${config.color}15` }]}>
                    <Icon name={config.icon as any} size={20} color={config.color} />
                </View>
                <View style={styles.recordContent}>
                    <View style={styles.recordHeader}>
                        <Text style={styles.recordDate}>{item.date}</Text>
                        <View style={[styles.typeBadge, { backgroundColor: `${config.color}15` }]}>
                            <Text style={[styles.typeBadgeText, { color: config.color }]}>
                                {config.label}
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.hospital}>{item.hospital}</Text>
                    <Text style={styles.diagnosis}>{item.diagnosis}</Text>
                    {item.treatment && (
                        <Text style={styles.treatment}>治疗：{item.treatment}</Text>
                    )}
                    {item.cost && (
                        <Text style={styles.cost}>费用：¥{item.cost}</Text>
                    )}
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* 添加按钮 */}
            <Pressable style={styles.addBtn}>
                <Icon name="add-circle" size={24} color={colors.white} />
                <Text style={styles.addBtnText}>添加就医记录</Text>
            </Pressable>

            <FlatList
                data={mockRecords}
                keyExtractor={(item) => item.id}
                renderItem={renderRecord}
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
        backgroundColor: colors.primary,
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
    list: {
        padding: 16,
        paddingTop: 0,
    },
    recordCard: {
        flexDirection: "row",
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
    },
    typeIcon: {
        width: 44,
        height: 44,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    recordContent: {
        flex: 1,
        marginLeft: 12,
    },
    recordHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    recordDate: {
        color: colors.foreground,
        fontSize: 16,
        fontWeight: "600",
    },
    typeBadge: {
        paddingVertical: 2,
        paddingHorizontal: 10,
        borderRadius: 12,
    },
    typeBadgeText: {
        fontSize: 12,
        fontWeight: "500",
    },
    hospital: {
        color: colors.muted,
        fontSize: 14,
        marginTop: 4,
    },
    diagnosis: {
        color: colors.foreground,
        fontSize: 14,
        marginTop: 8,
    },
    treatment: {
        color: colors.muted,
        fontSize: 13,
        marginTop: 4,
    },
    cost: {
        color: colors.primary,
        fontSize: 14,
        fontWeight: "500",
        marginTop: 8,
    },
});

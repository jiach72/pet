import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import type { GreenShieldInfo } from "@/types";

const colors = {
    green: "#16A34A",
    greenLight: "#DCFCE7",
    greenDark: "#166534",
    orange: "#F97316",
    orangeLight: "#FFF7ED",
    muted: "#64748B",
    border: "#E2E8F0",
    white: "#FFFFFF",
};

interface GreenShieldBadgeProps {
    info: GreenShieldInfo | null;
    compact?: boolean;
}

/**
 * 绿盾认证徽章组件
 */
export function GreenShieldBadge({ info, compact = false }: GreenShieldBadgeProps) {
    const router = useRouter();

    const handlePress = () => {
        router.push("/social/vaccine-upload");
    };

    // 未认证状态
    if (!info || info.status === "none") {
        return (
            <Pressable
                onPress={handlePress}
                style={({ pressed }) => [
                    styles.container,
                    styles.unverified,
                    pressed && styles.pressed,
                ]}
            >
                <View style={[styles.icon, styles.iconUnverified]}>
                    <Ionicons name="shield-outline" size={24} color={colors.muted} />
                </View>
                <View style={styles.info}>
                    <Text style={styles.titleUnverified}>未认证</Text>
                    <Text style={styles.subtitle}>上传疫苗本获取绿盾认证</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.muted} />
            </Pressable>
        );
    }

    // 待审核状态
    if (info.status === "pending") {
        return (
            <View style={[styles.container, styles.pending]}>
                <View style={[styles.icon, styles.iconPending]}>
                    <Ionicons name="time" size={24} color={colors.orange} />
                </View>
                <View style={styles.info}>
                    <Text style={styles.titlePending}>审核中</Text>
                    <Text style={styles.subtitle}>预计 1-2 个工作日完成审核</Text>
                </View>
            </View>
        );
    }

    // 已认证状态
    if (info.status === "approved") {
        if (compact) {
            return (
                <View style={styles.compactBadge}>
                    <Ionicons name="shield-checkmark" size={14} color={colors.green} />
                    <Text style={styles.compactText}>绿盾</Text>
                </View>
            );
        }

        return (
            <Pressable
                onPress={handlePress}
                style={({ pressed }) => [
                    styles.container,
                    styles.verified,
                    pressed && styles.pressed,
                ]}
            >
                <View style={[styles.icon, styles.iconVerified]}>
                    <Ionicons name="shield-checkmark" size={24} color={colors.white} />
                </View>
                <View style={styles.info}>
                    <Text style={styles.titleVerified}>绿盾认证通过</Text>
                    <Text style={styles.subtitleVerified}>
                        {info.vaccineType || "疫苗接种完成"}，放心社交
                    </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.green} />
            </Pressable>
        );
    }

    // 认证被拒绝
    return (
        <Pressable
            onPress={handlePress}
            style={({ pressed }) => [
                styles.container,
                styles.rejected,
                pressed && styles.pressed,
            ]}
        >
            <View style={[styles.icon, styles.iconRejected]}>
                <Ionicons name="close-circle" size={24} color="#EF4444" />
            </View>
            <View style={styles.info}>
                <Text style={styles.titleRejected}>认证未通过</Text>
                <Text style={styles.subtitle}>请重新上传清晰的疫苗本照片</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#EF4444" />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
    },
    pressed: {
        opacity: 0.9,
    },
    verified: {
        backgroundColor: colors.greenLight,
        borderColor: "#BBF7D0",
    },
    unverified: {
        backgroundColor: colors.white,
        borderColor: colors.border,
    },
    pending: {
        backgroundColor: colors.orangeLight,
        borderColor: "#FED7AA",
    },
    rejected: {
        backgroundColor: "#FEF2F2",
        borderColor: "#FECACA",
    },
    icon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: "center",
        justifyContent: "center",
    },
    iconVerified: {
        backgroundColor: colors.green,
    },
    iconUnverified: {
        backgroundColor: "#F1F5F9",
    },
    iconPending: {
        backgroundColor: "#FFF7ED",
    },
    iconRejected: {
        backgroundColor: "#FEF2F2",
    },
    info: {
        flex: 1,
        marginLeft: 12,
    },
    titleVerified: {
        color: colors.greenDark,
        fontWeight: "bold",
        fontSize: 16,
    },
    titleUnverified: {
        color: colors.muted,
        fontWeight: "bold",
        fontSize: 16,
    },
    titlePending: {
        color: colors.orange,
        fontWeight: "bold",
        fontSize: 16,
    },
    titleRejected: {
        color: "#DC2626",
        fontWeight: "bold",
        fontSize: 16,
    },
    subtitle: {
        color: colors.muted,
        fontSize: 14,
    },
    subtitleVerified: {
        color: colors.green,
        fontSize: 14,
    },
    compactBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.greenLight,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 20,
    },
    compactText: {
        color: colors.green,
        fontSize: 12,
        marginLeft: 4,
        fontWeight: "500",
    },
});

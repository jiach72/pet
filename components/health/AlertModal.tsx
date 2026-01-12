import React from "react";
import { View, Text, Pressable, StyleSheet, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Linking } from "react-native";
import { colors, borderRadius, shadows, spacing } from "@/constants/theme";

interface AlertModalProps {
    visible: boolean;
    title: string;
    message: string;
    onClose: () => void;
}

/**
 * 紧急预警弹窗 (Soft UI 风格)
 * - 大圆角
 * - Soft shadow
 * - 动画反馈
 */
export function AlertModal({ visible, title, message, onClose }: AlertModalProps) {
    const handleCallVet = () => {
        Linking.openURL("tel:400-888-8888");
    };

    return (
        <Modal visible={visible} animationType="fade" transparent>
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    {/* 警告图标 - 动画脉冲效果 */}
                    <View style={styles.iconContainer}>
                        <View style={styles.iconPulse} />
                        <View style={styles.iconBg}>
                            <Ionicons name="alert-circle" size={40} color={colors.error} />
                        </View>
                    </View>

                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>

                    {/* 操作按钮 */}
                    <View style={styles.actions}>
                        <Pressable
                            onPress={handleCallVet}
                            style={({ pressed }) => [
                                styles.btn,
                                styles.btnPrimary,
                                pressed && styles.btnPressed,
                            ]}
                        >
                            <Ionicons name="call" size={20} color={colors.white} />
                            <Text style={styles.btnPrimaryText}>联系兽医</Text>
                        </Pressable>
                        <Pressable
                            onPress={onClose}
                            style={({ pressed }) => [
                                styles.btn,
                                styles.btnSecondary,
                                pressed && styles.btnPressed,
                            ]}
                        >
                            <Text style={styles.btnSecondaryText}>我知道了</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        alignItems: "center",
        justifyContent: "center",
        padding: spacing.xxl,
    },
    modal: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.xxl,
        padding: spacing.xxl,
        width: "100%",
        maxWidth: 340,
        alignItems: "center",
        ...shadows.floating,
    },
    iconContainer: {
        position: "relative",
        width: 88,
        height: 88,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: spacing.lg,
    },
    iconPulse: {
        position: "absolute",
        width: 88,
        height: 88,
        borderRadius: 44,
        backgroundColor: `${colors.error}20`,
    },
    iconBg: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: `${colors.error}15`,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        color: colors.error,
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: spacing.sm,
    },
    message: {
        color: colors.foreground,
        fontSize: 16,
        textAlign: "center",
        lineHeight: 24,
        marginBottom: spacing.xxl,
    },
    actions: {
        width: "100%",
        gap: spacing.md,
    },
    btn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: spacing.md + 2,
        borderRadius: borderRadius.lg,
        gap: spacing.sm,
    },
    btnPrimary: {
        backgroundColor: colors.error,
        ...shadows.button,
    },
    btnSecondary: {
        backgroundColor: colors.backgroundSecondary,
    },
    btnPressed: {
        opacity: 0.9,
        transform: [{ scale: 0.98 }],
    },
    btnPrimaryText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "600",
    },
    btnSecondaryText: {
        color: colors.muted,
        fontSize: 16,
        fontWeight: "500",
    },
});

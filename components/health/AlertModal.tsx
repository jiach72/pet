import React, { useRef, useEffect } from "react";
import { View, Text, Pressable, StyleSheet, Modal, Animated } from "react-native";
import Icon from "@/components/Icon";
import { colors, borderRadius, shadows, spacing } from "@/constants/theme";

interface AlertModalProps {
    visible: boolean;
    title: string;
    message: string;
    onClose: () => void;
}

/**
 * 紧急预警弹窗 - Soft UI 风格 + 脉冲动画
 */
export function AlertModal({ visible, title, message, onClose }: AlertModalProps) {
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (visible) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, {
                        toValue: 1.1,
                        duration: 800,
                        useNativeDriver: true,
                    }),
                    Animated.timing(pulseAnim, {
                        toValue: 1,
                        duration: 800,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        } else {
            pulseAnim.stopAnimation();
            pulseAnim.setValue(1);
        }
    }, [visible]);

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.container}>
                    {/* 脉冲图标 */}
                    <Animated.View
                        style={[styles.iconContainer, { transform: [{ scale: pulseAnim }] }]}
                    >
                        <Icon name="warning" size={40} color={colors.error} />
                    </Animated.View>

                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>

                    {/* 操作按钮 */}
                    <View style={styles.actions}>
                        <Pressable
                            onPress={onClose}
                            style={({ pressed }) => [styles.closeBtn, pressed && styles.btnPressed]}
                        >
                            <Icon name="close" size={18} color={colors.muted} />
                            <Text style={styles.closeBtnText}>稍后处理</Text>
                        </Pressable>
                        <Pressable
                            onPress={onClose}
                            style={({ pressed }) => [styles.actionBtn, pressed && styles.btnPressed]}
                        >
                            <Icon name="call" size={18} color={colors.white} />
                            <Text style={styles.actionBtnText}>联系兽医</Text>
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
        backgroundColor: "rgba(0,0,0,0.5)",
        alignItems: "center",
        justifyContent: "center",
        padding: spacing.xl,
    },
    container: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.xxl,
        padding: spacing.xxl,
        alignItems: "center",
        width: "100%",
        maxWidth: 340,
        ...shadows.floating,
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: `${colors.error}15`,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: spacing.lg,
    },
    title: {
        color: colors.foreground,
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: spacing.sm,
    },
    message: {
        color: colors.muted,
        fontSize: 15,
        textAlign: "center",
        lineHeight: 22,
        marginBottom: spacing.xl,
    },
    actions: {
        flexDirection: "row",
        gap: spacing.md,
        width: "100%",
    },
    closeBtn: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: spacing.md,
        borderRadius: borderRadius.lg,
        borderWidth: 1,
        borderColor: colors.border,
        gap: spacing.xs,
    },
    closeBtnText: {
        color: colors.muted,
        fontSize: 15,
        fontWeight: "600",
    },
    actionBtn: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.error,
        paddingVertical: spacing.md,
        borderRadius: borderRadius.lg,
        gap: spacing.xs,
        ...shadows.button,
    },
    actionBtnText: {
        color: colors.white,
        fontSize: 15,
        fontWeight: "600",
    },
    btnPressed: {
        opacity: 0.9,
        transform: [{ scale: 0.98 }],
    },
});

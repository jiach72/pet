import React from "react";
import { View, Text, Pressable, StyleSheet, Modal } from "react-native";
import Icon from "@/components/Icon";
import type { Challenge } from "@/types";

const colors = {
    primary: "#3B82F6",
    green: "#16A34A",
    red: "#DC2626",
    background: "#F8FAFC",
    foreground: "#1E293B",
    muted: "#64748B",
    white: "#FFFFFF",
};

interface ChallengeResultModalProps {
    visible: boolean;
    challenge: Challenge | null;
    onClose: () => void;
    onShare?: () => void;
}

/**
 * 挑战结果弹窗组件 (Task 4.4)
 */
export function ChallengeResultModal({
    visible,
    challenge,
    onClose,
    onShare,
}: ChallengeResultModalProps) {
    if (!challenge || challenge.status !== "completed") return null;

    const isWinner = challenge.winnerId === "user-001"; // Mock 当前用户
    const winnerName = isWinner
        ? challenge.challengerPetName
        : challenge.opponentPetName;
    const loserName = isWinner
        ? challenge.opponentPetName
        : challenge.challengerPetName;

    return (
        <Modal visible={visible} animationType="fade" transparent>
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    {/* 结果图标 */}
                    <View
                        style={[
                            styles.iconContainer,
                            isWinner ? styles.iconWin : styles.iconLose,
                        ]}
                    >
                        <Text style={styles.iconEmoji}>{isWinner ? "🏆" : "😢"}</Text>
                    </View>

                    {/* 结果标题 */}
                    <Text style={styles.title}>{isWinner ? "恭喜获胜！" : "再接再厉！"}</Text>

                    <Text style={styles.subtitle}>
                        {winnerName} 以 {Math.abs(
                            (challenge.challengerScore || 0) - (challenge.opponentScore || 0)
                        ).toLocaleString()}{" "}
                        步的优势战胜了 {loserName}
                    </Text>

                    {/* 分数对比 */}
                    <View style={styles.scoreContainer}>
                        <View style={styles.scoreItem}>
                            <Text style={styles.scoreName}>
                                {challenge.challengerPetName}
                            </Text>
                            <Text
                                style={[
                                    styles.scoreValue,
                                    challenge.winnerId === challenge.challengerId &&
                                    styles.scoreWinner,
                                ]}
                            >
                                {(challenge.challengerScore || 0).toLocaleString()}
                            </Text>
                        </View>
                        <Text style={styles.vs}>VS</Text>
                        <View style={styles.scoreItem}>
                            <Text style={styles.scoreName}>{challenge.opponentPetName}</Text>
                            <Text
                                style={[
                                    styles.scoreValue,
                                    challenge.winnerId === challenge.opponentId &&
                                    styles.scoreWinner,
                                ]}
                            >
                                {(challenge.opponentScore || 0).toLocaleString()}
                            </Text>
                        </View>
                    </View>

                    {/* 操作按钮 */}
                    <View style={styles.actions}>
                        {onShare && (
                            <Pressable
                                onPress={onShare}
                                style={[styles.btn, styles.btnSecondary]}
                            >
                                <Icon name="share-outline" size={20} color={colors.primary} />
                                <Text style={styles.btnSecondaryText}>分享战绩</Text>
                            </Pressable>
                        )}
                        <Pressable onPress={onClose} style={[styles.btn, styles.btnPrimary]}>
                            <Text style={styles.btnPrimaryText}>关闭</Text>
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
        padding: 24,
    },
    modal: {
        backgroundColor: colors.white,
        borderRadius: 24,
        padding: 24,
        width: "100%",
        maxWidth: 340,
        alignItems: "center",
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
    },
    iconWin: {
        backgroundColor: "#FEF3C7",
    },
    iconLose: {
        backgroundColor: "#FEE2E2",
    },
    iconEmoji: {
        fontSize: 40,
    },
    title: {
        color: colors.foreground,
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
    },
    subtitle: {
        color: colors.muted,
        fontSize: 14,
        textAlign: "center",
        marginBottom: 24,
    },
    scoreContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 24,
    },
    scoreItem: {
        alignItems: "center",
        flex: 1,
    },
    scoreName: {
        color: colors.muted,
        fontSize: 14,
        marginBottom: 4,
    },
    scoreValue: {
        color: colors.foreground,
        fontSize: 20,
        fontWeight: "bold",
    },
    scoreWinner: {
        color: colors.green,
    },
    vs: {
        color: colors.muted,
        fontSize: 16,
        fontWeight: "bold",
        marginHorizontal: 16,
    },
    actions: {
        flexDirection: "row",
        gap: 12,
    },
    btn: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    btnPrimary: {
        backgroundColor: colors.primary,
    },
    btnSecondary: {
        backgroundColor: colors.background,
    },
    btnPrimaryText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "600",
    },
    btnSecondaryText: {
        color: colors.primary,
        fontSize: 16,
        fontWeight: "600",
        marginLeft: 4,
    },
});

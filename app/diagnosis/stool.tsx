import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, StyleSheet, Alert } from "react-native";
import Icon from "@/components/Icon";
import { colors, borderRadius, shadows, spacing } from "@/constants/theme";
import { analyzeStool, bristolTypes } from "@/services/diagnosisService";

type AnalysisState = "idle" | "uploading" | "analyzing" | "done";

/**
 * 粪便分析页面 - 使用 react-icons SVG
 */
export default function StoolAnalysisScreen() {
    const [state, setState] = useState<AnalysisState>("idle");
    const [result, setResult] = useState<{
        type: keyof typeof bristolTypes;
        confidence: number;
    } | null>(null);

    const handleMockAnalyze = async () => {
        setState("uploading");
        setTimeout(() => setState("analyzing"), 500);

        const analysisResult = await analyzeStool("mock-uri");
        if (analysisResult.success && analysisResult.result) {
            setResult(analysisResult.result);
            setState("done");
        } else {
            Alert.alert("分析失败", "请重试");
            setState("idle");
        }
    };

    const handleReset = () => {
        setResult(null);
        setState("idle");
    };

    const currentType = result ? bristolTypes[result.type] : null;

    return (
        <ScrollView style={styles.container}>
            {/* 提示信息 */}
            <View style={styles.tipCard}>
                <Icon name="information-circle" size={20} color={colors.info} />
                <Text style={styles.tipText}>
                    拍摄或上传宠物粪便照片，AI 将根据布里斯托分类法进行分析
                </Text>
            </View>

            {/* 上传区域 */}
            {state === "idle" && !result && (
                <View style={styles.uploadSection}>
                    <Pressable
                        onPress={handleMockAnalyze}
                        style={({ pressed }) => [styles.uploadBtn, pressed && styles.btnPressed]}
                    >
                        <View style={styles.uploadIcon}>
                            <Icon name="camera" size={32} color={colors.primary} />
                        </View>
                        <Text style={styles.uploadLabel}>拍照分析</Text>
                    </Pressable>

                    <Pressable
                        onPress={handleMockAnalyze}
                        style={({ pressed }) => [styles.uploadBtn, pressed && styles.btnPressed]}
                    >
                        <View style={styles.uploadIcon}>
                            <Icon name="images" size={32} color={colors.secondary} />
                        </View>
                        <Text style={styles.uploadLabel}>从相册选择</Text>
                    </Pressable>
                </View>
            )}

            {/* 分析中 */}
            {(state === "uploading" || state === "analyzing") && (
                <View style={styles.loadingSection}>
                    <View style={styles.loadingIcon}>
                        <Icon
                            name={state === "uploading" ? "cloud-upload" : "analytics"}
                            size={48}
                            color={colors.primary}
                        />
                    </View>
                    <Text style={styles.loadingText}>
                        {state === "uploading" ? "正在上传..." : "AI 正在分析..."}
                    </Text>
                    <Text style={styles.loadingHint}>请稍候，这可能需要几秒钟</Text>
                </View>
            )}

            {/* 分析结果 */}
            {state === "done" && result && currentType && (
                <View style={styles.resultSection}>
                    <View style={styles.resultCard}>
                        <View style={styles.resultHeader}>
                            <View
                                style={[styles.typeIndicator, { backgroundColor: currentType.color }]}
                            />
                            <View>
                                <Text style={styles.typeName}>{currentType.name}</Text>
                                <Text style={styles.typeLabel}>{currentType.label}</Text>
                            </View>
                            <View
                                style={[
                                    styles.statusBadge,
                                    {
                                        backgroundColor:
                                            currentType.status === "normal"
                                                ? `${colors.secondary}15`
                                                : `${colors.warning}15`,
                                    },
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.statusText,
                                        {
                                            color:
                                                currentType.status === "normal"
                                                    ? colors.secondary
                                                    : colors.warning,
                                        },
                                    ]}
                                >
                                    {currentType.status === "normal"
                                        ? "正常"
                                        : currentType.status === "constipation"
                                            ? "便秘"
                                            : "腹泻"}
                                </Text>
                            </View>
                        </View>

                        <Text style={styles.description}>{currentType.description}</Text>

                        <View style={styles.adviceSection}>
                            <Icon name="bulb" size={18} color={colors.secondary} />
                            <Text style={styles.adviceText}>{currentType.advice}</Text>
                        </View>

                        <View style={styles.confidenceRow}>
                            <Text style={styles.confidenceLabel}>置信度</Text>
                            <Text style={styles.confidenceValue}>
                                {Math.round(result.confidence * 100)}%
                            </Text>
                        </View>
                    </View>

                    {/* 免责声明 */}
                    <View style={styles.disclaimer}>
                        <Icon name="warning" size={16} color={colors.warning} />
                        <Text style={styles.disclaimerText}>
                            仅供参考，如有健康问题请咨询专业兽医
                        </Text>
                    </View>

                    {/* 重新分析按钮 */}
                    <Pressable
                        onPress={handleReset}
                        style={({ pressed }) => [styles.resetBtn, pressed && styles.btnPressed]}
                    >
                        <Icon name="refresh" size={20} color={colors.primary} />
                        <Text style={styles.resetBtnText}>重新分析</Text>
                    </Pressable>
                </View>
            )}

            <View style={{ height: 32 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    tipCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: `${colors.info}10`,
        margin: spacing.lg,
        padding: spacing.md,
        borderRadius: borderRadius.md,
        gap: spacing.sm,
    },
    tipText: {
        flex: 1,
        color: colors.foreground,
        fontSize: 14,
        lineHeight: 20,
    },
    uploadSection: {
        flexDirection: "row",
        gap: spacing.lg,
        padding: spacing.lg,
    },
    uploadBtn: {
        flex: 1,
        backgroundColor: colors.white,
        borderRadius: borderRadius.xl,
        padding: spacing.xxl,
        alignItems: "center",
        ...shadows.card,
    },
    btnPressed: {
        opacity: 0.9,
        transform: [{ scale: 0.98 }],
    },
    uploadIcon: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: colors.background,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: spacing.md,
    },
    uploadLabel: {
        color: colors.foreground,
        fontSize: 15,
        fontWeight: "600",
    },
    loadingSection: {
        alignItems: "center",
        padding: spacing.xxxl,
    },
    loadingIcon: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: `${colors.primary}10`,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: spacing.lg,
    },
    loadingText: {
        color: colors.foreground,
        fontSize: 18,
        fontWeight: "600",
    },
    loadingHint: {
        color: colors.muted,
        fontSize: 14,
        marginTop: spacing.sm,
    },
    resultSection: {
        padding: spacing.lg,
    },
    resultCard: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.xl,
        padding: spacing.xl,
        ...shadows.card,
    },
    resultHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: spacing.lg,
    },
    typeIndicator: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: spacing.md,
    },
    typeName: {
        color: colors.foreground,
        fontSize: 20,
        fontWeight: "bold",
    },
    typeLabel: {
        color: colors.muted,
        fontSize: 14,
        marginTop: 2,
    },
    statusBadge: {
        marginLeft: "auto",
        paddingVertical: spacing.xs,
        paddingHorizontal: spacing.md,
        borderRadius: borderRadius.full,
    },
    statusText: {
        fontSize: 13,
        fontWeight: "600",
    },
    description: {
        color: colors.foreground,
        fontSize: 15,
        lineHeight: 22,
        marginBottom: spacing.lg,
    },
    adviceSection: {
        flexDirection: "row",
        alignItems: "flex-start",
        backgroundColor: `${colors.secondary}10`,
        padding: spacing.md,
        borderRadius: borderRadius.md,
        gap: spacing.sm,
    },
    adviceText: {
        flex: 1,
        color: colors.foreground,
        fontSize: 14,
        lineHeight: 20,
    },
    confidenceRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: spacing.lg,
        paddingTop: spacing.lg,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
    confidenceLabel: {
        color: colors.muted,
        fontSize: 14,
    },
    confidenceValue: {
        color: colors.foreground,
        fontSize: 14,
        fontWeight: "600",
    },
    disclaimer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: spacing.lg,
        gap: spacing.sm,
    },
    disclaimerText: {
        color: colors.warning,
        fontSize: 13,
    },
    resetBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.white,
        marginTop: spacing.lg,
        paddingVertical: spacing.md,
        borderRadius: borderRadius.lg,
        borderWidth: 1,
        borderColor: colors.primary,
        gap: spacing.sm,
    },
    resetBtnText: {
        color: colors.primary,
        fontSize: 16,
        fontWeight: "600",
    },
});

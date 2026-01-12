import React, { useState, useRef, useEffect } from "react";
import { View, Text, ScrollView, Pressable, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, borderRadius, shadows, spacing } from "@/constants/theme";
import { analyzeVocal, vocalTypes } from "@/services/diagnosisService";

type RecordingState = "idle" | "recording" | "analyzing" | "done";

/**
 * 声音听诊页面 (Task 2.3)
 * F-02: Vocal Health
 */
export default function VocalAnalysisScreen() {
    const [state, setState] = useState<RecordingState>("idle");
    const [duration, setDuration] = useState(0);
    const [result, setResult] = useState<{
        type: keyof typeof vocalTypes;
        confidence: number;
    } | null>(null);

    const pulseAnim = useRef(new Animated.Value(1)).current;
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (state === "recording") {
            // 脉冲动画
            Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, {
                        toValue: 1.15,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(pulseAnim, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                ])
            ).start();

            // 计时器
            timerRef.current = setInterval(() => {
                setDuration((d) => d + 1);
            }, 1000);
        } else {
            pulseAnim.stopAnimation();
            pulseAnim.setValue(1);
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [state]);

    const handleStartRecording = () => {
        setDuration(0);
        setState("recording");
    };

    const handleStopRecording = async () => {
        setState("analyzing");

        // 模拟分析
        const analysisResult = await analyzeVocal("mock-audio-uri");
        if (analysisResult.success && analysisResult.result) {
            setResult(analysisResult.result);
            setState("done");
        }
    };

    const handleReset = () => {
        setResult(null);
        setDuration(0);
        setState("idle");
    };

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const currentType = result ? vocalTypes[result.type] : null;

    return (
        <ScrollView style={styles.container}>
            {/* 提示信息 */}
            <View style={styles.tipCard}>
                <Ionicons name="information-circle" size={20} color={colors.info} />
                <Text style={styles.tipText}>
                    录制宠物的声音（咳嗽、吠叫等），AI 将分析可能的健康问题
                </Text>
            </View>

            {/* 录音区域 */}
            {state !== "done" && (
                <View style={styles.recordSection}>
                    <Animated.View
                        style={[
                            styles.recordOuter,
                            state === "recording" && { transform: [{ scale: pulseAnim }] },
                        ]}
                    >
                        <Pressable
                            onPress={state === "recording" ? handleStopRecording : handleStartRecording}
                            style={[
                                styles.recordBtn,
                                state === "recording" && styles.recordBtnActive,
                            ]}
                        >
                            <Ionicons
                                name={state === "recording" ? "stop" : "mic"}
                                size={48}
                                color={colors.white}
                            />
                        </Pressable>
                    </Animated.View>

                    <Text style={styles.durationText}>
                        {state === "recording" ? formatDuration(duration) : "点击开始录音"}
                    </Text>

                    {state === "recording" && (
                        <Text style={styles.recordingHint}>
                            请让宠物靠近麦克风，录制至少 3 秒
                        </Text>
                    )}

                    {state === "analyzing" && (
                        <View style={styles.analyzingRow}>
                            <Ionicons name="analytics" size={20} color={colors.primary} />
                            <Text style={styles.analyzingText}>AI 正在分析...</Text>
                        </View>
                    )}
                </View>
            )}

            {/* 分析结果 */}
            {state === "done" && result && currentType && (
                <View style={styles.resultSection}>
                    <View style={styles.resultCard}>
                        {/* 结果图标 */}
                        <View
                            style={[
                                styles.resultIcon,
                                { backgroundColor: `${currentType.color}15` },
                            ]}
                        >
                            <Ionicons
                                name={currentType.icon as any}
                                size={40}
                                color={currentType.color}
                            />
                        </View>

                        <Text style={[styles.resultLabel, { color: currentType.color }]}>
                            {currentType.label}
                        </Text>
                        <Text style={styles.resultDesc}>{currentType.description}</Text>

                        {/* 建议 */}
                        <View style={styles.adviceSection}>
                            <Ionicons name="bulb" size={18} color={colors.secondary} />
                            <Text style={styles.adviceText}>{currentType.advice}</Text>
                        </View>

                        {/* 置信度 */}
                        <View style={styles.confidenceRow}>
                            <Text style={styles.confidenceLabel}>置信度</Text>
                            <Text style={styles.confidenceValue}>
                                {Math.round(result.confidence * 100)}%
                            </Text>
                        </View>
                    </View>

                    {/* 免责声明 */}
                    <View style={styles.disclaimer}>
                        <Ionicons name="warning" size={16} color={colors.warning} />
                        <Text style={styles.disclaimerText}>
                            仅供参考，如有健康问题请咨询专业兽医
                        </Text>
                    </View>

                    {/* 重新录音 */}
                    <Pressable
                        onPress={handleReset}
                        style={({ pressed }) => [styles.resetBtn, pressed && styles.btnPressed]}
                    >
                        <Ionicons name="refresh" size={20} color={colors.primary} />
                        <Text style={styles.resetBtnText}>重新录音</Text>
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
    recordSection: {
        alignItems: "center",
        paddingVertical: spacing.xxxl,
    },
    recordOuter: {
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: `${colors.error}15`,
        alignItems: "center",
        justifyContent: "center",
    },
    recordBtn: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: colors.error,
        alignItems: "center",
        justifyContent: "center",
        ...shadows.button,
    },
    recordBtnActive: {
        backgroundColor: colors.error,
    },
    durationText: {
        color: colors.foreground,
        fontSize: 24,
        fontWeight: "bold",
        marginTop: spacing.xl,
    },
    recordingHint: {
        color: colors.muted,
        fontSize: 14,
        marginTop: spacing.sm,
    },
    analyzingRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: spacing.lg,
        gap: spacing.sm,
    },
    analyzingText: {
        color: colors.primary,
        fontSize: 16,
        fontWeight: "600",
    },
    resultSection: {
        padding: spacing.lg,
    },
    resultCard: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.xl,
        padding: spacing.xl,
        alignItems: "center",
        ...shadows.card,
    },
    resultIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: spacing.lg,
    },
    resultLabel: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: spacing.sm,
    },
    resultDesc: {
        color: colors.muted,
        fontSize: 15,
        textAlign: "center",
        marginBottom: spacing.lg,
    },
    adviceSection: {
        flexDirection: "row",
        alignItems: "flex-start",
        backgroundColor: `${colors.secondary}10`,
        padding: spacing.md,
        borderRadius: borderRadius.md,
        gap: spacing.sm,
        width: "100%",
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
        width: "100%",
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
    btnPressed: {
        opacity: 0.9,
        transform: [{ scale: 0.98 }],
    },
    resetBtnText: {
        color: colors.primary,
        fontSize: 16,
        fontWeight: "600",
    },
});

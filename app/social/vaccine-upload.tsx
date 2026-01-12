import React, { useState } from "react";
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    Image,
    Alert,
    ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import Icon from "@/components/Icon";
import {
    recognizeVaccineCertificate,
    submitVaccineVerification,
    type VaccineOcrResult,
} from "@/services/vaccineOcr";

const colors = {
    primary: "#3B82F6",
    green: "#16A34A",
    background: "#F8FAFC",
    foreground: "#1E293B",
    muted: "#64748B",
    border: "#E2E8F0",
    white: "#FFFFFF",
};

/**
 * 疫苗上传页 (Task 3.1, 3.2)
 */
export default function VaccineUploadScreen() {
    const router = useRouter();
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [isRecognizing, setIsRecognizing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [ocrResult, setOcrResult] = useState<VaccineOcrResult | null>(null);

    // 模拟选择图片
    const handleSelectImage = async () => {
        // 在真实环境中使用 expo-image-picker
        // import * as ImagePicker from 'expo-image-picker';
        // const result = await ImagePicker.launchImageLibraryAsync({...});

        // Mock: 模拟选择了一张图片
        setImageUri("mock://vaccine-certificate.jpg");
        setOcrResult(null);

        // 自动开始识别
        handleRecognize();
    };

    // OCR 识别
    const handleRecognize = async () => {
        if (!imageUri) return;

        setIsRecognizing(true);
        try {
            const result = await recognizeVaccineCertificate(imageUri);
            setOcrResult(result);

            if (!result.success) {
                Alert.alert("识别失败", result.error || "请重新拍摄");
            }
        } catch (error) {
            Alert.alert("错误", "识别过程出错，请重试");
        } finally {
            setIsRecognizing(false);
        }
    };

    // 提交认证
    const handleSubmit = async () => {
        if (!ocrResult?.data) return;

        setIsSubmitting(true);
        try {
            const result = await submitVaccineVerification(
                "pet-001",
                imageUri!,
                ocrResult.data
            );

            if (result.success) {
                Alert.alert("提交成功", result.message, [
                    { text: "好的", onPress: () => router.back() },
                ]);
            }
        } catch (error) {
            Alert.alert("错误", "提交失败，请重试");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <View style={styles.container}>
            {/* 上传区域 */}
            <Pressable
                onPress={handleSelectImage}
                style={[styles.uploadArea, imageUri && styles.uploadAreaWithImage]}
            >
                {imageUri ? (
                    <>
                        <View style={styles.imagePlaceholder}>
                            <Icon name="document-text" size={48} color={colors.green} />
                            <Text style={styles.imagePlaceholderText}>疫苗本已选择</Text>
                        </View>
                        {isRecognizing && (
                            <View style={styles.recognizingOverlay}>
                                <ActivityIndicator size="large" color={colors.white} />
                                <Text style={styles.recognizingText}>正在识别...</Text>
                            </View>
                        )}
                    </>
                ) : (
                    <>
                        <Icon name="camera" size={48} color={colors.muted} />
                        <Text style={styles.uploadText}>点击上传疫苗本照片</Text>
                        <Text style={styles.uploadHint}>
                            请确保照片清晰，包含完整的疫苗接种记录
                        </Text>
                    </>
                )}
            </Pressable>

            {/* OCR 识别结果 */}
            {ocrResult?.success && ocrResult.data && (
                <View style={styles.resultCard}>
                    <Text style={styles.resultTitle}>识别结果</Text>

                    <View style={styles.resultRow}>
                        <Text style={styles.resultLabel}>宠物名称</Text>
                        <Text style={styles.resultValue}>{ocrResult.data.petName}</Text>
                    </View>

                    <View style={styles.resultRow}>
                        <Text style={styles.resultLabel}>疫苗类型</Text>
                        <Text style={styles.resultValue}>{ocrResult.data.vaccineType}</Text>
                    </View>

                    <View style={styles.resultRow}>
                        <Text style={styles.resultLabel}>接种机构</Text>
                        <Text style={styles.resultValue}>{ocrResult.data.clinicName}</Text>
                    </View>

                    <View style={styles.resultRow}>
                        <Text style={styles.resultLabel}>接种日期</Text>
                        <Text style={styles.resultValue}>
                            {ocrResult.data.vaccinatedAt}
                        </Text>
                    </View>

                    <View style={[styles.resultRow, styles.resultRowLast]}>
                        <Text style={styles.resultLabel}>有效期至</Text>
                        <Text style={styles.resultValue}>{ocrResult.data.expiresAt}</Text>
                    </View>
                </View>
            )}

            {/* 提交按钮 */}
            <View style={styles.footer}>
                {ocrResult?.success ? (
                    <Pressable
                        onPress={handleSubmit}
                        disabled={isSubmitting}
                        style={({ pressed }) => [
                            styles.submitBtn,
                            pressed && styles.submitBtnPressed,
                            isSubmitting && styles.submitBtnDisabled,
                        ]}
                    >
                        {isSubmitting ? (
                            <ActivityIndicator color={colors.white} />
                        ) : (
                            <>
                                <Icon
                                    name="shield-checkmark"
                                    size={24}
                                    color={colors.white}
                                />
                                <Text style={styles.submitBtnText}>确认提交认证</Text>
                            </>
                        )}
                    </Pressable>
                ) : (
                    <Text style={styles.footerHint}>
                        上传疫苗本照片后，系统将自动识别信息
                    </Text>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 16,
    },
    uploadArea: {
        height: 200,
        backgroundColor: colors.white,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: colors.border,
        borderStyle: "dashed",
        alignItems: "center",
        justifyContent: "center",
    },
    uploadAreaWithImage: {
        borderStyle: "solid",
        borderColor: colors.green,
    },
    uploadText: {
        color: colors.foreground,
        fontSize: 16,
        fontWeight: "500",
        marginTop: 12,
    },
    uploadHint: {
        color: colors.muted,
        fontSize: 14,
        marginTop: 4,
        textAlign: "center",
        paddingHorizontal: 32,
    },
    imagePlaceholder: {
        alignItems: "center",
    },
    imagePlaceholderText: {
        color: colors.green,
        fontSize: 16,
        fontWeight: "500",
        marginTop: 8,
    },
    recognizingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.6)",
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
    },
    recognizingText: {
        color: colors.white,
        marginTop: 12,
        fontSize: 16,
    },
    resultCard: {
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 16,
        marginTop: 16,
        borderWidth: 1,
        borderColor: colors.border,
    },
    resultTitle: {
        color: colors.foreground,
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 12,
    },
    resultRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    resultRowLast: {
        borderBottomWidth: 0,
    },
    resultLabel: {
        color: colors.muted,
        fontSize: 14,
    },
    resultValue: {
        color: colors.foreground,
        fontSize: 14,
        fontWeight: "500",
    },
    footer: {
        marginTop: "auto",
        paddingVertical: 16,
    },
    submitBtn: {
        backgroundColor: colors.green,
        borderRadius: 16,
        paddingVertical: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    submitBtnPressed: {
        opacity: 0.9,
    },
    submitBtnDisabled: {
        opacity: 0.6,
    },
    submitBtnText: {
        color: colors.white,
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 8,
    },
    footerHint: {
        color: colors.muted,
        fontSize: 14,
        textAlign: "center",
    },
});

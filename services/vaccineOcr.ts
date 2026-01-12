/**
 * 疫苗 OCR 识别服务 (Mock)
 */

export interface VaccineOcrResult {
    success: boolean;
    data?: {
        petName: string;
        vaccineType: string;
        clinicName: string;
        vaccinatedAt: string;
        expiresAt: string;
    };
    error?: string;
}

/**
 * 模拟 OCR 识别疫苗本
 */
export async function recognizeVaccineCertificate(
    imageUri: string
): Promise<VaccineOcrResult> {
    // 模拟网络延迟
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock: 90% 概率识别成功
    if (Math.random() > 0.1) {
        return {
            success: true,
            data: {
                petName: "豆豆",
                vaccineType: "犬五联疫苗",
                clinicName: "宠爱动物医院",
                vaccinatedAt: "2025-12-15",
                expiresAt: "2026-12-15",
            },
        };
    }

    return {
        success: false,
        error: "无法识别疫苗本内容，请确保照片清晰完整",
    };
}

/**
 * 提交疫苗认证申请
 */
export async function submitVaccineVerification(
    petId: string,
    imageUri: string,
    ocrData: VaccineOcrResult["data"]
): Promise<{ success: boolean; message: string }> {
    // 模拟提交延迟
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
        success: true,
        message: "已提交审核，预计 1-2 个工作日内完成",
    };
}

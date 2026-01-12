/**
 * AI 诊断服务
 * F-02: 粪便分析 + 声音听诊
 */

// 布里斯托分类
export const bristolTypes = {
    1: {
        name: "Type 1",
        label: "硬块状",
        description: "分离的硬块，像坚果（难以排出）",
        status: "constipation",
        advice: "增加水分摄入，多吃富含纤维的食物",
        color: "#8B4513",
    },
    2: {
        name: "Type 2",
        label: "腊肠状硬块",
        description: "腊肠状但有结块",
        status: "constipation",
        advice: "适当增加饮水量，添加益生菌",
        color: "#A0522D",
    },
    3: {
        name: "Type 3",
        label: "表面有裂纹的腊肠状",
        description: "腊肠状但表面有裂纹",
        status: "normal",
        advice: "状态良好，保持当前饮食习惯",
        color: "#6B4423",
    },
    4: {
        name: "Type 4",
        label: "光滑柔软的腊肠状",
        description: "像香肠或蛇一样光滑柔软",
        status: "normal",
        advice: "非常健康！继续保持",
        color: "#5D4037",
    },
    5: {
        name: "Type 5",
        label: "软块状",
        description: "软块状，边缘清晰（容易排出）",
        status: "normal",
        advice: "状态正常，注意饮食规律",
        color: "#6D4C41",
    },
    6: {
        name: "Type 6",
        label: "糊状",
        description: "蓬松的碎块，边缘不规则，糊状",
        status: "diarrhea",
        advice: "减少油腻食物，观察是否有其他症状",
        color: "#795548",
    },
    7: {
        name: "Type 7",
        label: "水样",
        description: "水样，无固体块（完全液态）",
        status: "diarrhea",
        advice: "建议咨询兽医，注意补水防脱水",
        color: "#8D6E63",
    },
} as const;

// 声音分析结果类型
export const vocalTypes = {
    normal: {
        label: "正常",
        description: "宠物发出的声音在正常范围内",
        advice: "状态良好，无需担心",
        severity: "low",
        icon: "checkmark-circle",
        color: "#10B981",
    },
    coughing: {
        label: "咳嗽",
        description: "检测到可能的咳嗽声",
        advice: "建议观察是否持续，如频繁咳嗽请咨询兽医",
        severity: "medium",
        icon: "alert-circle",
        color: "#F97316",
    },
    wheezing: {
        label: "喘息",
        description: "检测到可能的喘息或呼吸困难声",
        advice: "建议尽快咨询兽医检查呼吸系统",
        severity: "high",
        icon: "warning",
        color: "#EF4444",
    },
    anxiety: {
        label: "焦虑吠叫",
        description: "检测到可能的焦虑或分离焦虑吠叫",
        advice: "建议增加陪伴时间，考虑行为训练",
        severity: "medium",
        icon: "heart-dislike",
        color: "#F97316",
    },
};

// 模拟粪便分析
export async function analyzeStool(imageUri: string): Promise<{
    success: boolean;
    result?: {
        type: keyof typeof bristolTypes;
        confidence: number;
    };
    error?: string;
}> {
    // 模拟处理延迟
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // 随机返回结果（Mock）
    const types = [3, 4, 5] as const; // 模拟常见的正常类型
    const randomType = types[Math.floor(Math.random() * types.length)];

    return {
        success: true,
        result: {
            type: randomType,
            confidence: 0.85 + Math.random() * 0.1,
        },
    };
}

// 模拟声音分析
export async function analyzeVocal(audioUri: string): Promise<{
    success: boolean;
    result?: {
        type: keyof typeof vocalTypes;
        confidence: number;
    };
    error?: string;
}> {
    // 模拟处理延迟
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // 90% 概率返回正常
    const isNormal = Math.random() > 0.1;
    const abnormalTypes = ["coughing", "anxiety"] as const;

    return {
        success: true,
        result: {
            type: isNormal
                ? "normal"
                : abnormalTypes[Math.floor(Math.random() * abnormalTypes.length)],
            confidence: 0.75 + Math.random() * 0.2,
        },
    };
}

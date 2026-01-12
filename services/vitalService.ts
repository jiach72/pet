/**
 * 体征数据服务
 * 模拟硬件数据采集和实时推送
 */

import type { VitalSigns, VitalHistory } from "@/types";

// 生成随机波动
const fluctuate = (base: number, range: number): number => {
    return base + (Math.random() - 0.5) * range * 2;
};

// 生成模拟心率数据点（ECG 风格）
export function generateEcgPoints(heartRate: number, points: number = 100): number[] {
    const result: number[] = [];
    const beatInterval = Math.round(points / (heartRate / 60)); // 每次心跳的间隔点数

    for (let i = 0; i < points; i++) {
        const posInBeat = i % beatInterval;
        const beatProgress = posInBeat / beatInterval;

        let value = 0;
        if (beatProgress < 0.1) {
            // P 波
            value = Math.sin(beatProgress * Math.PI / 0.1) * 0.2;
        } else if (beatProgress >= 0.2 && beatProgress < 0.25) {
            // Q 波（向下）
            value = -0.15;
        } else if (beatProgress >= 0.25 && beatProgress < 0.3) {
            // R 波（尖峰向上）
            value = 1 - Math.abs(beatProgress - 0.275) * 20;
        } else if (beatProgress >= 0.3 && beatProgress < 0.35) {
            // S 波（向下）
            value = -0.2;
        } else if (beatProgress >= 0.4 && beatProgress < 0.55) {
            // T 波
            value = Math.sin((beatProgress - 0.4) * Math.PI / 0.15) * 0.3;
        }

        // 添加轻微噪声
        value += (Math.random() - 0.5) * 0.05;
        result.push(value);
    }

    return result;
}

// 生成当前体征数据
export function generateVitalSigns(): VitalSigns {
    return {
        heartRate: Math.round(fluctuate(85, 10)),
        temperature: parseFloat(fluctuate(38.5, 0.3).toFixed(1)),
        respiratoryRate: Math.round(fluctuate(22, 4)),
        activityLevel: Math.round(fluctuate(65, 15)),
        timestamp: Date.now(),
    };
}

// 生成历史数据（24小时）
export function generateVitalHistory(hours: number = 24): VitalHistory[] {
    const history: VitalHistory[] = [];
    const now = Date.now();
    const interval = 3600000; // 1小时

    for (let i = hours; i >= 0; i--) {
        const timestamp = now - i * interval;
        const hour = new Date(timestamp).getHours();

        // 模拟日夜规律
        const isNight = hour >= 22 || hour <= 6;
        const baseHr = isNight ? 70 : 85;
        const baseActivity = isNight ? 20 : 65;

        history.push({
            timestamp,
            heartRate: Math.round(fluctuate(baseHr, 8)),
            temperature: parseFloat(fluctuate(38.5, 0.2).toFixed(1)),
            respiratoryRate: Math.round(fluctuate(isNight ? 18 : 22, 3)),
            activityLevel: Math.round(fluctuate(baseActivity, 10)),
        });
    }

    return history;
}

// 检查是否需要预警
export function checkAlertCondition(vitals: VitalSigns): {
    level: "none" | "info" | "warning" | "critical";
    message: string;
} {
    if (vitals.heartRate > 140 || vitals.heartRate < 50) {
        return {
            level: "critical",
            message: `心率异常：${vitals.heartRate} bpm，请立即关注！`,
        };
    }

    if (vitals.temperature > 39.5 || vitals.temperature < 37.5) {
        return {
            level: "warning",
            message: `体温偏离正常范围：${vitals.temperature}°C`,
        };
    }

    if (vitals.respiratoryRate > 35 || vitals.respiratoryRate < 12) {
        return {
            level: "warning",
            message: `呼吸频率异常：${vitals.respiratoryRate} 次/分`,
        };
    }

    if (vitals.heartRate > 110 || vitals.heartRate < 60) {
        return {
            level: "info",
            message: `心率波动较大：${vitals.heartRate} bpm`,
        };
    }

    return { level: "none", message: "" };
}

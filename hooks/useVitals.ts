import { useState, useEffect, useCallback, useRef } from "react";
import type { VitalSigns, VitalHistory, HealthAlert } from "@/types";
import {
    generateVitalSigns,
    generateEcgPoints,
    generateVitalHistory,
    checkAlertCondition,
} from "@/services/vitalService";

/**
 * 实时体征数据 Hook
 * 模拟硬件数据推送
 */
export function useVitals(petId: string) {
    const [vitals, setVitals] = useState<VitalSigns>(generateVitalSigns);
    const [ecgPoints, setEcgPoints] = useState<number[]>(() =>
        generateEcgPoints(85)
    );
    const [history, setHistory] = useState<VitalHistory[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [alert, setAlert] = useState<{ level: string; message: string } | null>(
        null
    );
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // 加载历史数据
    const loadHistory = useCallback(async () => {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 300));
        setHistory(generateVitalHistory(24));
        setIsLoading(false);
    }, []);

    // 更新实时数据
    const updateVitals = useCallback(() => {
        const newVitals = generateVitalSigns();
        setVitals(newVitals);
        setEcgPoints(generateEcgPoints(newVitals.heartRate));

        // 检查预警
        const alertResult = checkAlertCondition(newVitals);
        if (alertResult.level !== "none") {
            setAlert(alertResult);
        } else {
            setAlert(null);
        }
    }, []);

    // 启动实时更新
    useEffect(() => {
        loadHistory();

        // 每 2 秒更新一次数据
        intervalRef.current = setInterval(updateVitals, 2000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [loadHistory, updateVitals]);

    // 手动刷新
    const refresh = useCallback(async () => {
        await loadHistory();
        updateVitals();
    }, [loadHistory, updateVitals]);

    return {
        vitals,
        ecgPoints,
        history,
        isLoading,
        alert,
        refresh,
    };
}

/**
 * 预警历史 Hook
 */
export function useAlerts(petId: string) {
    const [alerts, setAlerts] = useState<HealthAlert[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 模拟加载预警历史
        setIsLoading(true);
        setTimeout(() => {
            setAlerts([
                {
                    id: "alert-1",
                    level: "warning",
                    title: "体温偏高",
                    message: "检测到体温 39.8°C，高于正常范围",
                    timestamp: Date.now() - 3600000,
                    isRead: true,
                    petId,
                    vitalType: "temperature",
                },
                {
                    id: "alert-2",
                    level: "info",
                    title: "心率波动",
                    message: "过去 1 小时心率波动较大",
                    timestamp: Date.now() - 7200000,
                    isRead: true,
                    petId,
                    vitalType: "heartRate",
                },
                {
                    id: "alert-3",
                    level: "critical",
                    title: "心率过快",
                    message: "检测到心率 145 bpm，请立即关注",
                    timestamp: Date.now() - 86400000,
                    isRead: true,
                    petId,
                    vitalType: "heartRate",
                },
            ]);
            setIsLoading(false);
        }, 300);
    }, [petId]);

    const markAsRead = useCallback((alertId: string) => {
        setAlerts((prev) =>
            prev.map((a) => (a.id === alertId ? { ...a, isRead: true } : a))
        );
    }, []);

    return {
        alerts,
        unreadCount: alerts.filter((a) => !a.isRead).length,
        isLoading,
        markAsRead,
    };
}

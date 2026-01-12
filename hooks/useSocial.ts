import { useState, useEffect, useCallback } from "react";
import type {
    MoodDiary,
    LeaderboardEntry,
    GreenShieldInfo,
    Challenge,
    LeaderboardType,
} from "@/types";
import {
    mockMoodDiaries,
    mockLeaderboard,
    mockGreenShield,
    mockChallenges,
} from "@/data/mockData";

/**
 * 社交数据 Hook
 * 提供情感日记、排行榜、绿盾认证、挑战赛数据
 */
export function useSocial(petId: string) {
    const [isLoading, setIsLoading] = useState(true);
    const [moodDiaries, setMoodDiaries] = useState<MoodDiary[]>([]);
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [greenShield, setGreenShield] = useState<GreenShieldInfo | null>(null);
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [leaderboardType, setLeaderboardType] =
        useState<LeaderboardType>("weekly");

    // 加载所有数据
    const loadData = useCallback(async () => {
        setIsLoading(true);
        try {
            // Mock 数据加载（模拟 API 延迟）
            await new Promise((resolve) => setTimeout(resolve, 300));

            setMoodDiaries(mockMoodDiaries);
            setLeaderboard(mockLeaderboard);
            setGreenShield(mockGreenShield);
            setChallenges(mockChallenges);
        } catch (error) {
            console.error("Failed to load social data:", error);
        } finally {
            setIsLoading(false);
        }
    }, [petId]);

    // 刷新数据
    const refresh = useCallback(async () => {
        await loadData();
    }, [loadData]);

    // 切换排行榜类型
    const switchLeaderboardType = useCallback((type: LeaderboardType) => {
        setLeaderboardType(type);
        // 实际应用中这里会重新请求对应类型的数据
    }, []);

    // 初始加载
    useEffect(() => {
        loadData();
    }, [loadData]);

    return {
        isLoading,
        moodDiaries,
        todayDiary: moodDiaries[0] || null,
        leaderboard,
        leaderboardType,
        greenShield,
        challenges,
        pendingChallenges: challenges.filter((c) => c.status === "pending"),
        activeChallenges: challenges.filter((c) => c.status === "active"),
        refresh,
        switchLeaderboardType,
    };
}

/**
 * 绿盾认证 Hook
 */
export function useGreenShield(petId: string) {
    const [status, setStatus] = useState<GreenShieldInfo | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // 加载认证状态
        setStatus(mockGreenShield);
    }, [petId]);

    const submitVerification = useCallback(async (imageUri: string) => {
        setIsSubmitting(true);
        try {
            // Mock：模拟提交
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setStatus((prev) =>
                prev ? { ...prev, status: "pending" } : null
            );
            return { success: true, message: "已提交审核" };
        } catch (error) {
            return { success: false, message: "提交失败，请重试" };
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    return {
        status,
        isVerified: status?.status === "approved",
        isPending: status?.status === "pending",
        isSubmitting,
        submitVerification,
    };
}

/**
 * API 基础服务
 * Mock 实现，后续替换为真实 API
 */

const API_BASE_URL = "https://api.petpulse.mock";

/**
 * 模拟网络延迟
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 通用 API 请求封装
 */
export async function apiRequest<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {
    // Mock 模式：模拟延迟
    await delay(300 + Math.random() * 200);

    // 在真实环境中，这里会发起实际请求
    // const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    //   headers: { "Content-Type": "application/json" },
    //   ...options,
    // });
    // if (!response.ok) throw new Error(`API Error: ${response.status}`);
    // return response.json();

    throw new Error(`Mock API: endpoint ${endpoint} not implemented`);
}

/**
 * 社交相关 API
 */
export const socialApi = {
    /**
     * 获取情感日记列表
     */
    getMoodDiaries: async (petId: string, limit = 30) => {
        await delay(300);
        // Mock 返回由 mockData 处理
        return [];
    },

    /**
     * 获取排行榜数据
     */
    getLeaderboard: async (type: "weekly" | "monthly", limit = 10) => {
        await delay(300);
        return [];
    },

    /**
     * 提交疫苗认证申请
     */
    submitVaccineVerification: async (petId: string, imageUri: string) => {
        await delay(1000); // 模拟上传延迟
        return {
            success: true,
            status: "pending" as const,
            message: "已提交审核，预计 1-2 个工作日内完成",
        };
    },

    /**
     * 获取疫苗认证状态
     */
    getVaccineStatus: async (petId: string) => {
        await delay(200);
        return {
            verified: true,
            status: "approved" as const,
            verifiedAt: Date.now() - 86400000 * 30,
        };
    },

    /**
     * 发起 1V1 挑战
     */
    createChallenge: async (
        challengerId: string,
        opponentId: string,
        duration: number
    ) => {
        await delay(300);
        return {
            id: `challenge-${Date.now()}`,
            status: "pending" as const,
        };
    },

    /**
     * 接受/拒绝挑战
     */
    respondChallenge: async (challengeId: string, accept: boolean) => {
        await delay(300);
        return { success: true };
    },
};

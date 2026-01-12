import type {
    PetProfile,
    VitalSigns,
    MoodDiary,
    POI,
    LeaderboardEntry,
    GreenShieldInfo,
    Challenge,
} from "@/types";

/**
 * Mock 宠物数据
 */
export const mockPet: PetProfile = {
    id: "pet-001",
    hardware_type: "pro",
    name: "豆豆",
    breed: "金毛寻回犬",
    age: "2岁3个月",
    weight: "28kg",
    health_status: {
        vaccine_verified: true,
        health_score: 92,
    },
    metrics: {
        hrv_stress: 35,
        activity_level: 75,
        weight_trend: "stable",
    },
};

/**
 * Mock 体征数据
 */
export const mockVitals: VitalSigns = {
    heartRate: 85,
    temperature: 38.5,
    respiratoryRate: 22,
    activityLevel: 75,
    timestamp: Date.now(),
};

/**
 * Mock 情感日记列表
 */
export const mockMoodDiaries: MoodDiary[] = [
    {
        id: "diary-001",
        petId: "pet-001",
        date: "今天",
        content:
            "今天跑了5公里，本汪感觉能追上风！主人带我去了公园，遇到了好多新朋友。下午还吃了一根超级好吃的零食棒！",
        mood: "开心",
        steps: 8520,
        hrv: 35,
    },
    {
        id: "diary-002",
        petId: "pet-001",
        date: "昨天",
        content:
            "今天有点累，主人上班了一整天才回来。不过晚上遛弯的时候遇到了隔壁的小花，心情好了很多！",
        mood: "平静",
        steps: 5230,
        hrv: 42,
    },
    {
        id: "diary-003",
        petId: "pet-001",
        date: "前天",
        content:
            "下雨了不能出门，只能在家里转圈圈。主人陪我玩了拔河游戏，虽然每次都让着我赢，但本汪还是很开心！",
        mood: "无聊",
        steps: 2100,
        hrv: 48,
    },
];

/**
 * Mock 排行榜数据
 */
export const mockLeaderboard: LeaderboardEntry[] = [
    {
        rank: 1,
        petId: "pet-002",
        petName: "萌萌",
        ownerName: "小红",
        value: 12580,
    },
    {
        rank: 2,
        petId: "pet-001",
        petName: "豆豆",
        ownerName: "小明",
        value: 8520,
        isMe: true,
    },
    {
        rank: 3,
        petId: "pet-003",
        petName: "小黄",
        ownerName: "小李",
        value: 7320,
    },
    {
        rank: 4,
        petId: "pet-004",
        petName: "花花",
        ownerName: "小张",
        value: 6890,
    },
    {
        rank: 5,
        petId: "pet-005",
        petName: "大黑",
        ownerName: "小王",
        value: 5420,
    },
];

/**
 * Mock 绿盾认证状态
 */
export const mockGreenShield: GreenShieldInfo = {
    petId: "pet-001",
    status: "approved",
    verifiedAt: Date.now() - 86400000 * 30, // 30天前
    expiresAt: Date.now() + 86400000 * 335, // 335天后
    vaccineType: "犬五联疫苗",
    clinicName: "宠爱动物医院",
};

/**
 * Mock 挑战数据
 */
export const mockChallenges: Challenge[] = [
    {
        id: "challenge-001",
        challengerId: "user-002",
        challengerName: "小红",
        challengerPetName: "萌萌",
        opponentId: "user-001",
        opponentName: "小明",
        opponentPetName: "豆豆",
        status: "pending",
        metric: "steps",
        duration: 7,
    },
    {
        id: "challenge-002",
        challengerId: "user-001",
        challengerName: "小明",
        challengerPetName: "豆豆",
        opponentId: "user-003",
        opponentName: "小李",
        opponentPetName: "小黄",
        status: "active",
        metric: "steps",
        duration: 7,
        startDate: Date.now() - 86400000 * 3,
        endDate: Date.now() + 86400000 * 4,
        challengerScore: 25600,
        opponentScore: 21300,
    },
];

/**
 * Mock POI 数据
 */
export const mockPOIs: POI[] = [
    {
        id: "poi-1",
        name: "宠爱动物医院",
        type: "hospital",
        distance: "0.8km",
        lat: 39.9,
        lng: 116.4,
        rating: 4.8,
    },
    {
        id: "poi-2",
        name: "汪星人公园",
        type: "park",
        distance: "1.2km",
        lat: 39.91,
        lng: 116.41,
    },
    {
        id: "poi-3",
        name: "宠物友好咖啡厅",
        type: "cafe",
        distance: "1.5km",
        lat: 39.89,
        lng: 116.42,
        rating: 4.5,
    },
];

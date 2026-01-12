/**
 * PetPulse 核心类型定义
 * 基于 PRD V2.0 Final 数据结构
 */

// 硬件类型
export type HardwareType = "lite" | "pro";

// 体重趋势
export type WeightTrend = "stable" | "gaining" | "losing";

// 社区活动类型
export type EventType = "wedding" | "funeral" | "meetup";

// AI 诊断类型
export type DiagnosisType = "stool" | "audio";

/**
 * 宠物核心档案
 */
export interface PetProfile {
    id: string;
    hardware_type: HardwareType;
    name: string;
    breed: string;
    avatar?: string;
    age?: string;
    weight?: string;
    health_status: {
        vaccine_verified: boolean;
        health_score: number; // 0-100
    };
    metrics: {
        hrv_stress: number;
        activity_level: number;
        weight_trend: WeightTrend;
    };
}

/**
 * 实时体征数据
 */
export interface VitalSigns {
    heartRate: number;      // bpm
    temperature: number;    // °C
    respiratoryRate: number; // 次/分
    activityLevel: number;  // 0-100%
    timestamp: number;
}

/**
 * 社区活动
 */
export interface CommunityEvent {
    id: string;
    type: EventType;
    title: string;
    date: number;
    theme_color: string;
    memorial_data?: {
        life_span: string;
        photos: string[];
    };
}

/**
 * AI 诊断记录
 */
export interface HealthDiagnosis {
    id: string;
    type: DiagnosisType;
    result_label: string;
    ai_advice: string;
    timestamp: number;
    image_url?: string;
}

/**
 * 情感日记
 */
export interface MoodDiary {
    id: string;
    petId: string;
    date: string;
    content: string;
    mood: string;
    steps: number;
    hrv: number;
}

/**
 * POI 兴趣点
 */
export interface POI {
    id: string;
    name: string;
    type: "hospital" | "park" | "cafe" | "pool" | "store";
    distance: string;
    lat: number;
    lng: number;
    rating?: number;
}

// ============================================
// 社交功能类型 (Trust Social)
// ============================================

/**
 * 疫苗认证状态
 */
export type VaccineStatus = "none" | "pending" | "approved" | "rejected";

/**
 * 绿盾认证信息
 */
export interface GreenShieldInfo {
    petId: string;
    status: VaccineStatus;
    verifiedAt?: number;
    expiresAt?: number;
    vaccineType?: string;
    clinicName?: string;
}

/**
 * 排行榜条目
 */
export interface LeaderboardEntry {
    rank: number;
    petId: string;
    petName: string;
    petAvatar?: string;
    ownerName: string;
    value: number; // 步数或睡眠时长
    isMe?: boolean;
}

/**
 * 排行榜类型
 */
export type LeaderboardType = "weekly" | "monthly";
export type LeaderboardMetric = "steps" | "sleep";

/**
 * 挑战状态
 */
export type ChallengeStatus = "pending" | "active" | "completed" | "declined";

/**
 * 1V1 挑战
 */
export interface Challenge {
    id: string;
    challengerId: string;
    challengerName: string;
    challengerPetName: string;
    opponentId: string;
    opponentName: string;
    opponentPetName: string;
    status: ChallengeStatus;
    metric: LeaderboardMetric;
    duration: number; // 天数
    startDate?: number;
    endDate?: number;
    challengerScore?: number;
    opponentScore?: number;
    winnerId?: string;
}

/**
 * 情感日记（扩展）
 */
export interface MoodDiaryExtended extends MoodDiary {
    moodEmoji: string;
    activityLevel: number; // 0-100
    shareImageUrl?: string;
}

// ============================================
// F-01 ~ F-03 核心健康类型
// ============================================

/**
 * 体征历史记录
 */
export interface VitalHistory {
    timestamp: number;
    heartRate: number;
    temperature: number;
    respiratoryRate: number;
    activityLevel: number;
}

/**
 * 预警级别
 */
export type AlertLevel = "info" | "warning" | "critical";

/**
 * 健康预警
 */
export interface HealthAlert {
    id: string;
    level: AlertLevel;
    title: string;
    message: string;
    timestamp: number;
    isRead: boolean;
    petId: string;
    vitalType?: "heartRate" | "temperature" | "respiratory" | "activity";
}

/**
 * 就医记录
 */
export interface MedicalRecord {
    id: string;
    petId: string;
    date: string;
    type: "checkup" | "treatment" | "surgery" | "emergency";
    hospital: string;
    doctor?: string;
    diagnosis: string;
    treatment?: string;
    cost?: number;
    notes?: string;
}

/**
 * 疫苗记录
 */
export interface VaccineRecord {
    id: string;
    petId: string;
    name: string;
    date: string;
    nextDate?: string;
    hospital: string;
    batchNo?: string;
}

/**
 * 体重记录
 */
export interface WeightRecord {
    date: string;
    weight: number;
}

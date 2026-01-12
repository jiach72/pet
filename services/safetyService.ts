/**
 * 安全追踪服务
 * F-07 Pro 主动追踪 / F-08 Lite 众包寻宠 / F-09 黑匣子海报
 */

// 设备类型
export type HardwareType = "pro" | "lite";

// 追踪状态
export interface TrackingStatus {
    isActive: boolean;
    mode: "gps" | "crowdsource" | "none";
    lastUpdate: Date;
    batteryLevel: number;
}

// GPS 位置点
export interface LocationPoint {
    id: string;
    latitude: number;
    longitude: number;
    timestamp: Date;
    accuracy: number;
}

// 众包上报
export interface CrowdsourceReport {
    id: string;
    reporterId: string;
    reporterName: string;
    latitude: number;
    longitude: number;
    timestamp: Date;
    distance: number; // 距离用户的估算距离 (km)
}

// 黑匣子海报数据
export interface EmergencyPosterData {
    petName: string;
    petBreed: string;
    petPhoto: string;
    lastLocation: LocationPoint | null;
    batteryLevel: number;
    lastVitalSigns: {
        heartRate: number;
        temperature: number;
    };
    contactPhone: string;
    qrCodeUrl?: string;
}

// 模拟 GPS 位置数据（北京朝阳区附近）
const mockBaseLocation = {
    latitude: 39.9219,
    longitude: 116.4437,
};

// 生成随机位移
const randomOffset = () => (Math.random() - 0.5) * 0.01;

// 模拟 GPS 追踪
let mockTrajectory: LocationPoint[] = [];
let trackingInterval: NodeJS.Timeout | null = null;

export function startGPSTracking(onUpdate: (points: LocationPoint[]) => void): void {
    mockTrajectory = [];

    // 模拟高频 GPS 上报（5秒间隔）
    trackingInterval = setInterval(() => {
        const newPoint: LocationPoint = {
            id: `loc-${Date.now()}`,
            latitude: mockBaseLocation.latitude + randomOffset() + (mockTrajectory.length * 0.001),
            longitude: mockBaseLocation.longitude + randomOffset() + (mockTrajectory.length * 0.0008),
            timestamp: new Date(),
            accuracy: 5 + Math.random() * 10,
        };

        mockTrajectory.push(newPoint);
        onUpdate([...mockTrajectory]);
    }, 5000);

    // 立即推送一个点
    const initialPoint: LocationPoint = {
        id: `loc-${Date.now()}`,
        latitude: mockBaseLocation.latitude,
        longitude: mockBaseLocation.longitude,
        timestamp: new Date(),
        accuracy: 8,
    };
    mockTrajectory.push(initialPoint);
    onUpdate([...mockTrajectory]);
}

export function stopGPSTracking(): void {
    if (trackingInterval) {
        clearInterval(trackingInterval);
        trackingInterval = null;
    }
}

export function getTrajectory(): LocationPoint[] {
    return [...mockTrajectory];
}

// 模拟众包寻宠
let crowdsourceReports: CrowdsourceReport[] = [];
let crowdsourceInterval: NodeJS.Timeout | null = null;

export function startCrowdsourceSearch(
    onReport: (reports: CrowdsourceReport[]) => void,
    onNearbyUsers: (count: number) => void
): void {
    crowdsourceReports = [];
    let nearbyUsers = 15 + Math.floor(Math.random() * 20);
    onNearbyUsers(nearbyUsers);

    // 模拟随机上报
    crowdsourceInterval = setInterval(() => {
        // 10% 概率收到一个上报
        if (Math.random() < 0.1) {
            const newReport: CrowdsourceReport = {
                id: `report-${Date.now()}`,
                reporterId: `user-${Math.floor(Math.random() * 1000)}`,
                reporterName: `热心宠友${Math.floor(Math.random() * 100)}`,
                latitude: mockBaseLocation.latitude + randomOffset() * 2,
                longitude: mockBaseLocation.longitude + randomOffset() * 2,
                timestamp: new Date(),
                distance: 0.1 + Math.random() * 2,
            };

            crowdsourceReports.push(newReport);
            onReport([...crowdsourceReports]);
        }

        // 更新附近用户数量
        nearbyUsers = Math.max(5, nearbyUsers + Math.floor(Math.random() * 5) - 2);
        onNearbyUsers(nearbyUsers);
    }, 3000);
}

export function stopCrowdsourceSearch(): void {
    if (crowdsourceInterval) {
        clearInterval(crowdsourceInterval);
        crowdsourceInterval = null;
    }
}

// 生成急救海报数据
export function generatePosterData(
    petInfo: { name: string; breed: string; photo: string },
    vitals: { heartRate: number; temperature: number },
    batteryLevel: number
): EmergencyPosterData {
    const lastLocation = mockTrajectory.length > 0
        ? mockTrajectory[mockTrajectory.length - 1]
        : {
            id: "last-known",
            latitude: mockBaseLocation.latitude,
            longitude: mockBaseLocation.longitude,
            timestamp: new Date(Date.now() - 3600000), // 1小时前
            accuracy: 20,
        };

    return {
        petName: petInfo.name,
        petBreed: petInfo.breed,
        petPhoto: petInfo.photo,
        lastLocation,
        batteryLevel,
        lastVitalSigns: vitals,
        contactPhone: "138****8888",
    };
}

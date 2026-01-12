/**
 * 智能家居服务
 * F-13: 规则引擎 + 设备控制
 */

// 设备类型
export type DeviceType = "feeder" | "camera" | "door" | "fountain";

// 设备状态
export interface SmartDevice {
    id: string;
    name: string;
    type: DeviceType;
    isOnline: boolean;
    batteryLevel?: number;
    lastAction?: {
        name: string;
        timestamp: Date;
    };
}

// 触发条件类型
export type TriggerType =
    | "activity_end"
    | "sleep_start"
    | "leave_home"
    | "return_home"
    | "high_activity"
    | "low_water";

// 执行动作类型
export type ActionType = "feed" | "record" | "open_door" | "refill_water";

// 自动化规则
export interface SmartRule {
    id: string;
    name: string;
    trigger: {
        type: TriggerType;
        description: string;
    };
    action: {
        deviceId: string;
        deviceName: string;
        type: ActionType;
        description: string;
    };
    isActive: boolean;
    lastTriggered?: Date;
}

// 预设场景
export interface PresetScene {
    id: string;
    name: string;
    description: string;
    icon: string;
    rules: Omit<SmartRule, "id" | "lastTriggered">[];
}

// 设备配置
export const deviceConfig: Record<DeviceType, {
    icon: string;
    label: string;
    actions: { type: ActionType; label: string }[];
}> = {
    feeder: {
        icon: "restaurant",
        label: "智能喂食器",
        actions: [{ type: "feed", label: "出粮" }],
    },
    camera: {
        icon: "videocam",
        label: "宠物摄像头",
        actions: [{ type: "record", label: "录像" }],
    },
    door: {
        icon: "git-compare",
        label: "智能宠物门",
        actions: [{ type: "open_door", label: "开门" }],
    },
    fountain: {
        icon: "water",
        label: "智能饮水机",
        actions: [{ type: "refill_water", label: "补水" }],
    },
};

// 触发条件配置
export const triggerConfig: Record<TriggerType, { label: string; description: string }> = {
    activity_end: { label: "运动结束", description: "检测到宠物运动结束" },
    sleep_start: { label: "开始睡眠", description: "检测到宠物进入睡眠状态" },
    leave_home: { label: "离开家", description: "检测到宠物离开安全区域" },
    return_home: { label: "回家", description: "检测到宠物回到安全区域" },
    high_activity: { label: "高活动量", description: "检测到宠物活动量超过阈值" },
    low_water: { label: "饮水量低", description: "检测到今日饮水量不足" },
};

// 模拟设备列表
export const mockDevices: SmartDevice[] = [
    {
        id: "device-001",
        name: "客厅喂食器",
        type: "feeder",
        isOnline: true,
        lastAction: { name: "出粮 50g", timestamp: new Date(Date.now() - 3600000) },
    },
    {
        id: "device-002",
        name: "宠物摄像头",
        type: "camera",
        isOnline: true,
    },
    {
        id: "device-003",
        name: "后院宠物门",
        type: "door",
        isOnline: false,
        batteryLevel: 15,
    },
];

// 预设场景
export const presetScenes: PresetScene[] = [
    {
        id: "scene-001",
        name: "运动后自动补给",
        description: "运动结束后自动喂食并开始录像",
        icon: "fitness",
        rules: [
            {
                name: "运动后喂食",
                trigger: { type: "activity_end", description: "检测到宠物运动结束" },
                action: {
                    deviceId: "device-001",
                    deviceName: "客厅喂食器",
                    type: "feed",
                    description: "出粮 30g",
                },
                isActive: true,
            },
        ],
    },
    {
        id: "scene-002",
        name: "外出安心模式",
        description: "离家时自动开启录像监控",
        icon: "airplane",
        rules: [
            {
                name: "离家录像",
                trigger: { type: "leave_home", description: "检测到宠物离开安全区域" },
                action: {
                    deviceId: "device-002",
                    deviceName: "宠物摄像头",
                    type: "record",
                    description: "开始录像",
                },
                isActive: true,
            },
        ],
    },
];

// 模拟规则列表
let mockRules: SmartRule[] = [];

// 获取设备列表
export function getDevices(): SmartDevice[] {
    return [...mockDevices];
}

// 获取规则列表
export function getRules(): SmartRule[] {
    return [...mockRules];
}

// 添加规则
export function addRule(rule: Omit<SmartRule, "id">): SmartRule {
    const newRule: SmartRule = {
        ...rule,
        id: `rule-${Date.now()}`,
    };
    mockRules.push(newRule);
    return newRule;
}

// 切换规则状态
export function toggleRule(ruleId: string): boolean {
    const rule = mockRules.find((r) => r.id === ruleId);
    if (rule) {
        rule.isActive = !rule.isActive;
        return rule.isActive;
    }
    return false;
}

// 删除规则
export function deleteRule(ruleId: string): boolean {
    const index = mockRules.findIndex((r) => r.id === ruleId);
    if (index !== -1) {
        mockRules.splice(index, 1);
        return true;
    }
    return false;
}

// 应用预设场景
export function applyScene(sceneId: string): SmartRule[] {
    const scene = presetScenes.find((s) => s.id === sceneId);
    if (!scene) return [];

    const newRules = scene.rules.map((r) => addRule(r));
    return newRules;
}

// 模拟执行设备动作
export async function executeAction(
    deviceId: string,
    action: ActionType
): Promise<{ success: boolean; message: string }> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const device = mockDevices.find((d) => d.id === deviceId);
    if (!device) {
        return { success: false, message: "设备未找到" };
    }

    if (!device.isOnline) {
        return { success: false, message: "设备离线" };
    }

    // 更新最后动作
    device.lastAction = {
        name: deviceConfig[device.type].actions.find((a) => a.type === action)?.label || action,
        timestamp: new Date(),
    };

    return { success: true, message: "执行成功" };
}

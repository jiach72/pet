/**
 * 情感日记 AI 生成服务 (Mock)
 * 基于 HRV 和步数生成第一人称宠物日记
 */

import type { MoodDiary } from "@/types";

// 心情模板库
const moodTemplates = {
    happy: [
        "今天跑了{steps}步，本汪感觉能追上风！",
        "阳光明媚的一天，和主人出门玩耍，遇到了好多新朋友！",
        "今天吃到了超级好吃的零食，幸福感爆棚！",
        "主人今天陪我玩了好久，开心得尾巴都要摇断了！",
    ],
    calm: [
        "今天是平静的一天，在阳台晒了会儿太阳。",
        "主人上班去了，我乖乖在家等着。晚上遛弯的时候见到了老朋友。",
        "今天走了{steps}步，不多不少，刚刚好。",
    ],
    tired: [
        "今天有点累，只想躺着不动...",
        "玩了一整天，现在只想睡觉觉。",
        "运动量太大了，需要好好休息一下。",
    ],
    bored: [
        "下雨了不能出门，只能在家里转圈圈。",
        "主人一整天都在忙，好无聊啊...",
        "没有新玩具，没有新朋友，平平无奇的一天。",
    ],
    excited: [
        "太兴奋了！今天去了新的公园，到处都是新鲜的气味！",
        "有客人来家里了！新朋友新朋友！",
        "今天发现了一个超级棒的藏骨头的地方！",
    ],
};

// 活动描述模板
const activityDescriptions = [
    "主人带我去了公园散步。",
    "下午和隔壁家的{friend}玩了一会儿。",
    "晚饭后在小区里溜了一圈。",
    "今天学会了一个新技能！",
    "主人给我洗了个澡，虽然不太喜欢，但现在香香的。",
];

// 宠物朋友名字
const petFriends = ["小花", "旺财", "毛毛", "球球", "黑子", "雪球"];

/**
 * 根据 HRV 判断心情
 */
function getMoodFromHrv(hrv: number): keyof typeof moodTemplates {
    if (hrv < 30) return "happy";
    if (hrv < 40) return "calm";
    if (hrv < 50) return "bored";
    if (hrv < 60) return "tired";
    return "calm";
}

/**
 * 根据步数判断活动水平描述
 */
function getActivityDescription(steps: number): string {
    if (steps > 10000) return "今天运动量超级大，";
    if (steps > 5000) return "今天活动还不错，";
    if (steps > 2000) return "今天稍微动了动，";
    return "今天有点宅，";
}

/**
 * 随机选择数组元素
 */
function randomPick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * 生成 AI 日记内容
 */
export function generateMoodDiary(
    petId: string,
    hrv: number,
    steps: number,
    date: string = "今天"
): MoodDiary {
    const mood = getMoodFromHrv(hrv);
    const moodChinese = {
        happy: "开心",
        calm: "平静",
        tired: "疲惫",
        bored: "无聊",
        excited: "兴奋",
    }[mood];

    // 选择模板并填充
    let template = randomPick(moodTemplates[mood]);
    template = template.replace("{steps}", steps.toLocaleString());

    // 添加活动描述
    let activity = randomPick(activityDescriptions);
    activity = activity.replace("{friend}", randomPick(petFriends));

    const content = `${getActivityDescription(steps)}${template} ${activity}`;

    return {
        id: `diary-${Date.now()}`,
        petId,
        date,
        content,
        mood: moodChinese,
        steps,
        hrv,
    };
}

/**
 * 批量生成历史日记
 */
export function generateHistoryDiaries(
    petId: string,
    days: number = 7
): MoodDiary[] {
    const diaries: MoodDiary[] = [];
    const dateLabels = ["今天", "昨天", "前天"];

    for (let i = 0; i < days; i++) {
        const hrv = 25 + Math.random() * 35; // 25-60
        const steps = 1000 + Math.floor(Math.random() * 12000); // 1000-13000

        let dateLabel: string;
        if (i < 3) {
            dateLabel = dateLabels[i];
        } else {
            const date = new Date();
            date.setDate(date.getDate() - i);
            dateLabel = `${date.getMonth() + 1}月${date.getDate()}日`;
        }

        diaries.push(generateMoodDiary(petId, hrv, steps, dateLabel));
    }

    return diaries;
}

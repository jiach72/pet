import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Icon from "@/components/Icon";

const colors = {
    primary: "#10B981",
    background: "#F8FAFC",
    foreground: "#1E293B",
    muted: "#64748B",
    border: "#E2E8F0",
    white: "#FFFFFF",
};

// Mock 文章内容
const articles: Record<string, { title: string; content: string[] }> = {
    hrv: {
        title: "如何看懂宠物�?HRV 报告�?,
        content: [
            "## 什么是 HRV�?,
            "HRV（Heart Rate Variability，心率变异性）是指连续心跳之间时间间隔的变化程度。它反映了自主神经系统（ANS）对心脏的调节能力�?,
            "## 为什�?HRV 很重要？",
            "HRV 是评估宠物整体健康状况的重要指标。高 HRV 通常表示健康的神经系统和良好的适应能力，而低 HRV 可能暗示压力、疲劳或潜在健康问题�?,
            "## 如何解读 HRV 数值？",
            "�?**30-50**：正常范围，表示宠物处于放松状态\n�?**50-70**：轻度压力，建议增加休息时间\n�?**70+**：需要关注，建议咨询兽医",
            "## PetPulse 如何帮助您？",
            "PetPulse 设备可以 24 小时监测宠物�?HRV，并通过 AI 分析提供个性化健康建议。当检测到异常时，会及时推送提醒�?,
        ],
    },
    heart: {
        title: "从心率曲线发现心脏病的早期信�?,
        content: [
            "## 正常心率曲线特征",
            "健康宠物的心率曲线应该是规律的，呈现出稳定的节律。静息心率通常�?60-120 bpm 之间（因品种而异）�?,
            "## 需要警惕的异常信号",
            "�?**心率过快**：持续高�?140 bpm\n�?**心率过慢**：低�?50 bpm\n�?**不规则节�?*：心跳间隔不均匀\n�?**突然变化**：静息时心率突然升高",
            "## 早期预防建议",
            "定期监测心率数据，发现异常及时就医。PetPulse �?AI 系统会自动识别异常模式并提醒您�?,
        ],
    },
    stress: {
        title: "宠物�?压力'原来有生理指标！",
        content: [
            "## 压力也有指标�?,
            "是的！通过 HRV 数据，我们可以量化宠物的压力水平。当宠物感到压力时，交感神经活跃度增加，导致 HRV 降低�?,
            "## 常见压力来源",
            "�?环境变化（搬家、装修）\n�?分离焦虑\n�?陌生人或动物\n�?噪音（雷雨、鞭炮）",
            "## 缓解压力的方�?,
            "�?保持规律作息\n�?提供安全空间\n�?适度运动和玩耍\n�?使用安抚音乐或费洛蒙",
        ],
    },
};

/**
 * 文章详情�?(Task 5.5)
 */
export default function ArticleScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const article = articles[id || "hrv"];

    return (
        <ScrollView style={styles.container}>
            {/* 文章头部 */}
            <View style={styles.header}>
                <Text style={styles.title}>{article.title}</Text>
                <View style={styles.meta}>
                    <View style={styles.metaItem}>
                        <Icon name="time" size={14} color={colors.muted} />
                        <Text style={styles.metaText}>5 分钟阅读</Text>
                    </View>
                    <View style={styles.metaItem}>
                        <Icon name="eye" size={14} color={colors.muted} />
                        <Text style={styles.metaText}>2,341 阅读</Text>
                    </View>
                </View>
            </View>

            {/* 文章内容 */}
            <View style={styles.content}>
                {article.content.map((paragraph, index) => {
                    if (paragraph.startsWith("## ")) {
                        return (
                            <Text key={index} style={styles.heading}>
                                {paragraph.replace("## ", "")}
                            </Text>
                        );
                    }
                    if (paragraph.startsWith("�?")) {
                        return (
                            <Text key={index} style={styles.paragraph}>
                                {paragraph}
                            </Text>
                        );
                    }
                    return (
                        <Text key={index} style={styles.paragraph}>
                            {paragraph}
                        </Text>
                    );
                })}
            </View>

            {/* 相关推荐 */}
            <View style={styles.relatedSection}>
                <Text style={styles.relatedTitle}>相关推荐</Text>
                <View style={styles.relatedList}>
                    {Object.entries(articles)
                        .filter(([key]) => key !== id)
                        .slice(0, 2)
                        .map(([key, value]) => (
                            <View key={key} style={styles.relatedItem}>
                                <View style={styles.relatedIcon}>
                                    <Icon name="document-text" size={20} color={colors.primary} />
                                </View>
                                <Text style={styles.relatedItemTitle} numberOfLines={2}>
                                    {value.title}
                                </Text>
                            </View>
                        ))}
                </View>
            </View>

            <View style={{ height: 32 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    header: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    title: {
        color: colors.foreground,
        fontSize: 22,
        fontWeight: "bold",
        lineHeight: 30,
    },
    meta: {
        flexDirection: "row",
        marginTop: 12,
        gap: 16,
    },
    metaItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    metaText: {
        color: colors.muted,
        fontSize: 13,
    },
    content: {
        padding: 16,
    },
    heading: {
        color: colors.foreground,
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 24,
        marginBottom: 12,
    },
    paragraph: {
        color: colors.foreground,
        fontSize: 16,
        lineHeight: 26,
        marginBottom: 16,
    },
    relatedSection: {
        padding: 16,
        backgroundColor: colors.background,
    },
    relatedTitle: {
        color: colors.foreground,
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 12,
    },
    relatedList: {
        gap: 12,
    },
    relatedItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.white,
        padding: 12,
        borderRadius: 12,
        gap: 12,
    },
    relatedIcon: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        alignItems: "center",
        justifyContent: "center",
    },
    relatedItemTitle: {
        flex: 1,
        color: colors.foreground,
        fontSize: 14,
        fontWeight: "500",
    },
});

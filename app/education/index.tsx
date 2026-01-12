import React from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const colors = {
    primary: "#10B981",
    background: "#F8FAFC",
    foreground: "#1E293B",
    muted: "#64748B",
    border: "#E2E8F0",
    white: "#FFFFFF",
    blue: "#3B82F6",
    orange: "#F97316",
};

// Mock 科普内容
const featuredArticles = [
    {
        id: "hrv",
        title: "如何看懂宠物的 HRV 报告？",
        subtitle: "心率变异性是评估宠物健康的重要指标",
        type: "article",
        readTime: "5分钟",
        views: 2341,
        tag: "入门必读",
    },
    {
        id: "heart",
        title: "从心率曲线发现心脏病的早期信号",
        subtitle: "学会识别异常心率模式，提前预防心脏疾病",
        type: "video",
        duration: "8:32",
        views: 5678,
        tag: "深度解读",
    },
    {
        id: "stress",
        title: "宠物的'压力'原来有生理指标！",
        subtitle: "了解 HRV-压力关联，帮助宠物减压",
        type: "article",
        readTime: "4分钟",
        views: 1892,
        tag: "新知",
    },
];

const categories = [
    { id: "health", icon: "heart-circle", label: "健康指标", count: 12 },
    { id: "nutrition", icon: "nutrition", label: "营养饮食", count: 8 },
    { id: "behavior", icon: "paw", label: "行为解读", count: 15 },
    { id: "first-aid", icon: "medkit", label: "急救知识", count: 6 },
];

/**
 * 健康科普首页 (Task 5.1, 5.2, 5.3, 5.4)
 */
export default function EducationScreen() {
    const router = useRouter();

    const handleArticlePress = (id: string) => {
        router.push(`/education/article?id=${id}`);
    };

    return (
        <ScrollView style={styles.container}>
            {/* 搜索栏 */}
            <Pressable style={styles.searchBar}>
                <Ionicons name="search" size={20} color={colors.muted} />
                <Text style={styles.searchPlaceholder}>搜索健康知识</Text>
            </Pressable>

            {/* 分类入口 */}
            <View style={styles.categories}>
                {categories.map((cat) => (
                    <Pressable key={cat.id} style={styles.categoryItem}>
                        <View style={styles.categoryIcon}>
                            <Ionicons name={cat.icon as any} size={24} color={colors.primary} />
                        </View>
                        <Text style={styles.categoryLabel}>{cat.label}</Text>
                        <Text style={styles.categoryCount}>{cat.count}篇</Text>
                    </Pressable>
                ))}
            </View>

            {/* 精选内容 */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>精选内容</Text>
                    <Pressable style={styles.viewAllBtn}>
                        <Text style={styles.viewAllText}>查看全部</Text>
                        <Ionicons name="chevron-forward" size={16} color={colors.primary} />
                    </Pressable>
                </View>

                {featuredArticles.map((article) => (
                    <Pressable
                        key={article.id}
                        onPress={() => handleArticlePress(article.id)}
                        style={styles.articleCard}
                    >
                        <View style={styles.articleImage}>
                            <Ionicons
                                name={article.type === "video" ? "play-circle" : "document-text"}
                                size={32}
                                color={article.type === "video" ? colors.orange : colors.primary}
                            />
                        </View>
                        <View style={styles.articleContent}>
                            <View style={styles.tagRow}>
                                <View style={styles.tag}>
                                    <Text style={styles.tagText}>{article.tag}</Text>
                                </View>
                                {article.type === "video" && (
                                    <View style={[styles.tag, styles.videoTag]}>
                                        <Ionicons name="videocam" size={12} color={colors.orange} />
                                        <Text style={styles.videoTagText}>{article.duration}</Text>
                                    </View>
                                )}
                            </View>
                            <Text style={styles.articleTitle} numberOfLines={2}>
                                {article.title}
                            </Text>
                            <Text style={styles.articleSubtitle} numberOfLines={1}>
                                {article.subtitle}
                            </Text>
                            <View style={styles.articleMeta}>
                                <Ionicons name="eye" size={14} color={colors.muted} />
                                <Text style={styles.articleMetaText}>
                                    {article.views.toLocaleString()} 阅读
                                </Text>
                                {article.readTime && (
                                    <>
                                        <View style={styles.metaDot} />
                                        <Text style={styles.articleMetaText}>{article.readTime}</Text>
                                    </>
                                )}
                            </View>
                        </View>
                    </Pressable>
                ))}
            </View>

            {/* 学习进度 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>学习进度</Text>
                <View style={styles.progressCard}>
                    <View style={styles.progressHeader}>
                        <Text style={styles.progressTitle}>已学习 12 篇</Text>
                        <Text style={styles.progressPercent}>40%</Text>
                    </View>
                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: "40%" }]} />
                    </View>
                    <Text style={styles.progressTip}>
                        继续学习，成为宠物健康专家！
                    </Text>
                </View>
            </View>

            <View style={{ height: 32 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.white,
        margin: 16,
        padding: 12,
        borderRadius: 12,
        gap: 8,
    },
    searchPlaceholder: {
        color: colors.muted,
        fontSize: 15,
    },
    categories: {
        flexDirection: "row",
        paddingHorizontal: 8,
        marginBottom: 16,
    },
    categoryItem: {
        flex: 1,
        alignItems: "center",
    },
    categoryIcon: {
        width: 52,
        height: 52,
        borderRadius: 16,
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
    },
    categoryLabel: {
        color: colors.foreground,
        fontSize: 13,
        fontWeight: "500",
    },
    categoryCount: {
        color: colors.muted,
        fontSize: 12,
    },
    section: {
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    sectionTitle: {
        color: colors.foreground,
        fontSize: 18,
        fontWeight: "bold",
    },
    viewAllBtn: {
        flexDirection: "row",
        alignItems: "center",
    },
    viewAllText: {
        color: colors.primary,
        fontSize: 14,
    },
    articleCard: {
        flexDirection: "row",
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 12,
        marginBottom: 12,
    },
    articleImage: {
        width: 80,
        height: 80,
        borderRadius: 12,
        backgroundColor: colors.background,
        alignItems: "center",
        justifyContent: "center",
    },
    articleContent: {
        flex: 1,
        marginLeft: 12,
    },
    tagRow: {
        flexDirection: "row",
        gap: 8,
        marginBottom: 6,
    },
    tag: {
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        paddingVertical: 2,
        paddingHorizontal: 8,
        borderRadius: 10,
    },
    tagText: {
        color: colors.primary,
        fontSize: 11,
    },
    videoTag: {
        backgroundColor: "rgba(249, 115, 22, 0.1)",
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    videoTagText: {
        color: colors.orange,
        fontSize: 11,
    },
    articleTitle: {
        color: colors.foreground,
        fontSize: 15,
        fontWeight: "600",
    },
    articleSubtitle: {
        color: colors.muted,
        fontSize: 13,
        marginTop: 4,
    },
    articleMeta: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
        gap: 4,
    },
    articleMetaText: {
        color: colors.muted,
        fontSize: 12,
    },
    metaDot: {
        width: 3,
        height: 3,
        borderRadius: 1.5,
        backgroundColor: colors.muted,
        marginHorizontal: 6,
    },
    progressCard: {
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 16,
    },
    progressHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    progressTitle: {
        color: colors.foreground,
        fontSize: 16,
        fontWeight: "600",
    },
    progressPercent: {
        color: colors.primary,
        fontSize: 16,
        fontWeight: "bold",
    },
    progressBar: {
        height: 8,
        backgroundColor: colors.border,
        borderRadius: 4,
    },
    progressFill: {
        height: "100%",
        backgroundColor: colors.primary,
        borderRadius: 4,
    },
    progressTip: {
        color: colors.muted,
        fontSize: 13,
        marginTop: 12,
        textAlign: "center",
    },
});

import React from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import Icon from "@/components/Icon";
import { mockPet } from "@/data/mockData";

const colors = {
    primary: "#3B82F6",
    background: "#F8FAFC",
    foreground: "#1E293B",
    muted: "#64748B",
    border: "#E2E8F0",
    white: "#FFFFFF",
    green: "#10B981",
    orange: "#F97316",
};

// Mock 保险产品
const insuranceProducts = [
    {
        id: "1",
        name: "基础医疗�?,
        price: 99,
        originalPrice: 149,
        coverage: "意外伤害 + 疾病医疗",
        limit: "每年最高赔�?5,000 �?,
        features: ["门诊报销", "住院报销", "手术费用"],
    },
    {
        id: "2",
        name: "全面保障�?,
        price: 299,
        originalPrice: 399,
        coverage: "意外 + 疾病 + 第三方责�?,
        limit: "每年最高赔�?20,000 �?,
        features: ["门诊住院", "手术费用", "第三方责�?, "走失寻回"],
        recommended: true,
    },
    {
        id: "3",
        name: "尊享无忧�?,
        price: 599,
        originalPrice: 799,
        coverage: "全面保障 + 健康管理",
        limit: "每年最高赔�?50,000 �?,
        features: ["全面医疗", "健康体检", "专属客服", "绿色通道"],
    },
];

/**
 * 保险服务�?(Task 6.1, 6.2, 6.3)
 */
export default function InsuranceScreen() {
    const healthScore = mockPet.health_status.health_score;
    const discount = healthScore >= 90 ? 30 : healthScore >= 80 ? 20 : 10;

    return (
        <ScrollView style={styles.container}>
            {/* 健康折扣�?*/}
            <View style={styles.discountCard}>
                <View style={styles.discountLeft}>
                    <View style={styles.discountBadge}>
                        <Text style={styles.discountBadgeText}>健康优惠</Text>
                    </View>
                    <Text style={styles.discountTitle}>
                        健康�?{healthScore} �?
                    </Text>
                    <Text style={styles.discountSubtitle}>
                        下月保费可享 {discount}% 折扣
                    </Text>
                </View>
                <View style={styles.discountRight}>
                    <Text style={styles.discountValue}>{discount}%</Text>
                    <Text style={styles.discountLabel}>OFF</Text>
                </View>
            </View>

            {/* 保险产品列表 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>保险方案</Text>

                {insuranceProducts.map((product) => (
                    <View
                        key={product.id}
                        style={[styles.productCard, product.recommended && styles.productCardRecommended]}
                    >
                        {product.recommended && (
                            <View style={styles.recommendedBadge}>
                                <Icon name="star" size={12} color={colors.white} />
                                <Text style={styles.recommendedText}>推荐</Text>
                            </View>
                        )}

                        <View style={styles.productHeader}>
                            <Text style={styles.productName}>{product.name}</Text>
                            <View style={styles.priceRow}>
                                <Text style={styles.price}>¥{product.price}</Text>
                                <Text style={styles.priceUnit}>/�?/Text>
                                <Text style={styles.originalPrice}>¥{product.originalPrice}</Text>
                            </View>
                        </View>

                        <Text style={styles.coverage}>{product.coverage}</Text>
                        <Text style={styles.limit}>{product.limit}</Text>

                        <View style={styles.features}>
                            {product.features.map((feature) => (
                                <View key={feature} style={styles.featureItem}>
                                    <Icon name="checkmark-circle" size={16} color={colors.green} />
                                    <Text style={styles.featureText}>{feature}</Text>
                                </View>
                            ))}
                        </View>

                        <Pressable
                            style={({ pressed }) => [
                                styles.buyBtn,
                                product.recommended && styles.buyBtnRecommended,
                                pressed && styles.buyBtnPressed,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.buyBtnText,
                                    product.recommended && styles.buyBtnTextRecommended,
                                ]}
                            >
                                立即投保
                            </Text>
                        </Pressable>
                    </View>
                ))}
            </View>

            {/* 服务说明 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>服务说明</Text>
                <View style={styles.infoCard}>
                    <View style={styles.infoItem}>
                        <Icon name="flash" size={20} color={colors.primary} />
                        <View style={styles.infoContent}>
                            <Text style={styles.infoTitle}>快速理�?/Text>
                            <Text style={styles.infoDesc}>在线提交�?8小时内处�?/Text>
                        </View>
                    </View>
                    <View style={styles.infoItem}>
                        <Icon name="shield-checkmark" size={20} color={colors.primary} />
                        <View style={styles.infoContent}>
                            <Text style={styles.infoTitle}>全国通赔</Text>
                            <Text style={styles.infoDesc}>覆盖 3000+ 合作医院</Text>
                        </View>
                    </View>
                    <View style={styles.infoItem}>
                        <Icon name="heart" size={20} color={colors.primary} />
                        <View style={styles.infoContent}>
                            <Text style={styles.infoTitle}>健康激�?/Text>
                            <Text style={styles.infoDesc}>健康分越高，保费越低</Text>
                        </View>
                    </View>
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
    discountCard: {
        flexDirection: "row",
        backgroundColor: colors.primary,
        margin: 16,
        borderRadius: 16,
        padding: 20,
    },
    discountLeft: {
        flex: 1,
    },
    discountBadge: {
        backgroundColor: "rgba(255,255,255,0.2)",
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 12,
        alignSelf: "flex-start",
        marginBottom: 8,
    },
    discountBadgeText: {
        color: colors.white,
        fontSize: 12,
    },
    discountTitle: {
        color: colors.white,
        fontSize: 20,
        fontWeight: "bold",
    },
    discountSubtitle: {
        color: "rgba(255,255,255,0.8)",
        fontSize: 14,
        marginTop: 4,
    },
    discountRight: {
        alignItems: "center",
        justifyContent: "center",
    },
    discountValue: {
        color: colors.white,
        fontSize: 36,
        fontWeight: "bold",
    },
    discountLabel: {
        color: "rgba(255,255,255,0.8)",
        fontSize: 14,
    },
    section: {
        padding: 16,
    },
    sectionTitle: {
        color: colors.foreground,
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 12,
    },
    productCard: {
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: colors.border,
        position: "relative",
    },
    productCardRecommended: {
        borderColor: colors.primary,
        borderWidth: 2,
    },
    recommendedBadge: {
        position: "absolute",
        top: -1,
        right: 16,
        backgroundColor: colors.primary,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        gap: 4,
    },
    recommendedText: {
        color: colors.white,
        fontSize: 12,
        fontWeight: "600",
    },
    productHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 8,
    },
    productName: {
        color: colors.foreground,
        fontSize: 18,
        fontWeight: "bold",
    },
    priceRow: {
        flexDirection: "row",
        alignItems: "baseline",
    },
    price: {
        color: colors.orange,
        fontSize: 24,
        fontWeight: "bold",
    },
    priceUnit: {
        color: colors.muted,
        fontSize: 14,
    },
    originalPrice: {
        color: colors.muted,
        fontSize: 14,
        textDecorationLine: "line-through",
        marginLeft: 8,
    },
    coverage: {
        color: colors.foreground,
        fontSize: 14,
    },
    limit: {
        color: colors.muted,
        fontSize: 13,
        marginTop: 4,
    },
    features: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 12,
        gap: 8,
    },
    featureItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    featureText: {
        color: colors.foreground,
        fontSize: 13,
    },
    buyBtn: {
        marginTop: 16,
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        backgroundColor: colors.background,
    },
    buyBtnRecommended: {
        backgroundColor: colors.primary,
    },
    buyBtnPressed: {
        opacity: 0.8,
    },
    buyBtnText: {
        color: colors.primary,
        fontSize: 16,
        fontWeight: "600",
    },
    buyBtnTextRecommended: {
        color: colors.white,
    },
    infoCard: {
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 16,
    },
    infoItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    infoContent: {
        marginLeft: 12,
    },
    infoTitle: {
        color: colors.foreground,
        fontSize: 15,
        fontWeight: "500",
    },
    infoDesc: {
        color: colors.muted,
        fontSize: 13,
    },
});

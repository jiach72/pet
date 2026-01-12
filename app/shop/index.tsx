import React, { useState } from "react";
import {
    View,
    Text,
    ScrollView,
    Pressable,
    StyleSheet,
    Image,
} from "react-native";
import { useRouter } from "expo-router";
import Icon from "@/components/Icon";

const colors = {
    primary: "#F97316",
    background: "#F8FAFC",
    foreground: "#1E293B",
    muted: "#64748B",
    border: "#E2E8F0",
    white: "#FFFFFF",
    red: "#EF4444",
};

// Mock 商品数据
const products = [
    { id: "1", name: "进口狗粮 10kg", price: 299, originalPrice: 399, image: "🦴", sales: 2341 },
    { id: "2", name: "智能饮水机", price: 199, originalPrice: 259, image: "💧", sales: 1892 },
    { id: "3", name: "宠物玩具套装", price: 89, originalPrice: 129, image: "🎾", sales: 3421 },
    { id: "4", name: "冬季保暖窝", price: 159, originalPrice: 199, image: "🛏️", sales: 987 },
    { id: "5", name: "自动喂食器", price: 349, originalPrice: 449, image: "🍽️", sales: 1234 },
    { id: "6", name: "宠物背包", price: 269, originalPrice: 329, image: "🎒", sales: 876 },
];

const categories = [
    { id: "food", icon: "nutrition", label: "粮食" },
    { id: "toys", icon: "game-controller", label: "玩具" },
    { id: "health", icon: "medical", label: "保健" },
    { id: "supplies", icon: "paw", label: "用品" },
];

/**
 * 商城首页 (Task 2.1, 2.2, 2.3)
 */
export default function ShopScreen() {
    const router = useRouter();
    const [cartCount, setCartCount] = useState(0);

    const handleAddToCart = (productId: string) => {
        setCartCount((prev) => prev + 1);
    };

    return (
        <View style={styles.container}>
            {/* 搜索栏 */}
            <View style={styles.searchBar}>
                <View style={styles.searchInput}>
                    <Icon name="search" size={20} color={colors.muted} />
                    <Text style={styles.searchPlaceholder}>搜索商品</Text>
                </View>
                <Pressable style={styles.cartBtn}>
                    <Icon name="cart" size={24} color={colors.foreground} />
                    {cartCount > 0 && (
                        <View style={styles.cartBadge}>
                            <Text style={styles.cartBadgeText}>{cartCount}</Text>
                        </View>
                    )}
                </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* 分类入口 */}
                <View style={styles.categories}>
                    {categories.map((cat) => (
                        <Pressable key={cat.id} style={styles.categoryItem}>
                            <View style={styles.categoryIcon}>
                                <Icon name={cat.icon as any} size={24} color={colors.primary} />
                            </View>
                            <Text style={styles.categoryLabel}>{cat.label}</Text>
                        </Pressable>
                    ))}
                </View>

                {/* 宠物寄卖入口 */}
                <Pressable
                    onPress={() => router.push("/shop/pet-listing")}
                    style={styles.listingBanner}
                >
                    <View style={styles.listingBannerContent}>
                        <Text style={styles.listingBannerEmoji}>🐕</Text>
                        <View>
                            <Text style={styles.listingBannerTitle}>宠物寄卖</Text>
                            <Text style={styles.listingBannerSubtitle}>
                                发布您的宠物，找到有爱的新家庭
                            </Text>
                        </View>
                    </View>
                    <Icon name="chevron-forward" size={20} color={colors.primary} />
                </Pressable>

                {/* 热销商品 */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>热销商品</Text>
                        <Pressable style={styles.viewAllBtn}>
                            <Text style={styles.viewAllText}>查看全部</Text>
                            <Icon name="chevron-forward" size={16} color={colors.primary} />
                        </Pressable>
                    </View>

                    <View style={styles.productGrid}>
                        {products.map((product) => (
                            <View key={product.id} style={styles.productCard}>
                                <View style={styles.productImage}>
                                    <Text style={styles.productEmoji}>{product.image}</Text>
                                </View>
                                <Text style={styles.productName} numberOfLines={2}>
                                    {product.name}
                                </Text>
                                <View style={styles.productPriceRow}>
                                    <Text style={styles.productPrice}>¥{product.price}</Text>
                                    <Text style={styles.productOriginalPrice}>
                                        ¥{product.originalPrice}
                                    </Text>
                                </View>
                                <Text style={styles.productSales}>已售 {product.sales}</Text>
                                <Pressable
                                    onPress={() => handleAddToCart(product.id)}
                                    style={styles.addCartBtn}
                                >
                                    <Icon name="add" size={20} color={colors.white} />
                                </Pressable>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
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
        padding: 16,
        backgroundColor: colors.white,
        gap: 12,
    },
    searchInput: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.background,
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 10,
        gap: 8,
    },
    searchPlaceholder: {
        color: colors.muted,
        fontSize: 15,
    },
    cartBtn: {
        position: "relative",
    },
    cartBadge: {
        position: "absolute",
        top: -6,
        right: -6,
        backgroundColor: colors.red,
        minWidth: 18,
        height: 18,
        borderRadius: 9,
        alignItems: "center",
        justifyContent: "center",
    },
    cartBadgeText: {
        color: colors.white,
        fontSize: 12,
        fontWeight: "bold",
    },
    categories: {
        flexDirection: "row",
        backgroundColor: colors.white,
        paddingVertical: 16,
        paddingHorizontal: 8,
    },
    categoryItem: {
        flex: 1,
        alignItems: "center",
    },
    categoryIcon: {
        width: 52,
        height: 52,
        borderRadius: 16,
        backgroundColor: "rgba(249, 115, 22, 0.1)",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
    },
    categoryLabel: {
        color: colors.foreground,
        fontSize: 13,
    },
    listingBanner: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.white,
        margin: 16,
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.border,
    },
    listingBannerContent: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    listingBannerEmoji: {
        fontSize: 32,
    },
    listingBannerTitle: {
        color: colors.foreground,
        fontSize: 16,
        fontWeight: "bold",
    },
    listingBannerSubtitle: {
        color: colors.muted,
        fontSize: 13,
    },
    section: {
        padding: 16,
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
    productGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
    },
    productCard: {
        width: "48%",
        backgroundColor: colors.white,
        borderRadius: 12,
        padding: 12,
        position: "relative",
    },
    productImage: {
        height: 100,
        backgroundColor: colors.background,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
    },
    productEmoji: {
        fontSize: 40,
    },
    productName: {
        color: colors.foreground,
        fontSize: 14,
        fontWeight: "500",
        height: 40,
    },
    productPriceRow: {
        flexDirection: "row",
        alignItems: "baseline",
        marginTop: 8,
        gap: 6,
    },
    productPrice: {
        color: colors.primary,
        fontSize: 18,
        fontWeight: "bold",
    },
    productOriginalPrice: {
        color: colors.muted,
        fontSize: 12,
        textDecorationLine: "line-through",
    },
    productSales: {
        color: colors.muted,
        fontSize: 12,
        marginTop: 4,
    },
    addCartBtn: {
        position: "absolute",
        bottom: 12,
        right: 12,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },
});

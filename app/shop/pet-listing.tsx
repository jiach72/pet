import React from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import Icon from "@/components/Icon";

const colors = {
    primary: "#F97316",
    background: "#F8FAFC",
    foreground: "#1E293B",
    muted: "#64748B",
    border: "#E2E8F0",
    white: "#FFFFFF",
    green: "#10B981",
};

// Mock 宠物寄卖数据
const petListings = [
    {
        id: "1",
        petName: "小白",
        breed: "萨摩耶",
        age: "3个月",
        gender: "male",
        price: 3500,
        verified: true,
        location: "北京朝阳",
        sellerRating: 4.9,
    },
    {
        id: "2",
        petName: "布丁",
        breed: "英短蓝猫",
        age: "2个月",
        gender: "female",
        price: 2800,
        verified: true,
        location: "上海浦东",
        sellerRating: 4.8,
    },
    {
        id: "3",
        petName: "黑豆",
        breed: "拉布拉多",
        age: "4个月",
        gender: "male",
        price: 2200,
        verified: false,
        location: "广州天河",
        sellerRating: 4.7,
    },
];

/**
 * 宠物寄卖页 (Task 2.4)
 */
export default function PetListingScreen() {
    return (
        <View style={styles.container}>
            {/* 发布按钮 */}
            <View style={styles.publishBar}>
                <Pressable style={styles.publishBtn}>
                    <Ionicons name="add-circle" size={24} color={colors.white} />
                    <Text style={styles.publishBtnText}>发布寄卖</Text>
                </Pressable>
            </View>

            <ScrollView>
                {/* 筛选栏 */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.filterBar}
                    contentContainerStyle={styles.filterBarContent}
                >
                    {["全部", "狗狗", "猫咪", "绿盾认证", "附近"].map((filter) => (
                        <Pressable key={filter} style={styles.filterBtn}>
                            <Text style={styles.filterBtnText}>{filter}</Text>
                        </Pressable>
                    ))}
                </ScrollView>

                {/* 寄卖列表 */}
                <View style={styles.listings}>
                    {petListings.map((pet) => (
                        <Pressable key={pet.id} style={styles.listingCard}>
                            <View style={styles.listingImage}>
                                <Text style={styles.listingEmoji}>
                                    {pet.breed.includes("猫") ? "🐱" : "🐕"}
                                </Text>
                            </View>

                            <View style={styles.listingContent}>
                                <View style={styles.listingHeader}>
                                    <Text style={styles.petName}>{pet.petName}</Text>
                                    {pet.verified && (
                                        <View style={styles.verifiedBadge}>
                                            <Ionicons
                                                name="shield-checkmark"
                                                size={12}
                                                color={colors.green}
                                            />
                                            <Text style={styles.verifiedText}>绿盾</Text>
                                        </View>
                                    )}
                                </View>

                                <Text style={styles.petBreed}>{pet.breed}</Text>

                                <View style={styles.petMeta}>
                                    <Text style={styles.petMetaText}>{pet.age}</Text>
                                    <View style={styles.metaDot} />
                                    <Ionicons
                                        name={pet.gender === "male" ? "male" : "female"}
                                        size={14}
                                        color={pet.gender === "male" ? "#3B82F6" : "#EC4899"}
                                    />
                                    <View style={styles.metaDot} />
                                    <Text style={styles.petMetaText}>{pet.location}</Text>
                                </View>

                                <View style={styles.listingFooter}>
                                    <Text style={styles.petPrice}>¥{pet.price.toLocaleString()}</Text>
                                    <View style={styles.sellerRating}>
                                        <Ionicons name="star" size={12} color="#F59E0B" />
                                        <Text style={styles.ratingText}>{pet.sellerRating}</Text>
                                    </View>
                                </View>
                            </View>
                        </Pressable>
                    ))}
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
    publishBar: {
        backgroundColor: colors.white,
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    publishBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.primary,
        paddingVertical: 12,
        borderRadius: 12,
        gap: 8,
    },
    publishBtnText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "600",
    },
    filterBar: {
        backgroundColor: colors.white,
        paddingVertical: 12,
    },
    filterBarContent: {
        paddingHorizontal: 16,
        gap: 8,
    },
    filterBtn: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: colors.background,
        borderRadius: 20,
    },
    filterBtnText: {
        color: colors.foreground,
        fontSize: 14,
    },
    listings: {
        padding: 16,
        gap: 12,
    },
    listingCard: {
        flexDirection: "row",
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 12,
        borderWidth: 1,
        borderColor: colors.border,
    },
    listingImage: {
        width: 100,
        height: 100,
        backgroundColor: colors.background,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    listingEmoji: {
        fontSize: 48,
    },
    listingContent: {
        flex: 1,
        marginLeft: 12,
    },
    listingHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    petName: {
        color: colors.foreground,
        fontSize: 17,
        fontWeight: "bold",
    },
    verifiedBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#DCFCE7",
        paddingVertical: 2,
        paddingHorizontal: 8,
        borderRadius: 12,
        gap: 4,
    },
    verifiedText: {
        color: colors.green,
        fontSize: 11,
        fontWeight: "500",
    },
    petBreed: {
        color: colors.muted,
        fontSize: 14,
        marginTop: 4,
    },
    petMeta: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 6,
    },
    petMetaText: {
        color: colors.muted,
        fontSize: 13,
    },
    metaDot: {
        width: 3,
        height: 3,
        borderRadius: 1.5,
        backgroundColor: colors.muted,
        marginHorizontal: 8,
    },
    listingFooter: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 8,
    },
    petPrice: {
        color: colors.primary,
        fontSize: 18,
        fontWeight: "bold",
    },
    sellerRating: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    ratingText: {
        color: colors.foreground,
        fontSize: 13,
    },
});

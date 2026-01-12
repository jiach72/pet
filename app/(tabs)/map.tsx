import React, { useState, useMemo } from "react";
import {
    View,
    Text,
    ScrollView,
    Pressable,
    StyleSheet,
    Linking,
} from "react-native";
import { useRouter } from "expo-router";
import Icon from "@/components/Icon";
import { mockPOIs } from "@/data/mockData";
import { mockPet } from "@/data/mockData";

const colors = {
    primary: "#3B82F6",
    background: "#F8FAFC",
    foreground: "#1E293B",
    muted: "#64748B",
    border: "#E2E8F0",
    white: "#FFFFFF",
    green: "#10B981",
    red: "#EF4444",
    orange: "#F97316",
    purple: "#8B5CF6",
};

// POI 类型配置
const poiConfig: Record<string, { icon: string; color: string; label: string }> = {
    hospital: { icon: "medical", color: colors.red, label: "医院" },
    park: { icon: "leaf", color: colors.green, label: "公园" },
    cafe: { icon: "cafe", color: colors.orange, label: "咖啡厅" },
    pool: { icon: "water", color: colors.primary, label: "游泳馆" },
    store: { icon: "storefront", color: colors.purple, label: "商店" },
};

// 服务入口配置
const serviceEntries = [
    { id: "insurance", icon: "shield-checkmark", label: "宠物保险", color: colors.primary },
    { id: "shop", icon: "cart", label: "宠物商城", color: colors.orange },
    { id: "education", icon: "book", label: "健康科普", color: colors.green },
    { id: "community", icon: "people", label: "社区活动", color: colors.purple },
];

/**
 * 地图页 - 生活服务 POI + 服务入口
 * Task 1.1
 */
export default function MapScreen() {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    // 根据健康数据生成推荐理由
    const getRecommendReason = () => {
        const { metrics } = mockPet;
        if (metrics.weight_trend === "gaining") {
            return "体重上升中，推荐运动场所";
        }
        if (metrics.hrv_stress > 45) {
            return "压力较高，推荐放松服务";
        }
        return "附近优质服务";
    };

    // 过滤 POI
    const filteredPOIs = useMemo(() => {
        if (!selectedCategory) return mockPOIs;
        return mockPOIs.filter((poi) => poi.type === selectedCategory);
    }, [selectedCategory]);

    // 导航到系统地图
    const handleNavigate = (poi: typeof mockPOIs[0]) => {
        const url = `https://maps.apple.com/?daddr=${poi.lat},${poi.lng}`;
        Linking.openURL(url);
    };

    // 跳转到服务页面
    const handleServicePress = (id: string) => {
        switch (id) {
            case "insurance":
                router.push("/services/insurance");
                break;
            case "shop":
                router.push("/shop/");
                break;
            case "education":
                router.push("/education/");
                break;
            case "community":
                router.push("/community/events");
                break;
        }
    };

    return (
        <View style={styles.container}>
            {/* 模拟地图区域 */}
            <View style={styles.mapArea}>
                <View style={styles.mapPlaceholder}>
                    <Ionicons name="map" size={60} color="#CBD5E1" />
                    <Text style={styles.mapPlaceholderText}>地图</Text>
                </View>

                {/* 当前位置标记 */}
                <View style={styles.currentLocation}>
                    <Ionicons name="paw" size={20} color="white" />
                </View>

                {/* 安全区域指示 */}
                <View style={styles.safeZoneIndicator}>
                    <View style={styles.safeZoneDot} />
                    <Text style={styles.safeZoneText}>安全区域内</Text>
                </View>

                {/* 分类筛选 */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.categoryBar}
                    contentContainerStyle={styles.categoryBarContent}
                >
                    <Pressable
                        onPress={() => setSelectedCategory(null)}
                        style={[
                            styles.categoryBtn,
                            !selectedCategory && styles.categoryBtnActive,
                        ]}
                    >
                        <Text
                            style={[
                                styles.categoryBtnText,
                                !selectedCategory && styles.categoryBtnTextActive,
                            ]}
                        >
                            全部
                        </Text>
                    </Pressable>
                    {Object.entries(poiConfig).map(([type, config]) => (
                        <Pressable
                            key={type}
                            onPress={() => setSelectedCategory(type)}
                            style={[
                                styles.categoryBtn,
                                selectedCategory === type && styles.categoryBtnActive,
                            ]}
                        >
                            <Ionicons
                                name={config.icon as any}
                                size={16}
                                color={selectedCategory === type ? colors.white : config.color}
                            />
                            <Text
                                style={[
                                    styles.categoryBtnText,
                                    selectedCategory === type && styles.categoryBtnTextActive,
                                ]}
                            >
                                {config.label}
                            </Text>
                        </Pressable>
                    ))}
                </ScrollView>
            </View>

            {/* 底部面板 */}
            <ScrollView style={styles.bottomPanel}>
                {/* 服务入口 */}
                <View style={styles.serviceGrid}>
                    {serviceEntries.map((entry) => (
                        <Pressable
                            key={entry.id}
                            onPress={() => handleServicePress(entry.id)}
                            style={({ pressed }) => [
                                styles.serviceItem,
                                pressed && styles.serviceItemPressed,
                            ]}
                        >
                            <View style={[styles.serviceIcon, { backgroundColor: `${entry.color}15` }]}>
                                <Ionicons name={entry.icon as any} size={24} color={entry.color} />
                            </View>
                            <Text style={styles.serviceLabel}>{entry.label}</Text>
                        </Pressable>
                    ))}
                </View>

                {/* 智能推荐 */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>附近推荐</Text>
                        <View style={styles.smartBadge}>
                            <Ionicons name="sparkles" size={14} color={colors.primary} />
                            <Text style={styles.smartBadgeText}>{getRecommendReason()}</Text>
                        </View>
                    </View>

                    {/* POI 列表 */}
                    {filteredPOIs.map((poi) => {
                        const config = poiConfig[poi.type];
                        return (
                            <Pressable
                                key={poi.id}
                                onPress={() => router.push(`/services/poi-detail?id=${poi.id}`)}
                                style={({ pressed }) => [
                                    styles.poiItem,
                                    pressed && styles.poiItemPressed,
                                ]}
                            >
                                <View style={[styles.poiIcon, { backgroundColor: `${config.color}15` }]}>
                                    <Ionicons name={config.icon as any} size={20} color={config.color} />
                                </View>
                                <View style={styles.poiInfo}>
                                    <Text style={styles.poiName}>{poi.name}</Text>
                                    <View style={styles.poiMeta}>
                                        <Text style={styles.poiDistance}>{poi.distance}</Text>
                                        {poi.rating && (
                                            <>
                                                <View style={styles.poiDot} />
                                                <Ionicons name="star" size={12} color="#F59E0B" />
                                                <Text style={styles.poiRating}>{poi.rating}</Text>
                                            </>
                                        )}
                                    </View>
                                </View>
                                <Pressable
                                    onPress={() => handleNavigate(poi)}
                                    style={styles.navBtn}
                                >
                                    <Ionicons name="navigate" size={20} color={colors.primary} />
                                </Pressable>
                            </Pressable>
                        );
                    })}
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
    mapArea: {
        height: 280,
        backgroundColor: "#E2E8F0",
        position: "relative",
    },
    mapPlaceholder: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    mapPlaceholderText: {
        color: "#94A3B8",
        marginTop: 8,
        fontSize: 16,
    },
    currentLocation: {
        position: "absolute",
        top: "50%",
        left: "50%",
        marginLeft: -20,
        marginTop: -20,
        backgroundColor: colors.primary,
        borderRadius: 20,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 8,
    },
    safeZoneIndicator: {
        position: "absolute",
        top: 48,
        right: 16,
        backgroundColor: colors.white,
        borderRadius: 12,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    safeZoneDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.green,
        marginRight: 6,
    },
    safeZoneText: {
        color: colors.foreground,
        fontSize: 13,
    },
    categoryBar: {
        position: "absolute",
        bottom: 16,
        left: 0,
        right: 0,
    },
    categoryBarContent: {
        paddingHorizontal: 16,
        gap: 8,
    },
    categoryBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.white,
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 20,
        gap: 6,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    categoryBtnActive: {
        backgroundColor: colors.primary,
    },
    categoryBtnText: {
        color: colors.foreground,
        fontSize: 14,
    },
    categoryBtnTextActive: {
        color: colors.white,
    },
    bottomPanel: {
        flex: 1,
        backgroundColor: colors.white,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        marginTop: -16,
    },
    serviceGrid: {
        flexDirection: "row",
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    serviceItem: {
        flex: 1,
        alignItems: "center",
    },
    serviceItemPressed: {
        opacity: 0.7,
    },
    serviceIcon: {
        width: 52,
        height: 52,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
    },
    serviceLabel: {
        color: colors.foreground,
        fontSize: 13,
    },
    section: {
        padding: 16,
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    sectionTitle: {
        color: colors.foreground,
        fontSize: 17,
        fontWeight: "bold",
    },
    smartBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        gap: 4,
    },
    smartBadgeText: {
        color: colors.primary,
        fontSize: 12,
    },
    poiItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    poiItemPressed: {
        backgroundColor: "#F8FAFC",
    },
    poiIcon: {
        width: 44,
        height: 44,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    poiInfo: {
        flex: 1,
        marginLeft: 12,
    },
    poiName: {
        color: colors.foreground,
        fontSize: 15,
        fontWeight: "500",
    },
    poiMeta: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 2,
    },
    poiDistance: {
        color: colors.muted,
        fontSize: 13,
    },
    poiDot: {
        width: 3,
        height: 3,
        borderRadius: 1.5,
        backgroundColor: colors.muted,
        marginHorizontal: 8,
    },
    poiRating: {
        color: colors.foreground,
        fontSize: 13,
        marginLeft: 2,
    },
    navBtn: {
        padding: 10,
    },
});

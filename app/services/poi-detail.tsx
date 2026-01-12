import React from "react";
import {
    View,
    Text,
    ScrollView,
    Pressable,
    StyleSheet,
    Linking,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Icon from "@/components/Icon";
import { mockPOIs } from "@/data/mockData";

const colors = {
    primary: "#3B82F6",
    background: "#F8FAFC",
    foreground: "#1E293B",
    muted: "#64748B",
    border: "#E2E8F0",
    white: "#FFFFFF",
    green: "#10B981",
};

/**
 * POI 详情�?(Task 1.3)
 */
export default function POIDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();

    const poi = mockPOIs.find((p) => p.id === id) || mockPOIs[0];

    const handleCall = () => {
        Linking.openURL("tel:400-888-8888");
    };

    const handleNavigate = () => {
        const url = `https://maps.apple.com/?daddr=${poi.lat},${poi.lng}`;
        Linking.openURL(url);
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                {/* 头图区域 */}
                <View style={styles.header}>
                    <View style={styles.imagePlaceholder}>
                        <Icon name="image" size={48} color="#CBD5E1" />
                    </View>
                </View>

                {/* 基本信息 */}
                <View style={styles.content}>
                    <Text style={styles.name}>{poi.name}</Text>
                    <View style={styles.metaRow}>
                        <View style={styles.metaItem}>
                            <Icon name="location" size={16} color={colors.muted} />
                            <Text style={styles.metaText}>{poi.distance}</Text>
                        </View>
                        {poi.rating && (
                            <View style={styles.metaItem}>
                                <Icon name="star" size={16} color="#F59E0B" />
                                <Text style={styles.metaText}>{poi.rating} �?/Text>
                            </View>
                        )}
                        <View style={styles.metaItem}>
                            <Icon name="time" size={16} color={colors.muted} />
                            <Text style={styles.metaText}>营业�?/Text>
                        </View>
                    </View>

                    {/* 地址 */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>地址</Text>
                        <Text style={styles.address}>北京市朝阳区望京 SOHO T1 1�?/Text>
                    </View>

                    {/* 服务项目 */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>服务项目</Text>
                        <View style={styles.tags}>
                            {["疫苗接种", "体检", "美容", "寄养"].map((tag) => (
                                <View key={tag} style={styles.tag}>
                                    <Text style={styles.tagText}>{tag}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* 营业时间 */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>营业时间</Text>
                        <Text style={styles.infoText}>周一至周�?09:00 - 21:00</Text>
                    </View>

                    {/* 联系电话 */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>联系电话</Text>
                        <Pressable onPress={handleCall}>
                            <Text style={styles.phone}>400-888-8888</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>

            {/* 底部操作�?*/}
            <View style={styles.footer}>
                <Pressable onPress={handleCall} style={styles.callBtn}>
                    <Icon name="call" size={20} color={colors.primary} />
                    <Text style={styles.callBtnText}>电话咨询</Text>
                </Pressable>
                <Pressable onPress={handleNavigate} style={styles.navBtn}>
                    <Icon name="navigate" size={20} color={colors.white} />
                    <Text style={styles.navBtnText}>导航前往</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        height: 200,
        backgroundColor: "#E2E8F0",
    },
    imagePlaceholder: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    content: {
        padding: 16,
    },
    name: {
        color: colors.foreground,
        fontSize: 22,
        fontWeight: "bold",
    },
    metaRow: {
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
        fontSize: 14,
    },
    section: {
        marginTop: 24,
    },
    sectionTitle: {
        color: colors.muted,
        fontSize: 14,
        marginBottom: 8,
    },
    address: {
        color: colors.foreground,
        fontSize: 15,
    },
    tags: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },
    tag: {
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
    },
    tagText: {
        color: colors.primary,
        fontSize: 14,
    },
    infoText: {
        color: colors.foreground,
        fontSize: 15,
    },
    phone: {
        color: colors.primary,
        fontSize: 16,
        fontWeight: "500",
    },
    footer: {
        flexDirection: "row",
        padding: 16,
        paddingBottom: 32,
        backgroundColor: colors.white,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        gap: 12,
    },
    callBtn: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.primary,
        gap: 6,
    },
    callBtnText: {
        color: colors.primary,
        fontSize: 16,
        fontWeight: "600",
    },
    navBtn: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: colors.primary,
        gap: 6,
    },
    navBtnText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "600",
    },
});

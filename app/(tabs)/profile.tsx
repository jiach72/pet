import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import Icon from "@/components/Icon";

// 设计系统颜色
const colors = {
    primary: "#3B82F6",
    background: "#F8FAFC",
    foreground: "#1E293B",
    muted: "#64748B",
    border: "#E2E8F0",
    white: "#FFFFFF",
    green: "#16A34A",
    red: "#EF4444",
    purple: "#8B5CF6",
};

/**
 * 我的页 - 宠物档案 + 设置
 */
export default function ProfileScreen() {
    const user = { name: "小明", petCount: 1 };
    const pet = {
        name: "豆豆",
        breed: "金毛寻回犬",
        age: "2岁3个月",
        weight: "28kg",
        hardwareType: "pro",
        vaccineVerified: true,
        healthScore: 92,
    };

    const menuItems = [
        { icon: "medical", label: "健康档案", color: colors.red },
        { icon: "calendar", label: "疫苗记录", color: colors.green },
        { icon: "shield", label: "保险服务", color: colors.primary },
        { icon: "home", label: "智能家居", color: colors.purple },
        { icon: "settings", label: "设备管理", color: colors.muted },
    ];

    return (
        <ScrollView style={styles.container}>
            {/* 用户信息 */}
            <View style={styles.header}>
                <View style={styles.userRow}>
                    <View style={styles.avatar}>
                        <Icon name="person" size={32} color="white" />
                    </View>
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>{user.name}</Text>
                        <Text style={styles.userSubtitle}>已守护 {user.petCount} 只宠物</Text>
                    </View>
                    <Pressable style={styles.settingsBtn}>
                        <Icon name="settings-outline" size={24} color="white" />
                    </Pressable>
                </View>
            </View>

            {/* 宠物档案卡片 */}
            <View style={styles.petCardContainer}>
                <View style={styles.petCard}>
                    <View style={styles.petCardHeader}>
                        <View style={styles.petAvatar}>
                            <Icon name="paw" size={28} color={colors.primary} />
                        </View>
                        <View style={styles.petInfo}>
                            <View style={styles.petNameRow}>
                                <Text style={styles.petName}>{pet.name}</Text>
                                {pet.vaccineVerified && (
                                    <View style={styles.greenShieldBadge}>
                                        <Icon name="shield-checkmark" size={12} color={colors.green} />
                                        <Text style={styles.greenShieldText}>绿盾</Text>
                                    </View>
                                )}
                            </View>
                            <Text style={styles.petBreed}>{pet.breed}</Text>
                        </View>
                        <View style={styles.healthScore}>
                            <Text style={styles.healthScoreValue}>{pet.healthScore}</Text>
                            <Text style={styles.healthScoreLabel}>健康分</Text>
                        </View>
                    </View>

                    <View style={styles.petStats}>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{pet.age}</Text>
                            <Text style={styles.statLabel}>年龄</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{pet.weight}</Text>
                            <Text style={styles.statLabel}>体重</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{pet.hardwareType.toUpperCase()}</Text>
                            <Text style={styles.statLabel}>设备</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* 功能菜单 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>服务中心</Text>
                <View style={styles.menuCard}>
                    {menuItems.map((item, index) => (
                        <Pressable
                            key={item.label}
                            style={({ pressed }) => [
                                styles.menuItem,
                                index !== menuItems.length - 1 && styles.menuItemBorder,
                                pressed && styles.menuItemPressed,
                            ]}
                        >
                            <View style={[styles.menuIcon, { backgroundColor: `${item.color}15` }]}>
                                <Icon name={item.icon as any} size={20} color={item.color} />
                            </View>
                            <Text style={styles.menuLabel}>{item.label}</Text>
                            <Icon name="chevron-forward" size={20} color="#CBD5E1" />
                        </Pressable>
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
        backgroundColor: colors.background,
    },
    header: {
        backgroundColor: colors.primary,
        paddingTop: 48,
        paddingBottom: 32,
        paddingHorizontal: 16,
    },
    userRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: "rgba(255,255,255,0.2)",
        alignItems: "center",
        justifyContent: "center",
    },
    userInfo: {
        flex: 1,
        marginLeft: 16,
    },
    userName: {
        color: colors.white,
        fontSize: 20,
        fontWeight: "bold",
    },
    userSubtitle: {
        color: "rgba(255,255,255,0.8)",
        fontSize: 14,
    },
    settingsBtn: {
        backgroundColor: "rgba(255,255,255,0.2)",
        padding: 8,
        borderRadius: 20,
    },
    petCardContainer: {
        paddingHorizontal: 16,
        marginTop: -16,
    },
    petCard: {
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: colors.border,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    petCardHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    petAvatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        alignItems: "center",
        justifyContent: "center",
    },
    petInfo: {
        flex: 1,
        marginLeft: 12,
    },
    petNameRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    petName: {
        color: colors.foreground,
        fontSize: 18,
        fontWeight: "bold",
    },
    greenShieldBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#DCFCE7",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 20,
        marginLeft: 8,
    },
    greenShieldText: {
        color: colors.green,
        fontSize: 12,
        marginLeft: 4,
    },
    petBreed: {
        color: colors.muted,
        fontSize: 14,
    },
    healthScore: {
        alignItems: "center",
    },
    healthScoreValue: {
        color: colors.primary,
        fontSize: 24,
        fontWeight: "bold",
    },
    healthScoreLabel: {
        color: colors.muted,
        fontSize: 12,
    },
    petStats: {
        flexDirection: "row",
        borderTopWidth: 1,
        borderTopColor: colors.border,
        paddingTop: 12,
    },
    statItem: {
        flex: 1,
        alignItems: "center",
    },
    statValue: {
        color: colors.foreground,
        fontSize: 16,
        fontWeight: "bold",
    },
    statLabel: {
        color: colors.muted,
        fontSize: 12,
    },
    statDivider: {
        width: 1,
        backgroundColor: colors.border,
    },
    section: {
        paddingHorizontal: 16,
        marginTop: 24,
    },
    sectionTitle: {
        color: colors.foreground,
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 12,
    },
    menuCard: {
        backgroundColor: colors.white,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.border,
        overflow: "hidden",
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
    },
    menuItemBorder: {
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    menuItemPressed: {
        backgroundColor: "#F8FAFC",
    },
    menuIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    menuLabel: {
        flex: 1,
        color: colors.foreground,
        fontSize: 16,
    },
});

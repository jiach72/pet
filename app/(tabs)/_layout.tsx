import { Tabs } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import Icon from "@/components/Icon";

/**
 * Tab 导航布局
 * - 守护（默认）| 社交 | 地图 | 我的
 */
export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#3B82F6",
                tabBarInactiveTintColor: "#64748B",
                tabBarStyle: {
                    backgroundColor: "#FFFFFF",
                    borderTopColor: "#F1F5F9",
                    borderTopWidth: 1,
                    paddingTop: 12,
                    paddingBottom: 12,
                    height: 64,
                },
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: "500",
                    marginTop: 4,
                },
                tabBarIconStyle: {
                    marginTop: 0,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "健康",
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="shield-checkmark" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="discovery"
                options={{
                    title: "发现",
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="compass-outline" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="market"
                options={{
                    title: "周边",
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="layout-grid" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "我的",
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="person-outline" size={24} color={color} />
                    ),
                }}
            />
            {/* 隐藏原本的地图和社区路由，它们现在通过聚合页面进入 */}
            <Tabs.Screen
                name="map"
                options={{
                    href: null,
                }}
            />
            <Tabs.Screen
                name="social"
                options={{
                    href: null,
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    centerTab: {
        width: 54,
        height: 54,
        backgroundColor: '#3B82F6',
        borderRadius: 27,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20, // 向上偏移形成凸起感
        borderWidth: 4,
        borderColor: '#FFFFFF',
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    }
});

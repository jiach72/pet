import { Tabs } from "expo-router";
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
                    borderTopColor: "#E2E8F0",
                    borderTopWidth: 1,
                    paddingTop: 8,
                    paddingBottom: 20,
                    height: 70,
                },
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: "500",
                    marginTop: 2,
                },
                tabBarIconStyle: {
                    marginTop: 4,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "守护",
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="shield-checkmark" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="social"
                options={{
                    title: "社交",
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="people" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="map"
                options={{
                    title: "地图",
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="map" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "我的",
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="person" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}

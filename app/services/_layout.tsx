import { Stack } from "expo-router";

/**
 * 服务子页面 Stack 布局
 */
export default function ServicesLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                headerStyle: { backgroundColor: "#FFFFFF" },
                headerTitleStyle: { fontWeight: "600", color: "#1E293B" },
                headerTintColor: "#3B82F6",
                headerShadowVisible: false,
            }}
        >
            <Stack.Screen name="poi-detail" options={{ title: "详情" }} />
            <Stack.Screen name="insurance" options={{ title: "宠物保险" }} />
        </Stack>
    );
}

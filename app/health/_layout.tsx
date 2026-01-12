import { Stack } from "expo-router";

/**
 * 健康子页面 Stack 布局
 */
export default function HealthLayout() {
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
            <Stack.Screen name="alerts" options={{ title: "健康预警" }} />
            <Stack.Screen name="profile" options={{ title: "宠物档案" }} />
            <Stack.Screen name="records" options={{ title: "就医记录" }} />
            <Stack.Screen name="vaccines" options={{ title: "疫苗记录" }} />
            <Stack.Screen name="weight" options={{ title: "体重趋势" }} />
            <Stack.Screen name="vitals-detail" options={{ title: "体征详情" }} />
        </Stack>
    );
}

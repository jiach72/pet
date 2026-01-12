import { Stack } from "expo-router";

/**
 * 智能家居页面 Stack 布局
 */
export default function SmartHomeLayout() {
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
            <Stack.Screen name="index" options={{ title: "智能家居" }} />
            <Stack.Screen name="rules" options={{ title: "自动化规则" }} />
        </Stack>
    );
}

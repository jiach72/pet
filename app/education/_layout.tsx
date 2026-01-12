import { Stack } from "expo-router";

/**
 * 科普子页面 Stack 布局
 */
export default function EducationLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                headerStyle: { backgroundColor: "#FFFFFF" },
                headerTitleStyle: { fontWeight: "600", color: "#1E293B" },
                headerTintColor: "#10B981",
                headerShadowVisible: false,
            }}
        >
            <Stack.Screen name="index" options={{ title: "健康科普" }} />
            <Stack.Screen name="article" options={{ title: "文章详情" }} />
        </Stack>
    );
}

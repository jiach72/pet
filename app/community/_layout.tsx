import { Stack } from "expo-router";

/**
 * 社区子页面 Stack 布局
 */
export default function CommunityLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                headerStyle: { backgroundColor: "#FFFFFF" },
                headerTitleStyle: { fontWeight: "600", color: "#1E293B" },
                headerTintColor: "#8B5CF6",
                headerShadowVisible: false,
            }}
        >
            <Stack.Screen name="events" options={{ title: "社区活动" }} />
            <Stack.Screen name="charity" options={{ title: "爱心公益" }} />
            <Stack.Screen name="wedding" options={{ title: "宠物婚礼" }} />
            <Stack.Screen name="memorial" options={{ title: "宠物纪念" }} />
            <Stack.Screen name="matching" options={{ title: "宠物配对" }} />
        </Stack>
    );
}

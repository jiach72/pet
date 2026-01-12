import { Stack } from "expo-router";

/**
 * 社交子页面 Stack 布局
 */
export default function SocialLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                headerStyle: { backgroundColor: "#FFFFFF" },
                headerTitleStyle: {
                    fontWeight: "600",
                    color: "#1E293B",
                },
                headerTintColor: "#3B82F6",
                headerShadowVisible: false,
            }}
        >
            <Stack.Screen
                name="diary-history"
                options={{ title: "情感日记" }}
            />
            <Stack.Screen
                name="vaccine-upload"
                options={{ title: "绿盾认证" }}
            />
            <Stack.Screen
                name="challenge"
                options={{ title: "发起挑战" }}
            />
        </Stack>
    );
}

import { Stack } from "expo-router";

/**
 * 商城子页面 Stack 布局
 */
export default function ShopLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                headerStyle: { backgroundColor: "#FFFFFF" },
                headerTitleStyle: { fontWeight: "600", color: "#1E293B" },
                headerTintColor: "#F97316",
                headerShadowVisible: false,
            }}
        >
            <Stack.Screen name="index" options={{ title: "宠物商城" }} />
            <Stack.Screen name="pet-listing" options={{ title: "宠物寄卖" }} />
        </Stack>
    );
}

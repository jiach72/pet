import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

/**
 * 根布局：Stack 导航 + Modal 支持
 * - (tabs) 组作为默认路由
 * - lost-mode 作为全屏 Modal 覆盖
 */
export default function RootLayout() {
    return (
        <>
            <StatusBar style="auto" />
            <Stack screenOptions={{ headerShown: false }}>
                {/* Tab 导航组 */}
                <Stack.Screen name="(tabs)" />

                {/* 丢失模式：全屏 Modal */}
                <Stack.Screen
                    name="lost-mode"
                    options={{
                        presentation: "modal",
                        animation: "slide_from_bottom",
                    }}
                />
            </Stack>
        </>
    );
}

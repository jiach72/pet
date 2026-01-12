import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useCallback } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import * as SplashScreen from "expo-splash-screen";

// 保持 splash screen 直到准备完毕
SplashScreen.preventAutoHideAsync().catch(() => { });

/**
 * 根布局：Stack 导航 + Modal 支持
 * - 简化字体加载，避免阻塞
 */
export default function RootLayout() {
    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                // 短暂延迟确保布局就绪
                await new Promise(resolve => setTimeout(resolve, 100));
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }
        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync().catch(() => { });
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    return (
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
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
        </View>
    );
}

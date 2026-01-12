import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

/**
 * 根布局：Stack 导航 + Modal 支持
 * - 预加载 Ionicons 字体
 * - (tabs) 组作为默认路由
 * - lost-mode 作为全屏 Modal 覆盖
 */
export default function RootLayout() {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync({
                ...Ionicons.font,
            });
            setFontsLoaded(true);
        }
        loadFonts();
    }, []);

    if (!fontsLoaded) {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <ActivityIndicator size="large" color="#3B82F6" />
            </View>
        );
    }

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

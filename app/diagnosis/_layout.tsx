import { Stack } from "expo-router";

/**
 * AI 诊断页面 Stack 布局
 */
export default function DiagnosisLayout() {
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
            <Stack.Screen name="stool" options={{ title: "粪便分析" }} />
            <Stack.Screen name="vocal" options={{ title: "声音听诊" }} />
        </Stack>
    );
}

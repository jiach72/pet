import React from "react";
import { View, Text, StyleSheet } from "react-native";

const colors = {
    background: "#F8FAFC",
    foreground: "#1E293B",
    muted: "#64748B",
};

/**
 * 体征详情页占位
 */
export default function VitalsDetailScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>体征详情页</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: colors.muted,
        fontSize: 16,
    },
});

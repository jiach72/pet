import React, { useState } from "react";
import {
    View,
    Text,
    ScrollView,
    Pressable,
    StyleSheet,
    Alert,
} from "react-native";
import { useRouter } from "expo-router";
import Icon from "@/components/Icon";

const colors = {
    primary: "#3B82F6",
    green: "#16A34A",
    background: "#F8FAFC",
    foreground: "#1E293B",
    muted: "#64748B",
    border: "#E2E8F0",
    white: "#FFFFFF",
};

// Mock 好友列表
const mockFriends = [
    { id: "user-002", name: "小红", petName: "萌萌" },
    { id: "user-003", name: "小李", petName: "小黄" },
    { id: "user-004", name: "小张", petName: "花花" },
    { id: "user-005", name: "小王", petName: "大黑" },
];

// 挑战时长选项
const durationOptions = [
    { days: 3, label: "3 �? },
    { days: 7, label: "1 �? },
    { days: 14, label: "2 �? },
];

/**
 * 1V1 挑战�?(Task 4.2, 4.3)
 */
export default function ChallengeScreen() {
    const router = useRouter();
    const [selectedFriend, setSelectedFriend] = useState<string | null>(null);
    const [selectedDuration, setSelectedDuration] = useState(7);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!selectedFriend) {
            Alert.alert("提示", "请选择挑战对手");
            return;
        }

        setIsSubmitting(true);

        // Mock 发起挑战
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const friend = mockFriends.find((f) => f.id === selectedFriend);

        Alert.alert("挑战已发起！", `已向 ${friend?.petName} 发起 ${selectedDuration} 天步数挑战，等待对方接受。`, [
            { text: "好的", onPress: () => router.back() },
        ]);

        setIsSubmitting(false);
    };

    return (
        <ScrollView style={styles.container}>
            {/* 选择对手 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>选择挑战对手</Text>
                <View style={styles.friendList}>
                    {mockFriends.map((friend) => (
                        <Pressable
                            key={friend.id}
                            onPress={() => setSelectedFriend(friend.id)}
                            style={[
                                styles.friendItem,
                                selectedFriend === friend.id && styles.friendItemSelected,
                            ]}
                        >
                            <View style={styles.friendAvatar}>
                                <Text style={styles.friendAvatarEmoji}>🐕</Text>
                            </View>
                            <View style={styles.friendInfo}>
                                <Text style={styles.friendPetName}>{friend.petName}</Text>
                                <Text style={styles.friendOwnerName}>{friend.name}</Text>
                            </View>
                            {selectedFriend === friend.id && (
                                <Icon
                                    name="checkmark-circle"
                                    size={24}
                                    color={colors.primary}
                                />
                            )}
                        </Pressable>
                    ))}
                </View>
            </View>

            {/* 挑战时长 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>挑战时长</Text>
                <View style={styles.durationOptions}>
                    {durationOptions.map((option) => (
                        <Pressable
                            key={option.days}
                            onPress={() => setSelectedDuration(option.days)}
                            style={[
                                styles.durationItem,
                                selectedDuration === option.days && styles.durationItemSelected,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.durationText,
                                    selectedDuration === option.days && styles.durationTextSelected,
                                ]}
                            >
                                {option.label}
                            </Text>
                        </Pressable>
                    ))}
                </View>
            </View>

            {/* 规则说明 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>挑战规则</Text>
                <View style={styles.rulesCard}>
                    <View style={styles.ruleItem}>
                        <Icon name="footsteps" size={20} color={colors.primary} />
                        <Text style={styles.ruleText}>比拼期间累计步数</Text>
                    </View>
                    <View style={styles.ruleItem}>
                        <Icon name="trophy" size={20} color={colors.primary} />
                        <Text style={styles.ruleText}>步数更多者获�?/Text>
                    </View>
                    <View style={styles.ruleItem}>
                        <Icon name="megaphone" size={20} color={colors.primary} />
                        <Text style={styles.ruleText}>输家自动发布认输动态（可关闭）</Text>
                    </View>
                </View>
            </View>

            {/* 发起按钮 */}
            <View style={styles.footer}>
                <Pressable
                    onPress={handleSubmit}
                    disabled={isSubmitting || !selectedFriend}
                    style={({ pressed }) => [
                        styles.submitBtn,
                        pressed && styles.submitBtnPressed,
                        (!selectedFriend || isSubmitting) && styles.submitBtnDisabled,
                    ]}
                >
                    <Icon name="flash" size={24} color={colors.white} />
                    <Text style={styles.submitBtnText}>
                        {isSubmitting ? "发起�?.." : "发起挑战"}
                    </Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    section: {
        padding: 16,
    },
    sectionTitle: {
        color: colors.foreground,
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 12,
    },
    friendList: {
        gap: 8,
    },
    friendItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.white,
        borderRadius: 12,
        padding: 12,
        borderWidth: 2,
        borderColor: colors.border,
    },
    friendItemSelected: {
        borderColor: colors.primary,
        backgroundColor: "rgba(59, 130, 246, 0.05)",
    },
    friendAvatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: colors.background,
        alignItems: "center",
        justifyContent: "center",
    },
    friendAvatarEmoji: {
        fontSize: 24,
    },
    friendInfo: {
        flex: 1,
        marginLeft: 12,
    },
    friendPetName: {
        color: colors.foreground,
        fontSize: 16,
        fontWeight: "600",
    },
    friendOwnerName: {
        color: colors.muted,
        fontSize: 14,
    },
    durationOptions: {
        flexDirection: "row",
        gap: 12,
    },
    durationItem: {
        flex: 1,
        paddingVertical: 16,
        backgroundColor: colors.white,
        borderRadius: 12,
        alignItems: "center",
        borderWidth: 2,
        borderColor: colors.border,
    },
    durationItemSelected: {
        borderColor: colors.primary,
        backgroundColor: "rgba(59, 130, 246, 0.05)",
    },
    durationText: {
        color: colors.muted,
        fontSize: 16,
        fontWeight: "500",
    },
    durationTextSelected: {
        color: colors.primary,
        fontWeight: "bold",
    },
    rulesCard: {
        backgroundColor: colors.white,
        borderRadius: 12,
        padding: 16,
        gap: 12,
    },
    ruleItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    ruleText: {
        color: colors.foreground,
        fontSize: 14,
    },
    footer: {
        padding: 16,
        paddingBottom: 32,
    },
    submitBtn: {
        backgroundColor: colors.primary,
        borderRadius: 16,
        paddingVertical: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    submitBtnPressed: {
        opacity: 0.9,
    },
    submitBtnDisabled: {
        opacity: 0.5,
    },
    submitBtnText: {
        color: colors.white,
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 8,
    },
});

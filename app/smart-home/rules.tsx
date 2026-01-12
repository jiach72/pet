import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, StyleSheet, Alert } from "react-native";
import Icon from "@/components/Icon";
import { colors, borderRadius, shadows, spacing } from "@/constants/theme";
import { getRules, toggleRule, deleteRule, triggerConfig, SmartRule } from "@/services/smartHomeService";

/**
 * 自动化规则页面 - 使用 react-icons SVG
 */
export default function RulesScreen() {
    const [rules, setRules] = useState<SmartRule[]>(getRules());

    const handleToggle = (ruleId: string) => {
        toggleRule(ruleId);
        setRules(getRules());
    };

    const handleDelete = (rule: SmartRule) => {
        Alert.alert("删除规则", `确定要删除"${rule.name}"吗？`, [
            { text: "取消", style: "cancel" },
            { text: "删除", style: "destructive", onPress: () => { deleteRule(rule.id); setRules(getRules()); } },
        ]);
    };

    const formatLastTriggered = (date?: Date) => {
        if (!date) return "从未触发";
        const hours = Math.floor((Date.now() - date.getTime()) / 3600000);
        if (hours < 1) return "刚刚触发";
        if (hours < 24) return `${hours}小时前触发`;
        return `${Math.floor(hours / 24)}天前触发`;
    };

    return (
        <ScrollView style={styles.container}>
            {rules.length === 0 ? (
                <View style={styles.emptyState}>
                    <View style={styles.emptyIcon}>
                        <Icon name="git-branch" size={48} color={colors.muted} />
                    </View>
                    <Text style={styles.emptyTitle}>暂无自动化规则</Text>
                    <Text style={styles.emptyDesc}>通过快捷场景一键创建，或手动创建自定义规则</Text>
                </View>
            ) : (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>已创建的规则</Text>
                    {rules.map((rule) => {
                        const trigger = triggerConfig[rule.trigger.type];
                        return (
                            <View key={rule.id} style={styles.ruleCard}>
                                <View style={styles.ruleHeader}>
                                    <View style={styles.ruleNameRow}>
                                        <Icon name={rule.isActive ? "radio-button-on" : "radio-button-off"} size={20} color={rule.isActive ? colors.secondary : colors.muted} />
                                        <Text style={styles.ruleName}>{rule.name}</Text>
                                    </View>
                                    <View style={styles.ruleActions}>
                                        <Pressable onPress={() => handleToggle(rule.id)} style={styles.actionBtn}>
                                            <Icon name={rule.isActive ? "pause" : "play"} size={18} color={colors.primary} />
                                        </Pressable>
                                        <Pressable onPress={() => handleDelete(rule)} style={styles.actionBtn}>
                                            <Icon name="trash-outline" size={18} color={colors.error} />
                                        </Pressable>
                                    </View>
                                </View>
                                <View style={styles.ruleFlow}>
                                    <View style={styles.flowItem}>
                                        <View style={[styles.flowIcon, { backgroundColor: `${colors.warning}15` }]}>
                                            <Icon name="flash" size={16} color={colors.warning} />
                                        </View>
                                        <Text style={styles.flowLabel}>当</Text>
                                        <Text style={styles.flowValue}>{trigger?.label}</Text>
                                    </View>
                                    <Icon name="chevron-forward" size={16} color={colors.muted} />
                                    <View style={styles.flowItem}>
                                        <View style={[styles.flowIcon, { backgroundColor: `${colors.secondary}15` }]}>
                                            <Icon name="cog" size={16} color={colors.secondary} />
                                        </View>
                                        <Text style={styles.flowLabel}>则</Text>
                                        <Text style={styles.flowValue}>{rule.action.deviceName} {rule.action.description}</Text>
                                    </View>
                                </View>
                                <View style={styles.ruleFooter}>
                                    <Text style={styles.lastTriggered}>{formatLastTriggered(rule.lastTriggered)}</Text>
                                </View>
                            </View>
                        );
                    })}
                </View>
            )}

            <View style={styles.section}>
                <View style={styles.tipCard}>
                    <Icon name="bulb" size={20} color={colors.info} />
                    <Text style={styles.tipText}>提示：可以通过首页的"快捷场景"一键创建常用规则</Text>
                </View>
            </View>

            <View style={{ height: 32 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    section: { padding: spacing.lg },
    sectionTitle: { color: colors.foreground, fontSize: 17, fontWeight: "700", marginBottom: spacing.md },
    emptyState: { alignItems: "center", paddingVertical: spacing.xxxl * 2, paddingHorizontal: spacing.xxl },
    emptyIcon: { width: 100, height: 100, borderRadius: 50, backgroundColor: colors.backgroundSecondary, alignItems: "center", justifyContent: "center", marginBottom: spacing.lg },
    emptyTitle: { color: colors.foreground, fontSize: 18, fontWeight: "600" },
    emptyDesc: { color: colors.muted, fontSize: 14, textAlign: "center", marginTop: spacing.sm, lineHeight: 20 },
    ruleCard: { backgroundColor: colors.white, borderRadius: borderRadius.xl, padding: spacing.lg, marginBottom: spacing.md, ...shadows.card },
    ruleHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.md },
    ruleNameRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
    ruleName: { color: colors.foreground, fontSize: 16, fontWeight: "600" },
    ruleActions: { flexDirection: "row", gap: spacing.sm },
    actionBtn: { width: 32, height: 32, borderRadius: borderRadius.sm, backgroundColor: colors.background, alignItems: "center", justifyContent: "center" },
    ruleFlow: { backgroundColor: colors.background, borderRadius: borderRadius.md, padding: spacing.md, gap: spacing.sm, alignItems: "center" },
    flowItem: { flexDirection: "row", alignItems: "center", gap: spacing.sm, width: "100%" },
    flowIcon: { width: 28, height: 28, borderRadius: 14, alignItems: "center", justifyContent: "center" },
    flowLabel: { color: colors.muted, fontSize: 13 },
    flowValue: { color: colors.foreground, fontSize: 14, fontWeight: "500", flex: 1 },
    ruleFooter: { marginTop: spacing.md, paddingTop: spacing.md, borderTopWidth: 1, borderTopColor: colors.border },
    lastTriggered: { color: colors.muted, fontSize: 12 },
    tipCard: { flexDirection: "row", alignItems: "center", backgroundColor: `${colors.info}10`, padding: spacing.md, borderRadius: borderRadius.md, gap: spacing.sm },
    tipText: { flex: 1, color: colors.foreground, fontSize: 14, lineHeight: 20 },
});

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Icon from '@/components/Icon';
import { Theme } from '@/constants/theme';

const { width } = Dimensions.get('window');

export default function HealthReport() {
    const router = useRouter();
    const [period, setPeriod] = useState('周报');

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => router.back()} style={styles.backBtn}>
                    <Icon name="chevron-back" size={24} color={Theme.colors.foreground} />
                </Pressable>
                <Text style={styles.title}>健康深度报告</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* 周期选择 */}
                <View style={styles.periodSelector}>
                    {['日报', '周报', '月报'].map((p) => (
                        <Pressable
                            key={p}
                            onPress={() => setPeriod(p)}
                            style={[styles.periodBtn, period === p && styles.activePeriodBtn]}
                        >
                            <Text style={[styles.periodText, period === p && styles.activePeriodText]}>{p}</Text>
                        </Pressable>
                    ))}
                </View>

                {/* 核心洞察卡片 */}
                <View style={styles.insightCard}>
                    <View style={styles.insightHeader}>
                        <Icon name="sparkles" size={20} color="#8B5CF6" />
                        <Text style={styles.insightTitle}>本{period}核心洞察</Text>
                    </View>
                    <Text style={styles.insightText}>
                        本{period}您的宠物健康状况处于“优秀”水平。HRV 表现稳定，反映其对环境适应力极佳。睡眠质量环比上升 12%，建议保持当前的饮食和作息。
                    </Text>
                </View>

                {/* HRV 压力分析 */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>HRV 压力分析</Text>
                        <Icon name="information-circle" size={16} color={Theme.colors.muted} />
                    </View>
                    <View style={styles.hrvMain}>
                        <View style={styles.hrvCircle}>
                            <Text style={styles.hrvVal}>65</Text>
                            <Text style={styles.hrvLab}>ms</Text>
                        </View>
                        <View style={styles.hrvInfo}>
                            <Text style={styles.hrvStatusText}>状态：心理放松</Text>
                            <Text style={styles.hrvDesc}>
                                心率变异性(HRV)越高，代表宠物的自主神经系统越平衡，对压力处理越从容。
                            </Text>
                        </View>
                    </View>
                </View>

                {/* 睡眠分期专家报告 */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>睡眠分期报告</Text>
                        <Text style={styles.scoreLink}>专家评分 88</Text>
                    </View>
                    <View style={styles.sleepStages}>
                        <View style={styles.stageItem}>
                            <View style={[styles.stageBar, { height: 100, backgroundColor: '#4338CA' }]} />
                            <Text style={styles.stageLab}>深睡</Text>
                        </View>
                        <View style={styles.stageItem}>
                            <View style={[styles.stageBar, { height: 120, backgroundColor: '#6366F1' }]} />
                            <Text style={styles.stageLab}>浅睡</Text>
                        </View>
                        <View style={styles.stageItem}>
                            <View style={[styles.stageBar, { height: 40, backgroundColor: '#818CF8' }]} />
                            <Text style={styles.stageLab}>REM</Text>
                        </View>
                        <View style={styles.stageItem}>
                            <View style={[styles.stageBar, { height: 20, backgroundColor: '#C7D2FE' }]} />
                            <Text style={styles.stageLab}>清醒</Text>
                        </View>
                    </View>
                </View>

                {/* 趋势预测 */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>健康趋势预测</Text>
                    </View>
                    <View style={styles.trendRow}>
                        <View style={styles.trendItem}>
                            <Text style={styles.trendLabel}>静息心率</Text>
                            <View style={styles.trendValueRow}>
                                <Text style={styles.trendValue}>72</Text>
                                <Icon name="trending-down" size={14} color="#10B981" />
                            </View>
                            <Text style={styles.trendChange}>稳定</Text>
                        </View>
                        <View style={styles.trendItem}>
                            <Text style={styles.trendLabel}>体重趋势</Text>
                            <View style={styles.trendValueRow}>
                                <Text style={styles.trendValue}>12.5</Text>
                                <Icon name="trending-up" size={14} color="#EF4444" />
                            </View>
                            <Text style={styles.trendChange}>+0.2 kg</Text>
                        </View>
                    </View>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8FAFC' },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, backgroundColor: '#FFFFFF' },
    backBtn: { width: 40, height: 40, justifyContent: 'center' },
    title: { fontSize: 18, fontWeight: 'bold', color: '#1E293B' },
    scrollContent: { padding: 16 },
    periodSelector: { flexDirection: 'row', backgroundColor: '#F1F5F9', borderRadius: 12, padding: 4, marginBottom: 20 },
    periodBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
    activePeriodBtn: { backgroundColor: '#FFFFFF', ...Theme.shadows.card },
    periodText: { fontSize: 14, color: '#64748B', fontWeight: '500' },
    activePeriodText: { color: Theme.colors.primary, fontWeight: 'bold' },
    insightCard: { backgroundColor: '#F5F3FF', padding: 16, borderRadius: 16, marginBottom: 20 },
    insightHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
    insightTitle: { fontSize: 15, fontWeight: 'bold', color: '#5B21B6' },
    insightText: { fontSize: 14, color: '#5B21B6', lineHeight: 20, opacity: 0.8 },
    section: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 16, marginBottom: 16, ...Theme.shadows.card },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#1E293B' },
    hrvMain: { flexDirection: 'row', alignItems: 'center', gap: 20 },
    hrvCircle: { width: 80, height: 80, borderRadius: 40, borderWeight: 4, borderColor: '#8B5CF6', borderStyle: 'solid', borderWidth: 4, alignItems: 'center', justifyContent: 'center' },
    hrvVal: { fontSize: 24, fontWeight: 'bold', color: '#8B5CF6' },
    hrvLab: { fontSize: 12, color: '#8B5CF6' },
    hrvInfo: { flex: 1 },
    hrvStatusText: { fontSize: 15, fontWeight: 'bold', color: '#1E293B', marginBottom: 4 },
    hrvDesc: { fontSize: 12, color: '#64748B', lineHeight: 16 },
    scoreLink: { fontSize: 14, color: Theme.colors.primary, fontWeight: 'bold' },
    sleepStages: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', height: 160, paddingTop: 20 },
    stageItem: { alignItems: 'center', gap: 8 },
    stageBar: { width: 40, borderRadius: 8 },
    stageLab: { fontSize: 11, color: '#64748B' },
    trendRow: { flexDirection: 'row', gap: 12 },
    trendItem: { flex: 1, backgroundColor: '#F8FAFC', padding: 12, borderRadius: 12 },
    trendLabel: { fontSize: 12, color: '#64748B', marginBottom: 6 },
    trendValueRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 2 },
    trendValue: { fontSize: 20, fontWeight: 'bold', color: '#1E293B' },
    trendChange: { fontSize: 11, color: '#94A3B8' },
});

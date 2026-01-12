import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Icon from '@/components/Icon';
import { Theme } from '@/constants/theme';
import { TrendChart } from '@/components/health/TrendChart';

const { width } = Dimensions.get('window');

export default function SleepDetail() {
    const router = useRouter();
    const [timeRange, setTimeRange] = useState('24h');

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => router.back()} style={styles.backBtn}>
                    <Icon name="chevron-back" size={24} color={Theme.colors.foreground} />
                </Pressable>
                <Text style={styles.title}>睡眠详情</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.mainCard}>
                    <Text style={styles.mainLabel}>昨晚睡眠时长</Text>
                    <View style={styles.valueRow}>
                        <Text style={styles.value}>8</Text>
                        <Text style={styles.unit}>小时</Text>
                        <Text style={styles.value}>24</Text>
                        <Text style={styles.unit}>分钟</Text>
                    </View>
                    <View style={styles.statusBadge}>
                        <Text style={styles.statusText}>睡眠质量优</Text>
                    </View>
                </View>

                {/* 趋势图表区 */}
                <View style={styles.trendSection}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>睡眠趋势分析</Text>
                        <View style={styles.rangeSelector}>
                            {['1h', '24h', '7d'].map((r) => (
                                <Pressable
                                    key={r}
                                    onPress={() => setTimeRange(r)}
                                    style={[styles.rangeBtn, timeRange === r && styles.activeRangeBtn]}
                                >
                                    <Text style={[styles.rangeBtnText, timeRange === r && styles.activeRangeBtnText]}>{r}</Text>
                                </Pressable>
                            ))}
                        </View>
                    </View>
                    <View style={styles.chartArea}>
                        <TrendChart type="sleep" range={timeRange} color="#6366F1" />
                    </View>
                </View>

                {/* 睡眠分期预览 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>睡眠分期</Text>
                    <View style={styles.stageRow}>
                        <View style={styles.stageItem}>
                            <View style={[styles.stageIcon, { backgroundColor: '#4338CA' }]} />
                            <Text style={styles.stageLabel}>深睡 2.5h</Text>
                        </View>
                        <View style={styles.stageItem}>
                            <View style={[styles.stageIcon, { backgroundColor: '#6366F1' }]} />
                            <Text style={styles.stageLabel}>浅睡 4.8h</Text>
                        </View>
                        <View style={styles.stageItem}>
                            <View style={[styles.stageIcon, { backgroundColor: '#818CF8' }]} />
                            <Text style={styles.stageLabel}>REM 1.1h</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.infoSection}>
                    <Text style={styles.sectionTitle}>睡眠对宠物的重要性</Text>
                    <Text style={styles.infoText}>
                        高质量的睡眠是宠物免疫系统修复和记忆整合的关键时期。成年犬猫平均每天需要 12-14 小时的睡眠。如果您发现宠物睡眠时间突然剧增或频繁在夜间惊醒，可能需要关注其身体不适或环境噪音影响。
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8FAFC' },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#FFFFFF' },
    backBtn: { width: 40, height: 40, justifyContent: 'center' },
    title: { fontSize: 18, fontWeight: 'bold', color: '#1E293B' },
    mainCard: { backgroundColor: '#FFFFFF', padding: 32, alignItems: 'center', marginBottom: 12 },
    mainLabel: { fontSize: 14, color: '#64748B', marginBottom: 8 },
    valueRow: { flexDirection: 'row', alignItems: 'baseline', gap: 4 },
    value: { fontSize: 44, fontWeight: 'bold', color: '#6366F1' },
    unit: { fontSize: 16, color: '#64748B', marginRight: 8 },
    statusBadge: { marginTop: 16, backgroundColor: '#E0E7FF', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
    statusText: { color: '#4338CA', fontSize: 12, fontWeight: 'bold' },
    trendSection: { backgroundColor: '#FFFFFF', padding: 16, marginBottom: 12 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#1E293B' },
    rangeSelector: { flexDirection: 'row', backgroundColor: '#F1F5F9', borderRadius: 8, padding: 2 },
    rangeBtn: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 6 },
    activeRangeBtn: { backgroundColor: '#FFFFFF', ...Theme.shadows.card },
    rangeBtnText: { fontSize: 12, color: '#64748B' },
    activeRangeBtnText: { color: '#3B82F6', fontWeight: 'bold' },
    chartArea: { height: 180, justifyContent: 'center' },
    section: { backgroundColor: '#FFFFFF', padding: 16, marginBottom: 12 },
    stageRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
    stageItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    stageIcon: { width: 12, height: 12, borderRadius: 3 },
    stageLabel: { fontSize: 12, color: '#64748B' },
    infoSection: { padding: 16 },
    infoText: { fontSize: 14, color: '#475569', lineHeight: 20 },
});

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Icon from '@/components/Icon';
import { Theme } from '@/constants/theme';
import { useVitals } from '@/hooks/useVitals';
import { TrendChart } from '@/components/health/TrendChart';

export default function RespiratoryDetail() {
    const router = useRouter();
    const { vitals } = useVitals("pet-001");
    const [timeRange, setTimeRange] = useState('1h');

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => router.back()} style={styles.backBtn}>
                    <Icon name="chevron-back" size={24} color={Theme.colors.foreground} />
                </Pressable>
                <Text style={styles.title}>呼吸率详情</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.mainCard}>
                    <Text style={styles.mainLabel}>实时呼吸频率</Text>
                    <View style={styles.valueRow}>
                        <Text style={styles.value}>{vitals.respiratoryRate}</Text>
                        <Text style={styles.unit}>次/分</Text>
                    </View>
                    <View style={styles.statusBadge}>
                        <Text style={styles.statusText}>呼吸平稳</Text>
                    </View>
                </View>

                {/* 趋势图表区 */}
                <View style={styles.trendSection}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>呼吸趋势分析</Text>
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
                        <TrendChart type="respiratory" range={timeRange} color="#10B981" />
                    </View>
                </View>

                <View style={styles.infoSection}>
                    <Text style={styles.sectionTitle}>什么是呼吸频率监测？</Text>
                    <Text style={styles.infoText}>
                        呼吸频率是评估宠物心肺健康的核心指标。静息状态下平稳的呼吸（通常在15-30次/分）反映了宠物身体处于放松且血氧充足的状态。如果呼吸突然加快，可能预示着疼痛、焦虑或潜在的心肺问题。
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
    value: { fontSize: 56, fontWeight: 'bold', color: '#10B981' },
    unit: { fontSize: 18, color: '#64748B' },
    statusBadge: { marginTop: 16, backgroundColor: '#DCFCE7', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
    statusText: { color: '#059669', fontSize: 12, fontWeight: 'bold' },
    trendSection: { backgroundColor: '#FFFFFF', padding: 16, marginBottom: 12 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#1E293B' },
    rangeSelector: { flexDirection: 'row', backgroundColor: '#F1F5F9', borderRadius: 8, padding: 2 },
    rangeBtn: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 6 },
    activeRangeBtn: { backgroundColor: '#FFFFFF', ...Theme.shadows.card },
    rangeBtnText: { fontSize: 12, color: '#64748B' },
    activeRangeBtnText: { color: '#3B82F6', fontWeight: 'bold' },
    chartArea: { height: 180, justifyContent: 'center' },
    infoSection: { padding: 16 },
    infoText: { fontSize: 14, color: '#475569', lineHeight: 20 },
});

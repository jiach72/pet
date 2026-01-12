import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Icon from '@/components/Icon';
import { Theme } from '@/constants/theme';
import { useVitals } from '@/hooks/useVitals';
import { TrendChart } from '@/components/health/TrendChart';

export default function TemperatureDetail() {
    const router = useRouter();
    const { vitals } = useVitals("pet-001");
    const [timeRange, setTimeRange] = useState('1h');

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => router.back()} style={styles.backBtn}>
                    <Icon name="chevron-back" size={24} color={Theme.colors.foreground} />
                </Pressable>
                <Text style={styles.title}>体温详情</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.mainCard}>
                    <Text style={styles.mainLabel}>当前体温</Text>
                    <View style={styles.valueRow}>
                        <Text style={styles.value}>{vitals.temperature.toFixed(1)}</Text>
                        <Text style={styles.unit}>°C</Text>
                    </View>
                    <View style={styles.statusBadge}>
                        <Text style={styles.statusText}>正常体温范围</Text>
                    </View>
                </View>

                {/* 趋势图表区 */}
                <View style={styles.trendSection}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>体温趋势分析</Text>
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
                        <TrendChart type="temperature" range={timeRange} color="#F59E0B" />
                    </View>
                </View>

                <View style={styles.infoSection}>
                    <Text style={styles.sectionTitle}>体温监测说明</Text>
                    <Text style={styles.infoText}>
                        宠物的正常体温通常在 38.0°C - 39.2°C 之间。环境温度、运动状态或应激反应都可能引起体温波动。若体温持续高于 39.5°C 或低于 37.5°C，请及时咨询兽医。
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
    value: { fontSize: 56, fontWeight: 'bold', color: '#F59E0B' },
    unit: { fontSize: 18, color: '#64748B' },
    statusBadge: { marginTop: 16, backgroundColor: '#FEF3C7', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
    statusText: { color: '#B45309', fontSize: 12, fontWeight: 'bold' },
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

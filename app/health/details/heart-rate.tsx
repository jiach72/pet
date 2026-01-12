import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Icon from '@/components/Icon';
import { Theme } from '@/constants/theme';
import { useVitals } from '@/hooks/useVitals';
import { HeartRateChart } from '@/components/health/HeartRateChart';
import { TrendChart } from '@/components/health/TrendChart';

const { width } = Dimensions.get('window');

export default function HeartRateDetail() {
    const router = useRouter();
    const { vitals, ecgPoints, history } = useVitals("pet-001");
    const [timeRange, setTimeRange] = useState('1h');

    const stats = useMemo(() => {
        return [
            { label: '静息心率', value: '72', unit: 'BPM' },
            { label: '最高心率', value: '118', unit: 'BPM' },
            { label: '平均心率', value: '84', unit: 'BPM' },
        ];
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => router.back()} style={styles.backBtn}>
                    <Icon name="chevron-back" size={24} color={Theme.colors.foreground} />
                </Pressable>
                <Text style={styles.title}>心率详情</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* 实时波形显示区 */}
                <View style={styles.realtimeSection}>
                    <View style={styles.liveBadge}>
                        <View style={styles.liveDot} />
                        <Text style={styles.liveText}>实时推流中 4G</Text>
                    </View>
                    <View style={styles.mainValueRow}>
                        <Text style={styles.mainValue}>{vitals.heartRate}</Text>
                        <Text style={styles.mainUnit}>BPM</Text>
                    </View>
                    <View style={styles.chartContainer}>
                        <HeartRateChart points={ecgPoints} heartRate={vitals.heartRate} showTitle={false} />
                    </View>
                </View>

                {/* 统计概览 */}
                <View style={styles.statsRow}>
                    {stats.map((s, i) => (
                        <View key={i} style={styles.statCard}>
                            <Text style={styles.statLabel}>{s.label}</Text>
                            <View style={styles.statValueRow}>
                                <Text style={styles.statValue}>{s.value}</Text>
                                <Text style={styles.statUnit}>{s.unit}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* 趋势图表区 */}
                <View style={styles.trendSection}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>心率趋势</Text>
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
                        <TrendChart type="heartRate" range={timeRange} color={Theme.colors.error} />
                    </View>
                </View>

                {/* 健康建议 */}
                <View style={styles.adviceCard}>
                    <Icon name="information-circle" size={20} color={Theme.colors.primary} />
                    <View style={styles.adviceContent}>
                        <Text style={styles.adviceTitle}>专业分析</Text>
                        <Text style={styles.adviceText}>
                            当前心率处于正常安静区间。今日心率变异性(HRV)表现良好，反映宠物处于放松且健康的自主神经状态。
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
    },
    backBtn: {
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1E293B',
    },
    realtimeSection: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 24,
        alignItems: 'center',
        marginBottom: 12,
    },
    liveBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F5F9',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        marginBottom: 16,
    },
    liveDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#EF4444',
        marginRight: 6,
    },
    liveText: {
        fontSize: 11,
        color: '#64748B',
        fontWeight: 'bold',
    },
    mainValueRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 4,
        marginBottom: 20,
    },
    mainValue: {
        fontSize: 64,
        fontWeight: 'bold',
        color: '#1E293B',
    },
    mainUnit: {
        fontSize: 20,
        color: '#64748B',
        fontWeight: '600',
    },
    chartContainer: {
        width: width - 32,
        height: 120,
    },
    statsRow: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        gap: 12,
        marginBottom: 12,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 12,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    statLabel: {
        fontSize: 12,
        color: '#64748B',
        marginBottom: 4,
    },
    statValueRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 2,
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1E293B',
    },
    statUnit: {
        fontSize: 10,
        color: '#94A3B8',
    },
    trendSection: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        marginBottom: 12,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1E293B',
    },
    rangeSelector: {
        flexDirection: 'row',
        backgroundColor: '#F1F5F9',
        borderRadius: 8,
        padding: 2,
    },
    rangeBtn: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 6,
    },
    activeRangeBtn: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    rangeBtnText: {
        fontSize: 12,
        color: '#64748B',
    },
    activeRangeBtnText: {
        color: '#3B82F6',
        fontWeight: 'bold',
    },
    chartArea: {
        height: 190,
        justifyContent: 'center',
    },
    adviceCard: {
        flexDirection: 'row',
        marginHorizontal: 16,
        padding: 16,
        backgroundColor: '#EFF6FF',
        borderRadius: 16,
        gap: 12,
        marginBottom: 24,
    },
    adviceContent: {
        flex: 1,
    },
    adviceTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1E40AF',
        marginBottom: 4,
    },
    adviceText: {
        fontSize: 13,
        color: '#1E40AF',
        lineHeight: 18,
        opacity: 0.8,
    },
});

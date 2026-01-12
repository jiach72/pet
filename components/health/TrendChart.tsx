import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Theme } from '@/constants/theme';

const { width } = Dimensions.get('window');

interface TrendChartProps {
    type: 'heartRate' | 'temperature' | 'respiratory' | 'activity' | 'sleep';
    range: string; // '1h' | '24h' | '7d'
    color?: string;
}

export function TrendChart({ type, range, color = Theme.colors.primary }: TrendChartProps) {
    const chartWidth = width - 64;
    const chartHeight = 150;

    // 根据 range 生成模拟数据点
    const points = useMemo(() => {
        const count = range === '7d' ? 7 : range === '24h' ? 24 : 12;
        const pts: number[] = [];

        let base = 0;
        let volatility = 0;

        switch (type) {
            case 'heartRate': base = 80; volatility = 15; break;
            case 'temperature': base = 38.5; volatility = 0.5; break;
            case 'respiratory': base = 22; volatility = 4; break;
            case 'activity': base = 50; volatility = 30; break;
            case 'sleep': base = 8; volatility = 2; break;
        }

        for (let i = 0; i < count; i++) {
            pts.push(base + (Math.random() - 0.5) * volatility);
        }
        return pts;
    }, [type, range]);

    const pathData = useMemo(() => {
        if (points.length < 2) return '';
        const step = chartWidth / (points.length - 1);
        const minVal = Math.min(...points) * 0.95;
        const maxVal = Math.max(...points) * 1.05;
        const rangeVal = maxVal - minVal || 1;

        return points.map((p, i) => {
            const x = i * step;
            const y = chartHeight - ((p - minVal) / rangeVal) * chartHeight;
            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
        }).join(' ');
    }, [points, chartWidth, chartHeight]);

    const labels = useMemo(() => {
        if (range === '7d') return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        if (range === '24h') return ['00:00', '06:00', '12:00', '18:00', '23:59'];
        return ['10m', '20m', '30m', '40m', '50m', 'Now'];
    }, [range]);

    return (
        <View style={styles.container}>
            <View style={styles.chartWrapper}>
                <svg width={chartWidth} height={chartHeight} style={{ overflow: 'visible' }}>
                    <defs>
                        <linearGradient id="chartFill" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
                            <stop offset="100%" stopColor={color} stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <path
                        d={`${pathData} L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`}
                        fill="url(#chartFill)"
                    />
                    <path
                        d={pathData}
                        fill="none"
                        stroke={color}
                        strokeWidth="3"
                        strokeLinecap="round"
                    />
                </svg>
            </View>
            <View style={styles.labelRow}>
                {labels.map((l, i) => (
                    <Text key={i} style={styles.labelText}>{l}</Text>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
    },
    chartWrapper: {
        height: 150,
        marginBottom: 12,
    },
    labelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 4,
    },
    labelText: {
        fontSize: 10,
        color: '#94A3B8',
        fontWeight: '500',
    },
});

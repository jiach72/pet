import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from '@/components/Icon';
import { Theme } from '@/constants/theme';

interface ActivityRingsProps {
    steps: number;
    calories: number;
    activeMinutes: number;
    goals: {
        steps: number;
        calories: number;
        activeMinutes: number;
    };
}

export const ActivityRings = ({ steps, calories, activeMinutes, goals }: ActivityRingsProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>今日活动</Text>
                <Icon name="chevron-forward" size={16} color={Theme.colors.muted} />
            </View>
            <View style={styles.content}>
                <View style={[styles.statItem, { borderColor: '#F97316' }]}>
                    <Text style={styles.statLabel}>步数</Text>
                    <Text style={styles.statValue}>{steps.toLocaleString()}</Text>
                    <Text style={styles.statGoal}>/ {goals.steps}</Text>
                </View>
                <View style={[styles.statItem, { borderColor: '#EF4444' }]}>
                    <Text style={styles.statLabel}>热量</Text>
                    <Text style={styles.statValue}>{calories}</Text>
                    <Text style={styles.statGoal}>/ {goals.calories} kcal</Text>
                </View>
                <View style={[styles.statItem, { borderColor: '#10B981' }]}>
                    <Text style={styles.statLabel}>活跃</Text>
                    <Text style={styles.statValue}>{activeMinutes}</Text>
                    <Text style={styles.statGoal}>/ {goals.activeMinutes} min</Text>
                </View>
            </View>
            <View style={styles.progressBarBg}>
                <View style={[styles.progressBar, { width: `${Math.min((steps / goals.steps) * 100, 100)}%`, backgroundColor: '#F97316' }]} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Theme.colors.surface || '#FFFFFF',
        borderRadius: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#1E293B',
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    statItem: {
        flex: 1,
        borderLeftWidth: 3,
        paddingLeft: 8,
    },
    statLabel: {
        fontSize: 11,
        color: '#64748B',
        marginBottom: 2,
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1E293B',
    },
    statGoal: {
        fontSize: 10,
        color: '#94A3B8',
    },
    progressBarBg: {
        height: 6,
        backgroundColor: '#F1F5F9',
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        borderRadius: 3,
    },
});

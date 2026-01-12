import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from '@/components/Icon';
import { Theme } from '@/constants/theme';

interface SleepCardProps {
    duration: string;
    deepSleep: string;
    quality: string;
    score: number;
}

export const SleepCard = ({ duration, deepSleep, quality, score }: SleepCardProps) => {
    const router = useRouter();
    return (
        <Pressable
            onPress={() => router.push('/health/details/sleep')}
            style={({ pressed }) => [styles.container, pressed && styles.pressed]}
        >
            <View style={styles.header}>
                <View style={styles.titleRow}>
                    <Icon name="moon" size={18} color="#6366F1" />
                    <Text style={styles.title}>昨晚睡眠</Text>
                </View>
                <Text style={styles.scoreText}>{score}分</Text>
            </View>
            <View style={styles.mainInfo}>
                <Text style={styles.duration}>{duration}</Text>
                <View style={styles.qualityBadge}>
                    <Text style={styles.qualityText}>{quality}</Text>
                </View>
            </View>
            <View style={styles.subInfo}>
                <View style={styles.subItem}>
                    <Text style={styles.subLabel}>深睡时长</Text>
                    <Text style={styles.subValue}>{deepSleep}</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.subItem}>
                    <Text style={styles.subLabel}>睡眠分期</Text>
                    <View style={styles.stagesContainer}>
                        <View style={[styles.stageBar, { flex: 3, backgroundColor: '#4338CA' }]} />
                        <View style={[styles.stageBar, { flex: 5, backgroundColor: '#6366F1' }]} />
                        <View style={[styles.stageBar, { flex: 2, backgroundColor: '#818CF8' }]} />
                    </View>
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#1E293B',
    },
    scoreText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#6366F1',
    },
    mainInfo: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 8,
        marginBottom: 16,
    },
    duration: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1E293B',
    },
    qualityBadge: {
        backgroundColor: '#EEF2FF',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
    },
    qualityText: {
        fontSize: 11,
        color: '#6366F1',
        fontWeight: '600',
    },
    subInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    subItem: {
        flex: 1,
    },
    subLabel: {
        fontSize: 11,
        color: '#64748B',
        marginBottom: 4,
    },
    subValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1E293B',
    },
    divider: {
        width: 1,
        height: 24,
        backgroundColor: '#F1F5F9',
        marginHorizontal: 12,
    },
    stagesContainer: {
        flexDirection: 'row',
        height: 6,
        borderRadius: 3,
        overflow: 'hidden',
        gap: 2,
    },
    stageBar: {
        height: '100%',
    },
    pressed: {
        opacity: 0.7,
        backgroundColor: '#F8FAFC',
    },
});

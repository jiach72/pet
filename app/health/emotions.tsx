import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Pressable, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Icon from '@/components/Icon';
import { Theme } from '@/constants/theme';

const { width } = Dimensions.get('window');

const emotions = [
    { day: 'Mon', icon: 'happy', color: '#FCD34D', label: '开心' },
    { day: 'Tue', icon: 'leaf', color: '#34D399', label: '放松' },
    { day: 'Wed', icon: 'thunderstorm', color: '#60A5FA', label: '焦虑' },
    { day: 'Thu', icon: 'happy', color: '#FCD34D', label: '开心' },
    { day: 'Fri', icon: 'flash', color: '#F87171', label: '兴奋' },
    { day: 'Sat', icon: 'leaf', color: '#34D399', label: '放松' },
    { day: 'Sun', icon: 'happy', color: '#FCD34D', label: '开心' },
];

export default function EmotionInteraction() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => router.back()} style={styles.backBtn}>
                    <Icon name="chevron-back" size={24} color={Theme.colors.foreground} />
                </Pressable>
                <Text style={styles.title}>情绪与行为</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* 情绪日历 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>近 7 日情绪日历</Text>
                    <View style={styles.calendarRow}>
                        {emotions.map((e, i) => (
                            <View key={i} style={styles.calendarDay}>
                                <Text style={styles.dayText}>{e.day}</Text>
                                <View style={[styles.emotionIconBg, { backgroundColor: `${e.color}20` }]}>
                                    <Icon name={e.icon as any} size={20} color={e.color} />
                                </View>
                                <Text style={styles.emotionLabel}>{e.label}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* AI 宠语卡片 */}
                <View style={styles.aiCard}>
                    <View style={styles.aiCardHeader}>
                        <View style={styles.aiAvatar}>
                            <Icon name="paw" size={16} color="#FFFFFF" />
                        </View>
                        <Text style={styles.aiName}>豆豆的今日心语</Text>
                    </View>
                    <View style={styles.quoteBox}>
                        <Text style={styles.quoteText}>
                            “主人，今天跑了 8500 步，感觉能追上风！晚上的睡眠质量特别好，梦里都是你给的小肉干。明天也请多多带我去公园哦！汪！”
                        </Text>
                    </View>
                    <View style={styles.aiFooter}>
                        <View style={styles.dataTag}>
                            <Text style={styles.dataTagText}>基于今日 4G 实时数据生成</Text>
                        </View>
                        <Pressable style={styles.shareBtn}>
                            <Icon name="share-social" size={18} color={Theme.colors.primary} />
                            <Text style={styles.shareText}>分享到朋友圈</Text>
                        </Pressable>
                    </View>
                </View>

                {/* 行为偏好分析 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>行为偏好洞察</Text>
                    <View style={styles.prefItem}>
                        <View style={styles.prefIcon}>
                            <Icon name="restaurant" size={20} color="#F59E0B" />
                        </View>
                        <View style={styles.prefContent}>
                            <Text style={styles.prefTitle}>进食热情高涨</Text>
                            <Text style={styles.prefDesc}>今日进食频率与活跃度高度匹配，显示食欲非常健康。</Text>
                        </View>
                    </View>
                    <View style={styles.prefItem}>
                        <View style={styles.prefIcon}>
                            <Icon name="medal" size={20} color="#3B82F6" />
                        </View>
                        <View style={styles.prefContent}>
                            <Text style={styles.prefTitle}>户外探索模式</Text>
                            <Text style={styles.prefDesc}>在小区草坪区停留时间翻倍，可能对该区域环境有极高兴趣。</Text>
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
    title: { fontSize: 18, fontWeight: 'bold' },
    scrollContent: { padding: 16 },
    section: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 20, marginBottom: 20, ...Theme.shadows.card },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#1E293B', marginBottom: 16 },
    calendarRow: { flexDirection: 'row', justifyContent: 'space-between' },
    calendarDay: { alignItems: 'center', gap: 6 },
    dayText: { fontSize: 11, color: '#94A3B8', fontWeight: 'bold' },
    emotionIconBg: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    emotionLabel: { fontSize: 10, color: '#64748B' },
    aiCard: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 24, marginBottom: 20, borderWidth: 1, borderColor: '#EEF2FF', ...Theme.shadows.card },
    aiCardHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 },
    aiAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: Theme.colors.secondary, alignItems: 'center', justifyContent: 'center' },
    aiName: { fontSize: 15, fontWeight: 'bold', color: '#1E293B' },
    quoteBox: { backgroundColor: '#F8FAFC', padding: 16, borderRadius: 16, borderLeftWidth: 4, borderLeftColor: Theme.colors.secondary },
    quoteText: { fontSize: 15, color: '#475569', lineHeight: 22, fontStyle: 'italic' },
    aiFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 },
    dataTag: { backgroundColor: '#F1F5F9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
    dataTagText: { fontSize: 10, color: '#94A3B8' },
    shareBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    shareText: { fontSize: 13, color: Theme.colors.primary, fontWeight: 'bold' },
    prefItem: { flexDirection: 'row', gap: 12, marginBottom: 16 },
    prefIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F1F5F9', alignItems: 'center', justifyContent: 'center' },
    prefContent: { flex: 1 },
    prefTitle: { fontSize: 14, fontWeight: 'bold', color: '#1E293B', marginBottom: 2 },
    prefDesc: { fontSize: 12, color: '#64748B', lineHeight: 18 },
});

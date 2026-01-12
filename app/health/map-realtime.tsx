import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Icon from '@/components/Icon';
import { Theme } from '@/constants/theme';

const { width, height } = Dimensions.get('window');

export default function SafetyMap() {
    const router = useRouter();
    const [mode, setMode] = useState<'realtime' | 'history' | 'fence'>('realtime');
    const [isOnline, setIsOnline] = useState(true);

    return (
        <View style={styles.container}>
            {/* 模拟地图背景层 */}
            <View style={styles.mapMock}>
                <View style={styles.petMarker}>
                    <View style={styles.petAvatarBg}>
                        <Icon name="paw" size={20} color="#FFFFFF" />
                    </View>
                    <View style={styles.markerPulse} />
                </View>

                {mode === 'fence' && (
                    <View style={styles.fenceCircle}>
                        <View style={styles.fenceCenter} />
                    </View>
                )}
            </View>

            {/* 浮动标题栏 */}
            <SafeAreaView style={styles.floatingHeader}>
                <View style={styles.headerContent}>
                    <Pressable onPress={() => router.back()} style={styles.headerBtn}>
                        <Icon name="chevron-back" size={24} color="#1E293B" />
                    </Pressable>
                    <View style={styles.headerTitleContainer}>
                        <Text style={styles.headerTitle}>实时安全寻宠</Text>
                        <View style={styles.statusRow}>
                            <View style={[styles.statusDot, { backgroundColor: isOnline ? '#10B981' : '#EF4444' }]} />
                            <Text style={styles.statusText}>{isOnline ? '项圈在线 (4G)' : '离线'}</Text>
                        </View>
                    </View>
                    <Pressable style={styles.headerBtn}>
                        <Icon name="settings-outline" size={22} color="#1E293B" />
                    </Pressable>
                </View>
            </SafeAreaView>

            {/* 功能切换层 */}
            <View style={styles.overlayControls}>
                <View style={styles.modeIcons}>
                    <Pressable onPress={() => setMode('realtime')} style={[styles.modeBtn, mode === 'realtime' && styles.activeModeBtn]}>
                        <Icon name="navigate" size={20} color={mode === 'realtime' ? '#FFFFFF' : '#64748B'} />
                    </Pressable>
                    <Pressable onPress={() => setMode('history')} style={[styles.modeBtn, mode === 'history' && styles.activeModeBtn]}>
                        <Icon name="time" size={20} color={mode === 'history' ? '#FFFFFF' : '#64748B'} />
                    </Pressable>
                    <Pressable onPress={() => setMode('fence')} style={[styles.modeBtn, mode === 'fence' && styles.activeModeBtn]}>
                        <Icon name="shield" size={20} color={mode === 'fence' ? '#FFFFFF' : '#64748B'} />
                    </Pressable>
                </View>

                <View style={styles.infoPanel}>
                    {mode === 'realtime' && (
                        <View style={styles.panelContent}>
                            <Text style={styles.panelTitle}>当前位置</Text>
                            <Text style={styles.address}>上海市浦东新区张江高科技园区 188 号</Text>
                            <View style={styles.panelStats}>
                                <View style={styles.panelStatItem}>
                                    <Icon name="battery-charging" size={14} color="#10B981" />
                                    <Text style={styles.statText}>85%</Text>
                                </View>
                                <View style={styles.dividerV} />
                                <View style={styles.panelStatItem}>
                                    <Icon name="walk-outline" size={14} color="#3B82F6" />
                                    <Text style={styles.statText}>距您 500m</Text>
                                </View>
                            </View>
                            <Pressable style={styles.mainActionBtn}>
                                <Text style={styles.mainActionText}>一键导航寻宠</Text>
                            </Pressable>
                        </View>
                    )}
                    {mode === 'history' && (
                        <View style={styles.panelContent}>
                            <Text style={styles.panelTitle}>今日活动轨迹</Text>
                            <Text style={styles.address}>累计行走 3.2 km · 停留 5 处</Text>
                            <View style={styles.historyPlayer}>
                                <Icon name="play-circle" size={32} color={Theme.colors.primary} />
                                <View style={styles.trackLine} />
                                <Text style={styles.trackTime}>08:00 - 现在</Text>
                            </View>
                        </View>
                    )}
                    {mode === 'fence' && (
                        <View style={styles.panelContent}>
                            <Text style={styles.panelTitle}>电子围栏管理</Text>
                            <Text style={styles.address}>半径 500m · 围栏生效中</Text>
                            <View style={styles.fenceToggle}>
                                <Text style={styles.fenceStatus}>离开区域立即告警</Text>
                                <View style={styles.toggleOn} />
                            </View>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#E2E8F0' },
    mapMock: { flex: 1, backgroundColor: '#CBD5E1', justifyContent: 'center', alignItems: 'center' },
    petMarker: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
    petAvatarBg: { width: 36, height: 36, borderRadius: 18, backgroundColor: Theme.colors.primary, borderWidth: 2, borderColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', zIndex: 2 },
    markerPulse: { position: 'absolute', width: 60, height: 60, borderRadius: 30, backgroundColor: 'rgba(59, 130, 246, 0.3)', zIndex: 1 },
    fenceCircle: { position: 'absolute', width: 300, height: 300, borderRadius: 150, backgroundColor: 'rgba(16, 185, 129, 0.1)', borderWidth: 2, borderColor: '#10B981', borderStyle: 'dashed' },
    fenceCenter: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#10B981' },
    floatingHeader: { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 },
    headerContent: { flexDirection: 'row', margin: 16, backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 16, padding: 8, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
    headerBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
    headerTitleContainer: { flex: 1, paddingLeft: 8 },
    headerTitle: { fontSize: 16, fontWeight: 'bold', color: '#1E293B' },
    statusRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
    statusDot: { width: 6, height: 6, borderRadius: 3 },
    statusText: { fontSize: 10, color: '#64748B' },
    overlayControls: { position: 'absolute', bottom: 32, left: 16, right: 16, gap: 12 },
    modeIcons: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: 16, padding: 6, alignSelf: 'flex-start', gap: 6, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
    modeBtn: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F1F5F9' },
    activeModeBtn: { backgroundColor: Theme.colors.primary },
    infoPanel: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 10 },
    panelContent: {},
    panelTitle: { fontSize: 18, fontWeight: 'bold', color: '#1E293B', marginBottom: 6 },
    address: { fontSize: 13, color: '#64748B', marginBottom: 16 },
    panelStats: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
    panelStatItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    statText: { fontSize: 12, color: '#1E293B', fontWeight: 'bold' },
    dividerV: { width: 1, height: 12, backgroundColor: '#E2E8F0' },
    mainActionBtn: { backgroundColor: Theme.colors.primary, paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
    mainActionText: { color: '#FFFFFF', fontSize: 15, fontWeight: 'bold' },
    historyPlayer: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10 },
    trackLine: { flex: 1, height: 4, backgroundColor: '#F1F5F9', borderRadius: 2 },
    trackTime: { fontSize: 12, color: '#64748B' },
    fenceToggle: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F0FDF4', padding: 12, borderRadius: 12 },
    fenceStatus: { fontSize: 14, color: '#166534', fontWeight: '600' },
    toggleOn: { width: 44, height: 24, borderRadius: 12, backgroundColor: '#10B981' },
});

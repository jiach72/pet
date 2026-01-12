import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Dimensions, Pressable, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from "expo-router";
import Icon from '@/components/Icon';
import { Theme } from "@/constants/theme";
import { MoodDiaryCard } from "@/components/social/MoodDiaryCard";
import { GreenShieldBadge } from "@/components/social/GreenShieldBadge";
import { LeaderboardCard } from "@/components/social/LeaderboardCard";
import { mockMoodDiaries, mockLeaderboard, mockGreenShield } from "@/data/mockData";
import { Section } from "@/components/ui/Section";

const { width } = Dimensions.get('window');
const COLUMN_GAP = 8;
const COLUMN_WIDTH = (width - 32 - COLUMN_GAP) / 2;
const CARD_IMAGE_HEIGHT = COLUMN_WIDTH * (4 / 3); // 3:4 比例

type MediaType = 'image' | 'video';

interface NoteItem {
    id: string;
    title: string;
    author: string;
    avatar: string;
    likes: number;
    image: string;
    mediaType: MediaType;
}

// 小红书风格的模拟笔记数据
const MOCK_NOTES: NoteItem[] = [
    {
        id: '1',
        title: '我的金毛豆豆今天超乖！学会了握手🐾',
        author: '爱狗人士小王',
        avatar: 'https://i.pravatar.cc/100?img=1',
        likes: 1289,
        image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=500&auto=format&fit=crop',
        mediaType: 'image',
    },
    {
        id: '2',
        title: '自制宠物零食教程｜狗狗爱吃疯了',
        author: '宠物大厨',
        avatar: 'https://i.pravatar.cc/100?img=2',
        likes: 2567,
        image: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?q=80&w=500&auto=format&fit=crop',
        mediaType: 'video',
    },
    {
        id: '3',
        title: '周末带主子去露营⛺️分享一些避坑经验',
        author: '旅行达人',
        avatar: 'https://i.pravatar.cc/100?img=3',
        likes: 892,
        image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=500&auto=format&fit=crop',
        mediaType: 'image',
    },
    {
        id: '4',
        title: '捡到一只小橘猫🐱求领养经验分享',
        author: '温暖之心',
        avatar: 'https://i.pravatar.cc/100?img=4',
        likes: 5123,
        image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=500&auto=format&fit=crop',
        mediaType: 'image',
    },
    {
        id: '5',
        title: 'PetPulse智能项圈测评｜一个月真实体验',
        author: '科技先驱',
        avatar: 'https://i.pravatar.cc/100?img=5',
        likes: 456,
        image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=500&auto=format&fit=crop',
        mediaType: 'video',
    },
    {
        id: '6',
        title: '又美又好拍的宠物咖啡馆📸探店',
        author: '打卡专家',
        avatar: 'https://i.pravatar.cc/100?img=6',
        likes: 1678,
        image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=500&auto=format&fit=crop',
        mediaType: 'image',
    },
    {
        id: '7',
        title: '新手养猫必看｜这些东西千万别买！',
        author: '猫奴日记',
        avatar: 'https://i.pravatar.cc/100?img=7',
        likes: 3421,
        image: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?q=80&w=500&auto=format&fit=crop',
        mediaType: 'video',
    },
    {
        id: '8',
        title: '带狗狗去海边玩水🏖️超开心',
        author: '海边少女',
        avatar: 'https://i.pravatar.cc/100?img=8',
        likes: 987,
        image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=500&auto=format&fit=crop',
        mediaType: 'image',
    },
];

// 本地热门模拟数据
const MOCK_LOCAL_NOTES: NoteItem[] = [
    {
        id: 'l1',
        title: '📍杭州西湖边遛狗好去处',
        author: '杭州小哥',
        avatar: 'https://i.pravatar.cc/100?img=10',
        likes: 234,
        image: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?q=80&w=500&auto=format&fit=crop',
        mediaType: 'image',
    },
    {
        id: 'l2',
        title: '本地宠物医院推荐｜亲测靠谱',
        author: '本地达人',
        avatar: 'https://i.pravatar.cc/100?img=11',
        likes: 567,
        image: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?q=80&w=500&auto=format&fit=crop',
        mediaType: 'image',
    },
    {
        id: 'l3',
        title: '周末宠物市集活动预告🎪',
        author: '活动组织者',
        avatar: 'https://i.pravatar.cc/100?img=12',
        likes: 890,
        image: 'https://images.unsplash.com/photo-1601758228041-f3b1795ea2fe?q=80&w=500&auto=format&fit=crop',
        mediaType: 'video',
    },
    {
        id: 'l4',
        title: '本地宠物寄养服务体验分享',
        author: '出差族',
        avatar: 'https://i.pravatar.cc/100?img=13',
        likes: 345,
        image: 'https://images.unsplash.com/photo-1544568100-847a948585b9?q=80&w=500&auto=format&fit=crop',
        mediaType: 'image',
    },
];

type TabType = 'discover' | 'follow' | 'local';

export default function DiscoveryScreen() {
    const [activeTab, setActiveTab] = React.useState<TabType>('discover');
    const [refreshing, setRefreshing] = React.useState(false);
    const router = useRouter();

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setRefreshing(false);
    }, []);

    const getCurrentNotes = () => {
        switch (activeTab) {
            case 'discover':
                return MOCK_NOTES;
            case 'local':
                return MOCK_LOCAL_NOTES;
            default:
                return [];
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* 小红书风格头部 - 三标签导航 */}
            <View style={styles.header}>
                <View style={styles.tabContainer}>
                    <Pressable
                        onPress={() => setActiveTab('discover')}
                        style={styles.tabItem}
                    >
                        <Text style={[styles.tabText, activeTab === 'discover' && styles.activeTabText]}>发现</Text>
                        {activeTab === 'discover' && <View style={styles.activeIndicator} />}
                    </Pressable>
                    <Pressable
                        onPress={() => setActiveTab('follow')}
                        style={styles.tabItem}
                    >
                        <Text style={[styles.tabText, activeTab === 'follow' && styles.activeTabText]}>关注</Text>
                        {activeTab === 'follow' && <View style={styles.activeIndicator} />}
                    </Pressable>
                    <Pressable
                        onPress={() => setActiveTab('local')}
                        style={styles.tabItem}
                    >
                        <View style={styles.localTab}>
                            <Icon name="location" size={14} color={activeTab === 'local' ? '#1E293B' : '#94A3B8'} />
                            <Text style={[styles.tabText, activeTab === 'local' && styles.activeTabText]}>本地</Text>
                        </View>
                        {activeTab === 'local' && <View style={styles.activeIndicator} />}
                    </Pressable>
                </View>
                <Pressable style={styles.searchBtn}>
                    <Icon name="search" size={22} color="#1E293B" />
                </Pressable>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FF2442" />}
            >
                {activeTab === 'follow' ? (
                    /* 关注动态 (原 Social 页内容) */
                    <View style={styles.socialContent}>
                        {/* 绿盾认证状态 */}
                        <View style={styles.socialSection}>
                            <GreenShieldBadge info={mockGreenShield} />
                        </View>

                        {/* 快速功能入口 */}
                        <View style={styles.quickActions}>
                            <Pressable onPress={() => router.push("/community/matching")} style={styles.actionItem}>
                                <View style={[styles.actionIcon, { backgroundColor: '#FFEDD5' }]}>
                                    <Icon name="matching" size={24} color="#F97316" />
                                </View>
                                <Text style={styles.actionText}>宠物配对</Text>
                            </Pressable>
                            <Pressable onPress={() => router.push("/community/charity")} style={styles.actionItem}>
                                <View style={[styles.actionIcon, { backgroundColor: '#DCFCE7' }]}>
                                    <Icon name="charity" size={24} color="#22C55E" />
                                </View>
                                <Text style={styles.actionText}>爱心公益</Text>
                            </Pressable>
                        </View>

                        {/* 情感日记 */}
                        <Section title="关注动态" titleStyle={styles.sectionTitle}>
                            <MoodDiaryCard
                                diary={mockMoodDiaries[0]}
                                onPress={() => router.push("/social/diary-history")}
                            />
                        </Section>

                        {/* 挑战赛排行榜 */}
                        <Section title="活力挑战赛" titleStyle={styles.sectionTitle}>
                            <LeaderboardCard
                                data={mockLeaderboard}
                                showToggle={false}
                                showViewAll={true}
                                limit={3}
                            />
                        </Section>
                    </View>
                ) : (
                    /* 发现/本地 - 小红书瀑布流 */
                    <View style={styles.waterfallContainer}>
                        <View style={styles.column}>
                            {getCurrentNotes().filter((_, i) => i % 2 === 0).map((item) => (
                                <NoteCard key={item.id} item={item} />
                            ))}
                        </View>
                        <View style={styles.column}>
                            {getCurrentNotes().filter((_, i) => i % 2 !== 0).map((item) => (
                                <NoteCard key={item.id} item={item} />
                            ))}
                        </View>
                    </View>
                )}
            </ScrollView>

            {/* 悬浮发布按钮 - 小红书风格 */}
            <Pressable
                style={styles.fab}
                onPress={() => router.push("/discovery/note-create")}
            >
                <Icon name="add" size={28} color="#FFFFFF" />
            </Pressable>
        </SafeAreaView>
    );
}

function NoteCard({ item }: { item: NoteItem }) {
    const formatLikes = (num: number) => {
        if (num >= 10000) return (num / 10000).toFixed(1) + '万';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
        return num.toString();
    };

    return (
        <Pressable style={styles.noteCard}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.noteImage} />
                {item.mediaType === 'video' && (
                    <View style={styles.videoIcon}>
                        <Icon name="play" size={16} color="#FFFFFF" />
                    </View>
                )}
            </View>
            <View style={styles.noteInfo}>
                <Text style={styles.noteTitle} numberOfLines={2}>{item.title}</Text>
                <View style={styles.noteFooter}>
                    <View style={styles.authorRow}>
                        <Image source={{ uri: item.avatar }} style={styles.authorAvatar} />
                        <Text style={styles.authorName} numberOfLines={1}>{item.author}</Text>
                    </View>
                    <View style={styles.likeContainer}>
                        <Icon name="heart" size={14} color="#94A3B8" />
                        <Text style={styles.likeCount}>{formatLikes(item.likes)}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 0.5,
        borderBottomColor: '#F1F5F9',
    },
    tabContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 24,
    },
    tabItem: {
        alignItems: 'center',
        paddingVertical: 4,
    },
    localTab: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },
    tabText: {
        fontSize: 16,
        color: '#94A3B8',
        fontWeight: '500',
    },
    activeTabText: {
        color: '#1E293B',
        fontWeight: 'bold',
        fontSize: 17,
    },
    activeIndicator: {
        width: 20,
        height: 3,
        backgroundColor: '#FF2442',
        borderRadius: 2,
        marginTop: 4,
    },
    searchBtn: {
        position: 'absolute',
        right: 16,
        padding: 4,
    },
    scrollContent: {
        paddingHorizontal: 12,
        paddingTop: 12,
        paddingBottom: 100,
    },
    socialContent: {
        paddingHorizontal: 4,
    },
    socialSection: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1E293B',
        marginBottom: 12,
    },
    quickActions: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 20,
    },
    actionItem: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 12,
        borderRadius: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    actionIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    actionText: {
        fontSize: 12,
        color: '#475569',
        fontWeight: '600',
    },
    waterfallContainer: {
        flexDirection: 'row',
        gap: COLUMN_GAP,
    },
    column: {
        width: COLUMN_WIDTH,
        gap: 12,
    },
    noteCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    imageContainer: {
        position: 'relative',
    },
    noteImage: {
        width: '100%',
        height: CARD_IMAGE_HEIGHT,
        backgroundColor: '#F1F5F9',
    },
    videoIcon: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noteInfo: {
        padding: 10,
    },
    noteTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1E293B',
        lineHeight: 20,
        marginBottom: 8,
    },
    noteFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    authorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 8,
    },
    authorAvatar: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginRight: 6,
        backgroundColor: '#E2E8F0',
    },
    authorName: {
        fontSize: 12,
        color: '#64748B',
        flex: 1,
    },
    likeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    likeCount: {
        fontSize: 12,
        color: '#94A3B8',
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 90,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#FF2442',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#FF2442',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 8,
    },
});

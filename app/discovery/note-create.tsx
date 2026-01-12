import React from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Icon from '@/components/Icon';

export default function NoteCreateScreen() {
    const router = useRouter();
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const [selectedImages, setSelectedImages] = React.useState<string[]>([]);

    const mockImages = [
        'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=300&auto=format&fit=crop',
    ];

    const handlePublish = () => {
        // 模拟发布逻辑
        alert('笔记发布成功！');
        router.back();
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* 头部导航 */}
            <View style={styles.header}>
                <Pressable onPress={() => router.back()} style={styles.closeBtn}>
                    <Icon name="close" size={24} color="#1E293B" />
                </Pressable>
                <Text style={styles.headerTitle}>发布笔记</Text>
                <Pressable
                    onPress={handlePublish}
                    style={[styles.publishBtn, (title || content) && styles.publishBtnActive]}
                >
                    <Text style={[styles.publishText, (title || content) && styles.publishTextActive]}>发布</Text>
                </Pressable>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* 图片/视频选择区 */}
                <View style={styles.mediaSection}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.mediaScroll}>
                        {/* 已选图片 */}
                        {mockImages.map((img, index) => (
                            <View key={index} style={styles.mediaItem}>
                                <Image source={{ uri: img }} style={styles.mediaImage} />
                                <Pressable style={styles.removeBtn}>
                                    <Icon name="close" size={12} color="#FFFFFF" />
                                </Pressable>
                            </View>
                        ))}
                        {/* 添加更多 */}
                        <Pressable style={styles.addMediaBtn}>
                            <Icon name="add" size={32} color="#94A3B8" />
                            <Text style={styles.addMediaText}>添加图片/视频</Text>
                        </Pressable>
                    </ScrollView>
                </View>

                {/* 标题输入 */}
                <TextInput
                    style={styles.titleInput}
                    placeholder="填写标题会有更多赞哦~"
                    placeholderTextColor="#94A3B8"
                    value={title}
                    onChangeText={setTitle}
                    maxLength={50}
                />

                {/* 正文输入 */}
                <TextInput
                    style={styles.contentInput}
                    placeholder="添加正文"
                    placeholderTextColor="#94A3B8"
                    value={content}
                    onChangeText={setContent}
                    multiline
                    textAlignVertical="top"
                />

                {/* 话题标签 */}
                <View style={styles.tagsSection}>
                    <Text style={styles.tagsSectionTitle}>添加话题</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {['#萌宠日常', '#养宠心得', '#宠物用品测评', '#遛狗打卡'].map((tag, index) => (
                            <Pressable key={index} style={styles.tagItem}>
                                <Text style={styles.tagText}>{tag}</Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                </View>

                {/* 定位 */}
                <Pressable style={styles.locationRow}>
                    <View style={styles.locationLeft}>
                        <Icon name="location" size={18} color="#64748B" />
                        <Text style={styles.locationText}>添加地点</Text>
                    </View>
                    <Icon name="chevron-forward" size={18} color="#94A3B8" />
                </Pressable>
            </ScrollView>
        </SafeAreaView>
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
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 0.5,
        borderBottomColor: '#F1F5F9',
    },
    closeBtn: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#1E293B',
    },
    publishBtn: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 16,
        backgroundColor: '#FFE4E8',
    },
    publishBtnActive: {
        backgroundColor: '#FF2442',
    },
    publishText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FFAAB8',
    },
    publishTextActive: {
        color: '#FFFFFF',
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
    },
    mediaSection: {
        marginTop: 16,
        marginBottom: 20,
    },
    mediaScroll: {
        flexDirection: 'row',
    },
    mediaItem: {
        width: 100,
        height: 133,
        borderRadius: 8,
        marginRight: 12,
        position: 'relative',
    },
    mediaImage: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
        backgroundColor: '#F1F5F9',
    },
    removeBtn: {
        position: 'absolute',
        top: 4,
        right: 4,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addMediaBtn: {
        width: 100,
        height: 133,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addMediaText: {
        fontSize: 11,
        color: '#94A3B8',
        marginTop: 4,
    },
    titleInput: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1E293B',
        paddingVertical: 12,
        borderBottomWidth: 0.5,
        borderBottomColor: '#F1F5F9',
    },
    contentInput: {
        fontSize: 15,
        color: '#475569',
        lineHeight: 24,
        minHeight: 120,
        paddingVertical: 16,
    },
    tagsSection: {
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 0.5,
        borderTopColor: '#F1F5F9',
    },
    tagsSectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1E293B',
        marginBottom: 12,
    },
    tagItem: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        backgroundColor: '#FFF5F5',
        borderRadius: 16,
        marginRight: 10,
    },
    tagText: {
        fontSize: 13,
        color: '#FF2442',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        marginTop: 16,
        borderTopWidth: 0.5,
        borderTopColor: '#F1F5F9',
    },
    locationLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    locationText: {
        fontSize: 15,
        color: '#64748B',
    },
});

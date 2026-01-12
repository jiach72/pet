import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, ShoppingCart, Tag } from 'lucide-react-native';
import { useRouter } from "expo-router";
import Icon from '@/components/Icon';

const CATEGORIES = [
    { id: '1', name: '主粮', icon: 'pet-food', color: '#3B82F6' },
    { id: '2', name: '零食', icon: 'pet-snacks', color: '#F59E0B' },
    { id: '3', name: '玩具', icon: 'pet-toys', color: '#10B981' },
    { id: '4', name: '洗护', icon: 'pet-grooming', color: '#06B6D4' },
    { id: '5', name: '医疗', icon: 'pet-medical', color: '#EF4444' },
];

const PRODUCTS = [
    {
        id: '1',
        name: 'PetPulse 尊享版智能项圈',
        price: '499.00',
        originalPrice: '599.00',
        sales: 1200,
        image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=500&auto=format&fit=crop',
    },
    {
        id: '2',
        name: '无谷天然健康成年犬粮 12kg',
        price: '328.00',
        originalPrice: '399.00',
        sales: 520,
        image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=500&auto=format&fit=crop',
    },
    {
        id: '3',
        name: '互动型自动激光逗猫神器',
        price: '79.00',
        originalPrice: '129.00',
        sales: 2341,
        image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=500&auto=format&fit=crop',
    },
    {
        id: '4',
        name: '智能恒温循环饮水机 2L',
        price: '159.00',
        originalPrice: '199.00',
        sales: 890,
        image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=500&auto=format&fit=crop',
    },
    {
        id: '5',
        name: '全封闭除臭落砂猫砂盆',
        price: '299.00',
        originalPrice: '359.00',
        sales: 645,
        image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=500&auto=format&fit=crop',
    },
    {
        id: '6',
        name: '深度睡眠四季通用宠物窝',
        price: '88.00',
        originalPrice: '128.00',
        sales: 1560,
        image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=500&auto=format&fit=crop',
    },
    {
        id: '7',
        name: '航空铝材轻便宠物外出包',
        price: '249.00',
        originalPrice: '329.00',
        sales: 312,
        image: 'https://images.unsplash.com/photo-1544168190-79c17527004f?q=80&w=500&auto=format&fit=crop',
    },
    {
        id: '8',
        name: '除菌消臭宠物洁足泡沫',
        price: '29.90',
        originalPrice: '45.00',
        sales: 4200,
        image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=500&auto=format&fit=crop', // 替换为更可靠的图片
    },
    {
        id: '9',
        name: '远红外防蚂蚁自动喂食器',
        price: '189.00',
        originalPrice: '269.00',
        sales: 128,
        image: 'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?q=80&w=500&auto=format&fit=crop',
    },
    {
        id: '10',
        name: '纯肉冷冻干燥零食大礼包',
        price: '129.00',
        originalPrice: '199.00',
        sales: 892,
        image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=500&auto=format&fit=crop',
    },
];

export default function MarketScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.searchBar}>
                    <Search size={18} color="#94A3B8" />
                    <TextInput placeholder="搜索商品、周边服务" style={styles.searchInput} />
                </View>
                <Pressable style={styles.cartBtn}>
                    <ShoppingCart size={24} color="#1E293B" />
                    <View style={styles.badge}><Text style={styles.badgeText}>3</Text></View>
                </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* O2O 服务入口 - 小米风格矩阵 */}
                <View style={styles.serviceSection}>
                    <View style={styles.serviceRow}>
                        <Pressable onPress={() => router.push("/(tabs)/map")} style={styles.serviceItem}>
                            <View style={[styles.serviceIcon, { backgroundColor: '#DBEAFE' }]}>
                                <Icon name="map-outline" size={26} color="#3B82F6" />
                            </View>
                            <Text style={styles.serviceLabel}>周边地图</Text>
                        </Pressable>
                        <Pressable onPress={() => router.push("/community/matching")} style={styles.serviceItem}>
                            <View style={[styles.serviceIcon, { backgroundColor: '#FFEDD5' }]}>
                                <Icon name="matching" size={26} color="#F97316" />
                            </View>
                            <Text style={styles.serviceLabel}>宠物配对</Text>
                        </Pressable>
                        <Pressable onPress={() => router.push("/community/charity")} style={styles.serviceItem}>
                            <View style={[styles.serviceIcon, { backgroundColor: '#DCFCE7' }]}>
                                <Icon name="charity" size={26} color="#22C55E" />
                            </View>
                            <Text style={styles.serviceLabel}>爱心公益</Text>
                        </Pressable>
                        <Pressable onPress={() => router.push("/community/wedding")} style={styles.serviceItem}>
                            <View style={[styles.serviceIcon, { backgroundColor: '#FCE7F3' }]}>
                                <Icon name="infinite-outline" size={26} color="#EC4899" />
                            </View>
                            <Text style={styles.serviceLabel}>宠物婚礼</Text>
                        </Pressable>
                    </View>
                </View>

                {/* Banner */}
                <View style={styles.banner}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=800&auto=format&fit=crop' }}
                        style={styles.bannerImage}
                    />
                    <View style={styles.bannerInfo}>
                        <Text style={styles.bannerTitle}>春季宠物嘉年华</Text>
                        <Text style={styles.bannerSub}>精选宠粮 8 折起</Text>
                    </View>
                </View>

                {/* 商品分类 */}
                <View style={styles.categorySection}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>精选分类</Text>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
                        {CATEGORIES.map(cat => (
                            <View key={cat.id} style={styles.categoryItem}>
                                <View style={styles.categoryIcon}>
                                    <Icon name={cat.icon} size={28} color={cat.color} />
                                </View>
                                <Text style={styles.categoryName}>{cat.name}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>

                {/* 火热促销 */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>热销商品</Text>
                        <Pressable><Text style={styles.seeMore}>更多</Text></Pressable>
                    </View>
                    <View style={styles.productGrid}>
                        {PRODUCTS.map(product => (
                            <View key={product.id} style={styles.productCard}>
                                <Image source={{ uri: product.image }} style={styles.productImage} />
                                <View style={styles.productInfo}>
                                    <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
                                    <View style={styles.priceContainer}>
                                        <Text style={styles.priceText}>¥{product.price}</Text>
                                        <Text style={styles.originalPrice}>¥{product.originalPrice}</Text>
                                    </View>
                                    <Text style={styles.salesCount}>已售 {product.sales}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
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
        paddingHorizontal: 16,
        paddingVertical: 12,
        alignItems: 'center',
        gap: 12,
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#F1F5F9',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 8,
        alignItems: 'center',
    },
    searchInput: {
        marginLeft: 8,
        fontSize: 14,
        flex: 1,
    },
    cartBtn: {
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        top: -4,
        right: -4,
        backgroundColor: '#EF4444',
        borderRadius: 8,
        width: 16,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: 'bold',
    },
    banner: {
        marginHorizontal: 16,
        marginBottom: 20,
        height: 140,
        borderRadius: 16,
        overflow: 'hidden',
        position: 'relative',
    },
    bannerImage: {
        width: '100%',
        height: '100%',
    },
    bannerInfo: {
        position: 'absolute',
        left: 20,
        top: '25%',
    },
    bannerTitle: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0,0,0,0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
    },
    bannerSub: {
        color: '#FFFFFF',
        fontSize: 13,
        marginTop: 4,
    },
    serviceSection: {
        padding: 16,
        marginBottom: 4,
    },
    serviceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    serviceItem: {
        alignItems: 'center',
        flex: 1,
    },
    serviceIcon: {
        width: 52,
        height: 52,
        borderRadius: 26,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    serviceLabel: {
        fontSize: 12,
        color: '#475569',
        fontWeight: '600',
    },
    categorySection: {
        marginBottom: 12,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    categoryScroll: {
        paddingHorizontal: 12,
        marginBottom: 20,
    },
    categoryItem: {
        alignItems: 'center',
        marginHorizontal: 12,
    },
    categoryIcon: {
        width: 50,
        height: 50,
        backgroundColor: '#F8FAFC',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        marginBottom: 8,
    },
    categoryName: {
        fontSize: 12,
        color: '#475569',
    },
    section: {
        paddingHorizontal: 16,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1E293B',
    },
    seeMore: {
        fontSize: 14,
        color: '#3B82F6',
    },
    productGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    productCard: {
        width: '48%',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        overflow: 'hidden',
    },
    productImage: {
        width: '100%',
        height: 150,
        backgroundColor: '#F8FAFC',
    },
    productInfo: {
        padding: 8,
    },
    productName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1E293B',
        marginBottom: 6,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 4,
    },
    priceText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#EF4444',
    },
    originalPrice: {
        fontSize: 12,
        color: '#94A3B8',
        textDecorationLine: 'line-through',
    },
    salesCount: {
        fontSize: 11,
        color: '#94A3B8',
        marginTop: 4,
    },
});

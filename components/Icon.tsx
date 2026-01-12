import React from "react";
import { View } from "react-native";
import {
    ShieldCheck,
    Users,
    Map as MapIcon,
    User,
    Heart,
    Thermometer,
    Activity,
    Zap,
    Dumbbell,
    Cross,
    Bell,
    ChevronRight,
    FileText,
    BarChart,
    CheckCircle,
    ArrowLeft,
    X,
    Plus,
    PlusCircle,
    RefreshCw,
    RefreshCcw,
    Lightbulb,
    AlertCircle,
    AlertTriangle,
    Info,
    Phone,
    Camera,
    Image as ImageIcon,
    CloudUpload,
    Mic,
    Square,
    Radio,
    Battery,
    MapPin,
    UserCircle,
    Search,
    ShoppingCart,
    Clock,
    Navigation,
    Shield,
    XCircle,
    Footprints,
    Trophy,
    Megaphone,
    Edit,
    Bluetooth,
    TrendingUp,
    Coffee,
    PawPrint,
    Award,
    Sparkles,
    Smile,
    Frown,
    Flame,
    Moon,
    Sun,
    CloudRain,
    Cloud,
    MoreHorizontal,
    Eye,
    EyeOff,
    Mail,
    Lock,
    Settings,
    Pencil,
    Trash2,
    Download,
    Share2,
    Link as LinkIcon,
    Copy,
    QrCode,
    Scan,
    Wifi,
    Signal,
    Volume2,
    VolumeX,
    Music,
    Gamepad2,
    Utensils,
    Beer,
    Pizza,
    IceCream,
    Bike,
    Car,
    Bus,
    Train,
    Ship,
    Rocket,
    Globe,
    Compass,
    Flag,
    Bookmark,
    Tag,
    Ticket,
    CreditCard,
    Briefcase,
    Wallet,
    Gift,
    ShoppingBag,
    FileSpreadsheet,
    Printer,
    Server,
    Terminal,
    Code,
    Hammer,
    Construction,
    Package,
    Calendar,
    Bone,
    ShoppingBasket,
    Cookie,
    Milk,
    Droplets,
    Pill,
    Stethoscope,
    HandHeart,
    Infinity,
    Compass as CompassIcon,
    LayoutGrid,
    HeartHandshake,
    UserPlus,
} from "lucide-react-native";

// 定义 Lucide 图标的通用 Props 类型，以解决映射表类型不匹配问题
type LucideIcon = React.ComponentType<{
    size?: string | number;
    color?: string;
    strokeWidth?: number;
}>;

// 图标名称映射 - 基于 Lucide 重构以确保 Web 兼容性
const iconMap: Record<string, LucideIcon> = {
    // Tab 导航
    "shield-checkmark": ShieldCheck,
    "people": Users,
    "people-outline": Users,
    "map": MapIcon,
    "map-outline": MapIcon,
    "person": User,
    "person-outline": User,
    "compass-outline": CompassIcon,
    "cart-outline": ShoppingCart,
    "layout-grid": LayoutGrid,

    // 健康
    "heart": Heart,
    "heart-outline": Heart,
    "thermometer": Thermometer,
    "pulse": Activity,
    "flash": Zap,
    "fitness": Dumbbell,
    "medical": Stethoscope,
    "paw": PawPrint,

    // 通用
    "notifications": Bell,
    "chevron-forward": ChevronRight,
    "document-text": FileText,
    "analytics": BarChart,
    "checkmark-circle": CheckCircle,
    "arrow-back": ArrowLeft,
    "close": X,
    "add": Plus,
    "add-circle": PlusCircle,
    "sync": RefreshCw,
    "refresh": RefreshCcw,
    "bulb": Lightbulb,
    "search": Search,
    "create": Edit,
    "pencil": Pencil,
    "settings": Settings,
    "settings-outline": Settings,
    "ellipsis-horizontal": MoreHorizontal,

    // 预警
    "alert-circle": AlertCircle,
    "warning": AlertTriangle,
    "information-circle": Info,
    "call": Phone,
    "close-circle": XCircle,

    // 诊断
    "camera": Camera,
    "images": ImageIcon,
    "image": ImageIcon,
    "cloud-upload": CloudUpload,
    "mic": Mic,
    "stop": Square,
    "eye": Eye,
    "eye-off": EyeOff,

    // 安全
    "radio": Radio,
    "battery-half": Battery,
    "battery-dead": Battery,
    "battery-full": Battery,
    "locate": MapPin,
    "people-circle": UserCircle,
    "radio-outline": Radio,
    "location": MapPin,
    "navigate-circle": Navigation,
    "navigate": Navigation,
    "stop-circle": Square,
    "document-attach": FileSpreadsheet,
    "share-outline": Share2,
    "share": Share2,
    "bluetooth": Bluetooth,

    // 智能家居
    "restaurant": Utensils,
    "videocam": Camera,
    "git-compare": RefreshCw,
    "water": Flame, // 暂用 Flame 代替
    "git-branch": Terminal,
    "radio-button-on": Circle,
    "radio-button-off": Circle,
    "pause": Square,
    "play": Plus, // 临时使用 Plus，后续可替换为 Play 图标
    "play-circle": Plus,
    "trash-outline": Trash2,
    "trash": Trash2,
    "cog": Settings,
    "airplane": Rocket,
    "wifi": Wifi,
    "cellular": Signal,

    // 社区
    "home": MapIcon,
    "storefront": ShoppingBag,
    "leaf": Flame,
    "calendar": Calendar,
    "calendar-outline": Calendar,
    "heart-outline": Heart,
    "rose-outline": HandHeart, // 公益
    "infinite-outline": Infinity, // 婚礼
    "book": FileText,
    "shield": Shield,
    "shield-outline": Shield,
    "help-circle": Info,
    "star": Award,
    "ribbon": Award,
    "flag": Flag,

    // 挑战赛
    "footsteps": Footprints,
    "trophy": Trophy,
    "megaphone": Megaphone,
    "flame": Flame,
    "sparkles": Sparkles,

    // 商城
    "cart": ShoppingCart,
    "bag": ShoppingBag,
    "basket": ShoppingBasket,
    "pricetag": Tag,
    "gift": Gift,
    "card": CreditCard,
    "cash": Wallet,
    "wallet": Wallet,
    "receipt": FileText,
    "barcode": Scan,

    // 业务特定
    "pet-food": Bone,
    "pet-snacks": Cookie,
    "pet-toys": Gamepad2,
    "pet-grooming": Droplets,
    "pet-medical": Pill,
    "matching": UserPlus,
    "charity": HandHeart,

    // POI
    "cafe": Coffee,
    "time": Clock,
    "pin": MapPin,
    "bookmark": Bookmark,

    // 天气/情绪
    "happy": Smile,
    "sad": Frown,
    "moon": Moon,
    "sunny": Sun,
    "rainy": CloudRain,
    "cloudy": Cloud,

    // 趋势
    "trending-up": TrendingUp,

    // 其他
    "mail": Mail,
    "lock-closed": Lock,
    "link": LinkIcon,
    "copy": Copy,
    "download": Download,
    "print": Printer,
    "qr-code": QrCode,
    "scan": Scan,
    "volume-medium": Volume2,
    "volume-off": VolumeX,
    "musical-notes": Music,
    "game-controller": Gamepad2,
    "globe": Globe,
    "earth": Globe,
    "compass": Compass,
    "ticket": Ticket,
    "code": Code,
    "terminal": Terminal,
    "server": Server,
    "cloud": Cloud,
    "cloud-outline": Cloud,
    "construct": Hammer,
    "hammer": Hammer,
    "build": Hammer,
    "extension-puzzle": Package,

    // 交通
    "bicycle": Bike,
    "car": Car,
    "bus": Bus,
    "train": Train,
    "boat": Ship,
    "rocket": Rocket,
    "planet": Globe,

    // 食物
    "fast-food": Utensils,
    "beer": Beer,
    "pizza": Pizza,
    "ice-cream": IceCream,

    // 兼容别名
    "heart-dislike": Heart,
};

// 辅助组件：画圆，需匹配 Lucide 签名以避免类型错误
function Circle({ size = 24, color = "#000" }: { size?: string | number; color?: string }) {
    const numericSize = typeof size === 'string' ? parseFloat(size) : size;
    return (
        <View
            style={{
                width: numericSize,
                height: numericSize,
                borderRadius: numericSize / 2,
                borderWidth: 2,
                borderColor: color,
            }}
        />
    );
}

interface IconProps {
    name: string;
    size?: number;
    color?: string;
    style?: any;
}

/**
 * 统一图标组件 - 使用 lucide-react-native (Native 优化)
 * 兼容 Ionicons API，但使用 SVG 渲染，彻底解决 Web 字体加载失败问题
 */
export function Icon({ name, size = 24, color = "#000", style }: IconProps) {
    const IconComponent = iconMap[name];

    if (!IconComponent) {
        // 开发时打印缺失图标
        if (__DEV__) {
            console.warn(`[Icon] Missing icon mapping for Lucide: "${name}"`);
        }
        // 返回一个简单的占位符，而不是显示 X 盒子
        return <View style={[{ width: size, height: size, borderWidth: 1, borderColor: color, borderStyle: 'dashed' }, style]} />;
    }

    return (
        <View style={[{ width: size, height: size, alignItems: "center", justifyContent: "center" }, style]}>
            <IconComponent size={size} color={color} />
        </View>
    );
}

// 默认导出
export default Icon;

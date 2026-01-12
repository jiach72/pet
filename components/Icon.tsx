import React from "react";
import { View } from "react-native";
import {
    IoShieldCheckmark,
    IoPeople,
    IoMap,
    IoPerson,
    IoHeart,
    IoHeartOutline,
    IoThermometer,
    IoPulse,
    IoFlash,
    IoNotifications,
    IoChevronForward,
    IoDocumentText,
    IoMedical,
    IoFitness,
    IoRadio,
    IoAnalytics,
    IoAlertCircle,
    IoWarning,
    IoInformationCircle,
    IoClose,
    IoCall,
    IoCheckmarkCircle,
    IoArrowBack,
    IoCamera,
    IoImages,
    IoCloudUpload,
    IoBulb,
    IoRefresh,
    IoMic,
    IoStop,
    IoAdd,
    IoAddCircle,
    IoSync,
    IoBatteryHalf,
    IoBatteryDead,
    IoLocate,
    IoPeopleCircle,
    IoRadioOutline,
    IoLocation,
    IoNavigateCircle,
    IoNavigate,
    IoStopCircle,
    IoDocumentAttach,
    IoShareOutline,
    IoRestaurant,
    IoVideocam,
    IoGitCompare,
    IoWater,
    IoGitBranch,
    IoRadioButtonOn,
    IoRadioButtonOff,
    IoPause,
    IoPlay,
    IoTrashOutline,
    IoCog,
    IoAirplane,
    IoHome,
    IoStorefront,
    IoLeaf,
    IoCalendar,
    IoBook,
    IoShield,
    IoHelpCircle,
    IoStar,
    IoSearch,
    IoCart,
    IoImage,
    IoTime,
    IoCreate,
    IoBluetooth,
    IoTrendingUp,
    IoCafe,
    IoPaw,
    IoRibbon,
    IoFootsteps,
    IoTrophy,
    IoMegaphone,
    IoSparkles,
    IoHappy,
    IoSad,
    IoFlame,
    IoMoon,
    IoSunny,
    IoRainy,
    IoCloudy,
    IoEllipsisHorizontal,
    IoEye,
    IoEyeOff,
    IoMail,
    IoLockClosed,
    IoSettings,
    IoPencil,
    IoTrash,
    IoDownload,
    IoShare,
    IoLink,
    IoCopy,
    IoQrCode,
    IoScan,
    IoWifi,
    IoCellular,
    IoBatteryFull,
    IoVolumeMedium,
    IoVolumeOff,
    IoMusicalNotes,
    IoGameController,
    IoFastFood,
    IoBeer,
    IoPizza,
    IoIceCream,
    IoBicycle,
    IoCar,
    IoBus,
    IoTrain,
    IoAirplaneOutline,
    IoBoat,
    IoRocket,
    IoPlanet,
    IoGlobe,
    IoEarth,
    IoCompass,
    IoFlag,
    IoPin,
    IoBookmark,
    IoPricetag,
    IoTicket,
    IoCard,
    IoCash,
    IoWallet,
    IoGift,
    IoBag,
    IoBasket,
    IoReceipt,
    IoBarcode,
    IoPrint,
    IoServer,
    IoCloudOutline,
    IoCloud,
    IoTerminal,
    IoCode,
    IoConstruct,
    IoHammer,
    IoBuild,
    IoExtensionPuzzle,
} from "react-icons/io5";

// 图标名称映射 - 完整版
const iconMap: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
    // Tab 导航
    "shield-checkmark": IoShieldCheckmark,
    "people": IoPeople,
    "map": IoMap,
    "person": IoPerson,

    // 健康
    "heart": IoHeart,
    "heart-outline": IoHeartOutline,
    "thermometer": IoThermometer,
    "pulse": IoPulse,
    "flash": IoFlash,
    "fitness": IoFitness,
    "medical": IoMedical,
    "paw": IoPaw,

    // 通用
    "notifications": IoNotifications,
    "chevron-forward": IoChevronForward,
    "document-text": IoDocumentText,
    "analytics": IoAnalytics,
    "checkmark-circle": IoCheckmarkCircle,
    "arrow-back": IoArrowBack,
    "close": IoClose,
    "add": IoAdd,
    "add-circle": IoAddCircle,
    "sync": IoSync,
    "refresh": IoRefresh,
    "bulb": IoBulb,
    "search": IoSearch,
    "create": IoCreate,
    "pencil": IoPencil,
    "settings": IoSettings,
    "ellipsis-horizontal": IoEllipsisHorizontal,

    // 预警
    "alert-circle": IoAlertCircle,
    "warning": IoWarning,
    "information-circle": IoInformationCircle,
    "call": IoCall,

    // 诊断
    "camera": IoCamera,
    "images": IoImages,
    "image": IoImage,
    "cloud-upload": IoCloudUpload,
    "mic": IoMic,
    "stop": IoStop,
    "eye": IoEye,
    "eye-off": IoEyeOff,

    // 安全
    "radio": IoRadio,
    "battery-half": IoBatteryHalf,
    "battery-dead": IoBatteryDead,
    "battery-full": IoBatteryFull,
    "locate": IoLocate,
    "people-circle": IoPeopleCircle,
    "radio-outline": IoRadioOutline,
    "location": IoLocation,
    "navigate-circle": IoNavigateCircle,
    "navigate": IoNavigate,
    "stop-circle": IoStopCircle,
    "document-attach": IoDocumentAttach,
    "share-outline": IoShareOutline,
    "share": IoShare,
    "bluetooth": IoBluetooth,

    // 智能家居
    "restaurant": IoRestaurant,
    "videocam": IoVideocam,
    "git-compare": IoGitCompare,
    "water": IoWater,
    "git-branch": IoGitBranch,
    "radio-button-on": IoRadioButtonOn,
    "radio-button-off": IoRadioButtonOff,
    "pause": IoPause,
    "play": IoPlay,
    "trash-outline": IoTrashOutline,
    "trash": IoTrash,
    "cog": IoCog,
    "airplane": IoAirplane,
    "wifi": IoWifi,
    "cellular": IoCellular,

    // 社区
    "home": IoHome,
    "storefront": IoStorefront,
    "leaf": IoLeaf,
    "calendar": IoCalendar,
    "book": IoBook,
    "shield": IoShield,
    "help-circle": IoHelpCircle,
    "star": IoStar,
    "ribbon": IoRibbon,
    "flag": IoFlag,

    // 挑战赛
    "footsteps": IoFootsteps,
    "trophy": IoTrophy,
    "megaphone": IoMegaphone,
    "flame": IoFlame,
    "sparkles": IoSparkles,

    // 商城
    "cart": IoCart,
    "bag": IoBag,
    "basket": IoBasket,
    "pricetag": IoPricetag,
    "gift": IoGift,
    "card": IoCard,
    "cash": IoCash,
    "wallet": IoWallet,
    "receipt": IoReceipt,
    "barcode": IoBarcode,

    // POI
    "cafe": IoCafe,
    "time": IoTime,
    "pin": IoPin,
    "bookmark": IoBookmark,

    // 天气/情绪
    "happy": IoHappy,
    "sad": IoSad,
    "moon": IoMoon,
    "sunny": IoSunny,
    "rainy": IoRainy,
    "cloudy": IoCloudy,

    // 趋势
    "trending-up": IoTrendingUp,

    // 其他
    "mail": IoMail,
    "lock-closed": IoLockClosed,
    "link": IoLink,
    "copy": IoCopy,
    "download": IoDownload,
    "print": IoPrint,
    "qr-code": IoQrCode,
    "scan": IoScan,
    "volume-medium": IoVolumeMedium,
    "volume-off": IoVolumeOff,
    "musical-notes": IoMusicalNotes,
    "game-controller": IoGameController,
    "globe": IoGlobe,
    "earth": IoEarth,
    "compass": IoCompass,
    "ticket": IoTicket,
    "code": IoCode,
    "terminal": IoTerminal,
    "server": IoServer,
    "cloud": IoCloud,
    "cloud-outline": IoCloudOutline,
    "construct": IoConstruct,
    "hammer": IoHammer,
    "build": IoBuild,
    "extension-puzzle": IoExtensionPuzzle,

    // 交通
    "bicycle": IoBicycle,
    "car": IoCar,
    "bus": IoBus,
    "train": IoTrain,
    "boat": IoBoat,
    "rocket": IoRocket,
    "planet": IoPlanet,

    // 食物
    "fast-food": IoFastFood,
    "beer": IoBeer,
    "pizza": IoPizza,
    "ice-cream": IoIceCream,

    // 兼容别名
    "heart-dislike": IoHeartOutline,
};

interface IconProps {
    name: string;
    size?: number;
    color?: string;
    style?: any;
}

/**
 * 统一图标组件 - 使用 react-icons
 * 兼容 Ionicons API，但使用 SVG 渲染
 */
export function Icon({ name, size = 24, color = "#000", style }: IconProps) {
    const IconComponent = iconMap[name];

    if (!IconComponent) {
        // 开发时打印缺失图标
        if (__DEV__) {
            console.warn(`[Icon] Missing icon mapping: "${name}"`);
        }
        // 返回空占位符
        return (
            <View style={[{ width: size, height: size }, style]} />
        );
    }

    return (
        <View style={[{ width: size, height: size, alignItems: "center", justifyContent: "center" }, style]}>
            <IconComponent size={size} color={color} />
        </View>
    );
}

// 默认导出
export default Icon;

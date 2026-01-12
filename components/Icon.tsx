import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import {
    IoShieldCheckmark,
    IoPeople,
    IoMap,
    IoPerson,
    IoHeart,
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
    IoSync,
    IoBatteryHalf,
    IoBatteryDead,
    IoLocate,
    IoPeopleCircle,
    IoRadioOutline,
    IoLocation,
    IoNavigateCircle,
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
} from "react-icons/io5";

// 图标名称映射
const iconMap: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
    // Tab 导航
    "shield-checkmark": IoShieldCheckmark,
    "people": IoPeople,
    "map": IoMap,
    "person": IoPerson,

    // 健康
    "heart": IoHeart,
    "thermometer": IoThermometer,
    "pulse": IoPulse,
    "flash": IoFlash,
    "fitness": IoFitness,
    "medical": IoMedical,

    // 通用
    "notifications": IoNotifications,
    "chevron-forward": IoChevronForward,
    "document-text": IoDocumentText,
    "analytics": IoAnalytics,
    "checkmark-circle": IoCheckmarkCircle,
    "arrow-back": IoArrowBack,
    "close": IoClose,
    "add": IoAdd,
    "sync": IoSync,
    "refresh": IoRefresh,
    "bulb": IoBulb,

    // 预警
    "alert-circle": IoAlertCircle,
    "warning": IoWarning,
    "information-circle": IoInformationCircle,
    "call": IoCall,

    // 诊断
    "camera": IoCamera,
    "images": IoImages,
    "cloud-upload": IoCloudUpload,
    "mic": IoMic,
    "stop": IoStop,

    // 安全
    "radio": IoRadio,
    "battery-half": IoBatteryHalf,
    "battery-dead": IoBatteryDead,
    "locate": IoLocate,
    "people-circle": IoPeopleCircle,
    "radio-outline": IoRadioOutline,
    "location": IoLocation,
    "navigate-circle": IoNavigateCircle,
    "stop-circle": IoStopCircle,
    "document-attach": IoDocumentAttach,
    "share-outline": IoShareOutline,

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
    "cog": IoCog,
    "airplane": IoAirplane,

    // 社区
    "home": IoHome,
    "storefront": IoStorefront,
    "leaf": IoLeaf,
    "calendar": IoCalendar,
    "book": IoBook,
    "shield": IoShield,
    "help-circle": IoHelpCircle,
    "star": IoStar,

    // 心形特殊处理
    "heart-dislike": IoHeart,
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

// 导出兼容 Ionicons 的组件
export const Ionicons = {
    // 作为组件使用
    render: Icon,
};

// 默认导出
export default Icon;

/**
 * PetPulse 设计 Token 系统
 * 基于 ui-ux-pro-max 搜索结果：
 * - 样式：Soft UI + Claymorphism
 * - 配色：Calm Pastels + Trust colors
 * - 字体：Poppins + Open Sans
 */

// 主色调
export const colors = {
    // Primary - Trust Blue
    primary: "#3B82F6",
    primaryLight: "#60A5FA",
    primaryDark: "#2563EB",

    // Secondary - Health Green
    secondary: "#10B981",
    secondaryLight: "#34D399",
    secondaryDark: "#059669",

    // Accent - CTA Purple
    accent: "#8B5CF6",
    accentLight: "#A78BFA",

    // Semantic
    success: "#10B981",
    warning: "#F97316",
    error: "#EF4444",
    info: "#3B82F6",

    // Neutral
    background: "#F8FAFC",
    backgroundSecondary: "#F1F5F9",
    foreground: "#1E293B",
    muted: "#64748B",
    border: "#E2E8F0",
    white: "#FFFFFF",

    // Gradients (for Soft UI)
    gradientPrimary: ["#3B82F6", "#60A5FA"],
    gradientSuccess: ["#10B981", "#34D399"],
    gradientWarning: ["#F97316", "#FB923C"],
    gradientError: ["#EF4444", "#F87171"],
};

// 间距系统
export const spacing = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
};

// 圆角系统 (Soft UI 风格)
export const borderRadius = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    full: 9999,
};

// 阴影系统 (Soft UI 特征)
export const shadows = {
    // 外凸阴影 - 用于卡片
    card: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
        elevation: 4,
    },
    // 按钮阴影
    button: {
        shadowColor: "#3B82F6",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    // 内凹阴影 - 用于输入框、进度条
    inset: {
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 0,
    },
    // 浮动阴影 - 用于 FAB、弹窗
    floating: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 24,
        elevation: 8,
    },
};

// 动画配置
export const animation = {
    // 过渡时长
    duration: {
        fast: 150,
        normal: 200,
        slow: 300,
    },
    // 缓动函数 (ease-out 为主)
    easing: "ease-out",
};

// 字体配置 (Poppins + Open Sans)
export const typography = {
    heading: {
        fontFamily: "Poppins-Bold",
        fontWeight: "700" as const,
    },
    subheading: {
        fontFamily: "Poppins-SemiBold",
        fontWeight: "600" as const,
    },
    body: {
        fontFamily: "OpenSans-Regular",
        fontWeight: "400" as const,
    },
    bodyBold: {
        fontFamily: "OpenSans-SemiBold",
        fontWeight: "600" as const,
    },
    caption: {
        fontFamily: "OpenSans-Regular",
        fontWeight: "400" as const,
    },
};

// 组件预设样式
export const componentStyles = {
    // Soft UI 卡片
    card: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.xl,
        padding: spacing.lg,
        ...shadows.card,
    },
    // 主按钮
    buttonPrimary: {
        backgroundColor: colors.primary,
        borderRadius: borderRadius.lg,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xl,
        ...shadows.button,
    },
    // 输入框
    input: {
        backgroundColor: colors.backgroundSecondary,
        borderRadius: borderRadius.md,
        padding: spacing.md,
        borderWidth: 0,
    },
};

/**
 * 全局设计系统 - 兼容与扩展版
 */

const baseColors = {
    primary: '#3B82F6',
    secondary: '#10B981',
    accent: '#F59E0B',
    danger: '#EF4444',
    background: '#F8FAFC',
    surface: '#FFFFFF',
    text: {
        primary: '#1E293B',
        secondary: '#64748B',
        light: '#94A3B8',
        onPrimary: '#FFFFFF',
    },
    border: '#E2E8F0',
    status: {
        health: '#22C55E',
        warning: '#F59E0B',
        critical: '#EF4444',
    }
};

export const colors = {
    ...baseColors,
    foreground: baseColors.text.primary,
    muted: baseColors.text.secondary,
    white: baseColors.surface,
    error: baseColors.danger,
    warning: baseColors.status.warning,
};

export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
};

export const borderRadius = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    full: 9999,
};

export const shadows = {
    sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 5,
    },
    card: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    button: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    floating: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 5,
    },
};

export const typography = {
    h1: { fontSize: 24, fontWeight: '700' as const, color: baseColors.text.primary },
    h2: { fontSize: 20, fontWeight: '600' as const, color: baseColors.text.primary },
    h3: { fontSize: 18, fontWeight: '600' as const, color: baseColors.text.primary },
    body: { fontSize: 16, fontWeight: '400' as const, color: baseColors.text.secondary },
    caption: { fontSize: 14, fontWeight: '400' as const, color: baseColors.text.light },
};

export const Theme = {
    colors,
    spacing,
    radius: borderRadius,
    shadows,
    typography,
};

export default Theme;

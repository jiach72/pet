import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Theme } from '@/constants/theme';

interface CardProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    padding?: keyof typeof Theme.spacing;
    variant?: 'elevated' | 'outline' | 'flat';
}

export const Card: React.FC<CardProps> = ({
    children,
    style,
    padding = 'md',
    variant = 'elevated'
}) => {
    const cardStyle = [
        styles.base,
        { padding: Theme.spacing[padding] },
        variant === 'elevated' && styles.elevated,
        variant === 'outline' && styles.outline,
        variant === 'flat' && styles.flat,
        style,
    ];

    return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
    base: {
        backgroundColor: Theme.colors.surface,
        borderRadius: Theme.radius.md,
        overflow: 'hidden',
    },
    elevated: {
        ...Theme.shadows.sm,
    },
    outline: {
        borderWidth: 1,
        borderColor: Theme.colors.border,
    },
    flat: {
        backgroundColor: Theme.colors.background,
    }
});

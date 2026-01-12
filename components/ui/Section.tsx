import React from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Theme } from '@/constants/theme';

interface SectionProps {
    title?: string;
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    horizontal?: boolean;
}

export const Section: React.FC<SectionProps> = ({
    title,
    children,
    style,
    containerStyle,
    horizontal = false
}) => {
    return (
        <View style={[styles.section, containerStyle]}>
            {title && <Text style={styles.title}>{title}</Text>}
            <View style={[
                horizontal ? styles.horizontal : styles.vertical,
                style
            ]}>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        marginBottom: Theme.spacing.lg,
        width: '100%',
    },
    title: {
        ...Theme.typography.h3,
        marginBottom: Theme.spacing.sm,
        paddingHorizontal: Theme.spacing.xs,
    },
    vertical: {
        flexDirection: 'column',
    },
    horizontal: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
});

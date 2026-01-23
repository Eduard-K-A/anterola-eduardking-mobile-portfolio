import React, { useRef } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '../constants/theme';

interface HeaderProps {
  onThemeToggle?: () => void;
}

export const Header = ({ onThemeToggle }: HeaderProps) => {
  const { isDark, colors, toggleTheme } = useTheme();
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const handleThemeToggle = () => {
    // Animate the theme toggle button
    Animated.sequence([
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
    ]).start();

    toggleTheme();
    onThemeToggle?.();
  };

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: colors.background,
          borderBottomColor: colors.divider,
        },
      ]}
    >
      <View style={styles.headerContent}>
        <View>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Eduard King
          </Text>
          <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
            Aspiring Software Engineer
          </Text>
        </View>

        <Animated.View
          style={{
            transform: [{ rotate: rotateInterpolate }],
          }}
        >
          <TouchableOpacity
            onPress={handleThemeToggle}
            activeOpacity={0.7}
            style={[
              styles.themeToggle,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
            accessibilityLabel={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            accessibilityRole="button"
          >
            <Text style={styles.themeIcon}>{isDark ? '☀️' : '🌙'}</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    borderBottomWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    ...TYPOGRAPHY.h4,
    fontWeight: '700',
    marginBottom: SPACING.xs,
  },
  headerSubtitle: {
    ...TYPOGRAPHY.bodySmall,
    fontWeight: '500',
  },
  themeToggle: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  themeIcon: {
    fontSize: 20,
  },
});
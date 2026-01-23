import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  LayoutChangeEvent,
  Animated,
  Platform,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '../constants/theme';

interface HeroSectionProps {
  onLayout: (event: LayoutChangeEvent) => void;
}

export const HeroSection = ({ onLayout }: HeroSectionProps) => {
  const { colors } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  return (
    <View
      onLayout={onLayout}
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <View style={styles.content}>
        {/* Animated Profile Picture */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
            marginBottom: SPACING.xl,
          }}
        >
          <View
            style={[
              styles.profileImageContainer,
              {
                borderColor: colors.accent,
              },
            ]}
          >
            <Image
              source={require('../assets/eduard.png')}
              style={styles.profileImage}
              accessibilityLabel="Eduard King Anterola profile picture"
            />
            <View
              style={[
                styles.statusIndicator,
                { backgroundColor: colors.success },
              ]}
            />
          </View>
        </Animated.View>

        {/* Name */}
        <Animated.Text
          style={[
            styles.name,
            {
              color: colors.text,
              opacity: fadeAnim,
            },
          ]}
        >
          Eduard King Anterola
        </Animated.Text>

        {/* Professional Title */}
        <Animated.Text
          style={[
            styles.title,
            {
              color: colors.accent,
              opacity: fadeAnim,
            },
          ]}
        >
          Aspiring Software Engineer 
        </Animated.Text>

        {/* Bio Description */}
        <Animated.Text
          style={[
            styles.bioDescription,
            {
              color: colors.textSecondary,
              opacity: fadeAnim,
            },
          ]}
        >
          3rd Year Computer Science Student passionate about developing useful and efficient software solutions to make life easier and more enjoyable.
        </Animated.Text>

        {/* CTA Button */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            marginTop: SPACING.xl,
          }}
        >
          <View
            style={[
              styles.ctaContainer,
              {
                backgroundColor: colors.accentLight,
                borderColor: colors.accent,
              },
            ]}
          >
            <Text style={[styles.ctaText, { color: colors.accent }]}>
              📧 Available for opportunities
            </Text>
          </View>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACING.xxl,
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  profileImageContainer: {
    borderWidth: 3,
    borderRadius: BORDER_RADIUS.circle,
    padding: 4,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: BORDER_RADIUS.circle,
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: BORDER_RADIUS.circle,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  name: {
    ...TYPOGRAPHY.h1,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  title: {
    ...TYPOGRAPHY.h3,
    fontWeight: '600',
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  bioDescription: {
    ...TYPOGRAPHY.body,
    textAlign: 'center',
    lineHeight: 26,
    maxWidth: '90%',
  },
  ctaContainer: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1.5,
  },
  ctaText: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
    textAlign: 'center',
  },
});

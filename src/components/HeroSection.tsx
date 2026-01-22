import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  LayoutChangeEvent,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../constants/theme';

interface HeroSectionProps {
  onLayout: (event: LayoutChangeEvent) => void;
}

export const HeroSection = ({ onLayout }: HeroSectionProps) => {
  const { colors } = useTheme();

  return (
    <View
      onLayout={onLayout}
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <View style={styles.content}>
        {/* Circular Profile Picture */}
        <View style={styles.profileImageContainer}>
          <Image
            source={require('../assets/eduard.png')}
            style={[
              styles.profileImage,
              { borderColor: colors.accent },
            ]}
          />
        </View>

        {/* Name */}
        <Text
          style={[
            styles.name,
            {
              color: colors.text,
            },
          ]}
        >
          Eduard King Anterola
        </Text>

        {/* Bio */}
        <Text
          style={[
            styles.bio,
            {
              color: colors.textSecondary,
            },
          ]}
        >
          3rd Year Computer Science Student {'\n'}Aspiring Software Engineer
        </Text>
        <Text
          style={[
            styles.bioDescription,
            {
              color: colors.textTertiary,
            },
          ]}
        >
          Passionate on developing useful and efficient software solutions to make life easier and more enjoyable.
        </Text>
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
    marginBottom: SPACING.xl,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: BORDER_RADIUS.circle,
    borderWidth: 3,
  },
  name: {
    ...TYPOGRAPHY.h1,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  bio: {
    ...TYPOGRAPHY.h4,
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  bioDescription: {
    ...TYPOGRAPHY.body,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
});

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  LayoutChangeEvent,
  Platform,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../constants/theme';

interface BioSectionProps {
  onLayout: (event: LayoutChangeEvent) => void;
}

export const BioSection = ({ onLayout }: BioSectionProps) => {
  const { colors } = useTheme();

  return (
    <View
      onLayout={onLayout}
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <View
        style={[
          styles.bioCard,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
          },
        ]}
      >
        <View style={styles.bioContent}>
          <Text
            style={[
              styles.bioHeading,
              { color: colors.text },
            ]}
          >
            About Me
          </Text>

          <Text
            style={[
              styles.bioText,
              { color: colors.textSecondary },
            ]}
          >
            I'm a passionate Computer Science student with a strong foundation in full-stack development. I specialize in creating seamless, user-centric applications using modern technologies like React Native, TypeScript, and Node.js.
          </Text>

          <Text
            style={[
              styles.bioText,
              { color: colors.textSecondary, marginTop: SPACING.md },
            ]}
          >
            My approach combines technical excellence with design thinking, ensuring every solution is both powerful and delightful to use. I'm always eager to learn new technologies and solve challenging problems.
          </Text>

          {/* Stats Section */}
          <View style={styles.statsContainer}>
            <View
              style={[
                styles.statBox,
                { backgroundColor: colors.accentLighter },
              ]}
            >
              <Text style={[styles.statNumber, { color: colors.accent }]}>
                5+
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Projects
              </Text>
            </View>

            <View
              style={[
                styles.statBox,
                { backgroundColor: colors.accentLighter },
              ]}
            >
              <Text style={[styles.statNumber, { color: colors.accent }]}>
                20+
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Skills
              </Text>
            </View>

            <View
              style={[
                styles.statBox,
                { backgroundColor: colors.accentLighter },
              ]}
            >
              <Text style={[styles.statNumber, { color: colors.accent }]}>
                10+
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Months Experience
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.lg,
  },
  bioCard: {
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xl,
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
  bioContent: {
    width: '100%',
  },
  bioHeading: {
    ...TYPOGRAPHY.h3,
    marginBottom: SPACING.lg,
    fontWeight: '700',
  },
  bioText: {
    ...TYPOGRAPHY.body,
    lineHeight: 26,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.xl,
    gap: SPACING.md,
  },
  statBox: {
    flex: 1,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statNumber: {
    ...TYPOGRAPHY.h2,
    fontWeight: '700',
    marginBottom: SPACING.xs,
  },
  statLabel: {
    ...TYPOGRAPHY.bodySmall,
    fontWeight: '500',
    textAlign: 'center',
  },
});

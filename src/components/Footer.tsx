import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  LayoutChangeEvent,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../constants/theme';

interface FooterProps {
  onLayout: (event: LayoutChangeEvent) => void;
}

export const Footer = ({ onLayout }: FooterProps) => {
  const { colors } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <View
      onLayout={onLayout}
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderTopColor: colors.divider,
        },
      ]}
    >
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Eduard King Anterola
          </Text>
          <Text style={[styles.sectionText, { color: colors.textSecondary }]}>
            Aspiring Software Engineer | Computer Science Student
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.linksSection}>
          <View style={styles.column}>
            <Text style={[styles.columnTitle, { color: colors.text }]}>
              Links
            </Text>
            <Text style={[styles.link, { color: colors.accent }]}>
              GitHub
            </Text>
            <Text style={[styles.link, { color: colors.accent }]}>
              LinkedIn
            </Text>
          </View>

          <View style={styles.column}>
            <Text style={[styles.columnTitle, { color: colors.text }]}>
              Services
            </Text>
            <Text style={[styles.link, { color: colors.accent }]}>
              Web Development
            </Text>
            <Text style={[styles.link, { color: colors.accent }]}>
              UI/UX Design
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.footerContent}>
          <Text style={[styles.copyright, { color: colors.textSecondary }]}>
            © {currentYear} Eduard King. All rights reserved.
          </Text>
          <Text style={[styles.credit, { color: colors.textTertiary }]}>
            Designed and built with ❤️ using React Native
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    paddingVertical: SPACING.xxl,
    paddingHorizontal: SPACING.lg,
  },
  content: {
    width: '100%',
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h4,
    fontWeight: '700',
    marginBottom: SPACING.xs,
  },
  sectionText: {
    ...TYPOGRAPHY.bodySmall,
  },
  linksSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: SPACING.xl,
  },
  column: {
    alignItems: 'flex-start',
  },
  columnTitle: {
    ...TYPOGRAPHY.label,
    fontWeight: '700',
    marginBottom: SPACING.md,
  },
  link: {
    ...TYPOGRAPHY.bodySmall,
    fontWeight: '500',
    marginBottom: SPACING.sm,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginVertical: SPACING.xl,
  },
  footerContent: {
    alignItems: 'center',
  },
  copyright: {
    ...TYPOGRAPHY.bodySmall,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  credit: {
    ...TYPOGRAPHY.bodySmall,
    textAlign: 'center',
  },
});

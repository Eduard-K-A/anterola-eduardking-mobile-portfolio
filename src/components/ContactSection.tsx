import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutChangeEvent,
  Linking,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../constants/theme';

interface ContactSectionProps {
  onLayout: (event: LayoutChangeEvent) => void;
}

interface ContactIconProps {
  label: string;
  icon: string;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
}

// Reusable contact icon button
const ContactIcon = ({
  label,
  icon,
  onPress,
  backgroundColor,
  textColor,
  accentColor,
}: ContactIconProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.iconButton,
      {
        backgroundColor: backgroundColor,
        borderColor: accentColor,
      },
    ]}
  >
    <Text
      style={[
        styles.iconText,
        {
          color: accentColor,
          fontSize: 24,
        },
      ]}
    >
      {icon}
    </Text>
    <Text
      style={[
        styles.iconLabel,
        {
          color: textColor,
        },
      ]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

export const ContactSection = ({ onLayout }: ContactSectionProps) => {
  const { colors } = useTheme();

  // Open default email client
  const handleEmailPress = () => {
    Linking.openURL('mailto:eduardkinganterola@gmail.com');
  };

  // Open GitHub profile
  const handleGitHubPress = () => {
    Linking.openURL('https://github.com/Eduard-K-A');
  };

  // Open LinkedIn profile
  const handleLinkedInPress = () => {
    Linking.openURL('https://www.linkedin.com/in/eduard-king-anterola');
  };

  return (
    <View
      onLayout={onLayout}
      style={[
        styles.container,
        { backgroundColor: colors.surface },
      ]}
    >
      <Text
        style={[
          styles.title,
          {
            color: colors.text,
          },
        ]}
      >
        Get In Touch
      </Text>

      <Text
        style={[
          styles.subtitle,
          {
            color: colors.textSecondary,
          },
        ]}
      >
        Let's connect and create something amazing together
      </Text>

      <View style={styles.iconContainer}>
        <ContactIcon
          label="Email"
          icon="✉️"
          onPress={handleEmailPress}
          backgroundColor={colors.accentLight}
          textColor={colors.text}
          accentColor={colors.accent}
        />
        <ContactIcon
          label="GitHub"
          icon="🔗"
          onPress={handleGitHubPress}
          backgroundColor={colors.accentLight}
          textColor={colors.text}
          accentColor={colors.accent}
        />
        <ContactIcon
          label="LinkedIn"
          icon="👤"
          onPress={handleLinkedInPress}
          backgroundColor={colors.accentLight}
          textColor={colors.text}
          accentColor={colors.accent}
        />
      </View>

      <View
        style={[
          styles.divider,
          { backgroundColor: colors.divider },
        ]}
      />

      <Text
        style={[
          styles.footer,
          {
            color: colors.textTertiary,
          },
        ]}
      >
        © 2026 Eduard King. All rights reserved.
      </Text>

      <Text
        style={[
          styles.footerSubtext,
          {
            color: colors.textTertiary,
          },
        ]}
      >
        Designed and built with care
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACING.xxl,
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
  },
  title: {
    ...TYPOGRAPHY.h2,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    marginBottom: SPACING.xl,
    textAlign: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    gap: SPACING.lg,
    marginBottom: SPACING.xxl,
    justifyContent: 'center',
  },
  iconButton: {
    width: 80,
    height: 100,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  iconText: {
    fontWeight: '600',
  },
  iconLabel: {
    ...TYPOGRAPHY.label,
  },
  divider: {
    width: '100%',
    height: 1,
    marginVertical: SPACING.xl,
  },
  footer: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  footerSubtext: {
    ...TYPOGRAPHY.bodySmall,
    textAlign: 'center',
  },
});

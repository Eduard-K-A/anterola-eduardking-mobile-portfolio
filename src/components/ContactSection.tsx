import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutChangeEvent,
  Linking,
  Platform,
  Animated,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../constants/theme';

interface ContactSectionProps {
  onLayout: (event: LayoutChangeEvent) => void;
}

interface ContactItemProps {
  label: string;
  icon: string;
  value: string;
  url: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  accentLight: string;
}

// Reusable contact item
const ContactItem = ({
  label,
  icon,
  value,
  url,
  backgroundColor,
  textColor,
  accentColor,
  accentLight,
}: ContactItemProps) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.95,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    Linking.openURL(url);
  };

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnim }],
      }}
    >
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        activeOpacity={0.7}
        style={[
          styles.contactItem,
          {
            backgroundColor: accentLight,
            borderColor: accentColor,
          },
        ]}
        accessibilityLabel={`${label}: ${value}`}
        accessibilityRole="button"
        accessibilityHint={`Opens ${label}`}
      >
        <Text style={styles.contactIcon}>{icon}</Text>
        <View style={styles.contactContent}>
          <Text style={[styles.contactLabel, { color: textColor }]}>
            {label}
          </Text>
          <Text
            style={[styles.contactValue, { color: accentColor }]}
            numberOfLines={1}
          >
            {value}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export const ContactSection = ({ onLayout }: ContactSectionProps) => {
  const { colors } = useTheme();

  return (
    <View
      onLayout={onLayout}
      style={[
        styles.container,
        { backgroundColor: colors.background },
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

      <View style={styles.itemsContainer}>
        <ContactItem
          label="Email"
          icon="✉️"
          value="eduardkinganterola@gmail.com"
          url="mailto:eduardkinganterola@gmail.com"
          backgroundColor={colors.surface}
          textColor={colors.text}
          accentColor={colors.accent}
          accentLight={colors.accentLight}
        />
        <ContactItem
          label="GitHub"
          icon="🔗"
          value="Eduard-K-A"
          url="https://github.com/Eduard-K-A"
          backgroundColor={colors.surface}
          textColor={colors.text}
          accentColor={colors.accent}
          accentLight={colors.accentLight}
        />
        <ContactItem
          label="LinkedIn"
          icon="💼"
          value="Eduard King Anterola"
          url="https://www.linkedin.com/in/eduard-king-anterola"
          backgroundColor={colors.surface}
          textColor={colors.text}
          accentColor={colors.accent}
          accentLight={colors.accentLight}
        />
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
  title: {
    ...TYPOGRAPHY.h2,
    marginBottom: SPACING.md,
    textAlign: 'center',
    fontWeight: '700',
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    marginBottom: SPACING.xl,
    textAlign: 'center',
  },
  itemsContainer: {
    width: '100%',
    gap: SPACING.md,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
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
  contactIcon: {
    fontSize: 24,
    marginRight: SPACING.lg,
  },
  contactContent: {
    flex: 1,
  },
  contactLabel: {
    ...TYPOGRAPHY.label,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  contactValue: {
    ...TYPOGRAPHY.bodySmall,
    fontWeight: '500',
  },
});

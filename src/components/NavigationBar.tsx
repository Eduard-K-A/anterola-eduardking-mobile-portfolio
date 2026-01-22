import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../constants/theme';

interface NavigationBarProps {
  onNavigate: (section: string) => void;
  activeSection: string;
}

const SECTIONS = ['About', 'Skills', 'Projects', 'Contact'];

export const NavigationBar = ({ onNavigate, activeSection }: NavigationBarProps) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          borderBottomColor: colors.border,
        },
      ]}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={styles.contentContainer}
      >
        {SECTIONS.map((section) => (
          <TouchableOpacity
            key={section}
            onPress={() => onNavigate(section)}
            style={styles.buttonContainer}
          >
            <Text
              style={[
                styles.buttonText,
                {
                  color:
                    activeSection === section ? colors.accent : colors.textSecondary,
                  fontWeight: activeSection === section ? '600' : '400',
                },
              ]}
            >
              {section}
            </Text>
            {activeSection === section && (
              <View
                style={[
                  styles.indicator,
                  { backgroundColor: colors.accent },
                ]}
              />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    paddingVertical: SPACING.md,
  },
  contentContainer: {
    paddingHorizontal: SPACING.lg,
  },
  buttonContainer: {
    marginRight: SPACING.xl,
    alignItems: 'center',
  },
  buttonText: {
    ...TYPOGRAPHY.body,
    marginBottom: SPACING.sm,
  },
  indicator: {
    height: 2,
    width: 24,
    borderRadius: BORDER_RADIUS.sm,
  },
});

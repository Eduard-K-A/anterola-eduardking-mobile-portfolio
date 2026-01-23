import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutChangeEvent,
  Platform,
  ScrollView,
  Animated,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '../constants/theme';

interface SkillCategory {
  all: string[];
  frontend: string[];
  backend: string[];
  tools: string[];
}

// Skills organized by category
const SKILLS: SkillCategory = {
  all: [
    'React Native',
    'React',
    'TypeScript',
    'JavaScript',
    'CSS-in-JS',
    'Tailwind CSS',
    'UI/UX Design',
    'Figma',
    'Node.js',
    'Express.js',
    'RESTful APIs',
    'MongoDB',
    'C++',
    'Next.js',
    'Expo',
    'Git',
    'GitHub',
    'GitHub Workflows',
    'Postman',
    'Bun'
  ],
  frontend: [
    'React Native',
    'React',
    'TypeScript',
    'JavaScript',
    'CSS-in-JS',
    'Tailwind CSS',
    'UI/UX Design',
    'Figma',
  ],
  backend: [
    'Node.js',
    'Express.js',
    'RESTful APIs',
    'MongoDB',
    'C++',
    'Next.js',
  ],
  tools: [
    'Expo',
    'Git',
    'GitHub',
    'Postman',
    'GitHub Workflows',
    'Bun'
  ],
};

type SkillCategoryKey = 'all' | 'frontend' | 'backend' | 'tools';

const CATEGORIES: { key: SkillCategoryKey; label: string; icon: string }[] = [
  { key: 'all', label: 'All', icon: '⭐' },
  { key: 'frontend', label: 'Frontend', icon: '🎨' },
  { key: 'backend', label: 'Backend', icon: '⚙️' },
  { key: 'tools', label: 'Tools', icon: '🛠️' },
];

interface SkillsSectionProps {
  onLayout: (event: LayoutChangeEvent) => void;
}

interface SkillItemProps {
  skill: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
}

const SkillChip = ({ skill, backgroundColor, textColor, accentColor }: SkillItemProps) => (
  <View
    style={[
      styles.chip,
      {
        backgroundColor: backgroundColor,
        borderColor: accentColor,
      },
    ]}
  >
    <Text
      style={[
        styles.chipText,
        {
          color: textColor,
        },
      ]}
    >
      {skill}
    </Text>
  </View>
);

interface FilterButtonProps {
  label: string;
  icon: string;
  isActive: boolean;
  onPress: () => void;
  activeColor: string;
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  textSecondaryColor: string;
}

const FilterButton = ({
  label,
  icon,
  isActive,
  onPress,
  activeColor,
  backgroundColor,
  borderColor,
  textColor,
  textSecondaryColor,
}: FilterButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.7}
    style={[
      styles.filterButton,
      {
        backgroundColor: isActive ? activeColor : backgroundColor,
        borderColor: isActive ? activeColor : borderColor,
      },
    ]}
  >
    <View style={styles.filterButtonContent}>
      <Text style={styles.filterButtonIcon}>{icon}</Text>
      <Text
        style={[
          styles.filterButtonText,
          {
            color: isActive ? '#FFFFFF' : textSecondaryColor,
            fontWeight: isActive ? '700' : '600',
          },
        ]}
      >
        {label}
      </Text>
    </View>
  </TouchableOpacity>
);

export const SkillsSection = ({ onLayout }: SkillsSectionProps) => {
  const { colors } = useTheme();
  const [activeCategory, setActiveCategory] = useState<SkillCategoryKey>('all');

  const currentSkills = SKILLS[activeCategory];

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
        Technical Skills
      </Text>

      {/* Category filter buttons */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContentContainer}
      >
        {CATEGORIES.map((category) => (
          <FilterButton
            key={category.key}
            label={category.label}
            icon={category.icon}
            isActive={activeCategory === category.key}
            onPress={() => setActiveCategory(category.key)}
            activeColor={colors.accent}
            backgroundColor={colors.background}
            borderColor={colors.border}
            textColor={colors.text}
            textSecondaryColor={colors.textSecondary}
          />
        ))}
      </ScrollView>

      {/* Display skills for active category */}
      <View style={styles.skillsContainer}>
        {currentSkills.map((skill, index) => (
          <SkillChip
            key={`${activeCategory}-${index}`}
            skill={skill}
            backgroundColor={colors.accentLight}
            textColor={colors.accent}
            accentColor={colors.accent}
          />
        ))}
      </View>

      {/* Skills count */}
      <Text
        style={[
          styles.skillCount,
          { color: colors.textTertiary },
        ]}
      >
        {currentSkills.length} skills
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACING.xxl,
    paddingHorizontal: SPACING.lg,
  },
  title: {
    ...TYPOGRAPHY.h2,
    marginBottom: SPACING.lg,
    fontWeight: '700',
  },
  filterContainer: {
    marginBottom: SPACING.xl,
    flexGrow: 0,
  },
  filterContentContainer: {
    gap: SPACING.md,
    paddingRight: SPACING.lg,
  },
  filterButton: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.pill,
    borderWidth: 1.5,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  filterButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  filterButtonText: {
    ...TYPOGRAPHY.body,
    fontSize: 13,
  },
  filterButtonIcon: {
    fontSize: 16,
    fontWeight: '700',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  chip: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.pill,
    borderWidth: 1,
    marginBottom: SPACING.md,
  },
  chipText: {
    ...TYPOGRAPHY.bodySmall,
    fontWeight: '500',
  },
  skillCount: {
    ...TYPOGRAPHY.bodySmall,
    textAlign: 'center',
    fontWeight: '500',
  },
});

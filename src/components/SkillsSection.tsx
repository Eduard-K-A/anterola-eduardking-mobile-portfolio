import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutChangeEvent,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../constants/theme';

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

const CATEGORIES: { key: SkillCategoryKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'tools', label: 'Tools' },
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
    style={[
      styles.filterButton,
      {
        backgroundColor: isActive ? activeColor : backgroundColor,
        borderColor: isActive ? activeColor : borderColor,
      },
    ]}
  >
    <View style={styles.filterButtonContent}>
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
  // Track active skill category
  const [activeCategory, setActiveCategory] = useState<SkillCategoryKey>('all');

  // Get skills for active category
  const currentSkills = SKILLS[activeCategory];

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
        Skills
      </Text>

      {/* Category filter buttons */}
      <View style={styles.filterContainer}>
        {CATEGORIES.map((category) => (
          <FilterButton
            key={category.key}
            label={category.label}
            isActive={activeCategory === category.key}
            onPress={() => setActiveCategory(category.key)}
            activeColor={colors.accent}
            backgroundColor={colors.background}
            borderColor={colors.border}
            textColor={colors.text}
            textSecondaryColor={colors.textSecondary}
          />
        ))}
      </View>

      {/* Display skills for active category */}
      <View style={styles.skillsContainer}>
        {currentSkills.map((skill, index) => (
          <SkillChip
            key={index}
            skill={skill}
            backgroundColor={colors.accentLight}
            textColor={colors.accent}
            accentColor={colors.accent}
          />
        ))}
      </View>
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
    marginBottom: SPACING.xl,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.xl,
    paddingBottom: SPACING.lg,
    borderBottomWidth: 1,
  },
  filterButton: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1.5,
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
    fontSize: 14,
    fontWeight: '700',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: SPACING.md,
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
});

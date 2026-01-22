import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  LayoutChangeEvent,
  Dimensions,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../constants/theme';

interface ProjectItemProps {
  id: string;
  title: string;
  description: string;
  image?: string;
}

const PROJECTS: ProjectItemProps[] = [
  {
    id: '1',
    title: 'E-Commerce App',
    description: 'A full-featured mobile shopping application with payment integration',
    image: 'https://images.unsplash.com/photo-1512941691920-25bda36dc643?w=200&h=200&fit=crop',
  },
  {
    id: '2',
    title: 'Task Manager',
    description: 'Real-time task management app with cloud synchronization',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=200&h=200&fit=crop',
  },
  {
    id: '3',
    title: 'Social Network',
    description: 'Connect with friends, share moments, and build communities',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=200&h=200&fit=crop',
  },
  {
    id: '4',
    title: 'Fitness Tracker',
    description: 'Monitor health metrics and achieve your fitness goals',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f70a504f0?w=200&h=200&fit=crop',
  },
];

interface ProjectsSectionProps {
  onLayout: (event: LayoutChangeEvent) => void;
}

interface ProjectCardProps {
  item: ProjectItemProps;
  backgroundColor: string;
  textColor: string;
  textSecondaryColor: string;
  accentColor: string;
  borderColor: string;
}

const ProjectCard = ({
  item,
  backgroundColor,
  textColor,
  textSecondaryColor,
  accentColor,
  borderColor,
}: ProjectCardProps) => {
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = screenWidth - SPACING.lg * 2 - SPACING.md;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor,
          borderColor,
          width: cardWidth,
        },
      ]}
    >
      <Text
        style={[
          styles.cardTitle,
          {
            color: textColor,
          },
        ]}
      >
        {item.title}
      </Text>

      <Text
        style={[
          styles.cardDescription,
          {
            color: textSecondaryColor,
          },
        ]}
      >
        {item.description}
      </Text>

      <TouchableOpacity
        style={[
          styles.viewButton,
          {
            backgroundColor: accentColor,
          },
        ]}
      >
        <Text style={styles.viewButtonText}>View Project</Text>
      </TouchableOpacity>
    </View>
  );
};

export const ProjectsSection = ({ onLayout }: ProjectsSectionProps) => {
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
        Projects
      </Text>

      <FlatList
        data={PROJECTS}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <ProjectCard
            item={item}
            backgroundColor={colors.surface}
            textColor={colors.text}
            textSecondaryColor={colors.textSecondary}
            accentColor={colors.accent}
            borderColor={colors.border}
          />
        )}
      />
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
  listContainer: {
    paddingRight: SPACING.lg,
    gap: SPACING.lg,
  },
  card: {
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    padding: SPACING.lg,
    gap: SPACING.md,
  },
  cardTitle: {
    ...TYPOGRAPHY.h4,
    fontWeight: '600',
  },
  cardDescription: {
    ...TYPOGRAPHY.bodySmall,
    lineHeight: 20,
  },
  viewButton: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  viewButtonText: {
    ...TYPOGRAPHY.body,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

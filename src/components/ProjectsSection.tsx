import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  LayoutChangeEvent,
  Dimensions,
  Linking
} from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../constants/theme';

interface ProjectItemProps {
  id: string;
  title: string;
  description: string;
  image: any;
  url?: string;
}

const PROJECTS: ProjectItemProps[] = [
  {
    id: '1',
    title: 'Luxe Stay',
    description: 'A full-featured hotel reservation application with payment integration',
    image: require('../assets/luxe-stay.png'),
    url:'https://webdev-finals-frontend.vercel.app/'
  },
  {
    id: '2',
    title: 'Flur-Chat',
    description: 'A web-based AI chat application with real-time messaging features',
    image: require('../assets/flur-chat.png'),
    url:'https://flur-chat.vercel.app/'
  },
  {
    id: '3',
    title: 'Pinoy Recipe Finder',
    description: 'A web app to discover traditional Filipino recipes',
    image: require('../assets/pinoy-recipe-finder.png'),
    url:'https://anterola-recipe-finder.vercel.app/'
  },
  {
    id: '4',
    title: 'StudySpot PH',
    description: 'A web app to find and book study spaces in the Philippines',
    image: require('../assets/study-spot.png'),
    url:'https://anterola-midterm-project.vercel.app/'
  },
  {
    id: '5',
    title: 'CleanOps',
    description: 'A web app for managing cleaning services and smart scheduling features',
    image: require('../assets/clean-ops.png'), 
    url:'https://clean-ops-alpha.vercel.app/'
  }
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
  const cardWidth = screenWidth * 0.85;

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
      <Image
        source={item.image}
        style={styles.cardImage}
      />

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
        onPress={() => {
          if (item.url) {
            Linking.openURL(item.url);
          }
        }}
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
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = screenWidth * 0.85;

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
        snapToInterval={cardWidth + SPACING.lg}
        decelerationRate="fast"
        snapToAlignment="start"
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
        ItemSeparatorComponent={() => <View style={{ width: SPACING.lg }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACING.xxl,
  },
  title: {
    ...TYPOGRAPHY.h2,
    marginBottom: SPACING.xl,
    paddingHorizontal: SPACING.lg,
  },
  listContainer: {
    paddingHorizontal: SPACING.lg,
  },
  card: {
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    padding: SPACING.lg,
    gap: SPACING.md,
  },
  cardImage: {
    width: '100%',
    height: 180,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.md,
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
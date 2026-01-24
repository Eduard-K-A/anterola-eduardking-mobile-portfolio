import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  LayoutChangeEvent,
  Dimensions,
  Linking,
  Platform,
  Animated,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../constants/theme';

interface ProjectItemProps {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: any;
  url?: string;
}

// Projects displayed in horizontal carousel
const PROJECTS: ProjectItemProps[] = [
  {
    id: '1',
    title: 'Luxe Stay',
    description: 'A full-featured hotel reservation application with seamless payment integration and modern UI',
    tags: ['MERN', 'TypeScript', 'Tailwind CSS'],
    image: require('../assets/luxe-stay.png'),
    url: 'https://webdev-finals-frontend.vercel.app/'
  },
  {
    id: '2',
    title: 'Flur-Chat',
    description: 'A web-based AI chat application with real-time messaging and natural language processing',
    tags: [ 'AI', 'WebSockets', 'TypeScript', 'Groq API'],
    image: require('../assets/flur-chat.png'),
    url: 'https://flur-chat.vercel.app/'
  },
  {
    id: '3',
    title: 'Pinoy Recipe Finder',
    description: 'A web app to discover and share traditional Filipino recipes with community features',
    tags: ['React', 'Vercel'],
    image: require('../assets/pinoy-recipe-finder.png'),
    url: 'https://anterola-recipe-finder.vercel.app/'
  },
  {
    id: '4',
    title: 'StudySpot PH',
    description: 'A web app to find and book study spaces across the Philippines with smart filtering',
    tags: ['React', 'Vercel', 'TypeScript'],
    image: require('../assets/study-spot.png'),
    url: 'https://anterola-midterm-project.vercel.app/'
  },
  {
    id: '5',
    title: 'CleanOps',
    description: 'A web app for managing cleaning services with intelligent scheduling and analytics',
    tags: ['Next.js', 'Node.js', 'Tailwind CSS' , 'TypeScript'],
    image: require('../assets/clean-ops.png'),
    url: 'https://clean-ops-alpha.vercel.app/'
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
  accentLight: string;
}

const ProjectCard = React.memo(({
  item,
  backgroundColor,
  textColor,
  textSecondaryColor,
  accentColor,
  borderColor,
  accentLight,
}: ProjectCardProps) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = screenWidth * 0.85;

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.97,
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

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnim }],
        width: cardWidth,
      }}
    >
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => item.url && Linking.openURL(item.url)}
        activeOpacity={0.8}
        style={[
          styles.card,
          {
            backgroundColor,
            borderColor,
          },
        ]}
        accessibilityLabel={`Project: ${item.title}`}
        accessibilityRole="button"
        accessibilityHint="Opens project details"
      >
        <Image
          source={item.image}
          style={styles.cardImage}
          resizeMode="cover"
        />

        <View style={styles.cardContent}>
          <Text
            style={[
              styles.cardTitle,
              {
                color: textColor,
              },
            ]}
            numberOfLines={2}
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
            numberOfLines={2}
          >
            {item.description}
          </Text>

          {/* Tech Stack Tags */}
          <View style={styles.tagsContainer}>
            {item.tags.map((tag, index) => (
              <View
                key={`${item.id}-tag-${index}`}
                style={[
                  styles.tag,
                  { backgroundColor: accentLight },
                ]}
              >
                <Text style={[styles.tagText, { color: accentColor }]}>
                  {tag}
                </Text>
              </View>
            ))}
          </View>

          {/* CTA Button */}
          <TouchableOpacity
            onPress={() => item.url && Linking.openURL(item.url)}
            style={[
              styles.viewButton,
              {
                backgroundColor: accentColor,
              },
            ]}
            activeOpacity={0.8}
          >
            <Text style={styles.viewButtonText}>View Project →</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
});

ProjectCard.displayName = 'ProjectCard';

export const ProjectsSection = ({ onLayout }: ProjectsSectionProps) => {
  const { colors } = useTheme();
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = screenWidth * 0.85;
  const snapToInterval = cardWidth + SPACING.lg;

  const memoizedData = useMemo(() => PROJECTS, []);

  return (
    <View
      onLayout={onLayout}
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <View style={styles.headerContainer}>
        <Text
          style={[
            styles.title,
            {
              color: colors.text,
            },
          ]}
        >
          Featured Projects
        </Text>
        <Text
          style={[
            styles.subtitle,
            {
              color: colors.textSecondary,
            },
          ]}
        >
          Swipe to explore
        </Text>
      </View>

      {/* Horizontal carousel with optimizations */}
      <FlatList
        data={memoizedData}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToInterval={snapToInterval}
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
            accentLight={colors.accentLight}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ width: SPACING.lg }} />}
        scrollEnabled
        removeClippedSubviews
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACING.xxl,
  },
  headerContainer: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  title: {
    ...TYPOGRAPHY.h2,
    fontWeight: '700',
    marginBottom: SPACING.xs,
  },
  subtitle: {
    ...TYPOGRAPHY.bodySmall,
    fontWeight: '500',
  },
  listContainer: {
    paddingHorizontal: SPACING.lg,
  },
  card: {
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  cardContent: {
    padding: SPACING.lg,
    gap: SPACING.md,
  },
  cardTitle: {
    ...TYPOGRAPHY.h4,
    fontWeight: '700',
  },
  cardDescription: {
    ...TYPOGRAPHY.bodySmall,
    lineHeight: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: SPACING.sm,
    flexWrap: 'wrap',
  },
  tag: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.pill,
  },
  tagText: {
    ...TYPOGRAPHY.label,
    fontSize: 11,
    fontWeight: '600',
  },
  viewButton: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.md,
  },
  viewButtonText: {
    ...TYPOGRAPHY.body,
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
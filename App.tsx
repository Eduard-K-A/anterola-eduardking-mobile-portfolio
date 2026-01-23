import React, { useRef, useState, useCallback } from 'react';
import { StyleSheet, View, ScrollView, LayoutChangeEvent, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, useTheme } from './src/hooks/useTheme';
import { Header } from './src/components/Header';
import { HeroSection } from './src/components/HeroSection';
import { BioSection } from './src/components/BioSection';
import { SkillsSection } from './src/components/SkillsSection';
import { ProjectsSection } from './src/components/ProjectsSection';
import { ContactSection } from './src/components/ContactSection';
import { Footer } from './src/components/Footer';
import { SPACING } from './src/constants/theme';

interface SectionLayout {
  Hero: number;
  Bio: number;
  Skills: number;
  Projects: number;
  Contact: number;
  Footer: number;
}

/**
 * Main App Content Component
 * Handles the scrollable layout with optimized section tracking
 */
function AppContent() {
  const { colors } = useTheme();
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollOffsetAnim = useRef(new Animated.Value(0)).current;
  const [activeSection, setActiveSection] = useState('Hero');
  
  // Track Y-position of each section for optimized navigation
  const [sectionLayouts, setSectionLayouts] = useState<SectionLayout>({
    Hero: 0,
    Bio: 0,
    Skills: 0,
    Projects: 0,
    Contact: 0,
    Footer: 0,
  });

  // Memoized section layout handler to avoid unnecessary re-renders
  const handleSectionLayout = useCallback(
    (section: keyof SectionLayout) => (event: LayoutChangeEvent) => {
      const { y } = event.nativeEvent.layout;
      setSectionLayouts((prev) => ({
        ...prev,
        [section]: y,
      }));
    },
    []
  );

  // Optimized navigation to section by scrolling
  const handleNavigate = useCallback((section: string) => {
    setActiveSection(section);
    const yOffset = sectionLayouts[section as keyof SectionLayout] || 0;

    scrollViewRef.current?.scrollTo({
      y: Math.max(0, yOffset - SPACING.lg),
      animated: true,
    });
  }, [sectionLayouts]);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background }}
      edges={['top', 'left', 'right']}
    >
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Header onThemeToggle={() => {}} />

        <Animated.ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={styles.scrollContent}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollOffsetAnim } } }],
            { useNativeDriver: false }
          )}
        >
          <HeroSection onLayout={handleSectionLayout('Hero')} />
          <BioSection onLayout={handleSectionLayout('Bio')} />
          <SkillsSection onLayout={handleSectionLayout('Skills')} />
          <ProjectsSection onLayout={handleSectionLayout('Projects')} />
          <ContactSection onLayout={handleSectionLayout('Contact')} />
          <Footer onLayout={handleSectionLayout('Footer')} />
        </Animated.ScrollView>

        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

/**
 * Main App Component with Theme Provider
 * Wraps the entire app with theme context
 */
export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});

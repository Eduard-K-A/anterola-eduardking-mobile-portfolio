import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView, LayoutChangeEvent } from 'react-native';
import { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from './src/hooks/useTheme';
import Header from './src/components/Header';
import { NavigationBar } from './src/components/NavigationBar';
import { HeroSection } from './src/components/HeroSection';
import { SkillsSection } from './src/components/SkillsSection';
import { ProjectsSection } from './src/components/ProjectsSection';
import { ContactSection } from './src/components/ContactSection';
import { SPACING } from './src/constants/theme';

interface SectionLayout {
  About: number;
  Skills: number;
  Projects: number;
  Contact: number;
}

function AppContent() {
  const { colors } = useTheme();
  const scrollViewRef = useRef<ScrollView>(null);
  const [activeSection, setActiveSection] = useState('About');
  // Track Y-position of each section for scroll navigation
  const [sectionLayouts, setSectionLayouts] = useState<SectionLayout>({
    About: 0,
    Skills: 0,
    Projects: 0,
    Contact: 0,
  });

  // Capture section Y-position when it renders
  const handleSectionLayout = (section: keyof SectionLayout) => (event: LayoutChangeEvent) => {
    const { y } = event.nativeEvent.layout;
    setSectionLayouts((prev) => ({
      ...prev,
      [section]: y,
    }));
  };

  // Navigate to section by scrolling to its position
  const handleNavigate = (section: string) => {
    setActiveSection(section);
    const yOffset = sectionLayouts[section as keyof SectionLayout] || 0;

    scrollViewRef.current?.scrollTo({
      y: yOffset - SPACING.lg,
      animated: true,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Header />
        <NavigationBar onNavigate={handleNavigate} activeSection={activeSection} />

        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={styles.scrollContent}
        >
          <HeroSection onLayout={handleSectionLayout('About')} />
          <SkillsSection onLayout={handleSectionLayout('Skills')} />
          <ProjectsSection onLayout={handleSectionLayout('Projects')} />
          <ContactSection onLayout={handleSectionLayout('Contact')} />
        </ScrollView>

        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

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

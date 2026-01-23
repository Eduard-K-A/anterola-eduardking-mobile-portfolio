import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, ColorScheme } from '../constants/theme';

interface ThemeContextType {
  isDark: boolean;
  colors: typeof COLORS.light;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const THEME_STORAGE_KEY = '@portfolioApp:theme';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');
  const [isLoading, setIsLoading] = useState(true);

  // Load persisted theme preference on mount
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme !== null) {
          setIsDarkMode(savedTheme === 'dark');
        } else if (colorScheme) {
          setIsDarkMode(colorScheme === 'dark');
        }
      } catch (error) {
        console.warn('Failed to load theme preference:', error);
        // Fallback to device preference
        if (colorScheme) {
          setIsDarkMode(colorScheme === 'dark');
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadThemePreference();
  }, [colorScheme]);

  // Toggle theme and persist preference
  const toggleTheme = async () => {
    try {
      const newTheme = !isDarkMode;
      setIsDarkMode(newTheme);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme ? 'dark' : 'light');
    } catch (error) {
      console.warn('Failed to save theme preference:', error);
    }
  };

  const colors = isDarkMode ? COLORS.dark : COLORS.light;

  // Don't render children until theme is loaded
  if (isLoading) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ isDark: isDarkMode, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to access theme context - throws error if used outside ThemeProvider
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

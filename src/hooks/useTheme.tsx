import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { COLORS, ColorScheme } from '../constants/theme';

interface ThemeContextType {
  isDark: boolean;
  colors: typeof COLORS.light;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  useEffect(() => {
    if (colorScheme) {
      setIsDarkMode(colorScheme === 'dark');
    }
  }, [colorScheme]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const colors = isDarkMode ? COLORS.dark : COLORS.light;

  return (
    <ThemeContext.Provider value={{ isDark: isDarkMode, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

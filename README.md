# Eduard King Anterola - Professional Mobile Portfolio

> A single-page mobile portfolio application built with React Native and TypeScript

## 🎨 Overview

This is a beautifully designed, fully responsive mobile portfolio application showcasing professional work, technical skills, and contact information. Built with modern best practices in mind, featuring smooth animations, dark/light theme support, and exceptional UI/UX design principles.

## ✨ Key Features

### 1. **Professional Design System**
- Modern, minimalist aesthetic with generous white space
- Carefully curated color palette supporting both light and dark modes
- Professional typography system with proper hierarchy and spacing
- Consistent component styling across the entire app

### 2. **Theme Support**
- Seamless dark/light mode toggle with animated transitions
- Theme preference persisted to device storage (AsyncStorage)
- Automatic detection of system theme preference
- Beautiful animated sun/moon toggle button in header

### 3. **Responsive & Adaptive Layout**
- Single-page scrollable design with optimized section tracking
- Platform-specific design patterns (iOS/Android)
- Safe area handling for notched devices
- Proper shadow and elevation implementation

### 4. **Smooth Animations**
- Fade-in effects on Hero section with profile picture
- Scale and press animations on interactive elements
- Animated theme toggle button
- Smooth scroll transitions with proper interpolation

### 5. **Component Sections**

#### Header
- Clean, professional header with name and title
- Theme toggle button with rotating animation
- Elevated styling with platform-specific shadows

#### Hero Section
- Circular profile picture with status indicator
- Animated entrance on mount
- Professional title and bio with call-to-action
- Responsive typography and spacing

#### Bio Section
- About Me narrative with professional description
- Statistics showcase (Projects, Skills, Years Experience)
- Card-based layout with subtle styling
- Platform-specific shadows

#### Skills Section
- Categorized skill display (All, Frontend, Backend, Tools)
- Category filtering with smooth transitions
- Horizontally scrollable category filters
- Color-coded skill chips with consistent styling

#### Featured Projects
- Horizontal carousel FlatList with snap-to-scroll
- Rich project cards with thumbnail images
- Tech stack tags for each project
- Call-to-action buttons with link to live projects
- Optimized rendering with React.memo

#### Contact Section
- Three main contact methods (Email, GitHub, LinkedIn)
- Interactive cards with scale animations
- Direct linking to email and social profiles
- Accessibility labels for all interactions

#### Footer
- Professional footer with copyright and credits
- Section links and company information
- Clean, minimalist design matching overall aesthetic

## 🏗️ Architecture

### Technology Stack
```
React Native 0.81.5
TypeScript 5.9.2
React 19.1.0
AsyncStorage ^1.23.1
Expo ^54.0.32
```

### Project Structure
```
src/
├── components/
│   ├── Header.tsx          # App header with theme toggle
│   ├── HeroSection.tsx     # Hero/intro section
│   ├── BioSection.tsx      # About me section
│   ├── SkillsSection.tsx   # Technical skills with filtering
│   ├── ProjectsSection.tsx # Featured projects carousel
│   ├── ContactSection.tsx  # Contact information
│   └── Footer.tsx          # App footer
├── hooks/
│   └── useTheme.tsx        # Theme management with persistence
├── constants/
│   └── theme.ts            # Design system tokens
└── assets/                 # Images and resources
```

### Design System

#### Colors
**Light Mode:**
- Background: #FFFFFF
- Surface: #F8F9FA
- Text Primary: #1A1A1A
- Text Secondary: #6B7280
- Accent: #3B82F6

**Dark Mode:**
- Background: #0F172A
- Surface: #1E293B
- Text Primary: #F1F5F9
- Text Secondary: #94A3B8
- Accent: #60A5FA

#### Typography
- H1: 32px, Bold (700)
- H2: 28px, Bold (700)
- H3: 24px, SemiBold (600)
- H4: 20px, SemiBold (600)
- Body: 16px, Regular (400)
- Body Small: 14px, Regular (400)
- Label: 12px, SemiBold (600)

#### Spacing
- xs: 4px
- sm: 8px
- md: 12px
- lg: 16px
- xl: 24px
- xxl: 32px
- xxxl: 48px

#### Border Radius
- sm: 4px
- md: 8px
- lg: 12px
- xl: 16px
- xxl: 20px
- pill: 24px
- round: 32px
- circle: 999px

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ or higher
- npm or yarn
- Expo CLI installed globally

### Installation

1. **Clone the repository** (if applicable)
```bash
cd anterola-eduardking-mobile-portfolio
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Run the app**
```bash
npm start
# or
expo start
```

4. **Select platform**
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Press `w` for web browser
- Scan QR code with Expo Go app on physical device

## 📱 Usage

### Theme Toggle
- Tap the sun/moon button in the header to toggle between light and dark modes
- Theme preference is automatically saved and restored on app restart

### Skill Filtering
- Tap category buttons (All, Frontend, Backend, Tools) to filter skills
- Smooth animations accompany each category change

### Project Carousel
- Swipe horizontally through featured projects
- Tap "View Project" button to open project link in browser
- Projects snap-to-scroll for smooth interaction

### Contact
- Tap email to open default email client
- Tap GitHub/LinkedIn to open profiles in browser
- All links are fully functional and accessible

## 🎯 Code Quality & Best Practices

### TypeScript Integration
- Strict TypeScript mode enabled
- Full type definitions for all props and state
- Interface-based component prop definitions
- Type safety throughout the codebase

### Performance Optimizations
- React.memo for ProjectCard component
- useCallback for event handlers
- useMemo for data memoization
- FlatList optimization with removeClippedSubviews
- Proper ScrollView configuration for smooth scrolling

### Accessibility
- Proper accessibilityLabel attributes on interactive elements
- accessibilityRole for semantics
- accessibilityHint for user guidance
- Sufficient color contrast ratios (WCAG AA)
- Screen reader compatible

### Responsive Design
- Flexible layouts using flexbox
- Dimension-aware calculations
- Platform-specific styling using Platform.select()
- Safe area handling for notched devices
- Adaptive typography and spacing

## 🎨 Customization

### Changing Colors
Edit `src/constants/theme.ts`:
```typescript
export const COLORS = {
  light: {
    accent: '#3B82F6', // Change this
    // ... other colors
  },
  dark: {
    accent: '#60A5FA', // Change this
    // ... other colors
  }
}
```

### Updating Skills
Edit `src/components/SkillsSection.tsx`:
```typescript
const SKILLS: SkillCategory = {
  all: [
    'Your Skill 1',
    'Your Skill 2',
    // ...
  ],
  // ...
}
```

### Adding Projects
Edit `src/components/ProjectsSection.tsx`:
```typescript
const PROJECTS: ProjectItemProps[] = [
  {
    id: '6',
    title: 'Your Project',
    description: 'Project description',
    tags: ['React', 'Node.js'],
    image: require('../assets/your-image.png'),
    url: 'https://your-project-url.com'
  },
  // ...
]
```

## 🔧 Development

### Adding New Sections
1. Create a new component in `src/components/`
2. Follow the established pattern with `onLayout` prop
3. Use theme colors from `useTheme` hook
4. Import and integrate into `App.tsx`
5. Add section layout tracking if needed

### Extending Theme
```typescript
// Add new color to COLORS object
export const COLORS = {
  light: {
    // ... existing colors
    newColor: '#YOUR_HEX_COLOR',
  },
}

// Use in components
const { colors } = useTheme();
// colors.newColor is now available
```

### Testing Theme Toggle
The theme persists automatically to AsyncStorage. To test:
1. Toggle theme using header button
2. Close and reopen the app
3. Verify theme preference is restored

## 📦 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| expo | ~54.0.32 | React Native framework |
| react | 19.1.0 | UI library |
| react-native | 0.81.5 | Mobile framework |
| typescript | ~5.9.2 | Type safety |
| @react-native-async-storage/async-storage | ^1.23.1 | Theme persistence |
| react-native-safe-area-context | ^4.8.1 | Safe area handling |

## 🌐 Browser Support

- iOS 13+
- Android 8.0+
- Web (via Expo Web)

## 📝 Notes

### Performance Considerations
- All animations use `useNativeDriver: true` for optimal performance
- FlatList is optimized with proper key extraction
- Components use memoization to prevent unnecessary re-renders
- Images are properly sized and cached

### Accessibility
- All interactive elements have proper accessibility labels
- Color contrast meets WCAG AA standards
- Touch targets are appropriately sized (44px minimum)
- Screen reader support is enabled throughout

### Future Enhancements
- Add pull-to-refresh functionality
- Implement smooth parallax scroll effects
- Add haptic feedback for interactions
- Create loading skeleton screens
- Add animation preset library
- Implement error boundaries

## 📄 License

0BSD (See LICENSE file)

## 👨‍💻 About

Created by Eduard King Anterola - Aspiring Software Engineer and Computer Science Student

## 📧 Contact

- **Email**: eduardkinganterola@gmail.com
- **GitHub**: [Eduard-K-A](https://github.com/Eduard-K-A)
- **LinkedIn**: [Eduard King Anterola](https://www.linkedin.com/in/eduard-king-anterola)

---

**Made with ❤️ using React Native and TypeScript**

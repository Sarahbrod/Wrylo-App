# Wrylo App Design System Style Guide

## Overview
This style guide documents the unified design system for the Wrylo reading app. It provides guidelines for consistent styling, typography, spacing, and component usage across the entire application.

## Design System Structure

### File Organization
```
src/
├── styles/
│   └── theme.js                 # Main theme configuration
├── components/
│   └── StyledComponents/
│       └── index.js             # Reusable styled components
└── screens/
    ├── HomeRefactored.js        # Example of refactored screen
    └── AccountScreenRefactored.js
```

## Color System

### Primary Colors
- **Primary**: `#7FABC7` - Main brand color for buttons, highlights
- **Primary Dark**: `#6B96B3` - Darker variant for hover states
- **Secondary**: `#7F9BEB` - Secondary brand color for stats, accents

### Background Colors
- **Background**: `#F6F4F1` - Main app background
- **Surface**: `#FFFFFF` - Card and component backgrounds
- **Surface Variant**: `#F8F9FA` - Alternative surface color

### Text Colors
- **On Background**: `#1D1D1D` - Primary text on background
- **On Surface**: `#1D1D1D` - Primary text on surfaces
- **On Surface Variant**: `#71727A` - Secondary text color

### Status Colors
- **Success**: `#4CAF50` with light variant `#E8F5E8`
- **Warning**: `#FF9800` with light variant `#FFF3E0`
- **Error**: `#F37272` with light variant `#FFE5E5`
- **Info**: `#2196F3` with light variant `#E3F2FD`

## Typography Scale

### Display Styles (Page Headers)
- **Display Large**: 36px, weight 200, line-height 44px
- **Display Medium**: 32px, weight 300, line-height 40px
- **Display Small**: 28px, weight bold, line-height 36px

### Headline Styles (Section Headers)
- **Headline Large**: 24px, weight bold, line-height 32px
- **Headline Medium**: 20px, weight 600, line-height 28px
- **Headline Small**: 18px, weight 600, line-height 24px

### Title Styles (Card Headers, Subsections)
- **Title Large**: 16px, weight bold, line-height 24px
- **Title Medium**: 14px, weight bold, line-height 20px
- **Title Small**: 12px, weight bold, line-height 16px

### Body Text Styles
- **Body Large**: 16px, weight 400, line-height 24px
- **Body Medium**: 14px, weight 400, line-height 20px
- **Body Small**: 12px, weight 400, line-height 16px

### Label Styles (Buttons, Form Labels)
- **Label Large**: 14px, weight 600, line-height 20px
- **Label Medium**: 12px, weight 600, line-height 16px
- **Label Small**: 10px, weight 600, line-height 14px

### Stat/Number Styles
- **Stat Large**: 36px, weight bold, line-height 44px
- **Stat Medium**: 24px, weight bold, line-height 32px
- **Stat Small**: 20px, weight bold, line-height 28px

## Spacing System

### Base Spacing Scale
- **xs**: 4px
- **sm**: 8px
- **md**: 12px
- **lg**: 16px
- **xl**: 20px
- **xxl**: 24px
- **xxxl**: 32px
- **xxxxl**: 40px

### Semantic Spacing
- **Component Gap**: 8px - Space between related elements
- **Section Gap**: 20px - Space between sections
- **Screen Padding**: 20px - Horizontal padding for screens
- **Card Padding**: 16px - Internal padding for cards
- **Card Padding Large**: 20px - Internal padding for large cards
- **Button Padding**: 16px - Internal padding for buttons
- **Input Padding**: 12px - Internal padding for inputs

## Border Radius System

- **Small**: 8px - Inputs, small cards
- **Medium**: 12px - Standard cards
- **Large**: 16px - Large cards, prominent elements
- **XLarge**: 20px - Very large cards, buttons
- **Round**: 999px - Circular elements

## Shadow System

### Shadow Variants
- **Small**: Subtle elevation for minor elements
- **Medium**: Standard elevation for cards
- **Large**: Prominent elevation for important elements
- **XLarge**: Maximum elevation for modals, overlays

### Shadow Properties
```javascript
small: {
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 2,
}
```

## Component Guidelines

### Cards
Use the `StyledCard` component with these variants:
- **base**: Standard card with medium shadow
- **elevated**: Card with large shadow for prominence
- **large**: Card with larger padding and border radius
- **flat**: Card without shadow for subtle containers

### Typography
Use the `StyledText` component for all text elements:
```jsx
<StyledText variant="titleLarge" color={theme.colors.onSurface}>
  Section Title
</StyledText>
```

### Buttons
Use consistent button styling with the refactored CustomButton:
- **PRIMARY**: Filled button with primary color
- **SECONDARY**: Outlined button with primary border
- **TERTIARY**: Text button without background
- **LINK**: Minimal text button for links

### Stats
Use the `StatCard` component for displaying numerical data:
```jsx
<StatCard
  number="23"
  label="Books Read"
  numberColor={theme.colors.primary}
  variant="elevated"
/>
```

## Usage Examples

### Section Headers
```jsx
<SectionHeader 
  title="Reading Journey"
  subtitle="Begin your literary exploration"
/>
```

### Book Cards
```jsx
<BookCard
  title="The Seven Husbands of Evelyn Hugo"
  author="Taylor Jenkins Reid"
  coverIcon="📖"
  rating="4.5"
  onPress={onPress}
  variant="elevated"
/>
```

### Achievement Items
```jsx
<AchievementItem
  icon="🏆"
  title="Bookworm"
  description="Read 10 books this year"
  backgroundColor={theme.colors.surface}
/>
```

## Best Practices

### Do's
✅ Use the design system components consistently
✅ Follow the typography hierarchy
✅ Use semantic spacing values
✅ Apply consistent shadow styles
✅ Use the defined color palette
✅ Import theme from the central location

### Don'ts
❌ Create custom styles that duplicate system components
❌ Use hardcoded colors or spacing values
❌ Mix different typography scales inconsistently
❌ Apply shadows randomly without following the system
❌ Override component styles unnecessarily

## Migration Guide

### Step 1: Import the Design System
```javascript
import theme from '../styles/theme';
import { StyledText, StyledCard, SectionHeader } from '../components/StyledComponents';
```

### Step 2: Replace Hardcoded Styles
```javascript
// Before
fontSize: 24,
fontWeight: 'bold',
color: '#1D1D1D',

// After
<StyledText variant="headlineLarge" color={theme.colors.onSurface}>
```

### Step 3: Use Semantic Spacing
```javascript
// Before
marginBottom: 20,
paddingHorizontal: 16,

// After
marginBottom: theme.spacing.xl,
paddingHorizontal: theme.spacing.lg,
```

### Step 4: Apply Consistent Shadows
```javascript
// Before
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.1,

// After
...theme.shadows.medium,
```

## Responsive Considerations

The design system includes helper functions for responsive design:

```javascript
// Responsive padding based on screen width
const padding = theme.getResponsivePadding(screenWidth);

// Responsive font size adjustment
const fontSize = theme.getResponsiveFontSize(baseSize, screenWidth);
```

## Future Enhancements

### Planned Additions
- Dark mode color variants
- Animation presets
- Accessibility helpers
- Component size variants
- Additional color themes

### Maintenance
- Regular color contrast audits
- Typography accessibility reviews
- Performance optimization of styled components
- Documentation updates with new components

---

This style guide should be updated as the design system evolves. All team members should reference this guide when implementing new features or modifying existing components.
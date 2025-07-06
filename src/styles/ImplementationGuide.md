# Design System Implementation Guide

## Quick Start

### 1. Replace Your Current Home Screen
Replace the content of `src/screens/Home.js` with the refactored version:

```bash
# Backup current file
cp src/screens/Home.js src/screens/Home.backup.js

# Replace with refactored version
cp src/screens/HomeRefactored.js src/screens/Home.js
```

### 2. Replace Your Current Account Screen
Replace the content of `src/screens/AccountScreen.js` with the refactored version:

```bash
# Backup current file
cp src/screens/AccountScreen.js src/screens/AccountScreen.backup.js

# Replace with refactored version
cp src/screens/AccountScreenRefactored.js src/screens/AccountScreen.js
```

### 3. Update Your CustomButton Component
Replace the content of `src/components/CustomButton/CustomButton.js` with the refactored version:

```bash
# Backup current file
cp src/components/CustomButton/CustomButton.js src/components/CustomButton/CustomButton.backup.js

# Replace with refactored version
cp src/components/CustomButton/CustomButtonRefactored.js src/components/CustomButton/CustomButton.js
```

## Step-by-Step Migration for Other Screens

### 1. Update Imports
Add these imports to the top of each screen file:

```javascript
import theme from '../styles/theme';
import {
  StyledText,
  StyledCard,
  StyledContainer,
  SectionHeader,
  StatCard,
  BookCard,
  ActionCard,
  GoalItem,
  AchievementItem,
} from '../components/StyledComponents';
```

### 2. Replace Text Components
Replace all `<Text>` components with `<StyledText>`:

```javascript
// Before
<Text style={styles.sectionTitle}>Reading Journey</Text>

// After
<StyledText variant="titleLarge" color={theme.colors.onSurface}>
  Reading Journey
</StyledText>
```

### 3. Replace Card Styling
Replace manual card styling with `<StyledCard>`:

```javascript
// Before
<View style={styles.card}>
  {/* content */}
</View>

// After
<StyledCard variant="elevated">
  {/* content */}
</StyledCard>
```

### 4. Update Spacing
Replace hardcoded spacing with theme values:

```javascript
// Before
marginBottom: 20,
paddingHorizontal: 16,

// After
marginBottom: theme.spacing.xl,
paddingHorizontal: theme.spacing.lg,
```

### 5. Update Colors
Replace hardcoded colors with theme colors:

```javascript
// Before
backgroundColor: '#F6F4F1',
color: '#1D1D1D',

// After
backgroundColor: theme.colors.background,
color: theme.colors.onSurface,
```

## Common Patterns and Replacements

### Section Headers
```javascript
// Before
<View style={styles.sectionHeader}>
  <Text style={styles.sectionTitle}>Title</Text>
  <Text style={styles.sectionSubtitle}>Subtitle</Text>
</View>

// After
<SectionHeader 
  title="Title"
  subtitle="Subtitle"
/>
```

### Statistics Display
```javascript
// Before
<View style={styles.statCard}>
  <Text style={styles.statNumber}>25</Text>
  <Text style={styles.statLabel}>Books Read</Text>
</View>

// After
<StatCard
  number="25"
  label="Books Read"
  numberColor={theme.colors.primary}
  variant="elevated"
/>
```

### Book Recommendations
```javascript
// Before
<TouchableOpacity style={styles.bookCard} onPress={onPress}>
  <View style={styles.bookCover}>
    <Text style={styles.bookIcon}>📖</Text>
  </View>
  <Text style={styles.bookTitle}>Book Title</Text>
  <Text style={styles.bookAuthor}>Author Name</Text>
  <Text style={styles.rating}>4.5</Text>
</TouchableOpacity>

// After
<BookCard
  title="Book Title"
  author="Author Name"
  coverIcon="📖"
  rating="4.5"
  onPress={onPress}
  variant="elevated"
/>
```

### Achievement Items
```javascript
// Before
<View style={styles.achievement}>
  <Text style={styles.achievementIcon}>🏆</Text>
  <View style={styles.achievementInfo}>
    <Text style={styles.achievementTitle}>Title</Text>
    <Text style={styles.achievementDesc}>Description</Text>
  </View>
</View>

// After
<AchievementItem
  icon="🏆"
  title="Title"
  description="Description"
  backgroundColor={theme.colors.surface}
/>
```

## Screen-Specific Updates

### Recommendations Screen (RecommendationsScreen.js)
1. Import design system components
2. Replace section titles with `SectionHeader`
3. Use `BookCard` for book recommendations
4. Update button styling with theme colors
5. Replace manual card styling with `StyledCard`

### Library Screen (LibraryScreen.js)
1. Import design system components
2. Use `StyledText` for all text elements
3. Replace tab styling with theme-based styles
4. Use `BookCard` for book list items
5. Update modal styling with theme values

### Login Screen (LogInScreen.js)
1. Import theme for colors and spacing
2. Update input styling with theme values
3. Use consistent button styling
4. Update text colors to use theme colors
5. Apply consistent spacing throughout

### Other Screens
Follow the same pattern for any additional screens:
1. Import design system
2. Replace hardcoded values with theme values
3. Use styled components where applicable
4. Ensure consistent spacing and typography

## Validation Checklist

After implementing the design system, verify:

### Typography ✓
- [ ] All text uses StyledText component
- [ ] Typography variants are appropriate for content hierarchy
- [ ] Text colors use theme values
- [ ] Font weights are consistent

### Spacing ✓
- [ ] All spacing uses theme.spacing values
- [ ] Consistent padding across similar components
- [ ] Proper section spacing throughout app
- [ ] No hardcoded spacing values remain

### Colors ✓
- [ ] All colors use theme.colors values
- [ ] Consistent color usage across screens
- [ ] Proper contrast ratios maintained
- [ ] Status colors used appropriately

### Components ✓
- [ ] Cards use StyledCard component
- [ ] Statistics use StatCard component
- [ ] Section headers use SectionHeader component
- [ ] Buttons use updated CustomButton
- [ ] No duplicate styling across components

### Shadows ✓
- [ ] All shadows use theme.shadows values
- [ ] Consistent elevation hierarchy
- [ ] No hardcoded shadow values

## Performance Considerations

### Optimization Tips
1. **Import only needed components**:
   ```javascript
   import { StyledText, StyledCard } from '../components/StyledComponents';
   ```

2. **Use theme values efficiently**:
   ```javascript
   const { colors, spacing } = theme;
   // Use colors.primary instead of theme.colors.primary repeatedly
   ```

3. **Memoize expensive style calculations**:
   ```javascript
   const memoizedStyle = useMemo(() => ({
     ...theme.componentStyles.card.base,
     // additional styles
   }), []);
   ```

## Troubleshooting

### Common Issues and Solutions

**Issue**: Components not displaying correctly after migration
**Solution**: Check import paths and ensure all theme imports are correct

**Issue**: Inconsistent spacing between old and new components
**Solution**: Verify all spacing uses theme.spacing values

**Issue**: Colors not matching design
**Solution**: Double-check color usage against theme.colors definitions

**Issue**: Typography not rendering as expected
**Solution**: Ensure StyledText variant matches intended hierarchy

## Next Steps

1. **Implement across all screens** using this guide
2. **Test on different devices** to ensure responsiveness
3. **Run accessibility audits** to verify contrast ratios
4. **Performance testing** to ensure no regression
5. **Team training** on the new design system

## Support

For questions about the design system implementation:
1. Refer to the StyleGuide.md for component usage
2. Check the theme.js file for available values
3. Look at HomeRefactored.js and AccountScreenRefactored.js for examples
4. Review the StyledComponents index.js for component APIs
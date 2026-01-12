# Design: Simplify UI Architecture

## Architectural Changes

### 1. Theme Management
Move all magic color strings and common style objects to a centralized theme file.
```typescript
// Proposed Theme.ts
export const Theme = {
  colors: {
    primary: "#3B82F6",
    background: "#F8FAFC",
    // ...
  },
  spacing: {
    s: 4,
    m: 8,
    l: 16,
    // ...
  }
}
```

### 2. Layout Component Patterns
Encapsulate repetitive nesting into semantic components.

**Before:**
```tsx
<View style={styles.section}>
  <Text style={styles.sectionTitle}>Title</Text>
  <View style={styles.card}>
    {children}
  </View>
</View>
```

**After:**
```tsx
<Section title="Title">
  <Card>
    {children}
  </Card>
</Section>
```

## Impact
- **Behavior**: Strictly NO behavior changes. All UI looks exactly the same.
- **Complexity**: Reduced nesting by 2-3 levels on average.
- **Repeated Logic**: Eliminated `const colors = { ... }` in 10+ files.

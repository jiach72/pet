## ADDED Requirements

### Requirement: Centralized Design Tokens
All UI components MUST consume aesthetic values (colors, spacing, shadows) from a centralized theme object.

#### Scenario: Update Brand Color
- GIVEN a central `Theme.colors.primary` value
- WHEN the value is changed from `#3B82F6` to a new hex code
- THEN all buttons and icons using this value MUST update their appearance automatically.
- AND no magic color strings SHOULD remain in individual screen components.

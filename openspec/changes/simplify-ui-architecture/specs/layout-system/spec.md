## ADDED Requirements

### Requirement: Semantic Section Container
The UI MUST use a `Section` component to group related content, replacing repetitive `View` and `Text` (title) patterns.

#### Scenario: Render Health Chart Section
- **WHEN** a `Section` component with a `title="近期趋势"` is rendered
- **THEN** it MUST display the title with consistent typography and theme spacing.

### Requirement: Standardized Card Component
All highlighted content areas MUST use a `Card` component for consistent elevation, border radius, and background.

#### Scenario: Display Weight Record
- **WHEN** a `Card` component containing a `WeightRecord` is rendered
- **THEN** it MUST apply the standardized theme styles (white background, 16px radius).

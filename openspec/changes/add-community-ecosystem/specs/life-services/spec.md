## ADDED Requirements

### Requirement: POI Display and Navigation
The system SHALL display nearby pet-related Points of Interest (hospitals, stores, parks, pools) on a map with real-time distance and navigation capabilities.

#### Scenario: View nearby POIs
- **WHEN** user opens the map tab
- **THEN** display categorized POI markers within 5km radius sorted by distance

#### Scenario: Navigate to POI
- **WHEN** user taps navigation button on a POI
- **THEN** open system map app with destination coordinates

#### Scenario: Filter POIs by category
- **WHEN** user selects category filter (hospital/store/park)
- **THEN** display only POIs matching the selected category

---

### Requirement: Smart POI Recommendation (F-10)
The system SHALL provide personalized POI recommendations based on pet's current health metrics.

#### Scenario: Weight gain recommendation
- **WHEN** pet's weight_trend indicates "gaining"
- **THEN** prioritize swimming pools and exercise facilities in recommendations

#### Scenario: High stress recommendation
- **WHEN** pet's hrv_stress exceeds threshold (>50)
- **THEN** prioritize calming services and pet spas in recommendations

---

### Requirement: Insurance Service Display (F-12)
The system SHALL display available pet insurance products with dynamic premium calculation based on health score.

#### Scenario: View insurance products
- **WHEN** user opens insurance service page
- **THEN** display available insurance plans with coverage details

#### Scenario: Dynamic premium calculation
- **WHEN** pet's health_score exceeds 90
- **THEN** display discounted premium (e.g., 30% off next month)

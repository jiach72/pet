## ADDED Requirements

### Requirement: Pro Active Tracking (F-07)
The system SHALL provide real-time GPS tracking for Pro device users in lost mode, with high-frequency location updates and trajectory replay.

#### Scenario: Enable Pro tracking mode
- **WHEN** Pro device user enters lost mode and enables active tracking
- **THEN** start high-frequency GPS reporting (simulated 5-second intervals) and display location on map

#### Scenario: View trajectory replay
- **WHEN** user taps "轨迹回放" button
- **THEN** display historical trajectory path on map with timeline scrubber

---

### Requirement: Lite Crowdsource Search (F-08)
The system SHALL provide BLE beacon broadcasting for Lite device users in lost mode, allowing nearby app users to help report locations.

#### Scenario: Enable Lite crowdsource mode
- **WHEN** Lite device user enters lost mode and enables crowdsource search
- **THEN** simulate BLE beacon broadcasting and display "正在向附近 X 位宠友求助"

#### Scenario: Receive location report
- **WHEN** nearby user reports a location
- **THEN** display reported point on map and send push notification

---

### Requirement: Emergency Poster Generation (F-09)
The system SHALL generate emergency rescue posters containing last known location, battery level, and vital signs for sharing.

#### Scenario: Generate emergency poster
- **WHEN** user taps "生成急救海报" button
- **THEN** generate poster image containing pet photo, basic info, last known location, device battery, last vital signs, and contact information

#### Scenario: Share emergency poster
- **WHEN** user taps share button on poster
- **THEN** invoke system share functionality with poster image

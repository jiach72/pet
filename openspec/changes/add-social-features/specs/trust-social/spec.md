## ADDED Requirements

### Requirement: Mood Diary Generation (F-04)
The system SHALL generate AI-powered first-person diaries from pet's perspective based on HRV (mood) and step count (vitality) data.

#### Scenario: Daily diary generation
- **WHEN** user opens the social page
- **THEN** display today's AI-generated mood diary with pet's emotional state and activity summary

#### Scenario: View diary history
- **WHEN** user taps "查看全部" on diary section
- **THEN** navigate to diary history page showing past 30 days of diaries

#### Scenario: Share diary
- **WHEN** user taps share button on a diary card
- **THEN** generate shareable image with diary content and pet avatar

---

### Requirement: Green Shield Certification (F-05)
The system SHALL provide vaccine certificate verification through OCR recognition and manual review to grant "Green Shield" social trust badge.

#### Scenario: Upload vaccine certificate
- **WHEN** user taps the green shield section without certification
- **THEN** navigate to vaccine upload page with camera/gallery picker

#### Scenario: OCR recognition
- **WHEN** user submits vaccine certificate image
- **THEN** system performs OCR to extract vaccine information and displays preview for confirmation

#### Scenario: Display certification status
- **WHEN** pet has verified vaccine certification
- **THEN** display green shield badge with "绿盾认证通过" status on social page and profile

#### Scenario: Certification pending
- **WHEN** vaccine certificate is submitted but not yet reviewed
- **THEN** display "审核中" status with estimated review time

---

### Requirement: Vitality Challenge Leaderboard (F-06)
The system SHALL provide weekly/monthly step count leaderboards and deep sleep duration leaderboards (for cats).

#### Scenario: View weekly leaderboard
- **WHEN** user views the leaderboard section
- **THEN** display top 10 pets ranked by weekly step count with user's pet highlighted

#### Scenario: Switch leaderboard type
- **WHEN** user taps "周榜" / "月榜" toggle
- **THEN** update leaderboard data accordingly

#### Scenario: View full leaderboard
- **WHEN** user taps "查看全部"
- **THEN** navigate to full leaderboard page with pagination

---

### Requirement: 1V1 Challenge (F-06)
The system SHALL allow users to initiate step count challenges with friends, with automatic result posting for losers.

#### Scenario: Initiate challenge
- **WHEN** user taps "发起 1V1 挑战" button
- **THEN** display friend picker to select challenge opponent

#### Scenario: Accept challenge
- **WHEN** user receives a challenge invitation
- **THEN** display challenge details with accept/decline options

#### Scenario: Challenge result
- **WHEN** challenge period ends
- **THEN** compare step counts and declare winner

#### Scenario: Loser auto-post
- **WHEN** a pet loses the challenge
- **THEN** automatically post defeat announcement to social feed (with opt-out option)

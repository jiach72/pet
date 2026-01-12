## ADDED Requirements

### Requirement: Charity and Rescue
The system SHALL provide a platform for pet rescue crowdfunding and donation tracking.

#### Scenario: View rescue campaigns
- **WHEN** user opens charity page
- **THEN** display active rescue campaigns with progress, story, and donation count

#### Scenario: Donate to campaign
- **WHEN** user taps donate button
- **THEN** redirect to payment page with preset amount options

---

### Requirement: Pet Adoption and Gifting
The system SHALL allow users to post pets for adoption or gifting with health verification.

#### Scenario: Post adoption listing
- **WHEN** user creates adoption post
- **THEN** require pet info, reason, and Green Shield verification status

#### Scenario: Apply for adoption
- **WHEN** user applies to adopt
- **THEN** submit application with adopter info and home environment description

---

### Requirement: Community Events (F-11)
The system SHALL support creation and participation in pet community events including meetups, matching, weddings, and memorials.

#### Scenario: View events list
- **WHEN** user opens events page
- **THEN** display upcoming events categorized by type (meetup/wedding/memorial)

#### Scenario: Register for meetup
- **WHEN** user registers for a meetup event
- **THEN** add to user's event calendar and send reminder

---

### Requirement: Pet Wedding Ceremony
The system SHALL provide pet wedding invitation creation with celebratory UI theme (pink/festive).

#### Scenario: Create wedding invitation
- **WHEN** user creates pet wedding event
- **THEN** display wedding invitation editor with pink theme and confetti effects

#### Scenario: Share wedding invitation
- **WHEN** user shares invitation
- **THEN** generate shareable image with couple pets, date, and venue

---

### Requirement: Pet Memorial Service
The system SHALL provide dignified pet memorial pages with solemn UI theme (gray/black).

#### Scenario: Create memorial page
- **WHEN** user creates pet memorial
- **THEN** display memorial editor with respectful gray theme and candle animation

#### Scenario: View memorial
- **WHEN** visitors view memorial page
- **THEN** display pet life span, photo gallery, and condolence messages

---

### Requirement: Pet Matching Service
The system SHALL provide pet matching for breeding or social companionship with compatibility scoring.

#### Scenario: Browse match candidates
- **WHEN** user opens matching page
- **THEN** display compatible pets based on breed, age, and location

#### Scenario: Send match request
- **WHEN** user sends match request
- **THEN** notify target pet owner and await response

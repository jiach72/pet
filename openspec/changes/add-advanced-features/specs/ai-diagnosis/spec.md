## ADDED Requirements

### Requirement: Stool Analysis (F-02)
The system SHALL provide AI-powered stool analysis through photo upload, returning Bristol scale classification and dietary recommendations.

#### Scenario: Upload stool photo
- **WHEN** user enters the stool analysis page and takes/selects a photo
- **THEN** display upload progress and loading animation

#### Scenario: View analysis result
- **WHEN** analysis is complete
- **THEN** display Bristol scale classification (Type 1-7) with visual diagram and dietary recommendations

#### Scenario: Disclaimer display
- **WHEN** viewing any diagnosis result
- **THEN** display "仅供参考，请咨询兽医" disclaimer prominently

---

### Requirement: Vocal Health Analysis (F-02)
The system SHALL provide audio recording and analysis to identify potential health issues from pet sounds (coughing, anxiety barking, etc.).

#### Scenario: Record pet audio
- **WHEN** user taps record button
- **THEN** display recording waveform animation with duration counter

#### Scenario: Submit recording
- **WHEN** user stops recording
- **THEN** upload audio for analysis and show processing indicator

#### Scenario: View vocal analysis result
- **WHEN** analysis is complete
- **THEN** display identified sound type (normal/coughing/anxiety barking) with health recommendations

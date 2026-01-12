## ADDED Requirements

### Requirement: Device Connection Management (F-13)
The system SHALL allow users to view and manage connected smart home devices.

#### Scenario: View device list
- **WHEN** user enters smart home page
- **THEN** display list of connected devices with name, type, and online status

#### Scenario: Add new device
- **WHEN** user taps "添加设备" button
- **THEN** display supported device types (feeder/camera/pet door) and guide through binding process (simulated)

---

### Requirement: Rule Engine Automation (F-13)
The system SHALL allow users to create automation rules that trigger smart device actions based on pet status.

#### Scenario: Create automation rule
- **WHEN** user taps "创建规则" button
- **THEN** display trigger condition options (activity end/sleep start/leave home) and action options (feed/open door/record video)

#### Scenario: Rule automatic execution
- **WHEN** enabled rule "运动结束 → 自动喂食" detects activity end
- **THEN** trigger feeder device (simulated) and send push notification to user

---

### Requirement: Preset Scenes (F-13)
The system SHALL provide commonly used preset scenes that users can enable with one tap.

#### Scenario: Enable preset scene
- **WHEN** user selects "运动后自动补给" preset scene
- **THEN** automatically create corresponding rule and activate immediately

# Design: Complete Guardian Experience

## System Architecture

### 1. Data Streaming (Real-time Dashboard)
- **Protocol**: 模拟 4G WebSockets 双向流。
- **UI Logic**: 
  - 核心仪表盘采用“实时跳动”动效。
  - 数据卡片详情页点击下钻，展示历史原始波形。

### 2. Alert Logic (State Machine)
- **Levels**: 
  - `LEVEL_1` (Info/Blue): 行为改变提示。
  - `LEVEL_2` (Warning/Orange): 电子围栏进出、活动量剧增。
  - `LEVEL_3` (Critical/Red): 呼吸暂停、心率异常、摔倒。
- **Notification**: 结合本地 Push 与模拟短信通知。

### 3. Data Science (Health Reports)
- **Metrics**: 
  - **HRV (Heart Rate Variability)**: 评估自主神经系统。
  - **Sleep Stages**: 深度/浅睡/REM 比例图。

### 4. Behavior Mapping (Emotion Translation)
- **Logic**: 将活动强度 + HRV + 休息时长 -> 映射至情绪列表（Happy, Relaxed, Anxious, Active）。
- **AI Agent**: 使用 LLM 模拟宠物口吻生成“今日言语”。

## UI/UX Standards
- **Color Palettes**: 遵循医疗蓝和警示红。
- **Interactive Graphs**: 支持双指缩放查看历史细节。

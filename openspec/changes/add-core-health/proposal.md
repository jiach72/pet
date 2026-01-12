# Change: 核心健康功能 (Core Health Features)

## Why
PetPulse 硬件设备持续采集宠物体征数据，需要在 App 端实现完整的数据展示、异常预警和档案管理功能。这是 PRD V2.0 中 F-01 至 F-03 的核心需求。

## What Changes

### F-01: 实时体征监测 (Real-time Vital Signs)
- 心率曲线实时展示（ECG 波形模拟）
- 体温、呼吸频率、活动量仪表盘
- 24小时/7天/30天趋势图
- 数据刷新机制（模拟 WebSocket 推送）

### F-02: 异常预警系统 (Anomaly Alert)
- 多级预警（注意/警告/紧急）
- 推送通知模拟
- 预警历史记录
- 一键联系兽医

### F-03: 健康档案管理 (Health Profile)
- 宠物基本信息编辑
- 体检记录管理
- 疫苗接种记录
- 就医记录
- 体重趋势追踪
- 健康报告导出

## Impact
- Affected specs: `vital-monitoring`, `anomaly-alert`, `health-profile` (新建)
- Affected code:
  - 重构 `app/(tabs)/index.tsx` 守护页
  - 新增 `components/health/` 健康组件
  - 新增 `app/health/` 健康子页面
  - 新增 `services/vitalService.ts` 体征数据服务
  - 新增 `hooks/useVitals.ts` 体征数据 Hook

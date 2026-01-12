## Context
F-01 至 F-03 是 PetPulse 的核心价值功能，直接展示硬件采集的健康数据。用户需要直观地了解宠物当前状态、历史趋势，并在异常时得到及时提醒。

## Goals / Non-Goals

### Goals
- 实现实时体征数据展示（心率、体温、呼吸、活动量）
- 构建 ECG 风格的心率曲线动画
- 实现多级异常预警系统
- 建立完整的健康档案管理

### Non-Goals
- 不实现真实蓝牙连接（使用 Mock 数据）
- 不实现真实推送通知（模拟展示）
- 不实现数据持久化（使用内存状态）

## Decisions

### 1. 组件架构
```
components/health/
├── HeartRateChart.tsx    # 心率曲线（SVG 动画）
├── VitalGauge.tsx        # 圆形仪表盘
├── TrendChart.tsx        # 趋势折线图
├── AlertBanner.tsx       # 顶部预警条
├── AlertCard.tsx         # 预警卡片
├── AlertModal.tsx        # 紧急弹窗
└── HealthRecordCard.tsx  # 健康记录卡片
```

### 2. 页面结构
```
app/health/
├── _layout.tsx           # Stack 布局
├── vitals-detail.tsx     # 体征详情
├── alerts.tsx            # 预警历史
├── profile.tsx           # 宠物档案
├── records.tsx           # 就医记录
├── vaccines.tsx          # 疫苗记录
└── weight.tsx            # 体重趋势
```

### 3. 预警级别设计
| 级别 | 颜色 | 触发条件 | 行为 |
|------|------|----------|------|
| 注意 (info) | 蓝色 | 数据轻微偏离 | 顶部横幅 |
| 警告 (warning) | 橙色 | 需要关注 | 横幅 + 卡片 |
| 紧急 (critical) | 红色 | 立即处理 | 全屏弹窗 |

### 4. 数据更新策略
- 使用 `setInterval` 模拟实时数据推送
- 心率：每 1 秒更新
- 其他体征：每 5 秒更新
- 趋势数据：手动刷新

## Risks / Trade-offs
| Risk | Mitigation |
|------|------------|
| ECG 动画性能 | 使用 react-native-svg 优化 |
| 频繁状态更新 | 使用 useMemo 和 useCallback |

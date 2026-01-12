## 1. 基础设施
- [x] 1.1 扩展 `types/index.ts` 添加诊断/安全/智能家居类型
- [x] 1.2 创建 `services/diagnosisService.ts` AI 诊断服务
- [x] 1.3 创建 `services/safetyService.ts` 安全追踪服务
- [x] 1.4 创建 `services/smartHomeService.ts` 智能家居服务

## 2. F-02 AI 诊断辅助
- [x] 2.1 创建 `app/diagnosis/_layout.tsx` 诊断页面布局
- [x] 2.2 创建 `app/diagnosis/stool.tsx` 粪便分析页
- [x] 2.3 创建 `app/diagnosis/vocal.tsx` 声音听诊页
- [x] 2.4 创建 `StoolResultCard` 分析结果卡片
- [x] 2.5 创建 `VocalRecorder` 音频录制组件
- [x] 2.6 实现布里斯托分类展示
- [x] 2.7 添加诊断入口到守护页

## 3. F-07/F-08/F-09 安全雷达
- [x] 3.1 增强 `app/lost-mode.tsx` 丢失模式页
- [x] 3.2 创建 `TrackingMap` 轨迹追踪组件
- [x] 3.3 创建 `CrowdsourceStatus` 众包状态组件
- [x] 3.4 创建 `app/lost-mode/poster.tsx` 黑匣子海报页
- [x] 3.5 实现海报生成与分享功能
- [x] 3.6 区分 Pro/Lite 模式 UI

## 4. F-13 智能家居联动
- [x] 4.1 创建 `app/smart-home/_layout.tsx` 智能家居布局
- [x] 4.2 创建 `app/smart-home/index.tsx` 设备列表页
- [x] 4.3 创建 `app/smart-home/rules.tsx` 规则引擎页
- [x] 4.4 创建 `DeviceCard` 设备卡片组件
- [x] 4.5 创建 `RuleCard` 规则卡片组件
- [x] 4.6 实现预设场景（运动结束 → 喂食）
- [x] 4.7 添加智能家居入口到"我的"页面

## 5. 整合与优化
- [x] 5.1 更新守护页快捷入口（添加 AI 诊断）
- [x] 5.2 更新"我的"页面入口（添加智能家居）
- [x] 5.3 统一设计风格（Soft UI）

## 6. 验证
- [x] 6.1 AI 诊断功能验证
- [x] 6.2 安全雷达功能验证
- [x] 6.3 智能家居功能验证
- [x] 6.4 UI 一致性测试

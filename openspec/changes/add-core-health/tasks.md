## 1. 基础设施
- [x] 1.1 创建 `services/vitalService.ts` 体征数据服务
- [x] 1.2 创建 `hooks/useVitals.ts` 体征数据 Hook
- [x] 1.3 扩展 `types/index.ts` 添加体征相关类型
- [x] 1.4 扩展 `data/mockData.ts` 添加模拟体征数据

## 2. F-01 实时体征监测
- [x] 2.1 创建 `HeartRateChart` 心率曲线组件（ECG 波形）
- [x] 2.2 创建 `VitalGauge` 体征仪表盘组件
- [x] 2.3 创建 `TrendChart` 趋势图组件（24h/7d/30d）
- [x] 2.4 重构 `app/(tabs)/index.tsx` 守护页整合新组件
- [x] 2.5 创建 `app/health/vitals-detail.tsx` 体征详情页
- [x] 2.6 实现数据刷新机制（模拟实时更新）

## 3. F-02 异常预警系统
- [x] 3.1 创建 `AlertBanner` 预警横幅组件
- [x] 3.2 创建 `AlertCard` 预警卡片组件
- [x] 3.3 创建 `app/health/alerts.tsx` 预警历史页
- [x] 3.4 创建 `AlertModal` 紧急预警弹窗
- [x] 3.5 实现预警级别样式（注意/警告/紧急）
- [x] 3.6 添加一键联系兽医功能

## 4. F-03 健康档案管理
- [x] 4.1 创建 `app/health/_layout.tsx` 健康子页面布局
- [x] 4.2 创建 `app/health/profile.tsx` 宠物档案页
- [x] 4.3 创建 `app/health/records.tsx` 就医记录页
- [x] 4.4 创建 `app/health/vaccines.tsx` 疫苗记录页
- [x] 4.5 创建 `app/health/weight.tsx` 体重趋势页
- [x] 4.6 创建 `HealthRecordCard` 健康记录卡片
- [x] 4.7 实现记录添加/编辑功能

## 5. 整合与优化
- [x] 5.1 更新守护页快捷入口
- [x] 5.2 添加下拉刷新
- [x] 5.3 优化组件动画效果

## 6. 验证
- [x] 6.1 体征监测功能验证
- [x] 6.2 预警系统功能验证
- [x] 6.3 健康档案功能验证
- [x] 6.4 UI 响应式测试

# Proposal: Mi-Style 4-Tab Navigation Refactoring

## Goal
按照“小米运动健康”APP 的布局逻辑，将当前 5 Tab 导航重构为 4 Tab 结构，并对社交、地图、商城及增值服务进行深度分组，提升用户体验并简化操作路径。

## Context
当前应用功能分布在 5 个 Tab 中，虽然功能完整但层级略显复杂。用户希望借鉴成熟的运动健康类 APP 布局逻辑，通过 4 Tab 结构使功能更加聚焦。

## Proposed Changes
- **守护 (Guardian/Health)**: 核心监测数据页，作为默认首页。
- **发现 (Discovery)**: 整合瀑布流内容与原社交圈功能。
- **周边 (Services/Market)**: 整合商城、地图、配对、公益及活动等“生活周边”类功能。
- **我的 (Me)**: 个人中心及设备设置。

## Impacts
- **UI/UX**: 底部导航更简洁，单手操作更顺手；通过“周边”概念整合了 O2O 与商城功能。
- **Routing**: 需要调整 `app/(tabs)` 目录下的页面逻辑及 TabBar 样式。

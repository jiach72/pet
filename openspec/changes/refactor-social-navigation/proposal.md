# Proposal: Refactor Social and Navigation for PetPulse

## Goal
重构应用的核心导航结构，从 4 Tab 升级为 5 Tab，并重新组织社交、地图、商城及增值功能，以提高用户交互活跃度和功能发现率。

## Context
当前应用功能（如宠物商城、配对、公益等）分布较为分散，地图功能占用独立大 Tab 但使用频率可能受限。用户希望通过瀑布流形式提升内容消费体验，并强化商城入口。

## Proposed Changes
- **导航栏 (TabBar)**: 采用 5 Tab 居中凸显设计。
- **发现 (Discovery)**: 新增一级页面，支持瀑布流展示内容。
- **社区 (Community)**: 整合原 `social`、`map` 相关功能场景。
- **商城 (Market)**: 提升为一级导航。
- **守护中心 (Home)**: 保持居中，作为硬件监测的核心入口。

## Impacts
- **UI/UX**: 显著提升视觉丰富度（瀑布流）和购物便捷性。
- **Architecture**: 需调整 `app/(tabs)` 路由结构及页面职责分配。

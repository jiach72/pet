# Design: Social Navigation Refactoring

## Architecture
重构后的系统将遵循以下模块划分：

### 1. Unified Community Hub
不再将“地图”和“社交”完全切断，而是通过组件化方式在社区页面内提供视图切换（列表视图/地图视图）。
- **Logic**: 共享 `Member` 和 `Activity` 数据源。
- **UI**: 左右滑动的 Top Tab 或分段控制器。

### 2. Content Discovery Engine
- **Layout**: 使用 React Native 的 `FlashList` 或等效组件实现异形高度的瀑布流。
- **Interaction**: 沉浸式全屏预览模式。

### 3. Centralized Guardian Tab
- **Visuals**: TabBar 居中按钮（Big Center Button）。
- **State**: 实时监听智能项圈的 WebSocket 或长连接数据，在 TabIcon 上动态显示心率波动或异常预警。

## UI Considerations
- **TabBar Height**: 由于增加了文字和图标，需优化高度以适应沉浸式全屏。
- **Transitions**: 发现页到详情页的共享元素转场（Shared Element Transitions）。

## Data Schema Deltas
无需重大的数据库变更，但需在前端 `Mock` 增加更多瀑布流式的内容示例数据。

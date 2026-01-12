# Tasks: Refactor Social Navigation

- [ ] UI 骨架搭建
    - [ ] 修改 `app/(tabs)/_layout.tsx` 增加 Tab 项 `[refactor-navigation-skeleton]`
    - [ ] 创建 `app/(tabs)/discovery.tsx` 基础模板 `[add-discovery-page]`
    - [ ] 创建 `app/(tabs)/market.tsx` 作为商城的独立入口 `[add-market-entry]`
- [ ] 功能深度整合
    - [ ] 重构 `app/(tabs)/social.tsx` 为社区综合门户，整合地图入口 `[merge-social-and-map]`
    - [ ] 在发现页实现瀑布流 Mock 数据展示 `[waterfall-ui-implementation]`
- [ ] 交互细节优化
    - [ ] 实现居中 Tab 的视觉特效 [optional] `[enhance-center-tab]`
- [ ] 验证
    - [ ] 运行 `npx expo start --web` 检查各 Tab 切换流畅度 `[e2e-manual-check]`

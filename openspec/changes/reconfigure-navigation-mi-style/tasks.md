# Tasks: Reconfigure Navigation to 4-Tab Mi-Style

- [ ] 导航栏骨架重整
  - [ ] 修改 `app/(tabs)/_layout.tsx` 恢复为 4 个 Tab `[navigation-skeleton-4-tab]`
  - [ ] 调整 `TabBar` 样式至扁平简洁的小米风格 `[nav-style-update]`
- [ ] 页面功能深度合并
  - [ ] 既然 Tab 数量减少，需在 `discovery.tsx` 中集成社交入口 `[integrate-social-into-discovery]`
  - [ ] 在 `market.tsx` 中集成地图及增值服务入口 `[integrate-services-into-market]`
- [ ] 路由维护
  - [ ] 将多余的入口（如 `map.tsx`, `social.tsx`）设置为隐藏或重定向 `[cleanup-unused-routes]`
- [ ] 验证
  - [ ] 检查各功能是否在新的层级结构下可以正确访问 `[verification-checklist]`

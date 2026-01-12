## 1. 基础设施
- [x] 1.1 创建 `services/api.ts` API 基础服务
- [x] 1.2 扩展 `types/index.ts` 添加社交相关类型
- [x] 1.3 创建 `hooks/useSocial.ts` 社交数据 Hook

## 2. F-04 情感日记 (Mood Engine)
- [x] 2.1 创建 `MoodDiaryCard` 组件（展示单条日记）
- [x] 2.2 创建 `app/social/diary-history.tsx` 日记历史列表页
- [x] 2.3 实现 AI 日记生成服务 `services/moodEngine.ts`
- [x] 2.4 添加日记分享功能

## 3. F-05 疫苗绿盾认证 (Green Shield)
- [x] 3.1 创建 `app/social/vaccine-upload.tsx` 疫苗本上传页
- [x] 3.2 实现图片选择器组件
- [x] 3.3 创建 `GreenShieldBadge` 认证状态组件
- [x] 3.4 实现 OCR 识别服务（Mock）`services/vaccineOcr.ts`
- [x] 3.5 添加认证状态管理

## 4. F-06 活力挑战赛 (LBS Gaming)
- [x] 4.1 创建 `LeaderboardCard` 排行榜组件（支持周榜/月榜切换）
- [x] 4.2 创建 `app/social/challenge.tsx` 1V1 挑战页
- [x] 4.3 实现挑战发起/接受/结算逻辑
- [x] 4.4 创建 `ChallengeResultModal` 结果弹窗
- [x] 4.5 添加输家自动发动态功能

## 5. 社交页整合
- [x] 5.1 重构 `app/(tabs)/social.tsx` 整合所有功能
- [x] 5.2 添加页面路由跳转
- [x] 5.3 实现下拉刷新

## 6. 验证
- [x] 6.1 功能测试：情感日记展示正确
- [x] 6.2 功能测试：疫苗上传流程完整
- [x] 6.3 功能测试：排行榜数据正确
- [x] 6.4 功能测试：1V1 挑战流程完整
- [x] 6.5 UI 测试：响应式布局正确

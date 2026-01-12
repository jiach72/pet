## Context
社交模块是 PetPulse 的核心差异化功能，通过硬件数据作为"社交货币"和"信任背书"，构建宠物主之间的信任社交网络。

当前状态：
- 社交页 `app/(tabs)/social.tsx` 已有基础 UI 框架
- 使用静态 Mock 数据展示
- 缺少实际业务逻辑和子页面

## Goals / Non-Goals

### Goals
- 实现完整的情感日记生成和展示流程
- 实现疫苗绿盾认证的上传和审核流程
- 实现活力挑战赛排行榜和 1V1 PK 功能
- 保持所有数据基于 Mock/本地，便于后续接入真实 API

### Non-Goals
- 不实现真实 AI 服务调用（使用 Mock 模拟）
- 不实现真实 OCR 服务（使用 Mock 模拟）
- 不实现后端 API（仅前端 + Mock）
- 不实现用户认证系统（假设已登录）

## Decisions

### 1. 状态管理
- **Decision**: 使用 React Context + useReducer 管理社交状态
- **Rationale**: 初期足够简单，后续可平滑迁移至 Zustand

### 2. 页面结构
- **Decision**: 使用 Expo Router 的 Stack 嵌套路由
- **Rationale**: 保持与现有架构一致，`app/social/` 目录下放置子页面

### 3. AI 日记生成
- **Decision**: Mock 阶段使用预设模板 + 随机组合
- **Rationale**: 无需真实 AI 服务，可快速验证 UI/UX

### 4. 图片上传
- **Decision**: 使用 `expo-image-picker`
- **Rationale**: Expo 原生支持，跨平台兼容

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Mock 数据结构与真实 API 不一致 | 定义清晰的 TypeScript 接口作为契约 |
| 社交功能依赖用户系统 | 使用固定 userId Mock，后续替换 |
| 排行榜数据量大时性能问题 | 初期使用虚拟列表 + 分页 |

## File Structure

```
app/
├── (tabs)/social.tsx       # 社交主页（重构）
└── social/
    ├── _layout.tsx         # Stack 布局
    ├── diary-history.tsx   # 日记历史
    ├── vaccine-upload.tsx  # 疫苗上传
    └── challenge.tsx       # 1V1 挑战

components/social/
├── MoodDiaryCard.tsx       # 日记卡片
├── GreenShieldBadge.tsx    # 绿盾徽章
├── LeaderboardCard.tsx     # 排行榜
└── ChallengeResultModal.tsx # 挑战结果

services/
├── api.ts                  # API 基础
├── moodEngine.ts           # 情感日记生成
└── vaccineOcr.ts           # 疫苗 OCR

hooks/
└── useSocial.ts            # 社交数据 Hook
```

## Open Questions
- 是否需要本地持久化日记数据？（建议：AsyncStorage）
- 排行榜是否需要实时刷新？（建议：下拉刷新即可）

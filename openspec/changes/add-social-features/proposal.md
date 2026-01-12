# Change: 完善社交功能模块 (Trust Social)

## Why
当前社交页仅有静态 UI 展示（Mock 数据），缺少完整的业务逻辑实现。根据 PRD V2.0 需求，需要实现三个核心功能：情感日记 AI 生成、疫苗绿盾认证流程、活力挑战赛系统。

## What Changes
- **F-04 情感日记 (Mood Engine)**：基于 HRV + 步数生成 AI 第一人称日记
- **F-05 疫苗绿盾认证 (Green Shield)**：OCR 识别疫苗本 → 审核 → 颁发绿盾标识
- **F-06 活力挑战赛 (LBS Gaming)**：周榜/月榜排行榜 + 1V1 好友 PK

## Impact
- Affected specs: `trust-social` (新建)
- Affected code:
  - `app/(tabs)/social.tsx` - 主页面重构
  - `types/index.ts` - 新增类型定义
  - `data/mockData.ts` - 扩展 Mock 数据
  - 新增 `services/` 目录 - API 服务层
  - 新增 `components/social/` - 社交相关组件
  - 新增子页面：疫苗上传、挑战详情、日记历史

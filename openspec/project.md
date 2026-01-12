# Project Context

## Purpose
**PetPulse Ecosystem (智宠脉动)** - 以双模硬件为入口，构建覆盖医疗、社交、生活服务的"宠物生活操作系统"。

核心目标：
- 提供 AI 驱动的宠物健康监测与预防性医疗
- 构建基于健康数据的信任社交网络
- 实现分级安全追踪（Pro 4G/LTE + Lite BLE 众包）
- 整合生活服务 O2O 生态

## Tech Stack
- **Framework**: Expo SDK 52 + Expo Router
- **Language**: TypeScript (strict mode)
- **UI**: React Native + StyleSheet (暂未使用 NativeWind)
- **Icons**: @expo/vector-icons (Ionicons)
- **State**: React Context (初期) → Zustand (后期)
- **API**: RESTful (计划)
- **Storage**: AsyncStorage (本地) + 后端 TBD

## Project Conventions

### Code Style
- 使用中文注释解释业务逻辑的 "Why"
- 变量/函数名使用英文驼峰式
- Boolean 变量使用 `is`, `has`, `should` 前缀
- 事件处理函数使用 `handle` 前缀
- 设计系统颜色定义在组件顶部的 `colors` 常量

### Architecture Patterns
- **路由**: 文件式路由 (Expo Router)
- **Tab 结构**: 4 Tab + Modal
  - `(tabs)/index.tsx` → 守护（默认）
  - `(tabs)/social.tsx` → 社交
  - `(tabs)/map.tsx` → 地图
  - `(tabs)/profile.tsx` → 我的
  - `lost-mode.tsx` → 丢失模式 Modal
- **类型定义**: 集中在 `types/index.ts`
- **Mock 数据**: `data/mockData.ts`

### Testing Strategy
- 组件测试: Jest + React Native Testing Library
- E2E 测试: Detox (计划)
- 手动测试: Expo Go / Web 预览

### Git Workflow
- 分支: `main` (稳定) + `dev` (开发) + feature 分支
- 提交格式: `feat|fix|docs|refactor: 简短描述`
- PR 需要至少 1 人 review

## Domain Context
- **硬件区分**: Pro (4G/LTE 全时在线) vs Lite (BLE 近场交互)
- **绿盾认证**: 通过 OCR 识别疫苗本获得的社交准入资质
- **情感日记**: AI 根据 HRV + 步数生成的第一人称宠物日记
- **众包寻宠**: Lite 设备丢失时广播 BLE 信标，其他 App 用户协助定位

## Important Constraints
- 所有功能必须严格遵循 PRD V2.0 Final (`docs/PetPulse Ecosystem 开发需求文档.md`)
- 优先 Mobile-first 设计
- 禁止使用 `alert()` 弹窗，使用 Toast 组件

## External Dependencies
- Expo SDK 52 生态
- 后端 API (计划: 阿里云/腾讯云)
- 地图服务 (计划: 高德地图)
- AI 服务 (计划: 阿里通义/Azure OpenAI)

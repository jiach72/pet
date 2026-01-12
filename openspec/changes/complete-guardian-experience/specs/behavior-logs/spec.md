# Spec: Behavior & Emotion Logs

## Capability
通过数据建模将生理指标转化为情绪反馈和趣味互动。

## ADDED Requirements
1. **Emotion Calendar**: 以可视化图标记录每日宠物的主导情绪（开心、放松、压力等）。
2. **Preference Insight**: 分析活动模式（如在某玩具旁停留时间最长）提示宠物喜好。
3. **AI Daily Voice**: 生成趣味性的“宠物心语”供社交分享。
   - #### Scenario: 生成“今日喵言”
     - **Given** 宠物今日完成了 10000 步运动
     - **When** 用户打开 App
     - **Then** 首页弹出一张精美卡片：“主人，我今天跑了 10 公里，感觉能追上风！快奖励小鱼干~”

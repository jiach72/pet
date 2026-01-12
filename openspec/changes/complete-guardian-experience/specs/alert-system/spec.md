# Spec: Intelligent Alert System

## Capability
通过分级机制捕捉硬件异常并主动推送告警，记录完整异常日志。

## ADDED Requirements
1. **Hierarchical Alert Engine**: 根据异常严重程度区分告警级别（信息、警告、紧急）。
   - #### Scenario: 触发紧急心率告警
     - **Given** 硬件上报心率超过 180BPM
     - **When** 系统处理数据
     - **Then** 立即触发红色全屏弹窗告警，并记录至“异常中心”。
2. **Emergency Notification**: 在 App 推送基础上，模拟关键时刻的短信/呼叫提醒。
3. **Alert Timeline**: 自动生成的不可篡改的异常事件时间线，支持添加兽医备注。
   - #### Scenario: 追溯清晨呼吸暂停事件
     - **Given** 用户进入告警中心
     - **When** 点击“今日异常”
     - **Then** 应按时间倒序列出所有告警触发的时间、指标值及建议处理动作。

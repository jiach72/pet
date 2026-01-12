# Spec: Real-time Health Dashboard

## Capability
提供高频、实时的生命体征显示与深度细节下钻。

## MODIFIED Requirements
1. **Real-time Vitals Display**: 仪表盘核心指标（心率、呼吸、体动）每 1-2 秒动态更新，模拟 4G 实时上报。
   - #### Scenario: 监测宠物实时心率
     - **Given** 硬件已连接并开启
     - **When** 用户进入首页
     - **Then** 心率数值应伴随动效跳动，呼吸频率与体征仪表盘同步刷新。
2. **Drill-down Detailed View**: 点击仪表盘上的任一指标，均可跳转至该指标的时间轴历史详页。
   - #### Scenario: 查看心率波行细节
     - **Given** 用户在首页点击心率看板
     - **When** 系统跳转至 `/health/heart-rate`
     - **Then** 页面应展示该指标的实时波形图（ECG 模拟）及历史极值统计。

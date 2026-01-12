# Spec: Deep Health Reports

## Capability
将海量原始数据转化为结构化的周期性洞察报告。

## ADDED Requirements
1. **Sleep Phase Analysis**: 精确区分深睡、浅睡及 REM 周期，提供睡眠效率评分。
   - #### Scenario: 查看昨晚睡眠周报
     - **When** 用户进入睡眠分析页
     - **Then** 系统应展示各阶段占比的环形图，并与历史平均值对比。
2. **HRV (Heart Rate Variability) Insights**: 导出 HRV 报告以评估宠物的压力与自主神经状态。
3. **Trend Risk Prediction**: 自动识别体重波动、静息心率逐渐升高等长期风险趋势。
   - #### Scenario: 预警静息心率升高
     - **Given** 连续 7 天静息心率呈上升趋势
     - **When** 生成周报时
     - **Then** 报告首页应显著提示“潜在健康风险”，建议预约检查。

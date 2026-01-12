# Change: 高级功能模块 (Advanced Features)

## Why
根据 PRD V2.0 Final，以下功能尚未实现：
- **F-02 AI 诊断辅助** - 粪便分析、声音听诊
- **F-07/F-08/F-09 安全雷达** - Pro 追踪、Lite 众包寻宠、黑匣子海报
- **F-13 智能家居联动** - 规则引擎触发设备

## What Changes

### F-02: AI 诊断辅助 (AI Diagnosis)
- **粪便分析 (Stool Scope)**
  - 拍照上传 → CV 识别布里斯托分类
  - 返回饮食建议
- **声音听诊 (Vocal Health)**
  - 音频录制 → 识别咳嗽/焦虑吠叫
  - 返回健康建议

### F-07/F-08/F-09: 安全雷达 (Safety Radar)
- **Pro 主动追踪**
  - 丢失模式 → 高频 GPS 上报
  - 轨迹回放地图
- **Lite 众包寻宠**
  - BLE 信标广播模拟
  - 附近用户上报位置
- **黑匣子海报**
  - 生成急救海报（最后位置 + 电量 + 生理状态）
  - 支持分享

### F-13: 智能家居联动 (Smart Home)
- 规则引擎 UI
- 场景预设（运动结束 → 喂食）
- 设备模拟连接

## Impact
- Affected specs: `ai-diagnosis`, `safety-radar`, `smart-home` (新建)
- Affected code:
  - 新增 `app/diagnosis/` 诊断子页面
  - 增强 `app/lost-mode.tsx` 丢失模式页
  - 新增 `app/smart-home/` 智能家居页
  - 新增相关 services 和 hooks

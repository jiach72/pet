## Context
本次开发补齐 PRD V2.0 中剩余未实现的高级功能，完成 PetPulse 的完整功能闭环。

## Goals / Non-Goals

### Goals
- 实现 AI 诊断辅助（粪便分析 + 声音听诊）
- 增强安全雷达功能（Pro 追踪 + Lite 众包 + 黑匣子海报）
- 实现智能家居联动（规则引擎 + 设备控制）

### Non-Goals
- 不实现真实 AI/CV 模型（使用 Mock 结果）
- 不实现真实蓝牙/GPS 功能（模拟数据）
- 不实现真实智能家居协议（Mock API）

## Decisions

### 1. AI 诊断架构
```
app/diagnosis/
├── _layout.tsx      # Stack 布局
├── stool.tsx        # 粪便分析
│   ├── 拍照/选图
│   ├── 上传分析（模拟）
│   └── 结果展示
└── vocal.tsx        # 声音听诊
    ├── 录音界面
    ├── 波形展示
    └── 分析结果
```

### 2. 布里斯托分类
| 类型 | 描述 | 建议 |
|------|------|------|
| Type 1-2 | 便秘 | 增加水分和纤维 |
| Type 3-4 | 正常 | 保持当前饮食 |
| Type 5-7 | 腹泻 | 减少油腻食物 |

### 3. 安全雷达硬件区分
| 功能 | Pro (4G/LTE) | Lite (BLE) |
|------|--------------|------------|
| 追踪方式 | GPS 实时上报 | 众包扫描 |
| 轨迹回放 | ✓ 支持 | ✗ 无 |
| 黑匣子海报 | 含准确位置 | 含最后估计位置 |

### 4. 智能家居规则引擎
```typescript
interface SmartRule {
  id: string;
  name: string;
  trigger: {
    type: 'activity_end' | 'sleep_start' | 'leave_home';
    condition?: object;
  };
  action: {
    device: 'feeder' | 'camera' | 'door';
    command: string;
    params?: object;
  };
  isActive: boolean;
}
```

## Risks / Trade-offs
| Risk | Mitigation |
|------|------------|
| AI 结果准确性 | 明确标注"仅供参考，请咨询兽医" |
| 隐私敏感（录音/位置） | 使用本地 Mock，不上传真实数据 |

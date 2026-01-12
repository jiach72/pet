# Spec: Safety Positioning Map

## Capability
基于 4G 硬件提供高精度的实时定位、轨迹追踪与安全围栏。

## MODIFIED Requirements
1. **Real-time Map Tracking**: 地图实时刷新宠物位置点，显示硬件在线/离线状态。
2. **Trajectory Playback**: 支持选择日期范围并播放宠物的行动路线动画。
   - #### Scenario: 回看宠物走失前的路径
     - **When** 用户在地图页选择“轨迹回放”
     - **Then** 地图应以动画形式描绘出当日的时间与路径轨迹。
3. **Geofence Management**: 支持在地图上划定圆形或多边形区域。
   - #### Scenario: 宠物离开家园区域
     - **When** GPS 坐标离开设定半径
     - **Then** 立即触发“电子围栏越界”告警。

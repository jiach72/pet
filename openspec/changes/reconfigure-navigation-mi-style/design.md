# Design: Mi-Style 4-Tab Navigation

## Unified 4-Tab Architecture
借鉴“小米运动健康”的“聚合”逻辑，我们将应用分为以下四个业务象限：

### 1. 守护 (Guardian) - 核心工具与监测
- **Entry**: `app/(tabs)/index.tsx`
- **Focus**: 实时数据监测（心率、体温）、健康评分、实时动态。

### 2. 发现 (Discovery) - 内容消费与社交
- **Entry**: `app/(tabs)/discovery.tsx`
- **Features**: 
  - 瀑布流内容流 (Current Discovery Waterfall)
  - 社交圈动态集成 (Merged from `social.tsx`)
  - 顶部切换：可以切换“推荐”（瀑布流）与“关注”（社交圈）。

### 3. 周边 (Store & Services) - 商业与地图生活
- **Entry**: `app/(tabs)/market.tsx` (可能重命名为 `services.tsx` 或保持 `market`)
- **Features**:
  - 宠物商城 (Marketplace)
  - 近邻地图 (Map Integration)
  - 增值服务 (Matching, Charity, Events, Wedding)
- **UI**: 顶部展示功能矩阵，下方为商城瀑布流/精选。

### 4. 我的 (Profile) - 设置与档案
- **Entry**: `app/(tabs)/profile.tsx`
- **Features**: 宠物档案、硬件设置、个人记录。

## Navigation UI
- **TabBar**: 恢复双行（图标+文字）布局，取消居中凸起设计（或改为更简约的小米风格平面设计）。
- **Transitions**: 4 个 Tab 之间的平权切换。

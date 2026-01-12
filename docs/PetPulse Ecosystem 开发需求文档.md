# **PetPulse Ecosystem \- 核心开发需求文档 (Engineering PRD V2.0 Final)**

## **1\. 项目概述与架构**

项目名称：PetPulse Ecosystem (智宠脉动)  
核心价值：以双模硬件为入口，构建覆盖医疗、社交、生活服务的“宠物生活操作系统”。  
硬件策略 (Hardware Strategy)：

* **Pro 版 (4G/LTE)**：全时在线，GPS 实时追踪，适合户外/大型犬。  
* **Lite 版 (BLE)**：近场交互，众包寻宠，适合猫/小型犬/室内场景。

## **2\. 核心功能模块详情 (Functional Specifications)**

### **2.1 模块一：AI 医疗与健康中心 (Medical Core)**

**逻辑**：传感器数据 \+ 非结构化数据 \-\> AI 分析 \-\> 预防性医疗

* **F-01 实时体征仪表盘**：  
  * 心率、呼吸率、体温（模拟数据流）。  
  * **Pro 特性**：远程实时刷新；**Lite 特性**：仅蓝牙范围内刷新，离线自动同步。  
* **F-02 AI 诊断辅助 (AI Diagnosis)**：  
  * **粪便分析 (Stool Scope)**：拍照 \-\> CV 识别布里斯托分类 \-\> 饮食建议。  
  * **声音听诊 (Vocal Health)**：音频流 \-\> 识别咳嗽/哮喘/分离焦虑吠叫。  
* **F-03 电子健康档案 (EHR)**：  
  * 整合硬件数据、手动记录（疫苗本 OCR 识别）、医院化验单。

### **2.2 模块二：基于数据的信任社交 (Trust Social)**

**逻辑**：硬件数据作为“社交货币”和“信任背书”

* **F-04 情感日记 (Mood Engine)**：  
  * 输入：HRV (情绪) \+ 步数 (活力)。  
  * 输出：AI 生成的第一人称日记（例：“今天跑了5公里，本汪感觉能追上风！”）。  
* **F-05 疫苗绿盾认证 (Green Shield)**：  
  * OCR 识别疫苗本 \-\> 后台审核 \-\> 颁发“绿盾”标识（社交准入门槛）。  
* **F-06 活力挑战赛 (LBS Gaming)**：  
  * 周榜/月榜 PK：步数排行榜、深睡时长排行榜（猫）。  
  * 1V1 PK：好友间发起挑战，输家自动发动态。

### **2.3 模块三：分级安全雷达 (Safety Radar)**

* **F-07 Pro 主动追踪**：丢失模式 \-\> 开启高频 GPS 上报 \-\> 轨迹回放。  
* **F-08 Lite 众包寻宠**：丢失模式 \-\> 广播特殊 BLE 信标 \-\> 附近 App 用户隐秘扫描并上报位置。  
* **F-09 寻宠黑匣子海报**：生成含“最后位置 \+ 剩余电量 \+ 最后生理状态”的急救海报。

### **2.4 模块四：生活服务与社区 (Life & O2O)**

* **F-10 生活服务地图**：  
  * POI 展示：医院、公园、宠物友好店。  
  * **精准推荐**：体重上升 \-\> 推荐游泳馆；压力高 \-\> 推荐安抚服务。  
* **F-11 社区活动中心 (Events)**：  
  * **红白喜事**：发布宠物婚礼请柬（喜庆UI）或 云端纪念馆（庄重UI）。  
  * **团建**：周末遛狗局报名。

### **2.5 模块五：生态与商业化 (Ecosystem)**

* **F-12 动态保险 (InsurTech)**：  
  * 基于数据的保费计算：健康分 \> 90 \-\> 下月保费 7 折。  
* **F-13 智能家居联动 (Smart Home)**：  
  * 规则引擎：检测到运动结束 \-\> 触发智能喂食器出粮。

## **3\. 数据结构 (Data Schema)**

// 宠物核心档案  
interface PetProfile {  
  id: string;  
  hardware\_type: 'lite' | 'pro'; // 硬件区分  
  name: string;  
  breed: string;  
  health\_status: {  
    vaccine\_verified: boolean; // 绿盾状态  
    health\_score: number; // 0-100  
  };  
  metrics: {  
    hrv\_stress: number;  
    activity\_level: number;  
    weight\_trend: 'stable' | 'gaining' | 'losing';  
  };  
}

// 社区活动  
interface CommunityEvent {  
  id: string;  
  type: 'wedding' | 'funeral' | 'meetup';  
  title: string;  
  date: number;  
  theme\_color: string; // 婚礼=粉, 葬礼=黑白  
  memorial\_data?: {  
    life\_span: string;  
    photos: string\[\];  
  };  
}

// AI 诊断记录  
interface HealthDiagnosis {  
  id: string;  
  type: 'stool' | 'audio';  
  result\_label: string; // "Type 4 Normal"  
  ai\_advice: string;  
  timestamp: number;  
}

## **4\. 关键 API 需求**

1. **POST /api/device/sync**: 同步硬件数据（区分 Pro/Lite 逻辑）。  
2. **POST /api/health/analyze-stool**: 上传图片，返回 AI 诊断结果。  
3. **POST /api/social/verify-vaccine**: 疫苗本 OCR 认证。  
4. **GET /api/life/recommendation**: 基于当前 PetMetrics 返回推荐服务 POI。
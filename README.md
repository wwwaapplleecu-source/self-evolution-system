# OpenClaw Self-Evolution System
# 自我进化系统 Skill
# 版本: v1.0
# 描述: 一套完整的 AI Agent 自我进化、自动维护、定时任务管理系统

---

## 📋 Skill 概述

这套系统帮助 OpenClaw Agent 实现：
- 🤖 **自我进化** - 自动学习、错误复盘、持续改进
- ⏰ **定时任务** - Skill学习、自我进化、每日反思、自动归档
- 🧠 **记忆管理** - 三级记忆体系、自动保存、向量检索
- 🔧 **自动修复** - 架构自检、自动修复常见问题
- 📊 **成本追踪** - Token使用监控、预算管理

---

## 🏗️ 系统架构

```
┌─────────────────────────────────────────┐
│  用户层                                  │
│  唯一入口：与 Agent 对话                 │
└─────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│  Agent 层 (CEO/调度中心)                 │
│  - 需求澄清                              │
│  - 任务拆解                              │
│  - 动态招聘 Specialist Agent             │
│  - 质量检查                              │
│  - 最终交付                              │
└─────────────────────────────────────────┘
              │
    ┌─────────┼─────────┐
    ▼         ▼         ▼
┌───────┐ ┌───────┐ ┌───────┐
│ Coder │ │Writer │ │Researcher│
│(技术部)│ │(内容部)│ │(情报部) │
└───────┘ └───────┘ └───────┘
```

---

## 📁 文件结构

```
workspace/
├── SOUL.md                    # Agent 身份设定
├── AGENTS.md                  # Agent 注册表
├── CORE_ARCHITECTURE.md       # 系统根架构
├── TOOLS.md                   # 工具配置
├── HEARTBEAT.md              # 进化系统心跳
├── EVOLUTION_CONTROLLER.md   # 进化控制器
├── MEMORY.md                 # 记忆系统主索引 (根目录)
├── memory/                   # 记忆存储目录
│   ├── MEMORY.md            # 记忆索引 (副本)
│   ├── YYYY-MM-DD.md        # 每日对话记录
│   ├── .error-log.md        # 错误记录
│   ├── vector-db.json       # 向量数据库
│   ├── concepts/            # 知识图谱
│   └── projects/            # 项目经验
├── evolution/               # 进化文档
│   ├── README.md
│   ├── skill-evolution.md
│   ├── performance.md
│   ├── lessons-learned.md
│   └── daily-reports/       # 每日进化报告
├── scripts/                 # 自动化脚本
│   ├── daily-skill-learning.js
│   ├── self-evolution.js
│   ├── daily-reflexion.ps1
│   ├── auto-evolve.ps1
│   ├── self-check.js        # 架构自检
│   └── autosave.js          # 自动保存
└── daily-skill-learning/    # 学习报告输出
```

---

## 🎯 核心工作流

### 1. 需求澄清
- 与用户多轮对话，直到完全理解需求
- 问清楚：目标、范围、时间、偏好
- **用户确认"可以了"才进入下一步**

### 2. 团队组建（动态招聘）
- 分析任务类型
- 调用已有 Agent 或创建新的 Specialist
- 安装所需 Skill/MCP
- 任务完成后解散临时团队

### 3. 统一调度
- 分配任务给各 Agent
- 协调 Agent 之间的协作
- 防止资源冲突（文件、API Key）
- **定时汇报进度给用户**（主动，不等问）

### 4. 质量检查
- 按清单检查交付物
- **最多 3 次返工机会**
- 3 次后仍不达标 → 报告给用户

### 5. 最终交付
- 整合各 Agent 成果
- 输出成品 + 使用说明
- 交付给用户

---

## 🧠 三级记忆体系

```
┌─────────────────────────────────────────┐
│  层级1: 瞬时记忆 (当前对话)               │
│  • 最近 10-20 轮对话                     │
│  • OpenClaw 内部管理                     │
│  • 页面刷新后丢失                        │
└─────────────────────────────────────────┘
              ↓ 每10分钟自动保存
┌─────────────────────────────────────────┐
│  层级2: 工作记忆 (文件系统)               │
│  • memory/YYYY-MM-DD.md                 │
│  • 任务级记忆 (workspace/tasks/)         │
│  • 保留7天或长期                         │
└─────────────────────────────────────────┘
              ↓ 每日归档 + 向量索引
┌─────────────────────────────────────────┐
│  层级3: 长期记忆 (向量数据库)             │
│  • memory/vector-db.json                │
│  • memory/concepts/ (知识图谱)           │
│  • memory/projects/ (项目经验)           │
│  • 永久保存，语义检索                    │
└─────────────────────────────────────────┘
```

---

## ⏰ 自动化任务

| 时间 | 任务 | 脚本 | 功能 |
|------|------|------|------|
| **02:00** | 🎓 Skill学习 | `daily-skill-learning.js` | 搜索新技能、生成报告 |
| **03:00** | 🚀 自我进化 | `self-evolution.js` | 分析系统状态、更新文档 |
| **03:15** | 🔍 架构自检 | `self-check.js` | 检查文件完整性、自动修复 |
| **03:30** | 📦 自动归档 | `auto-evolve.ps1` | 归档记忆文件 |
| **23:00** | 📝 每日反思 | `daily-reflexion.ps1` | 检查错误、记录教训 |
| **每10分钟** | 💾 自动保存 | `autosave.js` | 保存当前对话 |
| **每30分钟** | 💓 心跳检查 | heartbeat | 系统健康检查 |

---

## 🔧 核心规矩（必须遵守）

### 规矩 #1：真正的执行，而不是只给回复
- 用户说"去做" → 立即执行，不要只给方案
- 用户说"配置" → 真正配置，不要只写文档
- 用户说"安装" → 真正安装，不要只列步骤
- **确认执行完成后，再报告结果**

### 规矩 #2：先搜索，再动手
- 不确定怎么做的 → 先搜索最佳实践
- 有新工具/新方法 → 搜索确认再使用
- 避免闭门造车

---

## 🛠️ 安装步骤

### 1. 创建目录结构
```bash
mkdir -p memory/{concepts,projects,archive}
mkdir -p evolution/{daily-reports,knowledge-graph}
mkdir -p scripts
mkdir -p daily-skill-learning
mkdir -p tasks
```

### 2. 复制核心文件
将本 Skill 的所有文件复制到工作目录

### 3. 配置定时任务 (Windows)
```powershell
# 创建 Skill学习任务
$action = New-ScheduledTaskAction -Execute "node" -Argument "scripts/daily-skill-learning.js"
$trigger = New-ScheduledTaskTrigger -Daily -At "02:00"
Register-ScheduledTask -TaskName "Agent-SkillLearning" -Action $action -Trigger $trigger

# 创建自我进化任务
$action = New-ScheduledTaskAction -Execute "node" -Argument "scripts/self-evolution.js"
$trigger = New-ScheduledTaskTrigger -Daily -At "03:00"
Register-ScheduledTask -TaskName "Agent-SelfEvolution" -Action $action -Trigger $trigger

# 创建架构自检任务
$action = New-ScheduledTaskAction -Execute "node" -Argument "scripts/self-check.js"
$trigger = New-ScheduledTaskTrigger -Daily -At "03:15"
Register-ScheduledTask -TaskName "Agent-SelfCheck" -Action $action -Trigger $trigger
```

### 4. 配置 OpenClaw Cron (可选)
```bash
openclaw cron add --name "Daily-Skill-Learning" --cron "0 2 * * *" --message "执行Skill学习任务"
openclaw cron add --name "Daily-Self-Evolution" --cron "0 3 * * *" --message "执行自我进化任务"
```

### 5. 初始化记忆系统
```bash
node scripts/autosave.js
node scripts/self-check.js
```

---

## 📊 汇报机制

**主动汇报时机**：
- ✅ 任务完成时
- ✅ 发现重要信息时（如新技能）
- ✅ 系统状态变化时
- ✅ 遇到问题时
- ✅ 需要决策时

**汇报内容**：
- 执行了什么
- 发现了什么
- 结果是什么
- 建议是什么

---

## 🔒 安全边界

**可以自动做的**：
- ✅ 协调内部 Agent 工作
- ✅ 读写工作目录文件
- ✅ 安装开源 Skill/MCP
- ✅ 搜索网络公开信息
- ✅ 配置定时任务（用户确认后）

**必须问用户的**：
- ❌ 使用私有 API Key
- ❌ 访问私人文件
- ❌ 对外发帖（以用户名义）
- ❌ 安装闭源/商业软件
- ❌ 涉及金钱的操作

---

## 📝 文件清单

### 核心文档
- `SOUL.md` - Agent身份设定
- `AGENTS.md` - Agent注册表
- `CORE_ARCHITECTURE.md` - 系统根架构
- `TOOLS.md` - 工具配置
- `HEARTBEAT.md` - 进化系统心跳
- `EVOLUTION_CONTROLLER.md` - 进化控制器
- `MEMORY.md` - 记忆系统主索引

### 脚本文件
- `scripts/daily-skill-learning.js` - Skill学习
- `scripts/self-evolution.js` - 自我进化
- `scripts/daily-reflexion.ps1` - 每日反思
- `scripts/auto-evolve.ps1` - 自动归档
- `scripts/self-check.js` - 架构自检
- `scripts/autosave.js` - 自动保存

### 记忆文件
- `memory/MEMORY.md` - 记忆索引
- `memory/YYYY-MM-DD.md` - 每日对话
- `memory/.error-log.md` - 错误记录
- `memory/vector-db.json` - 向量数据库
- `memory/concepts/README.md` - 知识图谱
- `memory/projects/README.md` - 项目经验

---

## 🚀 使用示例

### 启动系统
```bash
# 运行自检
node scripts/self-check.js

# 手动执行Skill学习
node scripts/daily-skill-learning.js

# 手动执行自我进化
node scripts/self-evolution.js
```

### 查看报告
```bash
# 查看学习报告
cat daily-skill-learning/YYYY-MM-DD.md

# 查看进化报告
cat evolution/daily-reports/YYYY-MM-DD.md

# 查看自检报告
cat memory/.self-check-report.json
```

---

## 📈 进化阶段

### 阶段1: 基础进化 ✅
- [x] 多模型支持
- [x] 自动保存机制
- [x] 向量数据库
- [x] 定时任务系统

### 阶段2: 半自动进化 ✅
- [x] 自动Skill发现
- [x] 自我优化引擎
- [x] 自动任务调度
- [x] Token自动检查
- [x] 错误自愈系统
- [x] 成本意识
- [x] 架构自检

### 阶段3: 全自动进化 🚀
- [ ] 自主Agent创建
- [ ] 预测性优化
- [ ] 自适应学习

---

## 💡 最佳实践

1. **定期查看报告** - 每天检查学习报告和进化报告
2. **及时修复问题** - 自检发现问题后立即处理
3. **持续优化提示** - 根据经验优化 Agent 的 SOUL.md
4. **保持更新** - 定期更新 Skill 和 MCP

---

*版本: v1.0*
*适用: OpenClaw Agent*
*许可证: MIT*

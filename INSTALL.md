# 安装指南

## 系统要求

- **OpenClaw**: >= 1.0.0
- **Node.js**: >= 18.0.0
- **操作系统**: Windows 10/11, Linux, macOS
- **PowerShell** (Windows): 5.1 或更高版本

## 快速安装

### 方式一：一键安装脚本

```bash
# 克隆或下载本 Skill
# 进入 Skill 目录
cd self-evolution-system

# 运行安装脚本
node scripts/install.js
```

### 方式二：手动安装

#### 1. 创建目录结构

```bash
# 在 OpenClaw 工作目录下执行
mkdir -p memory/{concepts,projects,archive}
mkdir -p evolution/{daily-reports,knowledge-graph}
mkdir -p scripts
mkdir -p daily-skill-learning
mkdir -p tasks
```

#### 2. 复制文件

将本 Skill 的以下文件复制到工作目录：

**核心文档**:
- `templates/SOUL.md` → `workspace/SOUL.md`
- `templates/AGENTS.md` → `workspace/AGENTS.md`
- `templates/CORE_ARCHITECTURE.md` → `workspace/CORE_ARCHITECTURE.md`
- `templates/TOOLS.md` → `workspace/TOOLS.md`
- `templates/HEARTBEAT.md` → `workspace/HEARTBEAT.md`
- `templates/EVOLUTION_CONTROLLER.md` → `workspace/EVOLUTION_CONTROLLER.md`
- `templates/MEMORY.md` → `workspace/MEMORY.md` 和 `workspace/memory/MEMORY.md`

**脚本文件**:
- `scripts/daily-skill-learning.js` → `workspace/scripts/`
- `scripts/self-evolution.js` → `workspace/scripts/`
- `scripts/daily-reflexion.ps1` → `workspace/scripts/`
- `scripts/auto-evolve.ps1` → `workspace/scripts/`
- `scripts/self-check.js` → `workspace/scripts/`
- `scripts/autosave.js` → `workspace/scripts/`
- `scripts/run-skill-learning.ps1` → `workspace/scripts/`
- `scripts/run-self-evolution.ps1` → `workspace/scripts/`
- `scripts/run-self-check.ps1` → `workspace/scripts/`

**初始化文件**:
- `templates/memory/` 下的所有文件 → `workspace/memory/`
- `templates/evolution/` 下的所有文件 → `workspace/evolution/`

#### 3. 配置定时任务 (Windows)

以管理员身份运行 PowerShell：

```powershell
# 设置执行策略
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# 创建 Skill 学习任务
$action = New-ScheduledTaskAction `
    -Execute "powershell.exe" `
    -Argument "-ExecutionPolicy Bypass -File `"$env:USERPROFILE\.openclaw\workspace\scripts\run-skill-learning.ps1`""
$trigger = New-ScheduledTaskTrigger -Daily -At "02:00"
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries
Register-ScheduledTask `
    -TaskName "Agent-SkillLearning" `
    -Action $action `
    -Trigger $trigger `
    -Settings $settings `
    -Force

# 创建自我进化任务
$action = New-ScheduledTaskAction `
    -Execute "powershell.exe" `
    -Argument "-ExecutionPolicy Bypass -File `"$env:USERPROFILE\.openclaw\workspace\scripts\run-self-evolution.ps1`""
$trigger = New-ScheduledTaskTrigger -Daily -At "03:00"
Register-ScheduledTask `
    -TaskName "Agent-SelfEvolution" `
    -Action $action `
    -Trigger $trigger `
    -Settings $settings `
    -Force

# 创建架构自检任务
$action = New-ScheduledTaskAction `
    -Execute "powershell.exe" `
    -Argument "-ExecutionPolicy Bypass -File `"$env:USERPROFILE\.openclaw\workspace\scripts\run-self-check.ps1`""
$trigger = New-ScheduledTaskTrigger -Daily -At "03:15"
Register-ScheduledTask `
    -TaskName "Agent-SelfCheck" `
    -Action $action `
    -Trigger $trigger `
    -Settings $settings `
    -Force

# 创建每日反思任务
$action = New-ScheduledTaskAction `
    -Execute "powershell.exe" `
    -Argument "-ExecutionPolicy Bypass -File `"$env:USERPROFILE\.openclaw\workspace\scripts\daily-reflexion.ps1`""
$trigger = New-ScheduledTaskTrigger -Daily -At "23:00"
Register-ScheduledTask `
    -TaskName "Agent-DailyReflexion" `
    -Action $action `
    -Trigger $trigger `
    -Settings $settings `
    -Force

Write-Host "✅ 所有定时任务已创建"
```

#### 4. 配置 OpenClaw Cron (可选)

```bash
# 添加 OpenClaw Cron 任务
openclaw cron add `
    --name "Daily-Skill-Learning" `
    --cron "0 2 * * *" `
    --message "执行Skill学习任务"

openclaw cron add `
    --name "Daily-Self-Evolution" `
    --cron "0 3 * * *" `
    --message "执行自我进化任务"
```

#### 5. 初始化系统

```bash
# 运行自检
node scripts/self-check.js

# 运行一次自动保存
node scripts/autosave.js

# 验证安装
node scripts/self-check.js
```

## 验证安装

### 检查文件

```bash
# 检查核心文件
ls SOUL.md AGENTS.md CORE_ARCHITECTURE.md MEMORY.md

# 检查脚本
ls scripts/*.js scripts/*.ps1

# 检查目录
ls memory/ evolution/ daily-skill-learning/
```

### 检查定时任务 (Windows)

```powershell
# 查看所有 Agent 任务
Get-ScheduledTask | Where-Object { $_.TaskName -like "Agent-*" }

# 查看任务详情
Get-ScheduledTaskInfo -TaskName "Agent-SkillLearning"
```

### 手动运行测试

```bash
# 测试 Skill 学习
node scripts/daily-skill-learning.js

# 测试自我进化
node scripts/self-evolution.js

# 测试自检
node scripts/self-check.js
```

## 故障排除

### 问题1：定时任务不运行

**症状**: 任务显示 Ready 但不执行
**解决**:
```powershell
# 检查任务历史
Get-ScheduledTaskInfo -TaskName "Agent-SkillLearning"

# 手动运行测试
Start-ScheduledTask -TaskName "Agent-SkillLearning"

# 查看日志
Get-Content "$env:USERPROFILE\.openclaw\workspace\memory\.scheduled-task-log.txt" -Tail 20
```

### 问题2：脚本执行失败

**症状**: 脚本报错或退出码非0
**解决**:
```bash
# 检查 Node.js 版本
node --version

# 检查脚本语法
node --check scripts/daily-skill-learning.js

# 手动运行查看错误
node scripts/daily-skill-learning.js 2>&1
```

### 问题3：文件缺失

**症状**: 自检报告文件缺失
**解决**:
```bash
# 重新运行自检
node scripts/self-check.js

# 检查修复结果
cat memory/.self-check-report.json
```

## 更新 Skill

```bash
# 备份当前配置
cp SOUL.md SOUL.md.backup

# 下载新版本
# 复制新文件

# 运行自检
node scripts/self-check.js

# 验证更新
node scripts/self-evolution.js
```

## 卸载

```powershell
# 删除定时任务 (Windows)
Unregister-ScheduledTask -TaskName "Agent-SkillLearning" -Confirm:$false
Unregister-ScheduledTask -TaskName "Agent-SelfEvolution" -Confirm:$false
Unregister-ScheduledTask -TaskName "Agent-SelfCheck" -Confirm:$false
Unregister-ScheduledTask -TaskName "Agent-DailyReflexion" -Confirm:$false

# 删除文件 (可选)
# 保留 memory/ 目录以保存历史记录
```

---

*安装指南版本: 1.0*
*最后更新: 2026-03-03*

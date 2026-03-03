# 使用指南

## 日常使用

### 查看系统状态

```bash
# 运行自检
node scripts/self-check.js

# 查看自检报告
cat memory/.self-check-report.json

# 查看系统日志
cat memory/.scheduled-task-log.txt
```

### 查看学习成果

```bash
# 查看今日学习报告
cat daily-skill-learning/YYYY-MM-DD.md

# 查看技能数据库
cat skill-resources-db.md

# 查看技能进化记录
cat evolution/skill-evolution.md
```

### 查看进化报告

```bash
# 查看今日进化报告
cat evolution/daily-reports/YYYY-MM-DD.md

# 查看性能记录
cat evolution/performance.md

# 查看经验教训
cat evolution/lessons-learned.md
```

## 手动执行任务

### Skill 学习

```bash
node scripts/daily-skill-learning.js
```

**功能**:
- 搜索新技能
- 检查已安装技能更新
- 生成学习报告
- 更新技能数据库

### 自我进化

```bash
node scripts/self-evolution.js
```

**功能**:
- 分析系统状态
- 更新进化文档
- 生成进化报告
- 更新 SOUL.md

### 架构自检

```bash
node scripts/self-check.js
```

**功能**:
- 检查核心文件
- 检查脚本完整性
- 检查目录结构
- 自动修复问题
- 更新检查记录

### 自动保存

```bash
node scripts/autosave.js
```

**功能**:
- 保存当前对话
- 更新记忆文件

## 定制配置

### 修改定时任务时间

**Windows**:
```powershell
# 修改 Skill 学习时间
$trigger = New-ScheduledTaskTrigger -Daily -At "03:00"  # 改为 03:00
Set-ScheduledTask -TaskName "Agent-SkillLearning" -Trigger $trigger
```

**OpenClaw Cron**:
```bash
# 删除旧任务
openclaw cron delete <job-id>

# 创建新任务
openclaw cron add --name "Daily-Skill-Learning" --cron "0 3 * * *" --message "执行Skill学习任务"
```

### 修改关键词轮换

编辑 `scripts/daily-skill-learning.js`:

```javascript
const KEYWORDS = [
  ['automation', 'workflow'],
  ['github', 'git'],
  ['web', 'search', 'fetch'],
  // 添加你的关键词
  ['your', 'keywords', 'here'],
];
```

### 修改检查项

编辑 `scripts/self-check.js`:

```javascript
const requiredFiles = [
  'SOUL.md',
  'AGENTS.md',
  // 添加你的核心文件
  'YOUR_FILE.md',
];
```

## 故障排除

### 任务不运行

1. 检查任务是否存在
2. 检查任务配置
3. 手动运行测试
4. 查看执行日志

### 脚本报错

1. 检查 Node.js 版本
2. 检查脚本语法
3. 查看错误信息
4. 重新安装脚本

### 文件缺失

1. 运行自检脚本
2. 查看修复结果
3. 手动复制缺失文件
4. 重新运行自检

## 最佳实践

1. **每天查看报告** - 了解系统状态和学习成果
2. **及时处理错误** - 自检发现问题后立即修复
3. **定期备份** - 备份核心配置文件
4. **持续优化** - 根据使用经验调整配置

## 高级用法

### 自定义汇报方式

编辑脚本中的 `log()` 函数，添加：
- 邮件通知
- Webhook 通知
- 消息推送

### 集成外部工具

- 连接飞书/钉钉机器人
- 集成监控仪表板
- 导出数据到分析平台

---

*使用指南版本: 1.0*
*最后更新: 2026-03-03*

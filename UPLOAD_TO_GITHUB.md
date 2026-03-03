# GitHub 上传命令

## 仓库信息
- 仓库地址：https://github.com/wwaappleecu-source/self-evolution-system
- 用户名：wwaappleecu-source
- 仓库名：self-evolution-system

## 上传步骤

### 方法1：使用 Git 命令行（推荐）

打开 PowerShell，执行以下命令：

```powershell
# 1. 进入 Skill 目录
cd C:\Users\12167\.openclaw\workspace\skills\self-evolution-system

# 2. 初始化 Git 仓库（如果还没初始化）
git init

# 3. 添加所有文件
git add .

# 4. 提交更改
git commit -m "Initial release v1.0.0 - Self-Evolution System for OpenClaw"

# 5. 设置远程仓库（使用你的仓库地址）
git remote add origin https://github.com/wwaappleecu-source/self-evolution-system.git

# 6. 推送到 GitHub
git branch -M main
git push -u origin main

# 如果提示输入用户名密码，输入你的 GitHub 用户名和 Personal Access Token
```

### 方法2：使用 GitHub Desktop（图形界面）

1. 下载并安装 GitHub Desktop：https://desktop.github.com/
2. 登录你的 GitHub 账号
3. 选择 "Add existing repository"
4. 选择文件夹：`C:\Users\12167\.openclaw\workspace\skills\self-evolution-system`
5. 填写提交信息："Initial release v1.0.0"
6. 点击 "Commit to main"
7. 点击 "Publish repository"
8. 选择 "GitHub.com" 和 "wwaappleecu-source/self-evolution-system"
9. 点击 "Publish"

### 方法3：直接在 GitHub 网页上传

1. 访问：https://github.com/wwaappleecu-source/self-evolution-system
2. 点击 "Add file" → "Upload files"
3. 拖拽或选择所有文件
4. 填写提交信息："Initial release v1.0.0"
5. 点击 "Commit changes"

## 验证上传

上传完成后，访问：
https://github.com/wwaappleecu-source/self-evolution-system

应该能看到所有文件：
- README.md
- skill.json
- scripts/ 目录
- 其他所有文件

## 下一步

上传完成后，继续发布到其他平台：
1. ClawHub: https://clawhub.biz/
2. OpenClaw Skill: https://openclawskill.ai/
3. Awesome OpenClaw Skills: GitHub PR
4. OpenClaw Launch: https://openclawlaunch.com/skills

## 注意事项

- 确保所有文件都已上传
- README.md 会显示在仓库首页
- 可以创建一个 Release 来标记 v1.0.0

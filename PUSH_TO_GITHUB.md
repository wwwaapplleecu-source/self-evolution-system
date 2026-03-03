# 推送到 GitHub 的命令

## 在 PowerShell 中执行：

```powershell
cd C:\Users\12167\.openclaw\workspace\skills\self-evolution-system

# 推送到 GitHub
git push -u origin main
```

## 身份验证

如果提示输入用户名和密码：
- **Username**: `wwaappleecu-source`
- **Password**: 使用 GitHub Personal Access Token（不是登录密码）

### 如何创建 Personal Access Token

1. 访问 https://github.com/settings/tokens
2. 点击 "Generate new token (classic)"
3. 选择有效期（建议 90 天）
4. 勾选权限：
   - ✅ repo（完整仓库访问）
5. 点击 "Generate token"
6. **复制并保存 Token**（只显示一次）

### 或者使用 GitHub Desktop（更简单）

1. 下载 https://desktop.github.com/
2. 登录你的账号
3. 选择 "Add existing repository"
4. 选择 `self-evolution-system` 文件夹
5. 点击 "Push origin"

## 验证上传

推送完成后，访问：
https://github.com/wwaappleecu-source/self-evolution-system

应该能看到所有 19 个文件。

## 下一步

上传完成后，继续发布到其他平台。

# Self-Check Task
# 鎵ц鏃堕棿: 姣忓ぉ 03:15 (鍦ㄨ嚜鎴戣繘鍖栦箣鍚?
# 鍔熻兘: 鑷姩妫€鏌ユ灦鏋勫畬鏁存€у苟淇闂

$workspaceDir = "$env:USERPROFILE\.openclaw\workspace"
$scriptPath = "$workspaceDir\scripts\self-check.js"
$logPath = "$workspaceDir\memory\.self-check-task.log"

"=== Self-Check Task $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') ===" | Out-File $logPath -Append

try {
    if (Test-Path $scriptPath) {
        $output = & node $scriptPath 2>&1
        $output | Out-File $logPath -Append
        "Exit code: $LASTEXITCODE" | Out-File $logPath -Append
        
        if ($LASTEXITCODE -eq 0) {
            "鉁?鑷閫氳繃" | Out-File $logPath -Append
        } else {
            "鈿狅笍 鑷鍙戠幇闂锛屽凡灏濊瘯鑷姩淇" | Out-File $logPath -Append
        }
    } else {
        "鉂?鑷鑴氭湰涓嶅瓨鍦? $scriptPath" | Out-File $logPath -Append
    }
} catch {
    "ERROR: $($_.Exception.Message)" | Out-File $logPath -Append
}

"=== End ===" | Out-File $logPath -Append


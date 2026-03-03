# Wrapper script for Daily Skill Learning
# This script is called by Windows Task Scheduler

$workspaceDir = "$env:USERPROFILE\.openclaw\workspace"
$scriptPath = "$workspaceDir\scripts\daily-skill-learning.js"
$logPath = "$workspaceDir\memory\.scheduled-task-log.txt"

"=== DailySkillLearning $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') ===" | Out-File $logPath -Append

try {
    $output = & node $scriptPath 2>&1
    $output | Out-File $logPath -Append
    "Exit code: $LASTEXITCODE" | Out-File $logPath -Append
} catch {
    "ERROR: $($_.Exception.Message)" | Out-File $logPath -Append
}

"=== End ===" | Out-File $logPath -Append


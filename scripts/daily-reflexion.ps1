# Daily Reflexion Script - 淇鐗?# 鎵ц鏃堕棿: 姣忓ぉ 23:00
# 淇: 娣诲姞鏃ュ織璁板綍鍜岄敊璇鐞?
$workspaceDir = "$env:USERPROFILE\.openclaw\workspace"
$errorLogPath = "$workspaceDir\memory\.error-log.md"
$lessonsPath = "$workspaceDir\evolution\lessons-learned.md"
$logPath = "$workspaceDir\memory\.reflexion-log.txt"
$date = Get-Date -Format "yyyy-MM-dd HH:mm"

# 鍐欏叆鏃ュ織鍑芥暟
function Write-Log($message) {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    "$timestamp - $message" | Out-File -FilePath $logPath -Append
    Write-Host $message
}

Write-Log "[$date] Starting daily reflexion..."

try {
    # 妫€鏌ラ敊璇棩蹇?    if (-not (Test-Path $errorLogPath)) {
        Write-Log "No error log found. Creating empty file..."
        New-Item -ItemType File -Path $errorLogPath -Force | Out-Null
    }

    $errorContent = Get-Content $errorLogPath -Raw -ErrorAction SilentlyContinue
    $today = Get-Date -Format "yyyy-MM-dd"

    # 缁熻浠婃棩閿欒
    $todayErrors = if ($errorContent) { 
        ([regex]::Matches($errorContent, $today)).Count 
    } else { 0 }

    Write-Log "Found $todayErrors errors today"

    # 鐢熸垚鍙嶆€濊褰?    $reflection = @"

## 姣忔棩鍙嶆€?- $date

**浠婃棩閿欒鏁?*: $todayErrors

**鍙嶆€濆唴瀹?*:
$(if ($todayErrors -gt 0) { "- 鍙戠幇 $todayErrors 涓敊璇紝宸茶褰曞埌 .error-log.md" } else { "- 浠婃棩鏃犻敊璇紝绯荤粺杩愯姝ｅ父" })

**鏀硅繘璁″垝**:
- 缁х画鐩戞帶绯荤粺鐘舵€?- 浼樺寲閿欒澶勭悊娴佺▼
- 鎻愬崌鑷姩鍖栫▼搴?
"@

    # 杩藉姞鍒扮粡楠屾暀璁簱
    if (Test-Path $lessonsPath) {
        Add-Content -Path $lessonsPath -Value $reflection
        Write-Log "Reflection recorded to lessons-learned.md"
    } else {
        Write-Log "Warning: lessons-learned.md not found"
    }

    # 娓呯┖浠婃棩閿欒璁℃暟锛堝彲閫夛級
    # 淇濈暀閿欒鏃ュ織鐢ㄤ簬鍘嗗彶鍒嗘瀽

    Write-Log "[$date] Reflexion complete."

} catch {
    Write-Log "ERROR: $($_.Exception.Message)"
    exit 1
}

exit 0


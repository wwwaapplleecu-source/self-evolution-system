# Auto-Evolve Script - 淇鐗?# 鎵ц鏃堕棿: 姣忓ぉ 03:30 (鍦ㄨ嚜鎴戣繘鍖栦箣鍚?
# 淇: 娣诲姞鏃ュ織鍜屽疄闄呮墽琛屽唴瀹?
$date = Get-Date -Format "yyyy-MM-dd"
$time = Get-Date -Format "HH:mm:ss"
$workspaceDir = "$env:USERPROFILE\.openclaw\workspace"
$memoryDir = "$workspaceDir\memory"
$archiveDir = "$memoryDir\archive"
$logPath = "$memoryDir\.auto-evolve-log.txt"

# 鍐欏叆鏃ュ織鍑芥暟
function Write-Log($message) {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    "$timestamp - $message" | Out-File -FilePath $logPath -Append
    Write-Host $message
}

Write-Log "=== Auto-Evolve Started at $date $time ==="

try {
    # 1. 纭繚褰掓。鐩綍瀛樺湪
    if (-not (Test-Path $archiveDir)) {
        New-Item -ItemType Directory -Path $archiveDir -Force | Out-Null
        Write-Log "Created archive directory"
    }

    # 2. 褰掓。浠婃棩璁板繂鏂囦欢
    $memoryFile = "$memoryDir\$date.md"
    if (Test-Path $memoryFile) {
        $archiveFile = "$archiveDir\$date.md"
        Copy-Item $memoryFile $archiveFile -Force
        Write-Log "Archived memory file: $date.md"
    } else {
        Write-Log "No memory file to archive for today"
    }

    # 3. 缁熻绯荤粺鐘舵€?    $memoryFiles = Get-ChildItem $memoryDir -Filter "*.md" -ErrorAction SilentlyContinue
    $totalSize = ($memoryFiles | Measure-Object -Property Length -Sum).Sum
    $totalSizeMB = [math]::Round($totalSize / 1MB, 2)

    Write-Log "System Status:"
    Write-Log "  - Memory files: $($memoryFiles.Count)"
    Write-Log "  - Total size: $totalSizeMB MB"

    # 4. 妫€鏌ュ苟杩愯 Node.js 杩涘寲鑴氭湰
    $evolutionScript = "$workspaceDir\scripts\self-evolution.js"
    if (Test-Path $evolutionScript) {
        Write-Log "Running self-evolution.js..."
        try {
            $result = & node $evolutionScript 2>&1
            Write-Log "Evolution script output:"
            $result | ForEach-Object { Write-Log "  $_" }
        } catch {
            Write-Log "Error running evolution script: $($_.Exception.Message)"
        }
    } else {
        Write-Log "Warning: self-evolution.js not found"
    }

    # 5. 鏇存柊杩涘寲鎺у埗鍣ㄧ姸鎬?    $controllerPath = "$workspaceDir\EVOLUTION_CONTROLLER.md"
    if (Test-Path $controllerPath) {
        $statusUpdate = "`n`n## 鏈€鍚庢墽琛岀姸鎬乣n`n**鏃堕棿**: $date $time`n**鐘舵€?*: 鉁?鎴愬姛`n**璁板繂鏂囦欢**: $($memoryFiles.Count) 涓猔n**鎬诲ぇ灏?*: $totalSizeMB MB`n"
        Add-Content -Path $controllerPath -Value $statusUpdate
        Write-Log "Updated EVOLUTION_CONTROLLER.md"
    }

    Write-Log "=== Auto-Evolve Completed ==="

} catch {
    Write-Log "ERROR: $($_.Exception.Message)"
    exit 1
}

exit 0


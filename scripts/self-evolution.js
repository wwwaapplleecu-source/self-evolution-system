#!/usr/bin/env node
/**
 * Self Evolution Task - 淇鐗? * 鎵ц鏃堕棿: 姣忓ぉ 03:00 (鐢?Windows Task Scheduler 瑙﹀彂)
 * 淇: 娣诲姞璇︾粏鏃ュ織鍜屽疄闄呮墽琛屽唴瀹? */

const fs = require('fs');
const path = require('path');

const WORKSPACE = '~/.openclaw/workspace';
const TODAY = new Date().toISOString().split('T')[0];
const LOG_FILE = path.join(WORKSPACE, 'memory', '.self-evolution-log.txt');

// 鏃ュ織鍑芥暟
function log(message) {
  const timestamp = new Date().toISOString();
  const line = `[${timestamp}] ${message}`;
  console.log(line);
  fs.appendFileSync(LOG_FILE, line + '\n');
}

log('=== Self Evolution Started ===');
log(`Date: ${TODAY}`);

const report = {
  date: TODAY,
  startTime: new Date().toISOString(),
  systemStatus: {},
  updates: [],
  errors: []
};

// 1. 鍒嗘瀽绯荤粺鐘舵€?log('\n[1/3] Analyzing system status...');

try {
  const memoryDir = path.join(WORKSPACE, 'memory');
  const memoryFiles = fs.readdirSync(memoryDir).filter(f => f.endsWith('.md'));
  
  let totalSize = 0;
  memoryFiles.forEach(f => {
    try {
      const stats = fs.statSync(path.join(memoryDir, f));
      totalSize += stats.size;
    } catch (e) {}
  });
  
  report.systemStatus = {
    memoryFiles: memoryFiles.length,
    memorySizeMB: (totalSize / 1024 / 1024).toFixed(2),
    recentFiles: memoryFiles.slice(-5)
  };
  
  log(`  Memory files: ${memoryFiles.length}`);
  log(`  Total size: ${report.systemStatus.memorySizeMB} MB`);
} catch (e) {
  report.errors.push({ step: 'system-status', error: e.message });
  log(`  Error: ${e.message}`);
}

// 2. 鏇存柊杩涘寲鏂囨。
log('\n[2/3] Updating evolution documents...');

try {
  // 纭繚鐩綍瀛樺湪
  const dirs = [
    path.join(WORKSPACE, 'evolution', 'daily-reports'),
    path.join(WORKSPACE, 'evolution', 'knowledge-graph')
  ];
  
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      report.updates.push(`Created directory: ${path.basename(dir)}`);
      log(`  Created: ${dir}`);
    }
  });
  
  // 妫€鏌ョ粡楠屾暀璁簱
  const lessonsPath = path.join(WORKSPACE, 'evolution', 'lessons-learned.md');
  if (!fs.existsSync(lessonsPath)) {
    fs.writeFileSync(lessonsPath, '# 缁忛獙鏁欒搴揬n\n> 璁板綍姣忔閿欒鍜屽鍒扮殑缁忛獙\n\n');
    report.updates.push('Created lessons-learned.md');
    log('  Created: lessons-learned.md');
  }
  
} catch (e) {
  report.errors.push({ step: 'update-docs', error: e.message });
  log(`  Error: ${e.message}`);
}

// 3. 鐢熸垚杩涘寲鎶ュ憡
log('\n[3/3] Generating evolution report...');

report.endTime = new Date().toISOString();

const evolutionReport = `# Self Evolution Report - ${TODAY}

## Summary
- **Date**: ${TODAY}
- **Start**: ${report.startTime}
- **End**: ${report.endTime}
- **Status**: ${report.errors.length === 0 ? '鉁?Success' : '鈿狅笍 Partial Failure'}

## System Status
- **Memory Files**: ${report.systemStatus.memoryFiles || 'N/A'}
- **Memory Size**: ${report.systemStatus.memorySizeMB || 'N/A'} MB
- **Recent Files**: ${report.systemStatus.recentFiles ? report.systemStatus.recentFiles.join(', ') : 'N/A'}

## Updates
${report.updates.map(u => `- ${u}`).join('\n') || '- None'}

## Errors
${report.errors.map(e => `- [${e.step}]: ${e.error}`).join('\n') || '- None'}

## Evolution Goals
- [ ] Continue learning new Skills
- [ ] Optimize response quality
- [ ] Reduce error rate
- [ ] Improve execution efficiency

## Tomorrow's Plan
1. Continue Skill learning
2. Analyze conversation quality
3. Update knowledge graph

---
*Auto-generated at ${report.endTime}*
`;

// 淇濆瓨鎶ュ憡
const reportDir = path.join(WORKSPACE, 'evolution', 'daily-reports');
if (!fs.existsSync(reportDir)) {
  fs.mkdirSync(reportDir, { recursive: true });
}

const reportPath = path.join(reportDir, `${TODAY}.md`);
fs.writeFileSync(reportPath, evolutionReport);
log(`  Report saved: ${reportPath}`);

// 鏇存柊浠诲姟鎸囦护鏂囦欢
const taskPath = path.join(WORKSPACE, 'tasks', 'daily-self-evolution.md');
if (fs.existsSync(taskPath)) {
  const statusUpdate = `

## [鎵ц璁板綍] ${TODAY}
- **鐘舵€?*: ${report.errors.length === 0 ? '鉁?鎴愬姛' : '鈿狅笍 閮ㄥ垎澶辫触'}
- **璁板繂鏂囦欢**: ${report.systemStatus.memoryFiles || 'N/A'} 涓?- **鏇存柊椤?*: ${report.updates.length} 涓?- **鎶ュ憡**: ${reportPath}
`;
  fs.appendFileSync(taskPath, statusUpdate);
  log('  Task status updated');
}

log('\n=== Self Evolution Completed ===');

// 杈撳嚭鎽樿
console.log('\n--- SUMMARY ---');
console.log(`Memory files: ${report.systemStatus.memoryFiles || 'N/A'}`);
console.log(`Updates: ${report.updates.length}`);
console.log(`Errors: ${report.errors.length}`);
console.log(`Report: ${reportPath}`);

process.exit(report.errors.length > 0 ? 1 : 0);


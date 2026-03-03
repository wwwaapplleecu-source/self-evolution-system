#!/usr/bin/env node
/**
 * Daily Skill Learning Task - 绠€鍖栦慨澶嶇増
 * 鎵ц鏃堕棿: 姣忓ぉ 02:00
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const WORKSPACE = '~/.openclaw/workspace';
const TODAY = new Date().toISOString().split('T')[0];
const LOG_FILE = path.join(WORKSPACE, 'memory', '.skill-learning-log.txt');

function log(message) {
  const timestamp = new Date().toISOString();
  const line = `[${timestamp}] ${message}`;
  console.log(line);
  fs.appendFileSync(LOG_FILE, line + '\n');
}

const KEYWORDS = [
  ['automation', 'workflow'],
  ['github', 'git'],
  ['web', 'search', 'fetch'],
  ['data', 'analysis', 'csv'],
  ['api', 'integration'],
  ['testing', 'quality'],
  ['documentation', 'docs'],
  ['deployment', 'devops'],
  ['security', 'audit'],
  ['productivity', 'tools']
];

log('=== Daily Skill Learning Started ===');
log(`Date: ${TODAY}`);

const dayIndex = new Date().getDate() % 10;
const todayKeywords = KEYWORDS[dayIndex];
log(`Keywords: ${todayKeywords.join(', ')}`);

const report = {
  date: TODAY,
  keywords: todayKeywords,
  discovered: [],
  errors: [],
  startTime: new Date().toISOString()
};

// 鎼滅储鎶€鑳?log('\n[1/2] Searching for skills...');
for (const keyword of todayKeywords) {
  try {
    log(`  Searching: ${keyword}`);
    const result = execSync(`npx skills find ${keyword} 2>&1`, { 
      cwd: WORKSPACE,
      encoding: 'utf8',
      timeout: 30000
    });
    
    // 淇濆瓨鍘熷杈撳嚭
    const rawPath = path.join(WORKSPACE, 'memory', `.skill-raw-${keyword}-${TODAY}.txt`);
    fs.writeFileSync(rawPath, result);
    
    // 绠€鍗曠粺璁★細鍖呭惈 skills@ 鐨勮鏁?    const matches = result.match(/skills@/g);
    const count = matches ? matches.length : 0;
    
    if (count > 0) {
      log(`    Found ~${count} skills`);
      report.discovered.push({ keyword, count, rawFile: rawPath });
    } else {
      log(`    No skills found`);
    }
  } catch (e) {
    log(`    Error: ${e.message}`);
    report.errors.push({ keyword, error: e.message });
  }
}

// 鐢熸垚鎶ュ憡
log('\n[2/2] Generating report...');
report.endTime = new Date().toISOString();

const reportContent = `# Skill Learning Report - ${TODAY}

## Summary
- **Date**: ${TODAY}
- **Keywords**: ${todayKeywords.join(', ')}
- **Skills Found**: ${report.discovered.reduce((a, d) => a + d.count, 0)}
- **Errors**: ${report.errors.length}

## Discoveries
${report.discovered.map(d => `- **${d.keyword}**: ~${d.count} skills ([raw](${d.rawFile}))`).join('\n') || 'None'}

## Errors
${report.errors.map(e => `- ${e.keyword}: ${e.error}`).join('\n') || 'None'}

## Raw Output Files
${report.discovered.map(d => `- \`memory/.skill-raw-${d.keyword}-${TODAY}.txt\``).join('\n')}

---
*Generated at ${report.endTime}*
`;

const reportDir = path.join(WORKSPACE, 'daily-skill-learning');
if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir, { recursive: true });

const reportPath = path.join(reportDir, `${TODAY}.md`);
fs.writeFileSync(reportPath, reportContent);
log(`Report saved: ${reportPath}`);

// 鏇存柊浠诲姟鐘舵€?const taskPath = path.join(WORKSPACE, 'tasks', 'daily-skill-learning.md');
if (fs.existsSync(taskPath)) {
  fs.appendFileSync(taskPath, `

## [鎵ц璁板綍] ${TODAY}
- **鐘舵€?*: ${report.errors.length === 0 ? '鉁?鎴愬姛' : '鈿狅笍 閮ㄥ垎澶辫触'}
- **鍙戠幇**: ${report.discovered.length} 涓叧閿瘝, ~${report.discovered.reduce((a, d) => a + d.count, 0)} 涓妧鑳?- **鎶ュ憡**: ${reportPath}
`);
}

log('\n=== Completed ===');
console.log(`\nSkills: ~${report.discovered.reduce((a, d) => a + d.count, 0)} | Errors: ${report.errors.length}`);
process.exit(report.errors.length > 0 ? 1 : 0);


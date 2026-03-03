#!/usr/bin/env node
/**
 * Self-Check & Auto-Fix System
 * 鑷涓庤嚜鍔ㄤ慨澶嶇郴缁? * 鎵ц棰戠巼: 姣忔瀵硅瘽鍚?+ 姣忔棩03:00
 * 鐩爣: 纭繚鏋舵瀯瀹屾暣锛岃嚜鍔ㄤ慨澶嶉棶棰? */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const WORKSPACE = '~/.openclaw/workspace';
const LOG_FILE = path.join(WORKSPACE, 'memory', '.self-check-log.txt');

// 鏃ュ織鍑芥暟
function log(message) {
  const timestamp = new Date().toISOString();
  const line = `[${timestamp}] ${message}`;
  console.log(line);
  fs.appendFileSync(LOG_FILE, line + '\n');
}

// 妫€鏌ョ粨鏋滃璞?const checkResult = {
  timestamp: new Date().toISOString(),
  checks: [],
  fixes: [],
  errors: []
};

// 1. 妫€鏌ユ牳蹇冩枃浠?function checkCoreFiles() {
  log('[CHECK] 鏍稿績鏂囦欢妫€鏌?..');
  
  const requiredFiles = [
    'SOUL.md',
    'AGENTS.md',
    'CORE_ARCHITECTURE.md',
    'TOOLS.md',
    'HEARTBEAT.md',
    'EVOLUTION_CONTROLLER.md',
    'IDENTITY.md',
    'USER.md',
    'memory/MEMORY.md'
  ];
  
  let allExist = true;
  requiredFiles.forEach(file => {
    const filePath = path.join(WORKSPACE, file);
    if (!fs.existsSync(filePath)) {
      log(`  鉂?缂哄け: ${file}`);
      checkResult.errors.push({ type: 'missing_core', file });
      allExist = false;
    } else if (fs.statSync(filePath).size === 0) {
      log(`  鉂?绌烘枃浠? ${file}`);
      checkResult.errors.push({ type: 'empty_core', file });
      allExist = false;
    } else {
      log(`  鉁?${file}`);
    }
  });
  
  checkResult.checks.push({ name: 'core_files', status: allExist ? 'ok' : 'failed' });
  return allExist;
}

// 2. 妫€鏌ュ叧閿剼鏈?function checkScripts() {
  log('[CHECK] 鍏抽敭鑴氭湰妫€鏌?..');
  
  const requiredScripts = [
    'scripts/daily-skill-learning.js',
    'scripts/self-evolution.js',
    'scripts/daily-reflexion.ps1',
    'scripts/auto-evolve.ps1',
    'scripts/run-skill-learning.ps1',
    'scripts/run-self-evolution.ps1',
    'scripts/autosave.js'
  ];
  
  let allExist = true;
  requiredScripts.forEach(script => {
    const scriptPath = path.join(WORKSPACE, script);
    if (!fs.existsSync(scriptPath)) {
      log(`  鉂?缂哄け: ${script}`);
      checkResult.errors.push({ type: 'missing_script', file: script });
      allExist = false;
    } else {
      log(`  鉁?${script}`);
    }
  });
  
  checkResult.checks.push({ name: 'scripts', status: allExist ? 'ok' : 'failed' });
  return allExist;
}

// 3. 妫€鏌ョ洰褰曠粨鏋?function checkDirectories() {
  log('[CHECK] 鐩綍缁撴瀯妫€鏌?..');
  
  const requiredDirs = [
    'memory',
    'memory/concepts',
    'memory/projects',
    'memory/archive',
    'evolution',
    'evolution/daily-reports',
    'evolution/knowledge-graph',
    'scripts',
    'tasks',
    'daily-skill-learning'
  ];
  
  let allExist = true;
  requiredDirs.forEach(dir => {
    const dirPath = path.join(WORKSPACE, dir);
    if (!fs.existsSync(dirPath)) {
      log(`  鉂?缂哄け: ${dir}/`);
      checkResult.errors.push({ type: 'missing_dir', dir });
      allExist = false;
    } else {
      log(`  鉁?${dir}/`);
    }
  });
  
  checkResult.checks.push({ name: 'directories', status: allExist ? 'ok' : 'failed' });
  return allExist;
}

// 4. 妫€鏌OUL.md鍐呭
function checkSOULContent() {
  log('[CHECK] SOUL.md 鍐呭妫€鏌?..');
  
  const soulPath = path.join(WORKSPACE, 'SOUL.md');
  if (!fs.existsSync(soulPath)) {
    checkResult.errors.push({ type: 'missing_soul' });
    return false;
  }
  
  const content = fs.readFileSync(soulPath, 'utf8');
  const required = [
    { pattern: '鐪熸鐨勬墽琛岋紝鑰屼笉鏄彧缁欏洖澶?, name: '鏍稿績瑙勭煩#1' },
    { pattern: '鍏堟悳绱紝鍐嶅姩鎵?, name: '鏍稿績瑙勭煩#2' },
    { pattern: '榫欏ご鑰佸ぇ', name: '韬唤瀹氫箟' },
    { pattern: '浜旀宸ヤ綔娴?, name: '宸ヤ綔娴佸畾涔? }
  ];
  
  let allOk = true;
  required.forEach(req => {
    if (content.includes(req.pattern)) {
      log(`  鉁?${req.name}`);
    } else {
      log(`  鉂?缂哄け: ${req.name}`);
      checkResult.errors.push({ type: 'missing_content', file: 'SOUL.md', content: req.name });
      allOk = false;
    }
  });
  
  checkResult.checks.push({ name: 'soul_content', status: allOk ? 'ok' : 'failed' });
  return allOk;
}

// 5. 妫€鏌GENTS.md鍐呭
function checkAGENTSContent() {
  log('[CHECK] AGENTS.md 鍐呭妫€鏌?..');
  
  const agentsPath = path.join(WORKSPACE, 'AGENTS.md');
  if (!fs.existsSync(agentsPath)) {
    checkResult.errors.push({ type: 'missing_agents' });
    return false;
  }
  
  const content = fs.readFileSync(agentsPath, 'utf8');
  const requiredAgents = ['main', 'coder', 'writer', 'researcher'];
  
  let allOk = true;
  requiredAgents.forEach(agent => {
    if (content.includes(agent)) {
      log(`  鉁?Agent: ${agent}`);
    } else {
      log(`  鉂?缂哄け Agent: ${agent}`);
      checkResult.errors.push({ type: 'missing_agent', agent });
      allOk = false;
    }
  });
  
  checkResult.checks.push({ name: 'agents_content', status: allOk ? 'ok' : 'failed' });
  return allOk;
}

// 6. 妫€鏌ュ畾鏃朵换鍔?function checkScheduledTasks() {
  log('[CHECK] 瀹氭椂浠诲姟妫€鏌?..');
  
  try {
    const result = execSync('schtasks /Query /TN "OpenClaw-DailySkillLearning" 2>&1', { encoding: 'utf8' });
    if (result.includes('OpenClaw-DailySkillLearning')) {
      log('  鉁?Windows瀹氭椂浠诲姟宸查厤缃?);
      checkResult.checks.push({ name: 'scheduled_tasks', status: 'ok' });
      return true;
    }
  } catch (e) {
    log('  鉂?Windows瀹氭椂浠诲姟妫€鏌ュけ璐?);
    checkResult.errors.push({ type: 'scheduled_tasks_error', error: e.message });
    checkResult.checks.push({ name: 'scheduled_tasks', status: 'failed' });
    return false;
  }
}

// 7. 鑷姩淇鍑芥暟
function autoFix() {
  log('[FIX] 寮€濮嬭嚜鍔ㄤ慨澶?..');
  
  // 淇1: 鍒涘缓缂哄け鐨勭洰褰?  const requiredDirs = [
    'memory/archive',
    'evolution/daily-reports',
    'evolution/knowledge-graph',
    'tasks',
    'daily-skill-learning'
  ];
  
  requiredDirs.forEach(dir => {
    const dirPath = path.join(WORKSPACE, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      log(`  鉁?鍒涘缓鐩綍: ${dir}/`);
      checkResult.fixes.push({ type: 'create_dir', dir });
    }
  });
  
  // 淇2: 鍒涘缓浠婃棩璁板繂鏂囦欢
  const today = new Date().toISOString().split('T')[0];
  const todayMemoryPath = path.join(WORKSPACE, 'memory', `${today}.md`);
  if (!fs.existsSync(todayMemoryPath)) {
    const header = `# 璁板繂澶囦唤 - ${today}\n\n> 鑷姩鐢熸垚\n\n---\n\n`;
    fs.writeFileSync(todayMemoryPath, header);
    log(`  鉁?鍒涘缓璁板繂鏂囦欢: memory/${today}.md`);
    checkResult.fixes.push({ type: 'create_memory', file: `memory/${today}.md` });
  }
  
  log('[FIX] 鑷姩淇瀹屾垚');
}

// 8. 鏇存柊SOUL.md鐨勮嚜鎴戞鏌ヨ褰?function updateSOUL() {
  const soulPath = path.join(WORKSPACE, 'SOUL.md');
  if (!fs.existsSync(soulPath)) return;
  
  let content = fs.readFileSync(soulPath, 'utf8');
  
  // 妫€鏌ユ槸鍚﹀凡鏈夎嚜鎴戞鏌ヨ褰曢儴鍒?  if (!content.includes('## 馃攳 鑷垜妫€鏌ヨ褰?)) {
    content += `\n\n---\n\n## 馃攳 鑷垜妫€鏌ヨ褰昞n\n`;
  }
  
  // 娣诲姞鏈妫€鏌ヨ褰?  const checkRecord = `\n### ${new Date().toLocaleDateString('zh-CN')} ${new Date().toLocaleTimeString('zh-CN')}\n- **鐘舵€?*: ${checkResult.errors.length === 0 ? '鉁?鍏ㄩ儴閫氳繃' : '鈿狅笍 鍙戠幇闂'}\n- **妫€鏌ラ」**: ${checkResult.checks.length}\n- **淇椤?*: ${checkResult.fixes.length}\n- **閿欒**: ${checkResult.errors.length}\n`;
  
  // 鍦ㄨ嚜鎴戞鏌ヨ褰曢儴鍒嗚拷鍔?  const insertIndex = content.indexOf('## 馃攳 鑷垜妫€鏌ヨ褰?) + '## 馃攳 鑷垜妫€鏌ヨ褰?.length;
  content = content.slice(0, insertIndex) + checkRecord + content.slice(insertIndex);
  
  fs.writeFileSync(soulPath, content);
  log('  鉁?宸叉洿鏂?SOUL.md 妫€鏌ヨ褰?);
}

// 涓诲嚱鏁?function main() {
  log('=== 鑷涓庤嚜鍔ㄤ慨澶嶇郴缁熷惎鍔?===');
  
  // 鎵ц妫€鏌?  const check1 = checkCoreFiles();
  const check2 = checkScripts();
  const check3 = checkDirectories();
  const check4 = checkSOULContent();
  const check5 = checkAGENTSContent();
  const check6 = checkScheduledTasks();
  
  // 濡傛灉鏈夐棶棰橈紝鎵ц鑷姩淇
  if (!check1 || !check2 || !check3 || !check4 || !check5) {
    autoFix();
  }
  
  // 鏇存柊SOUL.md
  updateSOUL();
  
  // 鐢熸垚鎶ュ憡
  const reportPath = path.join(WORKSPACE, 'memory', '.self-check-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(checkResult, null, 2));
  
  log('=== 鑷瀹屾垚 ===');
  log(`妫€鏌ラ」: ${checkResult.checks.length}, 淇: ${checkResult.fixes.length}, 閿欒: ${checkResult.errors.length}`);
  
  // 杈撳嚭鎽樿
  console.log('\n--- 妫€鏌ユ憳瑕?---');
  console.log(`鐘舵€? ${checkResult.errors.length === 0 ? '鉁?鍏ㄩ儴閫氳繃' : '鈿狅笍 鍙戠幇闂'}`);
  console.log(`鎶ュ憡: ${reportPath}`);
  
  process.exit(checkResult.errors.length > 0 ? 1 : 0);
}

// 鎵ц
main();


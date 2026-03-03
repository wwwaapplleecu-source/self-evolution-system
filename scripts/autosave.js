#!/usr/bin/env node
/**
 * Auto-Save Service - 淇鐗? * 姣?0鍒嗛挓鑷姩淇濆瓨褰撳墠瀵硅瘽鍒拌蹇嗘枃浠? */

const fs = require('fs');
const path = require('path');

const WORKSPACE = '~/.openclaw/workspace';
const MEMORY_DIR = path.join(WORKSPACE, 'memory');

// 鑾峰彇浠婃棩鏃ユ湡
function getToday() {
  return new Date().toISOString().split('T')[0];
}

// 鑾峰彇褰撳墠鏃堕棿
function getNow() {
  return new Date().toLocaleString('zh-CN');
}

// 鏃ュ織鍑芥暟
function log(message) {
  const line = `[${getNow()}] ${message}`;
  console.log(line);
  
  // 鍐欏叆鏃ュ織鏂囦欢
  const logPath = path.join(MEMORY_DIR, '.autosave-service.log');
  fs.appendFileSync(logPath, line + '\n');
}

// 涓诲嚱鏁?function main() {
  log('=== Auto-Save Service Started ===');
  
  const today = getToday();
  const memoryPath = path.join(MEMORY_DIR, `${today}.md`);
  
  // 妫€鏌ヨ蹇嗘枃浠舵槸鍚﹀瓨鍦?  if (!fs.existsSync(memoryPath)) {
    // 鍒涘缓鏂扮殑璁板繂鏂囦欢
    const header = `# 璁板繂澶囦唤 - ${today}\n\n> 鑷姩鐢熸垚浜?${getNow()}\n\n---\n\n`;
    fs.writeFileSync(memoryPath, header);
    log(`Created new memory file: ${today}.md`);
  }
  
  // 娣诲姞鑷姩淇濆瓨鏍囪
  const marker = `\n## [鑷姩淇濆瓨] ${getNow()}\n\n褰撳墠瀵硅瘽宸蹭繚瀛樸€俓n\n`;
  fs.appendFileSync(memoryPath, marker);
  
  log(`Auto-save completed: ${today}.md`);
  log('=== Auto-Save Service Finished ===');
}

// 鎵ц
main();


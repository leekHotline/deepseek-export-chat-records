const fs = require('fs');
const path = require('path');

const header = `// ==UserScript==
// @name         DeepSeek 聊天记录导出工具
// @namespace    https://github.com/leekHotline/deepseek-export-chat-records
// @version      1.0.0
// @description  导出 DeepSeek 聊天记录为 JSON/TXT
// @author       leekHotline
// @match        https://chat.deepseek.com/*
// @grant        none
// @license      MIT
// @run-at       document-idle
// @updateURL    https://raw.githubusercontent.com/leekHotline/deepseek-export-chat-records/main/dist/deepseek-export-chat-records.user.js
// @downloadURL  https://raw.githubusercontent.com/leekHotline/deepseek-export-chat-records/main/dist/deepseek-export-chat-records.user.js
// @supportURL   https://github.com/leekHotline/deepseek-export-chat-records/issues
// ==/UserScript==

(function() {
  'use strict';

`;

const footer = `
})();
`;

const files = ['config.js', 'core.js', 'ui.js'];
const srcDir = path.join(__dirname, 'src');
const distDir = path.join(__dirname, 'dist');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

let content = header;
files.forEach(file => {
  const code = fs.readFileSync(path.join(srcDir, file), 'utf-8');
  content += `  // ===== ${file} =====\n`;
  content += code.split('\n').map(l => '  ' + l).join('\n');
  content += '\n\n';
});
content += footer;

fs.writeFileSync(path.join(distDir, 'deepseek-export-chat-records.user.js'), content);
console.log('✅ Build complete: dist/deepseek-export-chat-records.user.js');
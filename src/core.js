const Core = {
  extractChats() {
    const messages = [];
    const wrappers = document.querySelectorAll(CONFIG.selectors.messageWrapper);
    
    wrappers.forEach((wrapper, index) => {
      const userEl = wrapper.querySelector(CONFIG.selectors.userPrompt);
      const aiEl = wrapper.querySelector(CONFIG.selectors.aiResponse);
      
      if (userEl) {
        messages.push({ role: 'user', content: userEl.innerText.trim(), index });
      }
      if (aiEl) {
        messages.push({ role: 'assistant', content: aiEl.innerText.trim(), index });
      }
    });
    
    // 备用方案：直接抓取所有消息
    if (messages.length === 0) {
      document.querySelectorAll(CONFIG.selectors.userPrompt).forEach(el => {
        messages.push({ role: 'user', content: el.innerText.trim() });
      });
      document.querySelectorAll(CONFIG.selectors.aiResponse).forEach(el => {
        messages.push({ role: 'assistant', content: el.innerText.trim() });
      });
    }
    
    return messages;
  },

  exportAsJSON(messages) {
    const data = {
      exportedAt: new Date().toISOString(),
      source: 'DeepSeek',
      messages
    };
    this.download(JSON.stringify(data, null, 2), 'deepseek-chat.json', 'application/json');
  },

  exportAsTXT(messages) {
    const text = messages.map(m => 
      `【${m.role === 'user' ? '用户' : 'AI'}】\n${m.content}\n`
    ).join('\n' + '─'.repeat(40) + '\n\n');
    this.download(text, 'deepseek-chat.txt', 'text/plain');
  },

  download(content, filename, type) {
    const blob = new Blob([content], { type: `${type};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
};
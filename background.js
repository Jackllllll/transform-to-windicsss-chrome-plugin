// 监听复制事件
document.addEventListener('copy', (e) => {
    console.log('Copy event detected');
    handleClipboardEvent();
});

// 处理复制面板事件
async function handleClipboardEvent() {
    try {
        // 读取复制的文本
        const text = await navigator.clipboard.readText();
        console.log('Copied text:', text);

        // 处理复制的文本（例如，将其发送到服务器或存储在插件的本地存储中）
        // yourCustomFunction(text);
    } catch (err) {
        console.error('Failed to read clipboard contents:', err);
    }
}
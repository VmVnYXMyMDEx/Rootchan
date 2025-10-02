// Максимально простой скрипт - превращает кнопки в ссылки
document.addEventListener('DOMContentLoaded', function() {
    // Находим все кнопки ответа
    const replyButtons = document.querySelectorAll('.reply-btn');
    
    replyButtons.forEach(button => {
        // Находим ID треда
        const threadElement = button.closest('[data-thread-id]');
        if (!threadElement) return;
        
        const threadId = threadElement.getAttribute('data-thread-id');
        if (!threadId) return;
        
        // Заменяем кнопку на ссылку
        const link = document.createElement('a');
        link.href = `../submit-reply.html?thread=#${threadId}`;
        link.className = 'reply-btn';
        link.textContent = 'Ответить';
        link.style.display = 'inline-block';
        link.style.textDecoration = 'none';
        link.style.color = 'inherit';
        
        button.parentNode.replaceChild(link, button);
    });
    
    console.log('Converted reply buttons to links');
});

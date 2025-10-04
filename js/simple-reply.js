// Простой скрипт - переход на страницу ответа
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('reply-btn')) {
            // Находим ID треда
            const thread = e.target.closest('.thread, .reply');
            const threadId = thread?.textContent.match(/ID: (#\d+)/)?.[1] || '#unknown';
            
            // Переходим на страницу ответа
            window.location.href = `quick-reply.html?thread=${threadId}`;
        }
    });
});

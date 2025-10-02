// Простой скрипт для ответов
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('reply-btn')) {
            const thread = e.target.closest('.thread, .reply');
            
            // Находим ID (ищем текст с #)
            const metaText = thread.querySelector('small')?.textContent || '';
            const idMatch = metaText.match(/#(\d+)/);
            const threadId = idMatch ? idMatch[0] : '#unknown';
            
            // Спросить у пользователя текст ответа
            const replyText = prompt('Введите ваш ответ:');
            if (replyText && replyText.trim() !== '') {
                // Открываем страницу ответа
                window.location.href = `../submit-reply.html?thread=${threadId}&text=${encodeURIComponent(replyText)}`;
            }
        }
    });
});

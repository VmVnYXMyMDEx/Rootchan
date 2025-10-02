// Простой скрипт для ответов
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('reply-btn')) {
            const thread = e.target.closest('.thread, .reply');
            const threadId = thread.querySelector('small')?.textContent || 'unknown';
            
            // Спросить у пользователя текст ответа
            const replyText = prompt('Введите ваш ответ:');
            if (replyText && replyText.trim() !== '') {
                // Открыть страницу ответа с предзаполненными данными
                window.location.href = `../submit-reply.html?thread=${threadId}&text=${encodeURIComponent(replyText)}`;
            }
        }
    });
});

// Самый простой - автоматически определяет ID
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('reply-btn')) {
            // Автоматически находим ID треда
            const thread = e.target.closest('.thread, .reply');
            let threadId = '#unknown';
            
            if (thread) {
                // Ищем ID в тексте
                const idMatch = thread.textContent.match(/ID: (#\d+)/);
                if (idMatch) {
                    threadId = idMatch[1];
                }
            }
            
            // Один prompt только для текста
            const replyText = prompt(`Ответ на тред ${threadId}\n\nВведите ваш текст ответа:`);
            
            if (replyText && replyText.trim() !== '') {
                // Переходим на страницу ответа
                window.location.href = `../submit-reply.html?thread=${threadId}&text=${encodeURIComponent(replyText)}`;
            }
        }
    });
});

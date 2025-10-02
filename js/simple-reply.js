// Упрощенный скрипт с data-атрибутами
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('reply-btn')) {
            const thread = e.target.closest('.thread, .reply');
            const threadId = thread.getAttribute('data-thread-id') || 'unknown';
            
            const replyText = prompt('Введите ваш ответ:');
            if (replyText && replyText.trim() !== '') {
                window.location.href = `../submit-reply.html?thread=#${threadId}&text=${encodeURIComponent(replyText)}`;
            }
        }
    });
});

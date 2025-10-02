// Простой скрипт для ответов - ФИНАЛЬНАЯ ВЕРСИЯ
document.addEventListener('DOMContentLoaded', function() {
    console.log('Reply system loaded');
    
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('reply-btn')) {
            console.log('Reply button clicked');
            
            // Находим ближайший тред или ответ
            const thread = e.target.closest('.thread, .reply');
            
            if (!thread) {
                console.log('Thread not found');
                return;
            }
            
            // Ищем data-thread-id
            const threadId = thread.getAttribute('data-thread-id');
            console.log('Thread ID from attribute:', threadId);
            
            if (!threadId) {
                alert('Ошибка: ID треда не найден');
                return;
            }
            
            // Спрашиваем текст ответа
            const replyText = prompt('Введите ваш ответ:');
            
            if (replyText && replyText.trim() !== '') {
                // Переходим на страницу ответа
                const url = `../submit-reply.html?thread=#${threadId}&text=${encodeURIComponent(replyText)}`;
                console.log('Redirecting to:', url);
                window.location.href = url;
            }
        }
    });
});

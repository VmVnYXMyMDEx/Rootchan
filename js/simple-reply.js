// Исправленный скрипт для ответов
document.addEventListener('DOMContentLoaded', function() {
    console.log('Reply system loaded');
    
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('reply-btn')) {
            console.log('Reply button clicked');
            
            // Находим ближайший тред или ответ
            const thread = e.target.closest('[data-thread-id]');
            
            if (!thread) {
                alert('Ошибка: не найден тред для ответа');
                return;
            }
            
            // Берем ID из data-атрибута
            const threadId = thread.getAttribute('data-thread-id');
            console.log('Thread ID from attribute:', threadId);
            
            if (!threadId) {
                alert('Ошибка: ID треда не найден в data-атрибуте');
                return;
            }
            
            // Спрашиваем текст ответа
            const replyText = prompt('Введите ваш ответ:');
            
            if (replyText && replyText.trim() !== '') {
                // Формируем URL с параметрами
                const url = `../submit-reply.html?thread=#${threadId}&text=${encodeURIComponent(replyText)}`;
                console.log('Redirecting to URL:', url);
                
                // Переходим на страницу ответа
                window.location.href = url;
            }
        }
    });
});

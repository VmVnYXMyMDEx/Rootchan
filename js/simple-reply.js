// Максимально простой скрипт для ответов
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('reply-btn')) {
            // Находим ближайший тред или ответ
            const thread = e.target.closest('[data-thread-id]');
            
            if (!thread) {
                alert('Ошибка: не найден ID треда');
                return;
            }
            
            // Берем ID из data-атрибута
            const threadId = thread.getAttribute('data-thread-id');
            console.log('Thread ID:', threadId); // Для проверки
            
            // Спрашиваем текст ответа
            const replyText = prompt('Введите ваш ответ:');
            
            if (replyText && replyText.trim() !== '') {
                // Переходим на страницу ответа
                window.location.href = `../submit-reply.html?thread=#${threadId}&text=${encodeURIComponent(replyText)}`;
            }
        }
    });
});

// Финальная версия - использует Local Storage
document.addEventListener('DOMContentLoaded', function() {
    console.log('Reply system loaded');
    
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('reply-btn')) {
            // Находим ближайший тред или ответ
            const thread = e.target.closest('[data-thread-id]');
            
            if (!thread) {
                alert('Ошибка: не найден тред для ответа');
                return;
            }
            
            // Берем ID из data-атрибута
            const threadId = thread.getAttribute('data-thread-id');
            
            if (!threadId) {
                alert('Ошибка: ID треда не найден');
                return;
            }
            
            // Спрашиваем текст ответа
            const replyText = prompt('Введите ваш ответ:');
            
            if (replyText && replyText.trim() !== '') {
                // Сохраняем в Local Storage
                localStorage.setItem('rootchan_thread_id', `#${threadId}`);
                localStorage.setItem('rootchan_reply_text', replyText);
                
                console.log('Saved to localStorage:', {
                    threadId: `#${threadId}`,
                    replyText: replyText
                });
                
                // Переходим на страницу ответа
                window.location.href = '../submit-reply.html';
            }
        }
    });
});

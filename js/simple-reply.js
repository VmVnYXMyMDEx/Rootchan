// Исправленный скрипт для ответов
document.addEventListener('DOMContentLoaded', function() {
    console.log('Reply system loaded');
    
    // Вешаем обработчики на все кнопки
    const replyButtons = document.querySelectorAll('.reply-btn');
    replyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Reply button clicked');
            
            // Находим ID треда
            const thread = this.closest('.thread, .reply');
            const threadId = thread?.textContent.match(/ID: (#\d+)/)?.[1] || '#unknown';
            
            console.log('Thread ID found:', threadId);
            
            // Переходим на страницу ответа
            window.location.href = `quick-reply.html?thread=${threadId}`;
        });
    });
    
    console.log('Обработчики установлены на', replyButtons.length, 'кнопок');
});

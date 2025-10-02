// Супер-простой отладочный скрипт
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== REPLY SYSTEM STARTED ===');
    
    // Проверяем все кнопки
    const buttons = document.querySelectorAll('.reply-btn');
    console.log('Found buttons:', buttons.length);
    
    buttons.forEach((btn, i) => {
        const thread = btn.closest('[data-thread-id]');
        const threadId = thread ? thread.getAttribute('data-thread-id') : 'NOT_FOUND';
        console.log(`Button ${i}:`, { threadId, thread });
    });
    
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('reply-btn')) {
            console.log('=== BUTTON CLICKED ===');
            
            const thread = e.target.closest('[data-thread-id]');
            console.log('Found thread element:', thread);
            
            if (!thread) {
                console.log('ERROR: No thread found');
                alert('Ошибка: тред не найден');
                return;
            }
            
            const threadId = thread.getAttribute('data-thread-id');
            console.log('Thread ID:', threadId);
            
            if (!threadId) {
                console.log('ERROR: No data-thread-id attribute');
                alert('Ошибка: атрибут data-thread-id не найден');
                return;
            }
            
            const replyText = prompt('Введите ваш ответ:');
            console.log('User entered:', replyText);
            
            if (replyText) {
                const url = `../submit-reply.html?thread=#${threadId}&text=${encodeURIComponent(replyText)}`;
                console.log('Navigating to:', url);
                
                // Показываем подтверждение
                const confirm = window.confirm(`Перейти к отправке ответа на тред #${threadId}?`);
                if (confirm) {
                    window.location.href = url;
                }
            }
        }
    });
});

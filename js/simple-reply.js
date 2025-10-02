// Простой скрипт для ответов
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('reply-btn')) {
            const thread = e.target.closest('.thread, .reply');
            
            // Ищем ID разными способами
            let threadId = '#unknown';
            
            // Способ 1: Ищем текст с # в small тегах
            const smallElements = thread.querySelectorAll('small');
            for (let small of smallElements) {
                const idMatch = small.textContent.match(/#(\d+)/);
                if (idMatch) {
                    threadId = idMatch[0];
                    break;
                }
            }
            
            // Способ 2: Если не нашли, пробуем найти в любом тексте
            if (threadId === '#unknown') {
                const text = thread.textContent;
                const idMatch = text.match(/#(\d+)/);
                if (idMatch) {
                    threadId = idMatch[0];
                }
            }
            
            console.log('Found thread ID:', threadId); // Для отладки
            
            // Спросить у пользователя текст ответа
            const replyText = prompt('Введите ваш ответ:');
            if (replyText && replyText.trim() !== '') {
                // Открываем страницу ответа
                window.location.href = `../submit-reply.html?thread=${threadId}&text=${encodeURIComponent(replyText)}`;
            }
        }
    });
});

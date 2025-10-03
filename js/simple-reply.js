// Простой скрипт - пользователь вводит ID вручную
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('reply-btn')) {
            // Спрашиваем ID треда
            const threadId = prompt('Введите ID треда (например: #1, #2):', '#');
            
            if (threadId && threadId.trim() !== '' && threadId !== '#') {
                // Спрашиваем текст ответа
                const replyText = prompt('Введите ваш ответ:');
                
                if (replyText && replyText.trim() !== '') {
                    // Переходим на страницу ответа
                    window.location.href = `../submit-reply.html?thread=${encodeURIComponent(threadId)}&text=${encodeURIComponent(replyText)}`;
                }
            } else if (threadId && threadId !== '#') {
                alert('Пожалуйста, введите корректный ID (например: #1)');
            }
        }
    });
});

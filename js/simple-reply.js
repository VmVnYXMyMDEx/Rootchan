// Простая форма ответа с реальной отправкой
document.addEventListener('DOMContentLoaded', function() {
    console.log('Reply system loaded');
    
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('reply-btn')) {
            console.log('Reply button clicked');
            
            const thread = e.target.closest('.thread, .reply');
            const threadId = thread?.textContent.match(/ID: (#\d+)/)?.[1] || '#unknown';
            
            // Удаляем существующую форму если есть
            const existingForm = document.querySelector('.quick-reply-form');
            if (existingForm) {
                existingForm.remove();
            }
            
            // Создаем форму
            const form = document.createElement('div');
            form.className = 'quick-reply-form';
            form.innerHTML = `
                <div style="margin: 15px 0; padding: 15px; background: #111; border: 1px solid #00ff00; border-radius: 3px;">
                    <h4 style="margin: 0 0 10px 0; color: #00ff00;">📝 Ответ на тред ${threadId}</h4>
                    <textarea placeholder="Введите ваш ответ..." rows="4" style="width: 100%; background: #0d0d0d; color: #ccc; border: 1px solid #333; padding: 10px; font-family: 'Courier New', monospace; resize: vertical;"></textarea>
                    
                    <div style="margin-top: 10px;">
                        <label style="color: #ccc; font-size: 12px;">Пароль (для удаления):</label>
                        <input type="password" placeholder="Опционально" style="width: 100%; background: #0d0d0d; color: #ccc; border: 1px solid #333; padding: 5px; margin-top: 5px; font-family: 'Courier New', monospace;">
                    </div>
                    
                    <div style="margin-top: 10px; display: flex; gap: 10px;">
                        <button type="button" class="send-reply" style="background: #333; color: #ccc; border: 1px solid #00ff00; padding: 8px 16px; cursor: pointer; font-family: 'Courier New', monospace;">📨 Отправить</button>
                        <button type="button" class="cancel-reply" style="background: #333; color: #ccc; border: 1px solid #ff4444; padding: 8px 16px; cursor: pointer; font-family: 'Courier New', monospace;">❌ Отмена</button>
                    </div>
                </div>
            `;
            
            // Вставляем форму после элемента
            thread.appendChild(form);
            
            // Фокус на текстовое поле
            form.querySelector('textarea').focus();
            
            // Обработка отправки
            form.querySelector('.send-reply').addEventListener('click', function() {
                const text = form.querySelector('textarea').value.trim();
                const password = form.querySelector('input[type="password"]').value;
                
                if (text) {
                    console.log('Отправка ответа:', { threadId, text, password });
                    
                    // СОЗДАЕМ НЕВИДИМУЮ ФОРМУ ДЛЯ ОТПРАВКИ
                    const hiddenForm = document.createElement('form');
                    hiddenForm.method = 'POST';
                    hiddenForm.action = 'https://formsubmit.co/ТВОЙ_EMAIL@gmail.com'; // ← ЗАМЕНИ НА СВОЙ
                    hiddenForm.style.display = 'none';
                    
                    // Добавляем поля
                    const fields = [
                        { name: '_subject', value: `ОТВЕТ на тред ${threadId}` },
                        { name: '_next', value: `${window.location.origin}${window.location.pathname}?sent=true` },
                        { name: 'thread_id', value: threadId },
                        { name: 'reply_text', value: text },
                        { name: 'password', value: password },
                        { name: 'source', value: 'quick_reply' }
                    ];
                    
                    fields.forEach(field => {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = field.name;
                        input.value = field.value;
                        hiddenForm.appendChild(input);
                    });
                    
                    // Добавляем форму на страницу и отправляем
                    document.body.appendChild(hiddenForm);
                    hiddenForm.submit();
                    
                    // Показываем сообщение
                    alert(`✅ Ответ на тред ${threadId} отправлен на модерацию!`);
                    form.remove();
                    
                } else {
                    alert('Введите текст ответа');
                }
            });
            
            // Обработка отмены
            form.querySelector('.cancel-reply').addEventListener('click', function() {
                form.remove();
            });
        }
    });
});

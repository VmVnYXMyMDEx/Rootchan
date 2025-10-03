// Форма ответа прямо в тредах
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('reply-btn')) {
            e.preventDefault(); // Останавливаем переход по умолчанию
            e.stopPropagation(); // Останавливаем всплытие
            
            const thread = e.target.closest('.thread, .reply');
            const threadId = thread?.textContent.match(/ID: (#\d+)/)?.[1] || '#unknown';
            
            // Удаляем существующую форму если есть
            const existingForm = thread.querySelector('.quick-reply-form');
            if (existingForm) {
                existingForm.remove();
                return;
            }
            
            // Создаем форму прямо под кнопкой
            const form = document.createElement('div');
            form.className = 'quick-reply-form';
            form.innerHTML = `
                <form style="margin-top: 10px; padding: 10px; background: #111; border: 1px solid #00ff00; border-radius: 3px;">
                    <textarea placeholder="Введите ваш ответ..." rows="3" style="width: 100%; background: #0d0d0d; color: #ccc; border: 1px solid #333; padding: 8px; font-family: 'Courier New', monospace; resize: vertical;"></textarea>
                    <div style="margin-top: 8px; display: flex; gap: 8px;">
                        <button type="submit" style="background: #333; color: #ccc; border: 1px solid #00ff00; padding: 6px 12px; cursor: pointer; font-family: 'Courier New', monospace;">📨 Отправить</button>
                        <button type="button" class="cancel-reply" style="background: #333; color: #ccc; border: 1px solid #ff4444; padding: 6px 12px; cursor: pointer; font-family: 'Courier New', monospace;">❌ Отмена</button>
                    </div>
                </form>
            `;
            
            // Вставляем форму после кнопки
            const buttonContainer = e.target.parentElement;
            buttonContainer.appendChild(form);
            
            // Фокус на текстовое поле
            form.querySelector('textarea').focus();
            
            // Обработка отправки
            form.querySelector('form').addEventListener('submit', function(formEvent) {
                formEvent.preventDefault();
                const text = this.querySelector('textarea').value.trim();
                
                if (text) {
                    console.log('Отправка ответа:', { threadId, text });
                    
                    // Создаем невидимую форму для отправки на FormSubmit
                    const submitForm = document.createElement('form');
                    submitForm.method = 'POST';
                    submitForm.action = 'https://formsubmit.co/ВАШ_EMAIL@gmail.com';
                    submitForm.style.display = 'none';
                    
                    submitForm.innerHTML = `
                        <input type="hidden" name="thread_id" value="${threadId}">
                        <input type="hidden" name="reply_text" value="${text}">
                        <input type="hidden" name="_subject" value="ОТВЕТ на тред ${threadId}">
                        <input type="hidden" name="_next" value="${window.location.origin}${window.location.pathname}?sent=true">
                    `;
                    
                    document.body.appendChild(submitForm);
                    submitForm.submit();
                    
                    // Показываем сообщение об успехе
                    alert('✅ Ответ отправлен на модерацию!');
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

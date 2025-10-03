// Скрипт показывает форму прямо под тредом
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('reply-btn')) {
            const thread = e.target.closest('.thread, .reply');
            const threadId = thread?.textContent.match(/ID: (#\d+)/)?.[1] || '#unknown';
            
            // Создаем форму прямо под кнопкой
            const form = document.createElement('div');
            form.innerHTML = `
                <form style="margin-top: 10px; padding: 10px; background: #111; border: 1px solid #00ff00;">
                    <textarea placeholder="Введите ответ..." rows="3" style="width: 100%; background: #0d0d0d; color: #ccc; border: 1px solid #333; padding: 5px;"></textarea>
                    <button type="submit" style="margin-top: 5px; background: #333; color: #ccc; border: 1px solid #00ff00; padding: 5px 10px;">Отправить</button>
                    <button type="button" onclick="this.parentElement.parentElement.remove()" style="margin-top: 5px; background: #333; color: #ccc; border: 1px solid #ff4444; padding: 5px 10px; margin-left: 5px;">Отмена</button>
                </form>
            `;
            
            e.target.after(form);
            
            // Обработка отправки
            form.querySelector('form').addEventListener('submit', function(e) {
                e.preventDefault();
                const text = this.querySelector('textarea').value;
                if (text.trim()) {
                    // Отправляем на FormSubmit
                    const submitForm = document.createElement('form');
                    submitForm.method = 'POST';
                    submitForm.action = 'https://formsubmit.co/ВАШ_EMAIL@gmail.com';
                    submitForm.innerHTML = `
                        <input type="hidden" name="thread_id" value="${threadId}">
                        <input type="hidden" name="reply_text" value="${text}">
                        <input type="hidden" name="_subject" value="ОТВЕТ на тред ${threadId}">
                    `;
                    document.body.appendChild(submitForm);
                    submitForm.submit();
                }
            });
        }
    });
});

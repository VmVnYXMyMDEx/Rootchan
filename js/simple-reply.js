form.querySelector('.send-reply').addEventListener('click', function() {
    const text = form.querySelector('textarea').value.trim();
    const password = form.querySelector('input[type="password"]').value;
    
    if (text) {
        console.log('=== ОТПРАВКА ОТВЕТА ===');
        console.log('Thread ID:', threadId);
        console.log('Text:', text);
        console.log('Password:', password);
        
        // Создаем форму
        const hiddenForm = document.createElement('form');
        hiddenForm.method = 'POST';
        hiddenForm.action = 'https://formsubmit.co/rootchanimageboard@gmail.com';
        hiddenForm.style.display = 'none';
        
        // Добавляем поля
        const fields = {
            '_subject': `ОТВЕТ на тред ${threadId}`,
            'thread_id': threadId,
            'reply_text': text,
            'password': password
        };
        
        console.log('Fields to send:', fields);
        
        for (const [name, value] of Object.entries(fields)) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = name;
            input.value = value;
            hiddenForm.appendChild(input);
        }
        
        // Добавляем и отправляем
        document.body.appendChild(hiddenForm);
        console.log('Form created, submitting...');
        hiddenForm.submit();
        console.log('Form submitted');
        
        alert('✅ Ответ отправлен!');
        form.remove();
        
    } else {
        alert('Введите текст ответа');
    }
});

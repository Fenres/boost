$(document).ready(function() {
    $('#registerForm').submit(function(e) {
        e.preventDefault();
        registerUser();
    });
});

function registerUser() {
    let name = $('#registerName').val();
    let phone = $('#registerPhone').val();
    let email = $('#registerEmail').val();
    let password = $('#registerPassword').val();
    let passwordConfirmation = $('#registerPasswordConfirmation').val();
    let confirm = $('#registerConfirm').is(':checked') ? 1 : 0;

    let errors = [];
    if (!/^[а-яА-Я\- ]+$/.test(name)) errors.push("Имя: только кириллица, пробелы и дефисы.");
    if (!/^\+[0-9]+$/.test(phone)) errors.push("Телефон: только цифры и знак +.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Email: неверный формат.");
    if (password.length < 7 || !/\d/.test(password) || !/[a-z]/.test(password) || !/[A-Z]/.test(password)) errors.push("Пароль: минимум 7 символов, 1 цифра, 1 строчная, 1 заглавная буква.");
    if (password !== passwordConfirmation) errors.push("Пароли не совпадают.");
    if (confirm === 0) errors.push("Необходимо согласие на обработку данных.");

    if (errors.length > 0) {
        displayErrors(errors, '#registerMessage');
    } else {
        $.ajax({
            url: '/api/register', // Your API endpoint
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ name, phone, email, password, password_confirmation: password, confirm }),
            success: function(data) {
                displayMessage('Регистрация прошла успешно!', '#registerMessage', 'success');
            },
            error: function(xhr) {
                let response = JSON.parse(xhr.responseText);
                displayErrors(Object.values(response.error.errors).flat(), '#registerMessage');
            }
        });
    }
}

function displayErrors(errors, elementId) {
    let errorMessage = '<div class="alert alert-danger">' + errors.join('<br>') + '</div>';
    $(elementId).html(errorMessage);
}

function displayMessage(message, elementId, type = 'success'){
    let messageClass = type === 'success' ? 'alert-success' : 'alert-danger';
    let messageDiv = `<div class="alert ${messageClass}">${message}</div>`;
    $(elementId).html(messageDiv);
}
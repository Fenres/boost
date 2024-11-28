$(document).ready(function() {
    $('#logoutButton').click(logout);
    checkAuthAndDisplayProfile();
});

function checkAuthAndDisplayProfile() {
    const token = localStorage.getItem('token'); // Check for token simulating login
    if (!token) {
        window.location.href = 'login.html'; // Redirect to login page if not logged in
        return;
    }

    // Sample user data (replace with actual data from your API if needed)
    const sampleUserData = {
        id: 1,
        name: "Иван Иванов",
        phone: "+79111234567",
        email: "ivan.ivanov@example.com",
        registrationDate: "2024-03-01", // YYYY-MM-DD format
        ordersCount: 4,
        petsCount: 2
    };

    displayProfile(sampleUserData);
}

function displayProfile(user) {
    const registrationDate = new Date(user.registrationDate);
    const today = new Date();
    const diffTime = Math.abs(today - registrationDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const profileHtml = `
        <h2>Информация о пользователе</h2>
        <p><strong>Имя:</strong> ${user.name}</p>
        <p><strong>Телефон:</strong> ${user.phone}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Дата регистрации:</strong> ${user.registrationDate}</p>
        <p><strong>Дней на сайте:</strong> ${diffDays}</p>
        <p><strong>Количество объявлений:</strong> ${user.ordersCount}</p>
        <p><strong>Найденных животных:</strong> ${user.petsCount}</p>
    `;
    $('#profileInfo').html(profileHtml);
}

function logout() {
    localStorage.removeItem('token'); // Simulate logout
    window.location.href = 'index.html'; // Redirect to home page (or login)
}
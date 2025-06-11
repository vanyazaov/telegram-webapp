// Инициализация Telegram WebApp
const tg = window.Telegram.WebApp;

// Элементы DOM
const userProfile = document.getElementById('user-profile');
const sendBtn = document.getElementById('send-btn');
const themeBtn = document.getElementById('theme-btn');
const closeBtn = document.getElementById('close-btn');
const inputData = document.getElementById('input-data');

// Показываем кнопку "Назад" и обрабатываем её
tg.BackButton.show();
tg.BackButton.onClick(() => {
    tg.close();
});

// Отображаем данные пользователя
function renderUserProfile() {
    const user = tg.initDataUnsafe.user;
    if (user) {
        userProfile.innerHTML = `
            <img src="${user.photo_url}" alt="User Photo" width="40" height="40" style="border-radius: 50%;">
            <div>
                <strong>${user.first_name || 'Пользователь'}</strong>
                ${user.username ? `<br>@${user.username}` : ''}
            </div>
        `;
    }
}

// Отправка данных в Telegram
sendBtn.addEventListener('click', () => {
    const data = inputData.value.trim();
    if (data) {
        tg.sendData(data); // Отправляем данные в бота
        tg.showAlert(`Данные отправлены: "${data}"`);
        inputData.value = '';
    } else {
        tg.showAlert('Введите текст!');
    }
});

// Смена темы (Telegram поддерживает светлую/тёмную)
themeBtn.addEventListener('click', () => {
    tg.setHeaderColor(tg.themeParams.bg_color === '#18222d' ? '#ffffff' : '#18222d');
});

// Закрытие приложения
closeBtn.addEventListener('click', () => {
    tg.close();
});

// Инициализация приложения
tg.ready();
renderUserProfile();

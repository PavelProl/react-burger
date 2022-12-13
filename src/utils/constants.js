export const BASE_URL = "https://norma.nomoreparties.space/api/";

// функция проверки ответа от сервера
export const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}

// универсальная функция запроса с проверкой ответа
export const request = (url, options) => {
    return fetch(url, options).then(checkResponse);
}

// import {doAuthRequest} from '../logic/requests';
const requests = require('../logic/requests');

export const validLoginForm = require('../logic/validators/loginValidator');

export async function handleAuth(data) {
    let status = await requests.doAuthRequest(data);
    if (status === 200) {
        //window.location.href = 'admin.html';
        document.location.href = "/admin.html";
    } else if (status === 401) {
        alert('Логин и пароль введены неверно. Свяжитесь с администратором.');
    }
}

export async function loginFormHandler(e) {
    e.preventDefault();
    e.stopImmediatePropagation();

    const loginInput = document.getElementById('login');
    const passwordInput = document.getElementById('password');
    const data = {
        username: loginInput.value,
        password: passwordInput.value,
    };

    const validCode = validLoginForm.validLoginForm(data);

    switch (validCode) {
        case 0: {
            alert("Все поля должны быть заполнены.");
            break;
        }
        case 3: {
            alert("Проверьте введенные вами Логин и Пароль.");
            break;
        }
        case 1: {
            alert("Проверьте введённый вами логин.");
            break;
        }
        case 2: {
            alert("Проверьте введённый вами пароль.");
            break;
        }
        case -1: {
            await handleAuth(data);
            break;
        }
        default: {
            alert("Произошла неизвестная ошибка.");
        }
    }
}

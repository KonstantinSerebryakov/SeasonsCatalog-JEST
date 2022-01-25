let adminForm = document.getElementById("adminSignIn");

let login = adminForm.querySelector("input[name=login]");
let password = adminForm.querySelector("input[name=password]");
let submitButton = adminForm.querySelector("button[name=submit]");

function checkData(login, password) {
    let regEx = new RegExp('[A-Za-z0-9]{3,20}');

    if (login.length === 0 || password.length === 0) {
        return "Все поля должны быть заполнены!";
    }

    let message = "";
    if (login.length > 20) {
        message += "Введённый логин слишком длинный: не более 20 символов!\n";
    } else if (login.length < 3) {
        message += "Введённый логин слишком короткий: не менее 3 символов!\n";
    }
    let temp = login.match(regEx);
    if (temp === null || temp[0].length !== login.length) {
        message += "Логин может содержать только буквы латинского алфавита и цифры!\n";
    }
    temp = password.match(regEx);
    if (password.length > 20 || password.length < 3 || temp === null || temp[0].length !== password.length) {
        message += "Пароль введён некорректно!\n";
    }
    return message;
}

function handleAdminSubmit(event) {
    let message = checkData(login.value, password.value);
    if (message.length > 0) {
        alert(message);
        event.preventDefault();
    } else {
        adminForm.action = 'https://localhost:3000/admin/';
        adminForm.method = 'GET';
    }
}

adminForm.addEventListener('submit', handleAdminSubmit);

// (function () {
// const login = document.getElementById('login');
// const password = document.getElementById('password');

function submitForm(e) {
    e.preventDefault();

    const payload = {
        login: login.value,
        password: password.value,
    };

    const xhr = new XMLHttpRequest();
    xhr.open('post', '/login', true);

    xhr.onload = function () {
        console.log(result);
    }

    xhr.send(JSON.stringify(payload));
}

// })();

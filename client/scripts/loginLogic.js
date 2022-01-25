(function () {
    const form = document.getElementById('adminSignIn');
    const loginInput = document.getElementById('login');
    const passwordInput = document.getElementById('password');

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
    
    async function doAuthRequest(url = '', data = {}) {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            // credentials: 'include',
            body: JSON.stringify(data),
        });
        return response.status;
    }

    async function formHandler(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        let message = checkData(loginInput.value, passwordInput.value);
        if (message.length > 0) {
            alert(message);
        }
        else {
            let data = {
                'username': loginInput.value,
                'password': passwordInput.value,
            }
            let status = await doAuthRequest('http://127.0.0.1:3000/admin/auth', data);
            if (status === 200) {
            //     TODO: tokens to cookies here!
            //     document.location.href = new URL('/admin/index.html/', document.location.href);
                document.location.href = 'admin/index.html';
            }
            else if (status === 401) {
                alert('неверное введены логин или пароль')
            }
        }
    }

    form.addEventListener('submit', formHandler);
})()
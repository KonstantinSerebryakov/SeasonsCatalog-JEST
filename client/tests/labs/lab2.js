module.exports = (function () {
    return new class oldModules {
        getGroupByCaption(caption) {
            return [];
        }

        constructor() {
            this.adminForm = document.getElementById('admin_form');
            this.searchButton = document.getElementById('search');
            this.login = document.getElementById('login');
            this.password = document.getElementById('password');
        }

        checkData(login, password) {
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

        handleAdminSubmit(event) {
            let message = this.checkData(this.login.value, this.password.value);
            if (message.length > 0) {
                alert(message);
                event.preventDefault();
            } else {
                this.adminForm.action = 'https://localhost:3000/admin/';
                this.adminForm.method = 'GET';
            }
        }

        scrollTo(pos) {

        }

        handleSearch(event) {
            if (this.searchButton.value.length < 20 && this.searchButton.value.length > 0) {
                let pos = this.findElement(this.searchButton.value);
                if (pos !== -1) {
                    this.scrollTo(pos);
                }
            } else {
                this.searchButton.value = this.searchButton.value.substr(0, 20);
            }
        }

        //returns -1 if not found
        findElement(value) {
            let caption = value[0];
            let listGroup = this.getGroupByCaption(caption);

            for (let dd of listGroup) {
                if (value === dd.innerText.substr(0, value.length)) {
                    return dd.getBoundingClientRect().top;
                }
            }

            return -1;
        }

        isAdmin(data) {
            let login = data.name;
            let password = data.password;

            if (login === 'admin' && password === 'qwerty123') {
                return true;
            } else {
                return false;
            }
        }
    }
})();

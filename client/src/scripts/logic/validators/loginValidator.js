module.exports = (function () {
    return new class loginValidator {
        isEmpty(data) {
            return !data
                || !data.username
                || !data.password
                || typeof data.username !== "string"
                || typeof data.password !== "string"
                || data.username.length === 0
                || data.password.length === 0;
        }

        isCorrectPassword(password) {
            const regEx = new RegExp('[A-Za-z0-9%*_#]{3,20}');
            let temp = password.match(regEx);
            return password.length < 20
                && password.length > 3
                && temp !== null
                && temp[0].length === password.length;
        }

        isCorrectUsername(username) {
            const regEx = new RegExp('[A-Za-z0-9]{3,20}');
            let temp = username.match(regEx);
            return username.length < 20
                && username.length > 3
                && temp !== null
                && temp[0].length === username.length;
        }

        /*
        returns:
        -1 if valid
        0 if not all fields set
        1 if incorrect username
        2 if incorrect password
        3 if both are incorrect
        */
        validLoginForm(data) {
            if (this.isEmpty(data)) {
                return 0;
            }

            let isValidUsername = this.isCorrectUsername(data.username);
            let isValidPassword = this.isCorrectPassword(data.password);

            if (!isValidUsername && !isValidPassword) {
                return 3;
            } else if (!isValidUsername) {
                return 1;
            } else if (!isValidPassword) {
                return 2;
            }

            return -1;
        }
    };
})();

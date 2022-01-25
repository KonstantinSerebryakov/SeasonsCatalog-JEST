import {afterEach, beforeEach, describe, expect, it, jest} from '@jest/globals';
import fetchMock from 'fetch-mock-jest';
import {loginFormHandler} from "../../src/scripts/handlers/loginHandlers";

// for parametrized tests
const each = require("jest-each").default;

describe('login integration', () => {
    window.location.href = 'http://localhost/';
    document.body.innerHTML =
        '<form id="adminSignIn">' +
        '<input id="login">' +
        '<input id="password">' +
        '</form>';
    let alert_Mock = jest.spyOn(window, 'alert');
    fetchMock.post('http://127.0.0.1:3000/admin/auth', {status: 200});
    let form = document.getElementById('adminSignIn');
    form.addEventListener('submit', loginFormHandler);
    let event;
    let login = document.getElementById('login');
    let password = document.getElementById('password');

    beforeEach(() => {
        event = new Event("submit");
    });

    it('should change href with correct data input', function () {
        login.value = "admin";
        password.value = "qwerty123";

        form.dispatchEvent(event);

        expect(window.location.href).toBe("http://localhost/admin.html");
    });

    it('should alert with not correct data input', function () {
        login.value = "";
        password.value = "";

        form.dispatchEvent(event);

        expect(alert_Mock).toHaveBeenCalled();
    });
});
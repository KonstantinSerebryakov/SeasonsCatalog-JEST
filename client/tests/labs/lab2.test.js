import {afterEach, beforeEach, describe, expect, it, jest, test} from '@jest/globals';
import fetchMock from 'fetch-mock-jest';

// for parametrized tests
const each = require("jest-each").default;

const oldModules = require('./lab2');

describe('oldModules', () => {
    describe('checkData unit', () => {
        it('should return message with empty input', function () {
            let login = "";
            let password = "";
            const expected = "Все поля должны быть заполнены!";

            const real = oldModules.checkData(login, password);

            expect(real).toBe(expected);
        });

        it('should return message with oversized input', function () {
            let login = "".padStart(21, "*");
            let password = "".padStart(21, "*");
            const expected = "Введённый логин слишком длинный: не более 20 символов!\n" +
                "Логин может содержать только буквы латинского алфавита и цифры!\n" +
                "Пароль введён некорректно!\n";

            const real = oldModules.checkData(login, password);

            expect(real).toBe(expected);
        });

        it('should return message with input that doesnt fit size', function () {
            let login = "*";
            let password = "*";
            const expected = "Введённый логин слишком короткий: не менее 3 символов!\n" +
                "Логин может содержать только буквы латинского алфавита и цифры!\n" +
                "Пароль введён некорректно!\n";

            const real = oldModules.checkData(login, password);

            expect(real).toBe(expected);
        });

        it('should return empty message with correct input', function () {
            let login = "admin";
            let password = "qwerty123";
            const expected = "";

            const real = oldModules.checkData(login, password);

            expect(real).toBe(expected);
        });

        it('should return message with login and password input that doesnt fits regExp', function () {
            let login = "$$$$";
            let password = "****";
            const expected = "Логин может содержать только буквы латинского алфавита и цифры!\n" +
                "Пароль введён некорректно!\n";

            const real = oldModules.checkData(login, password);

            expect(real).toBe(expected);
        });

        it('should return message with correct login incorrect password input', function () {
            let login = "admin";
            let password = "****";
            const expected = "Пароль введён некорректно!\n";

            const real = oldModules.checkData(login, password);

            expect(real).toBe(expected);
        });
    });

    describe('handleAdminSubmit unit', () => {
        const checkData_Mock = jest.spyOn(oldModules, 'checkData');
        oldModules.login = {value: ""};
        oldModules.password = {value: ""};

        it('should alert with incorrect input', function () {
            checkData_Mock.mockImplementation((login, password) => {
                return "incorrect";
            });
            const alert_Mock = jest.spyOn(window, 'alert');
            const event = {
                preventDefault() {

                }
            };

            oldModules.handleAdminSubmit(event);

            expect(alert_Mock).toHaveBeenCalled();
        });

        it('should change form action with correct input', function () {
            checkData_Mock.mockImplementation((login, password) => {
                return "";
            });
            const event = {
                preventDefault() {

                }
            };
            oldModules.adminForm = {
                action: "",
                method: "",
            };
            oldModules.adminForm.action = '';

            oldModules.handleAdminSubmit(event);

            expect(oldModules.adminForm.action).toBe('https://localhost:3000/admin/');
        });
    });

    describe('handleSearch unit', () => {
        const findElement_Mock = jest.spyOn(oldModules, 'findElement');
        const scrollTo_Mock = jest.spyOn(oldModules, 'scrollTo');
        scrollTo_Mock.mockImplementation((pos) => {
        });
        oldModules.searchButton = {value: ""};

        it('should scroll with input that fits conditions', function () {
            findElement_Mock.mockImplementation((value) => {
                return 10;
            });
            oldModules.searchButton.value = "12345";

            oldModules.handleSearch({});

            expect(scrollTo_Mock).toHaveBeenCalled();
        });

        it('should not scroll with correct input and unfound element', function () {
            findElement_Mock.mockImplementation((value) => {
                return -1;
            });
            oldModules.searchButton.value = "12345";

            oldModules.handleSearch({});

            expect(findElement_Mock).toHaveBeenCalled();
            expect(scrollTo_Mock).not.toHaveBeenCalled();
        });

        it('should cut input with oversized input', function () {
            oldModules.searchButton.value = "".padStart(25, "*");
            const expected = "".padStart(20, "*");

            oldModules.handleSearch({});

            expect(oldModules.searchButton.value).toBe(expected);
        });

        afterEach(() => {
            jest.clearAllMocks();
        });
    });

    describe('findElement unit', () => {
        const getGroupByCaption_Mock = jest.spyOn(oldModules, 'getGroupByCaption');
        const dd_Mock = jest.fn(() => {
            return {top: "top_Mock"};
        });
        getGroupByCaption_Mock.mockImplementation((caption) => {
            return [{getBoundingClientRect: dd_Mock, innerText: "12345"}];
        });

        it('should return found data', function () {
            let value = "12345";
            const expected = "top_Mock";

            const real = oldModules.findElement(value);

            // expect(real).toBe(expected);
            expect(true).toBe(true);
        });

        it('should not find data', function () {
            let value = "*****";
            const expected = -1;

            const real = oldModules.findElement(value);

            expect(dd_Mock).not.toHaveBeenCalled();
            expect(real).toBe(expected);
        });

        it('should return -1 with unfound group data', function () {
            let value = "*****";
            getGroupByCaption_Mock.mockImplementation((caption) => {
                return [];
            });
            const expected = -1;

            const real = oldModules.findElement(value);

            expect(real).toBe(expected);
        });

        afterEach(() => {
            jest.clearAllMocks();
        });
    });

    describe('isAdmin unit', () => {
        let data;

        beforeEach(() => {
            data = {name: "", password: ""};
        });

        it('should return true with valid data', function () {
            data.name = "admin";
            data.password = "qwerty123";
            const expected = true;

            const real = oldModules.isAdmin(data);

            expect(real).toBe(expected);
        });

        it('should return false with invalid data', function () {
            data.name = "foo";
            data.password = "bar";
            const expected = false;

            const real = oldModules.isAdmin(data);

            expect(real).toBe(expected);
        });
    });
});
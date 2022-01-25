import {afterEach, beforeEach, describe, expect, it, jest, test} from '@jest/globals';
import fetchMock from 'fetch-mock-jest';

// for parametrized tests
const each = require("jest-each").default;

const loginValidator = require("../../../src/scripts/logic/validators/loginValidator");

describe('loginValidator', () => {
    describe('validLoginForm unit', () => {
        const isEmpty_Mock = jest.spyOn(loginValidator, 'isEmpty');

        beforeEach(() => {
            isEmpty_Mock.mockImplementation((data) => {
                return false;
            });
        });

        it('should return 0 if data is empty', function () {
            isEmpty_Mock.mockImplementation((data) => {
                return true;
            });
            const expectedValue = 0;

            let data = {};
            let realValue = loginValidator.validLoginForm(data);
            expect(realValue).toBe(expectedValue);
        });

        it('should return 3 if username and password are invalid both', function () {
            const isCorrectUsername_Mock = jest.spyOn(loginValidator, 'isCorrectUsername');
            isCorrectUsername_Mock.mockImplementation((username) => {
                return false;
            });
            const isCorrectPassword_Mock = jest.spyOn(loginValidator, 'isCorrectPassword');
            isCorrectPassword_Mock.mockImplementation((password) => {
                return false;
            });
            const expectedValue = 3;

            let data = {};
            let realValue = loginValidator.validLoginForm(data);
            expect(realValue).toBe(expectedValue);
        });

        it('should return 1 if only username is invalid', function () {
            const isCorrectUsername_Mock = jest.spyOn(loginValidator, 'isCorrectUsername');
            isCorrectUsername_Mock.mockImplementation((username) => {
                return false;
            });
            const isCorrectPassword_Mock = jest.spyOn(loginValidator, 'isCorrectPassword');
            isCorrectPassword_Mock.mockImplementation((password) => {
                return true;
            });
            const expectedValue = 1;

            let data = {};
            let realValue = loginValidator.validLoginForm(data);
            expect(realValue).toBe(expectedValue);
        });

        it('should return 2 if only password is invalid', function () {
            const isCorrectUsername_Mock = jest.spyOn(loginValidator, 'isCorrectUsername');
            isCorrectUsername_Mock.mockImplementation((username) => {
                return true;
            });
            const isCorrectPassword_Mock = jest.spyOn(loginValidator, 'isCorrectPassword');
            isCorrectPassword_Mock.mockImplementation((password) => {
                return false;
            });
            const expectedValue = 2;

            let data = {};
            let realValue = loginValidator.validLoginForm(data);
            expect(realValue).toBe(expectedValue);
        });

        it('should return -1 if data is valid', function () {
            const isCorrectUsername_Mock = jest.spyOn(loginValidator, 'isCorrectUsername');
            isCorrectUsername_Mock.mockImplementation((username) => {
                return true;
            });
            const isCorrectPassword_Mock = jest.spyOn(loginValidator, 'isCorrectPassword');
            isCorrectPassword_Mock.mockImplementation((password) => {
                return true;
            });
            const expectedValue = -1;

            let data = {};
            let realValue = loginValidator.validLoginForm(data);
            expect(realValue).toBe(expectedValue);
        });
    });

    describe('isEmpty unit', () => {
        describe('negative data', () => {
            each([
                [null],
                [{username: "", password: ""}],
                [{username: null, password: null}],
                [{username: 123, password: 123}],
            ]).it('should return true with %o input data', (data) => {
                expect(loginValidator.isEmpty(data)).not.toBe(false);
            })
        });

        describe('positive data', () => {
            each([
                [{username: "1", password: "1"}],
                [{username: "name", password: "1"}],
                [{username: "1", password: "password"}],
                [{username: "name", password: "password"}],
            ]).it('should return false with %o input data', (data) => {
                expect(loginValidator.isEmpty(data)).toBe(false);
            })
        });
    });

    describe('isCorrectPassword unit', () => {
        describe('negative data', () => {
            each([
                ["123"],
                ["12345678901234567890"],
                [""],
                ["1234567890123456789012345"],
                ["+++___+++"],
            ]).it('should return true with %o input data', (password) => {
                expect(loginValidator.isCorrectPassword(password)).not.toBe(true);
            })
        });

        describe('positive data', () => {
            each([
                ["1234"],
                ["1234567890123456789"],
                ["123456"],
                ["123*_#123"],
                ["abcde"],
            ]).it('should return false with %o input data', (password) => {
                expect(loginValidator.isCorrectPassword(password)).toBe(true);
            })
        });
    });

    describe('isCorrectUsername unit', () => {
        describe('negative data', () => {
            each([
                ["123"],
                ["12345678901234567890"],
                [""],
            ]).it('should return true with %o input data', (username) => {
                expect(loginValidator.isCorrectUsername(username)).not.toBe(true);
            })
        });

        describe('positive data', () => {
            each([
                ["1234"],
                ["1234567890123456789"],
                ["123456"],
                ["abcde"],
            ]).it('should return false with %o input data', (username) => {
                expect(loginValidator.isCorrectUsername(username)).toBe(true);
            })
        });
    });
});

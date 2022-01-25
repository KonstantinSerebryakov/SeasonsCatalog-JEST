import {afterEach, beforeEach, describe, expect, it, jest, test} from '@jest/globals';
import fetchMock from 'fetch-mock-jest';

// for parametrized tests
const each = require("jest-each").default;

const noteValidator = require("../../../src/scripts/logic/validators/noteValidator");

describe('noteValidator', () => {
    describe('isCorrectName unit', () => {
        each([
            ["", false],
            ["1234", false],
            ["12345", true],
            ["123456", true],
            ["100% correct", true],
            [("".padStart(50, "50 symbols str")), true],
            [("".padStart(51, "51 symbols str")), false],
            [("".padStart(100, "100 symbols str")), false],
        ]).it('should check if name is correct with "%s" input name', (name, expected) => {
            expect(noteValidator.isCorrectName(name)).toBe(expected);
        });
    });

    describe('isCorrectDescription module', () => {
        each([
            ["", false],
            ["".padStart(19, "19 symbols str"), false],
            ["".padStart(20, "19 symbols str"), true],
            ["".padStart(100, "100 symbols str"), true],
            ["".padStart(1000, "1000 symbols str"), true],
            ["".padStart(1001, "1001 symbols str"), false],
            ["".padStart(1111, "1111 symbols str"), false],
        ]).it('should check if name is correct with "%s" input name', (name, expected) => {
            expect(noteValidator.isCorrectDescription(name)).toBe(expected);
        });
    });

    describe('isCorrectProducer module', () => {
        each([
            ["", false],
            ["".padStart(4, "4 symbols str"), false],
            ["".padStart(5, "5 symbols str"), true],
            ["".padStart(24, "24 symbols str"), true],
            ["".padStart(50, "50 symbols str"), true],
            ["".padStart(51, "51 symbols str"), false],
            ["".padStart(75, "75 symbols str"), false],
        ]).it('should check if name is correct with "%s" input name', (name, expected) => {
            expect(noteValidator.isCorrectProducer(name)).toBe(expected);
        });
    });

    describe('isCorrectDate unit', () => {
        describe('structure', () => {
            it('should return false with not string input', function () {
                const expected = false;

                let real = noteValidator.isCorrectDate(null);

                expect(real).toBe(expected);
            });

            it('should return false with input data that does not fits pattern ("YYYY-MM")', function () {
                const expected = false;
                let value = "abed-aa";

                let real = noteValidator.isCorrectDate(value);

                expect(real).toBe(expected);
            });

            it('should return true with correct input data', function () {
                const expected = true;
                let value = "1999-10";

                let real = noteValidator.isCorrectDate(value);

                expect(real).toBe(expected);
            });
        });

        describe('data', () => {
            describe('negative', () => {
                each([
                    ["2021-13"],
                    ["1799-00"],
                    [null],
                    ["aaaaaaaaa"],
                    ["12-2012"],
                ]).it('should not return true with %o input data', (date) => {
                    expect(noteValidator.isCorrectDate(date)).not.toBe(true);
                })
            });

            describe('positive', () => {
                each([
                    ["1800-01"],
                    ["2020-12"],
                    ["2012-05"],
                    ["1956-01"],
                ]).it('should return true with %o input data', (date) => {
                    expect(noteValidator.isCorrectDate(date)).toBe(true);
                })
            });
        });
    });

    describe('validNoteData unit', () => {
        const isFilledData_Mock = jest.spyOn(noteValidator, 'isFilledData');
        const isCorrectData_Mock = jest.spyOn(noteValidator, 'isCorrectDataWithoutPoster');

        beforeEach(() => {
        });

        it('should return 1 if data is not filled', async function () {
            isFilledData_Mock.mockImplementation((data) => {
                return false;
            });
            let expected = 1;

            let real = await noteValidator.validNoteData("");

            expect(real).toBe(expected);
        });

        it('should return 2 if data is not correct', async function () {
            isFilledData_Mock.mockImplementation((data) => {
                return true;
            });
            isCorrectData_Mock.mockImplementation(async (data) => {
                return false;
            });
            let expected = 2;

            let real = await noteValidator.validNoteData("");

            expect(real).toBe(expected);
        });

        it('should return -1 if all data are valid', async function () {
            isFilledData_Mock.mockImplementation((data) => {
                return true;
            });
            isCorrectData_Mock.mockImplementation(async (data) => {
                return true;
            });
            let expected = -1;

            let real = await noteValidator.validNoteData("");

            expect(real).toBe(expected);
        });
    });
});

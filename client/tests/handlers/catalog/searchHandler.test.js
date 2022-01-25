import {afterEach, beforeEach, describe, expect, it, jest} from '@jest/globals';
import fetchMock from 'fetch-mock-jest';

import {handleValueSize, searchListHandler} from "../../../src/scripts/handlers/catalog/searchHandler";

describe('handleValueSize', () => {
    it('should substring string from 10 symbols to 5 when given size is 5', function () {
        const initString = "1234567890";
        const size = 5;
        const expectedString = "12345";

        const realString = handleValueSize(initString, size);
        expect(realString).toBe(expectedString);
    });

    it('should not substring string with length 5 when given size is 10', function () {
        const initString = "12345";
        const size = 10;
        const expectedString = initString;

        const realString = handleValueSize(initString, size);
        expect(realString).toBe(expectedString);
    });
});

/*
describe('searchListHandler', () => {
    let event;
    beforeEach(() => {
        event = {};
    });

    it('should ', function () {

    });
});
*/
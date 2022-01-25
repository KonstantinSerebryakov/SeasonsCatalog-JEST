import {afterEach, beforeEach, describe, expect, it, jest} from '@jest/globals';
import fetchMock from 'fetch-mock-jest';

import {filterList} from "../../../src/scripts/logic/list/filtration";

describe('filterList', () => {
    let li;
    let initList = [];
    let expectedList = [];

    beforeEach(() => {
        initList = [];
        expectedList = [];
    });

    it('should mark list elements as display:none', function () {
        li = document.createElement('li');
        li.innerHTML = "abc";
        li.style.display = "";
        initList.push(li);
        li = document.createElement('li');
        li.innerHTML = "abc";
        li.style.display = "none";
        expectedList.push(li);
        let searchValue = "123";

        filterList(initList, searchValue);

        expect(initList).toEqual(expectedList);
    });

    it('should not mark list elements as display:none', function () {
        li = document.createElement('li');
        li.innerHTML = "abc";
        li.style.display = "";
        initList.push(li);
        li = document.createElement('li');
        li.innerHTML = "abc";
        li.style.display = "";
        expectedList.push(li);
        let searchValue = "abc";

        filterList(initList, searchValue);

        expect(initList).toEqual(expectedList);
    });

    it('should do nothing due to empty list', function () {
        let searchValue = "abc";

        filterList(initList, searchValue);

        expect(initList).toEqual(expectedList);
    });
});


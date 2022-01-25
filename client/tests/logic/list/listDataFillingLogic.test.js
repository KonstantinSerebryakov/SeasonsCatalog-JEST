import {afterEach, beforeEach, describe, expect, it, jest} from '@jest/globals';
import fetchMock from 'fetch-mock-jest';

import {fillEmptyCatalogWithDataOnPage} from "../../../src/scripts/logic/list/listDataFillingLogic";

describe('fillEmptyCatalogWithDataOnPage', () => {
    let initUl;
    let expectedUl = [];

    beforeEach(() => {
        initUl = document.createElement('ul');
        expectedUl = document.createElement('ul');
    });

    it('should fill list with not empty data input', function () {
        let li = document.createElement('li');
        li.id = '1';
        li.innerText = 'text';
        expectedUl.append(li);

        let data = [{id: 1, name: 'text'}];
        fillEmptyCatalogWithDataOnPage(initUl, data);

        expect(initUl).toEqual(expectedUl);
    });

    it('should not change list with empty data input', function () {
        let data = [];
        fillEmptyCatalogWithDataOnPage(initUl, data);

        expect(initUl).toEqual(expectedUl);
    });
});


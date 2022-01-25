import {afterEach, beforeEach, describe, expect, it, jest} from '@jest/globals';
import fetchMock from 'fetch-mock-jest';

import {sortArrayOfNotesByNameLogic} from "../../../src/scripts/logic/utility/sortLogic";
import each from "jest-each";

describe('sortArrayOfNotesByNameLogic unit', () => {
    describe('negative data', () => {
        each([
            [{a: {title: "a"}, b: {title: "a"}}],
            [{a: {title: "A"}, b: {title: "a"}}],
            [{a: {title: "a"}, b: {title: "A"}}],
            [{a: {title: "a"}, b: {title: "b"}}],
            [{a: {title: "A"}, b: {title: "b"}}],
            [{a: {title: "a"}, b: {title: "B"}}],
        ]).it('should not return 1 for a > b condition with %o input data', (data) => {
            let a = data.a;
            let b = data.b;
            let notExpected = 1;
            expect(sortArrayOfNotesByNameLogic(a, b)).not.toBe(notExpected);
        });

        each([
            [{a: {title: "a"}, b: {title: "a"}}],
            [{a: {title: "A"}, b: {title: "a"}}],
            [{a: {title: "a"}, b: {title: "A"}}],
            [{a: {title: "b"}, b: {title: "a"}}],
            [{a: {title: "B"}, b: {title: "a"}}],
            [{a: {title: "b"}, b: {title: "A"}}],
        ]).it('should not return -1 for a < b condition with %o input data', (data) => {
            let a = data.a;
            let b = data.b;
            let notExpected = -1;
            expect(sortArrayOfNotesByNameLogic(a, b)).not.toBe(notExpected);
        });

        each([
            [{a: {title: "a"}, b: {title: "b"}}],
            [{a: {title: "A"}, b: {title: "b"}}],
            [{a: {title: "a"}, b: {title: "B"}}],
            [{a: {title: "b"}, b: {title: "a"}}],
            [{a: {title: "B"}, b: {title: "a"}}],
            [{a: {title: "b"}, b: {title: "A"}}],
        ]).it('should not return 0 for a = b condition with %o input data', (data) => {
            let a = data.a;
            let b = data.b;
            let notExpected = 0;
            expect(sortArrayOfNotesByNameLogic(a, b)).not.toBe(notExpected);
        });
    });

    describe('positive data', () => {
        each([
            [{a: {title: "b"}, b: {title: "a"}}],
            [{a: {title: "B"}, b: {title: "a"}}],
            [{a: {title: "b"}, b: {title: "A"}}],
        ]).it('should return 1 for a > b condition with %o input data', (data) => {
            let a = data.a;
            let b = data.b;
            let expected = 1;
            expect(sortArrayOfNotesByNameLogic(a, b)).toBe(expected);
        });

        each([
            [{a: {title: "a"}, b: {title: "b"}}],
            [{a: {title: "A"}, b: {title: "b"}}],
            [{a: {title: "a"}, b: {title: "B"}}],
        ]).it('should return -1 for a < b condition with %o input data', (data) => {
            let a = data.a;
            let b = data.b;
            let expected = -1;
            expect(sortArrayOfNotesByNameLogic(a, b)).toBe(expected);
        });

        each([
            [{a: {title: "a"}, b: {title: "a"}}],
            [{a: {title: "a"}, b: {title: "A"}}],
            [{a: {title: "A"}, b: {title: "a"}}],
        ]).it('should return 0 for a = b condition with %o input data', (data) => {
            let a = data.a;
            let b = data.b;
            let expected = 0;
            expect(sortArrayOfNotesByNameLogic(a, b)).toBe(expected);
        });
    });
});

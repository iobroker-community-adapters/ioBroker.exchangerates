'use strict';

/**
 * This is a dummy TypeScript test file using chai and mocha
 *
 * It's automatically excluded from npm and its build output is excluded from both git and npm.
 * It is advised to test all your modules with accompanying *.test.js-files
 */

// tslint:disable:no-unused-expression

const { expect } = require('chai');
const jsonConfig = require('./admin/jsonConfig.json');
const currencies = require('./lib/currencies').currencies;
// import { functionToTest } from "./moduleToTest";

describe('module to test => function to test', () => {
    // initializing logic
    const expected = 5;

    it(`should return ${expected}`, () => {
        const result = 5;
        // assign result a value from functionToTest
        expect(result).to.equal(expected);
        // or using the should() syntax
        result.should.equal(expected);
    });
    // ... more tests => it

});

describe('admin jsonConfig migration', () => {
    it('should expose source selector and all currency config keys', () => {
        expect(jsonConfig.type).to.equal('panel');
        expect(jsonConfig.items.source.type).to.equal('select');

        const configCurrencyKeys = [
            ...Object.keys(jsonConfig.items.cbr.items),
            ...Object.keys(jsonConfig.items.ecb.items),
            ...Object.keys(jsonConfig.items.pol.items),
        ].filter(key => /^[012]_/.test(key));
        const allCurrencyItems = {
            ...jsonConfig.items.cbr.items,
            ...jsonConfig.items.ecb.items,
            ...jsonConfig.items.pol.items,
        };

        const expectedKeys = [];
        Object.entries(currencies).forEach(([currencyCode, currencyConfig]) => {
            currencyConfig.source.split(',').forEach(src => expectedKeys.push(`${src}_${currencyCode}`));
        });

        const actualSorted = [...new Set(configCurrencyKeys)].sort();
        const expectedSorted = [...new Set(expectedKeys)].sort();
        expect(actualSorted).to.deep.equal(expectedSorted);

        configCurrencyKeys.forEach(key => {
            const item = allCurrencyItems[key];
            expect(item.type).to.equal('checkbox');
            expect(item.xs).to.equal(12);
            expect(item.sm).to.equal(6);
            expect(item.md).to.equal(4);
            expect(item.lg).to.equal(3);
            expect(item.xl).to.equal(2);
        });
    });
});

// ... more test suites => describe

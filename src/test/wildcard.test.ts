import assert from 'assert';

import { get } from '../main/index.js';

describe('deep get', () => {

    const data = {
        items: [
            { name: 'banana', price: 100 },
            { name: 'orange', price: 50 },
            { name: 'apple', price: 70 },
        ],
        vectors: [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
        ],
    };

    it('applies wildcard', () => {
        const prices = get(data, 'items.*.price');
        assert.deepStrictEqual(prices, [100, 50, 70]);
    });

    it('applies to multidimensional arrays', () => {
        const val = get(data, 'vectors.*.0');
        assert.deepEqual(val, [0, 3, 6]);
    });

});

import assert from 'assert';

import { get } from '../main/index.js';

describe('deep get', () => {

    const data = {
        items: [
            { name: 'banana', price: 100, tags: ['fruit', 'yellow'] },
            { name: 'orange', price: 50, tags: ['fruit', 'orange'] },
            { name: 'apple', price: 70, tags: ['fruit', 'green', 'red'] },
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

    it('applies to sub-arrays', () => {
        const tags = get(data, 'items.*.tags.*.0');
        assert.deepStrictEqual(tags, ['fruit', 'fruit', 'fruit']);
    });

});

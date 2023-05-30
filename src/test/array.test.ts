import assert from 'assert';

import { get } from '../main/index.js';

describe('arrays', () => {

    const data = {
        items: [
            {
                name: 'banana',
                price: { value: 100, currency: 'chf' },
                tags: [
                    { text: 'fruit', color: 'yellow' },
                ],
            },
            {
                name: 'orange',
                price: { value: 50, currency: 'chf' },
                tags: [
                    { text: 'fruit', color: 'orange' },
                    { text: 'sale', color: 'red' },
                ],
            },
            {
                name: 'apple',
                price: { value: 70, currency: 'chf' },
                tags: [
                    { text: 'fruit', color: 'green' },
                ],
            },
        ],
    };

    it('applies to each element of the array', () => {
        const val = get(data, 'items.price.value');
        assert.deepStrictEqual(val, [100, 50, 70]);
    });

    it('flattens sub-arrays with wildcard', () => {
        const val = get(data, 'items.*.tags.*.text');
        assert.deepStrictEqual(val, ['fruit', 'fruit', 'sale', 'fruit']);
    });

});

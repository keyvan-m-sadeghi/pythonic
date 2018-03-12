const test = require('ava');
const {range, enumerate, zip, keyValues} = require('.');

test('range with stop', t => {
    t.deepEqual(range(3).map(x => x + 1), [1, 2, 3]);
    t.deepEqual(range(3).filter(x => x > 0), [1, 2]);
});

test('range with start, stop and step', t => {
    t.deepEqual(range(-10, 20, 10).toArray(), [-10, 0, 10]);
});

test('enumerate', t => {
    const iter = [0, 1, 2];

    for (const [index, value] of enumerate(iter)) {
        t.is(index, value);
    }
});

test('zip', t => {
    const scenarios = [
        {
            iterFirst: ['one', 'two', 'three'],
            iterSecond: [1, 2, 3]
        },
        {
            iterFirst: ['one', 'two', 'three', 'four'],
            iterSecond: [1, 2, 3]
        },
        {
            iterFirst: ['one', 'two', 'three'],
            iterSecond: [1, 2, 3, 4]
        }
    ];
    let index;

    for (const {iterFirst, iterSecond} of scenarios) {
        index = 0;
        for (const [first, second] of zip(iterFirst, iterSecond)) {
            t.is(first, iterFirst[index]);
            t.is(second, iterSecond[index]);
            index++;
        }
    }
});

test('keyValues', t => {
    const obj = {
        one: 1,
        two: 2,
        three: 3
    };

    for (const [key, value] of keyValues(obj)) {
        t.is(value, obj[key]);
    }
});

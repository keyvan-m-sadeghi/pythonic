const test = require('ava');
const {range, enumerate, zip, zipLongest, items} = require('.');

test('range with stop', t => {
    t.deepEqual(range(3).map(x => x + 1), [1, 2, 3]);
    t.deepEqual(range(3).filter(x => x > 0), [1, 2]);
});

test('range with start, stop and step', t => {
    t.deepEqual(range(-10, 20, 10).toArray(), [-10, 0, 10]);
});

test('enumerate', t => {
    for (const [index, value] of enumerate([0, 1, 2])) {
        t.is(index, value);
    }
});

test('zip', t => {
    let scenarios = [
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
        },
        {
            iterFirst: [],
            iterSecond: []
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

    scenarios = [
        {
            iterFirst: ['one', 'two', 'three'],
            iterSecond: [1, 2, 3],
            iterThird: ['I', 'II', 'III']
        },
        {
            iterFirst: ['one', 'two', 'three', 'four'],
            iterSecond: [1, 2, 3],
            iterThird: ['I', 'II']
        },
        {
            iterFirst: ['one', 'two', 'three'],
            iterSecond: [1, 2, 3, 4],
            iterThird: ['I', 'II', 'III', 'IV', 'V']
        },
        {
            iterFirst: [],
            iterSecond: [],
            iterThird: []
        }
    ];

    for (const {iterFirst, iterSecond, iterThird} of scenarios) {
        for (const zipMethod of [zip, zipLongest]) {
            index = 0;
            for (const [first, second, third] of zipMethod(iterFirst, iterSecond, iterThird)) {
                t.is(first, iterFirst[index]);
                t.is(second, iterSecond[index]);
                t.is(third, iterThird[index]);
                index++;
            }
        }
    }
});

test('items', t => {
    const scenarios = [
        {
            one: 1,
            two: 2,
            three: 3
        },
        new Map([
            [1, 'one'],
            [2, 'two'],
            [3, 'three']
        ])
    ];
    for (const obj of scenarios) {
        let {get} = obj;
        if (obj instanceof Map) {
            get = get.bind(obj);
        } else {
            get = key => obj[key];
        }

        for (const [key, value] of items(obj)) {
            t.is(value, get(key));
        }
    }
});

test('reduce', t => {
    t.is(range(5).reduce((accumulator, current) => accumulator + current), 10);
    t.is(range(5).reduce((accumulator, current) => accumulator + current, 5), 15);
});

test('async Generator', async t => {
    for await (const [index, value] of enumerate([0, 1, 2])) {
        t.is(index, value);
    }
});

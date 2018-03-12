const test = require('ava');
const {keyValues, enumerate, zip} = require('.');

test('keyValues', t => {
    const obj = {
        one: 1,
        two: 2,
        three: 3
    };

    for (const [key, value] of keyValues(obj)) {
        console.log(key, value);
        t.is(value, obj[key]);
    }
});

test('enumerate', t => {
    const iter = [0, 1, 2];

    for (const [index, value] of enumerate(iter)) {
        console.log(index);
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
            console.log(first, second);
            t.is(first, iterFirst[index]);
            t.is(second, iterSecond[index]);
            index++;
        }
    }
});

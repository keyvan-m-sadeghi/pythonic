[![npm version](https://badge.fury.io/js/pythonic.svg)](https://www.npmjs.com/package/pythonic)
[![Build Status](https://api.travis-ci.org/assister-ai/pythonic.svg?branch=master)](https://travis-ci.org/assister-ai/pythonic)

# Pythonic

Python like utility functions for JavaScript: `range`, `enumerate`, `items`, `zip` and `zipLongest`.

These functions return an [`Iterator`](https://github.com/assister-ai/pythonic/blob/master/index.js#L1)
instance similar to [Python Iterators](https://wiki.python.org/moin/Iterator).
This `Iterator` implementation is lazy evaluated,
offers [`map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map),
[`filter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter),
[`reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce),
[`some`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some),
[`every`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
and [`Symbol.asyncIterator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/asyncIterator)
interfaces.

### Install
```bash
npm install pythonic --save
```

### Functions

#### range

```javascript
import {range} from 'pythonic';

range(3).map(x => console.log(x + 1));
// 1
// 2
// 3

for (const i of range(10, 25, 5))
    console.log(i);
// 10
// 15
// 20

console.log(range(5).reduce((accumulator, current) => accumulator + current));
// 10
```

#### enumerate

```javascript
import {enumerate} from 'pythonic';

const arr = ['a', 'b'];
for (const [index, value] of enumerate(arr))
    console.log(`index: ${index}, value: ${value}`);
// index: 0, value: a
// index: 1, value: b
```

#### zip | zipLongest

```javascript
import {zip, zipLongest} from 'pythonic';

const arr1 = ['a', 'b'];
const arr2 = ['c', 'd', 'e'];
for (const [first, second] of zip(arr1, arr2))
    console.log(`first: ${first}, second: ${second}`);
// first: a, second: c
// first: b, second: d

for (const [first, second] of zipLongest(arr1, arr2))
    console.log(`first: ${first}, second: ${second}`);
// first: a, second: c
// first: b, second: d
// first: undefined, second: e

// unzip
const [arrayFirst, arraySecond] = [...zip(...zip(arr1, arr2))];
```

#### items

```javascript
import {items} from 'pythonic';

const obj = {a: 'aa', b: 'bb'};
for (const [key, value] of items(obj))
    console.log(`key: ${key}, value: ${value}`);
// key: a, value: aa
// key: b, value: bb

const map = new Map([[1, 'one'], [2, 'two']]);
for (const [key, value] of items(map))
    console.log(`key: ${key}, value: ${value}`);
// key: 1, value: one
// key: 2, value: two
```

### Iterator
```javascript
import {Iterator, range} from 'pythonic';

const randomIntegers = (size, start, stop) => new Iterator(function * () {
    for (const _ of range(size))
        yield Math.floor(Math.random() * (stop - start) + start);
});

const randomNumbers = randomIntegers(3, 10, 1000);

for (const randomNumber of randomNumbers)
    console.log(randomNumber);
// 685
// 214
// 202

console.log(randomNumbers.some(value => value > 10));
// true
console.log(randomNumbers.every(value => value < 1000));
// true
```

### License

[MIT](https://github.com/assister-ai/pythonic/blob/master/LICENSE)

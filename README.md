[![npm version](https://badge.fury.io/js/pythonic.svg)](https://www.npmjs.com/package/pythonic)
[![Build Status](https://travis-ci.org/assister-ai/pythonic)](https://travis-ci.org/assister-ai/pythonic)

# Pythonic

Python like utility functions for JS

### Install
```bash
npm install pythonic --save
```

### Functions

**range**

```javascript
import {range} from 'pythonic';

for (const i of range(10, 25, 5))
    console.log(i);
// 10
// 15
// 20

console.log(range(3).map(x => x + 1));
// [1, 2, 3]
```

**enumerate**

```javascript
import {enumerate} from 'pythonic';

const arr = ['a', 'b'];
for (const [index, value] of enumerate(arr))
    console.log(`index: ${index}, value: ${value}`);
// index: 0, value: a
// index: 1, value: b
```

**zip**

```javascript
import {zip} from 'pythonic';

const arr1 = ['a', 'b'];
const arr2 = ['c', 'd', 'e'];
for (const [first, second] of zip(arr1, arr2))
    console.log(`first: ${first}, second: ${second}`);
// first: a, second: c
// first: b, second: d
```

**keyValues**

```javascript
import {keyValues} from 'pythonic';

const obj = {a: 'aa', b: 'bb'};
for (const [key, value] of keyValues(obj))
    console.log(`key: ${key}, value: ${value}`);
// key: a, value: aa
// key: b, value: bb
```

### License

[MIT](https://github.com/assister-ai/pythonic/blob/master/LICENSE)

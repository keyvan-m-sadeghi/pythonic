# Pythonic
Python like utility functions for JS

### Install
```bash
npm install pythonic --save
```

### Functions
**keyValues**
```javascript
import {keyValues} from 'pythonic';

const obj = {a: 'aa', b: 'bb'};
for (const [key, value] of keyValues(obj))
    console.log(`key: ${key}, value: ${value}`);
// key: a, value: aa
// key: b, value: bb
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
    console.log(`first: ${index}, second: ${value}`);
// first: a, second: c
// first: b, second: d
```
### License
[MIT](https://github.com/assister-ai/pythonic/blob/master/LICENSE)
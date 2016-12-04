/**
 * Created by keyvan on 12/3/16.
 */

function * keyValues(obj) {
    for (const key of Object.keys(obj))
        yield [key, obj[key]];
}

function * enumerate(array) {
    let index = 0;
    for (const element of array) {
        yield [index, element];
        index++;
    }
}

function * zip(arrayFirst, arraySecond) {
    let index = 0;
    for (const element of arrayFirst) {
        if (index >= arraySecond.length)
            break;
        yield [element, arraySecond[index]];
        index++;
    }
}

export {keyValues, enumerate, zip};

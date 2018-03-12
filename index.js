function * keyValues(obj) {
    for (const key of Object.keys(obj)) {
        yield [key, obj[key]];
    }
}

function * enumerate(iterable) {
    let index = 0;
    for (const element of iterable) {
        yield [index, element];
        index++;
    }
}

function * zip(iterFirst, iterSecond) {
    iterFirst = Array.from(iterFirst);
    let index = 0;
    for (const element of iterSecond) {
        if (index >= iterFirst.length) {
            break;
        }
        yield [iterFirst[index], element];
        index++;
    }
}

module.exports = {keyValues, enumerate, zip};

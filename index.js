class Generator {
    constructor(generatorFn) {
        this[Symbol.iterator] = generatorFn;
    }

    map(callbackFn) {
        const result = [];
        for (const element of this) {
            result.push(callbackFn(element));
        }
        return result;
    }

    filter(callbackFn) {
        const result = [];
        for (const element of this) {
            if (callbackFn(element)) {
                result.push(element);
            }
        }
        return result;
    }

    toArray() {
        return Array.from(this);
    }
}

function rangeSimple(stop) {
    return new Generator(function * () {
        for (let i = 0; i < stop; i++) {
            yield i;
        }
    });
}

function rangeOverload(start, stop, step = 1) {
    return new Generator(function * () {
        for (let i = start; i < stop; i += step) {
            yield i;
        }
    });
}

function range(...args) {
    if (args.length < 2) {
        return rangeSimple(...args);
    }
    return rangeOverload(...args);
}

function enumerate(iterable) {
    return new Generator(function * () {
        let index = 0;
        for (const element of iterable) {
            yield [index, element];
            index++;
        }
    });
}

function zip(iterFirst, iterSecond) {
    return new Generator(function * () {
        iterFirst = Array.from(iterFirst);
        let index = 0;
        for (const element of iterSecond) {
            if (index >= iterFirst.length) {
                break;
            }
            yield [iterFirst[index], element];
            index++;
        }
    });
}

function items(obj) {
    let {keys, get} = obj;
    if (obj instanceof Map) {
        keys = keys.bind(obj);
        get = get.bind(obj);
    } else {
        keys = function () {
            return Object.keys(obj);
        };
        get = function (key) {
            return obj[key];
        };
    }
    return new Generator(function * () {
        for (const key of keys()) {
            yield [key, get(key)];
        }
    });
}

module.exports = {Generator, range, enumerate, zip, items};

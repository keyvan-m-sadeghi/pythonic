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

function * keyValues(obj) {
    for (const key of Object.keys(obj)) {
        yield [key, obj[key]];
    }
}

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

const rangeGeneratorWithStop = stop => function * () {
    for (let i = 0; i < stop; i++) {
        yield i;
    }
};

const rangeGeneratorWithSartAndStopAndStep = (start, stop, step = 1) => function * () {
    for (let i = start; i < stop; i += step) {
        yield i;
    }
};

function range(...args) {
    if (args.length < 2) {
        return new Generator(rangeGeneratorWithStop(...args));
    }
    return new Generator(rangeGeneratorWithSartAndStopAndStep(...args));
}

module.exports = {range, enumerate, zip, keyValues, Generator};

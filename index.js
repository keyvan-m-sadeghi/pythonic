class Generator {
    constructor(generatorFunction) {
        this[Symbol.iterator] = generatorFunction;
    }

    async * [Symbol.asyncIterator]() {
        for (const element of this) {
            yield await element;
        }
    }

    map(callback) {
        const result = [];
        for (const element of this) {
            result.push(callback(element));
        }

        return result;
    }

    filter(callback) {
        const result = [];
        for (const element of this) {
            if (callback(element)) {
                result.push(element);
            }
        }

        return result;
    }

    reduce(callback, initialValue) {
        let empty = typeof initialValue === 'undefined';
        let accumulator = initialValue;
        let index = 0;
        for (const currentValue of this) {
            if (empty) {
                accumulator = currentValue;
                empty = false;
                continue;
            }

            accumulator = callback(accumulator, currentValue, index, this);
            index++;
        }

        if (empty) {
            throw new TypeError('Reduce of empty Generator with no initial value');
        }

        return accumulator;
    }

    some(callback) {
        for (const element of this) {
            if (callback(element)) {
                return true;
            }
        }

        return false;
    }

    every(callback) {
        let result = true;
        for (const element of this) {
            result = result && callback(element);
        }

        return result;
    }

    static fromIterable(iterable) {
        return new Generator(function * () {
            for (const element of iterable) {
                yield element;
            }
        });
    }

    toArray() {
        return Array.from(this);
    }

    next() {
        if (!this.currentInvokedGenerator) {
            this.currentInvokedGenerator = this[Symbol.iterator]();
        }

        return this.currentInvokedGenerator.next();
    }

    reset() {
        delete this.currentInvokedGenerator;
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

const zip = longest => (...iterables) => {
    if (iterables.length < 2) {
        throw new TypeError(`zip takes 2 iterables at least, ${iterables.length} given`);
    }

    return new Generator(function * () {
        const generators = iterables.map(iterable => Generator.fromIterable(iterable));
        while (true) {
            const row = generators.map(generator => generator.next());
            const check = longest ? row.every.bind(row) : row.some.bind(row);
            if (check(next => next.done)) {
                return;
            }

            yield row.map(next => next.value);
        }
    });
};

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

module.exports = {Generator, range, enumerate, zip: zip(false), zipLongest: zip(true), items};


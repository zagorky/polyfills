require('../src/myReduce');

describe('Array.prototype.myReduce polyfill', () => {
    // Сохраняем оригинальный метод reduce на случай, если он существует
    const originalReduce = Array.prototype.reduce;

    beforeAll(() => {
        // На время тестов отключаем оригинальный reduce (если есть)
        if (originalReduce) {
            Array.prototype.reduce = undefined;
        }
    });

    afterAll(() => {
        // Восстанавливаем оригинальный reduce после тестов
        if (originalReduce) {
            Array.prototype.reduce = originalReduce;
        }
    });

    test('should sum numbers with initial value', () => {
        const arr = [1, 2, 3, 4];
        const sum = arr.myReduce((acc, val) => acc + val, 0);
        expect(sum).toBe(10);
    });

    test('should sum numbers without initial value', () => {
        const arr = [1, 2, 3, 4];
        const sum = arr.myReduce((acc, val) => acc + val);
        expect(sum).toBe(10);
    });

    test('should concatenate strings', () => {
        const arr = ['a', 'b', 'c'];
        const result = arr.myReduce((acc, val) => acc + val, '');
        expect(result).toBe('abc');
    });

    test('should flatten arrays', () => {
        const arr = [[0, 1], [2, 3], [4, 5]];
        const flattened = arr.myReduce((acc, val) => acc.concat(val), []);
        expect(flattened).toEqual([0, 1, 2, 3, 4, 5]);
    });

    test('should work with sparse arrays', () => {
        const arr = [1, , 3]; // eslint-disable-line no-sparse-arrays
        const result = arr.myReduce((acc, val) => (acc === undefined ? val : acc + val));
        expect(result).toBe(4);
    });

    test('should throw on empty array with no initial value', () => {
        const arr = [];
        expect(() => arr.myReduce((acc, val) => acc + val)).toThrow(TypeError);
    });

    test('should work with empty array and initial value', () => {
        const arr = [];
        const result = arr.myReduce((acc, val) => acc + val, 42);
        expect(result).toBe(42);
    });

    test('should pass correct arguments to callback', () => {
        const arr = [1, 2, 3];
        const mockCallback = jest.fn((acc, val, idx, array) => acc + val);
        arr.myReduce(mockCallback, 0);

        expect(mockCallback.mock.calls.length).toBe(3);
        expect(mockCallback.mock.calls[0]).toEqual([0, 1, 0, arr]);
        expect(mockCallback.mock.calls[1]).toEqual([1, 2, 1, arr]);
        expect(mockCallback.mock.calls[2]).toEqual([3, 3, 2, arr]);
    });

    test('should throw if called on null or undefined', () => {
        expect(() => Array.prototype.myReduce.call(null, () => {})).toThrow(TypeError);
        expect(() => Array.prototype.myReduce.call(undefined, () => {})).toThrow(TypeError);
    });

    test('should throw if callback is not a function', () => {
        const arr = [1, 2, 3];
        expect(() => arr.myReduce(null)).toThrow(TypeError);
        expect(() => arr.myReduce(42)).toThrow(TypeError);
        expect(() => arr.myReduce('not a function')).toThrow(TypeError);
    });


});
const myMemoization = require('../src/myMemoization');

describe('myMemoization', () => {
    it('should cache and return the same result for the same arguments', () => {
        const mockFn = jest.fn((x) => x * 2);
        const memoizedFn = myMemoization(mockFn);

        const firstResult = memoizedFn(5);
        const secondResult = memoizedFn(5);

        expect(firstResult).toBe(10);
        expect(secondResult).toBe(10);
        expect(mockFn).toHaveBeenCalledTimes(1); // Original function called only once
    });

    it('should handle multiple different arguments correctly', () => {
        const mockFn = jest.fn((a, b) => a + b);
        const memoizedFn = myMemoization(mockFn);

        const result1 = memoizedFn(2, 3);
        const result2 = memoizedFn(4, 5);
        const result3 = memoizedFn(2, 3); // Should use cache

        expect(result1).toBe(5);
        expect(result2).toBe(9);
        expect(result3).toBe(5);
        expect(mockFn).toHaveBeenCalledTimes(2); // Called for (2,3) and (4,5)
    });

    it('should work with complex objects as arguments', () => {
        const mockFn = jest.fn((obj) => Object.keys(obj).length);
        const memoizedFn = myMemoization(mockFn);

        const obj1 = { a: 1, b: 2 };
        const obj2 = { a: 1, b: 2 }; // Same content, different reference

        const result1 = memoizedFn(obj1);
        const result2 = memoizedFn(obj2);

        expect(result1).toBe(2);
        expect(result2).toBe(2);
        expect(mockFn).toHaveBeenCalledTimes(1); // Should use cache for same content
    });

    it('should maintain proper this binding', () => {
        const obj = {
            value: 10,
            multiply: function(x) { return this.value * x; }
        };

        obj.memoizedMultiply = myMemoization(obj.multiply);

        const result = obj.memoizedMultiply(5);
        expect(result).toBe(50);
    });

    it('should handle different argument orders as different cache entries', () => {
        const mockFn = jest.fn((a, b) => a - b);
        const memoizedFn = myMemoization(mockFn);

        const result1 = memoizedFn(5, 3);
        const result2 = memoizedFn(3, 5);

        expect(result1).toBe(2);
        expect(result2).toBe(-2);
        expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('should handle functions with no arguments', () => {
        let counter = 0;
        const fn = () => ++counter;
        const memoizedFn = myMemoization(fn);

        expect(memoizedFn()).toBe(1);
        expect(memoizedFn()).toBe(1); // Should return cached result
        expect(counter).toBe(1); // Original function called only once
    });

});
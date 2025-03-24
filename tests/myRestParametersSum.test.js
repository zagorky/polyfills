const myRestParametersSum = require('../src/myRestParametersSum')

describe("myRestParametersSum", () => {
    test("should return 0 when no arguments are provided", () => {
        expect(myRestParametersSum()).toBe(0);
    });

    test("should return the sum of positive numbers", () => {
        expect(myRestParametersSum(1, 2, 3, 4, 5)).toBe(15);
    });

    test("should return the sum of negative numbers", () => {
        expect(myRestParametersSum(-1, -2, -3, -4, -5)).toBe(-15);
    });

    test("should return the correct sum for mixed positive and negative numbers", () => {
        expect(myRestParametersSum(-10, 5, 3, -2, 4)).toBe(0);
    });

    test("should return the sum of floating point numbers", () => {
        expect(myRestParametersSum(1.5, 2.5, 3.5)).toBeCloseTo(7.5);
    });

    test("should handle a single argument correctly", () => {
        expect(myRestParametersSum(42)).toBe(42);
    });
});

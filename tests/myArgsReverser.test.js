const myArgsReverser = require("../src/myArgsReverser.js");

describe("myArgsReverser", () => {
    test("should reverse arguments before passing to the original function", () => {
        const concat = (a, b, c) => `${a}-${b}-${c}`;
        const reversedConcat = myArgsReverser(concat);

        expect(reversedConcat("one", "two", "three")).toBe("three-two-one");
    });

    test("should work with a single argument", () => {
        const echo = (x) => x;
        const reversedEcho = myArgsReverser(echo);

        expect(reversedEcho("hello")).toBe("hello");
    });

    test("should work with no arguments", () => {
        const noArgs = () => "no args";
        const reversedNoArgs = myArgsReverser(noArgs);

        expect(reversedNoArgs()).toBe("no args");
    });

    test("should correctly reverse numbers", () => {
        const subtract = (a, b) => a - b;
        const reversedSubtract = myArgsReverser(subtract);

        expect(reversedSubtract(10, 5)).toBe(-5); // 5 - 10 = -5
    });


});

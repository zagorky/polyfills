const myObjectFreezeDeep  = require('../src/myObjectFreezeDeep');

describe("myObjectFreezeDeep", () => {
    test("should freeze a simple object", () => {
        const obj = { a: 1, b: 2 };
        myObjectFreezeDeep(obj);

        expect(Object.isFrozen(obj)).toBe(true);
    });

    test("should deeply freeze a nested object", () => {
        const obj = { a: 1, b: { c: 2, d: { e: 3 } } };
        myObjectFreezeDeep(obj);

        expect(Object.isFrozen(obj)).toBe(true);
        expect(Object.isFrozen(obj.b)).toBe(true);
        expect(Object.isFrozen(obj.b.d)).toBe(true);
    });

    test("should prevent modifications to the frozen object", () => {
        const obj = { a: 1, b: { c: 2 } };
        myObjectFreezeDeep(obj);

        obj.a = 10;
        obj.b.c = 20;

        expect(obj.a).toBe(1);
        expect(obj.b.c).toBe(2);
    });

    test("should prevent adding new properties to the frozen object", () => {
        const obj = { a: 1, b: { c: 2 } };
        myObjectFreezeDeep(obj);

        obj.newProp = 100;
        obj.b.newNestedProp = 200;

        expect(obj.newProp).toBeUndefined();
        expect(obj.b.newNestedProp).toBeUndefined();
    });

    test("should not freeze non-object values", () => {
        expect(myObjectFreezeDeep(null)).toBe(null);
        expect(myObjectFreezeDeep(undefined)).toBe(undefined);
        expect(myObjectFreezeDeep(42)).toBe(42);
        expect(myObjectFreezeDeep("string")).toBe("string");
    });

    test("should handle arrays correctly", () => {
        const arr = [1, [2, [3]]];
        myObjectFreezeDeep(arr);

        expect(Object.isFrozen(arr)).toBe(true);
        expect(Object.isFrozen(arr[1])).toBe(true);
        expect(Object.isFrozen(arr[1][1])).toBe(true);

        arr[0] = 10;
        arr[1][0] = 20;
        arr.push(4);

        expect(arr[0]).toBe(1);
        expect(arr[1][0]).toBe(2);
        expect(arr.length).toBe(2);
    });
});

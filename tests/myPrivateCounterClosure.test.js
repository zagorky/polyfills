const myPrivateCounterClosure = require('../src/myPrivateCounterClosure')

describe("myPrivateCounterClosure", () => {
    let counter;

    beforeEach(() => {
        counter = myPrivateCounterClosure(); // Создаем новый экземпляр перед каждым тестом
    });

    test("should initialize counter at 0", () => {
        expect(counter.getValue()).toBe(0);
    });

    test("should increment the counter", () => {
        counter.increment();
        expect(counter.getValue()).toBe(1);
        counter.increment();
        expect(counter.getValue()).toBe(2);
    });

    test("should decrement the counter", () => {
        counter.increment();
        counter.increment();
        counter.decrement();
        expect(counter.getValue()).toBe(1);
    });

    test("should reset the counter to 0", () => {
        counter.increment();
        counter.increment();
        counter.reset();
        expect(counter.getValue()).toBe(0);
    });

    test("should not allow direct modification of the counter", () => {
        expect(counter.counter).toBeUndefined(); // Прямой доступ к `counter` невозможен
    });
});

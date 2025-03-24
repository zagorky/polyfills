require('../src/myCustomFilter');
describe('Array.prototype.myCustomFilter', () => {
  test('filters out odd numbers', () => {
    const numbers = [1, 2, 3, 4, 5, 6];
    expect(numbers.myCustomFilter((num) => num % 2 === 0)).toEqual([2, 4, 6]);
  });

  test('filters numbers greater than 10', () => {
    const numbers = [5, 10, 15, 20, 25];
    expect(numbers.myCustomFilter((num) => num <= 10)).toEqual([5, 10]);
  });

  test('returns an empty array if no elements match the condition', () => {
    const numbers = [1, 3, 5, 7];
    expect(numbers.myCustomFilter((num) => num % 2 === 0)).toEqual([]);
  });

  test('works with an empty array', () => {
    expect([].myCustomFilter((num) => num > 0)).toEqual([]);
  });

  test('filters objects in an array', () => {
    const users = [
      { name: 'Alice', active: true },
      { name: 'Bob', active: false },
      { name: 'Charlie', active: true },
    ];
    expect(users.myCustomFilter((user) => user.active)).toEqual([
      { name: 'Alice', active: true },
      { name: 'Charlie', active: true },
    ]);
  });

  test('correctly passes index and array arguments to callback', () => {
    const numbers = [10, 20, 30];
    const mockCallback = jest.fn((num, index, array) => index === 1);

    const result = numbers.myCustomFilter(mockCallback);
    expect(result).toEqual([20]);

    // Проверяем, что callback был вызван для каждого элемента
    expect(mockCallback).toHaveBeenNthCalledWith(1, 10, 0, numbers);
    expect(mockCallback).toHaveBeenNthCalledWith(2, 20, 1, numbers);
    expect(mockCallback).toHaveBeenNthCalledWith(3, 30, 2, numbers);
  });

  test('uses the provided thisArg correctly', () => {
    const obj = { threshold: 10 };
    const numbers = [5, 10, 15, 20];

    function filterFn(num) {
      return num > this.threshold;
    }

    expect(numbers.myCustomFilter(filterFn, obj)).toEqual([15, 20]);
  });

  test('throws a TypeError when callback is not a function', () => {
    expect(() => [1, 2, 3].myCustomFilter(null)).toThrow(TypeError);
    expect(() => [1, 2, 3].myCustomFilter(42)).toThrow(TypeError);
    expect(() => [1, 2, 3].myCustomFilter('not a function')).toThrow(TypeError);
  });

  test('skips empty slots in sparse arrays', () => {
    const arr = [1, , 3, , 5]; // Sparse array
    const mockCallback = jest.fn((num) => num > 2);
    const result = arr.myCustomFilter(mockCallback);

    expect(result).toEqual([3, 5]);

    // Проверяем, что callback не вызывается для пропущенных индексов
    expect(mockCallback).toHaveBeenCalledTimes(3);
    expect(mockCallback).toHaveBeenNthCalledWith(1, 1, 0, arr);
    expect(mockCallback).toHaveBeenNthCalledWith(2, 3, 2, arr);
    expect(mockCallback).toHaveBeenNthCalledWith(3, 5, 4, arr);
  });
});

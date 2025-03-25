const myArrayChunker = require('../src/myArrayChunker');

// Test suite for myArrayChunker
describe('myArrayChunker', () => {
  // Basic functionality tests
  it('should chunk an array into specified size', () => {
    expect(myArrayChunker([1, 2, 3, 4], 2)).toEqual([
      [1, 2],
      [3, 4],
    ]);
    expect(myArrayChunker([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    expect(myArrayChunker([1, 2, 3, 4, 5, 6], 3)).toEqual([
      [1, 2, 3],
      [4, 5, 6],
    ]);
  });

  // Edge cases
  it('should return empty array when input array is empty', () => {
    expect(myArrayChunker([], 2)).toEqual([]);
  });

  it('should handle chunk size larger than array length', () => {
    expect(myArrayChunker([1, 2, 3], 5)).toEqual([[1, 2, 3]]);
  });

  it('should handle chunk size equal to array length', () => {
    expect(myArrayChunker([1, 2, 3], 3)).toEqual([[1, 2, 3]]);
  });

  it('should handle chunk size of 1', () => {
    expect(myArrayChunker([1, 2, 3], 1)).toEqual([[1], [2], [3]]);
  });

  // Error cases
  it('should throw error when first argument is not an array', () => {
    expect(() => myArrayChunker('not an array', 2)).toThrow(TypeError);
    expect(() => myArrayChunker(123, 2)).toThrow(TypeError);
    expect(() => myArrayChunker(null, 2)).toThrow(TypeError);
    expect(() => myArrayChunker(undefined, 2)).toThrow(TypeError);
    expect(() => myArrayChunker({}, 2)).toThrow(TypeError);
  });

  it('should throw error when size is not a positive number', () => {
    expect(() => myArrayChunker([1, 2, 3], 0)).toThrow(TypeError);
    expect(() => myArrayChunker([1, 2, 3], -1)).toThrow(TypeError);
    expect(() => myArrayChunker([1, 2, 3], '2')).toThrow(TypeError);
    expect(() => myArrayChunker([1, 2, 3], NaN)).toThrow(TypeError);
  });

  // Additional test cases
  it('should work with different data types', () => {
    expect(myArrayChunker(['a', 'b', 'c', 'd'], 2)).toEqual([
      ['a', 'b'],
      ['c', 'd'],
    ]);
    expect(myArrayChunker([true, false, true, false], 1)).toEqual([
      [true],
      [false],
      [true],
      [false],
    ]);
    expect(myArrayChunker([{ a: 1 }, { b: 2 }, { c: 3 }], 2)).toEqual([
      [{ a: 1 }, { b: 2 }],
      [{ c: 3 }],
    ]);
  });

  it('should not modify the original array', () => {
    const original = [1, 2, 3, 4];
    const chunked = myArrayChunker(original, 2);
    expect(original).toEqual([1, 2, 3, 4]);
  });
});

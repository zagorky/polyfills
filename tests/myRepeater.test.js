require('../src/myRepeater')

describe('myRepeater', () => {
    // Базовые случаи
    it('должен повторять строку указанное количество раз', () => {
        expect('abc'.myRepeater(3)).toBe('abcabcabc');
        expect('hello '.myRepeater(2)).toBe('hello hello ');
    });

    it('должен возвращать пустую строку, если количество повторений равно 0', () => {
        expect('abc'.myRepeater(0)).toBe('');
        expect(''.myRepeater(0)).toBe('');
    });

    // Граничные случаи
    it('должен возвращать исходную строку, если количество повторений равно 1', () => {
        expect('abc'.myRepeater(1)).toBe('abc');
        expect('test'.myRepeater(1)).toBe('test');
    });

    it('должен возвращать пустую строку, если исходная строка пуста', () => {
        expect(''.myRepeater(5)).toBe('');
    });

    // Обработка ошибок
    it('должен выбрасывать ошибку, если количество повторений отрицательное', () => {
        expect(() => 'abc'.myRepeater(-1)).toThrow(RangeError);
        expect(() => 'test'.myRepeater(-10)).toThrow(RangeError);
    });

    it('должен выбрасывать ошибку, если количество повторений не целое число', () => {
        expect(() => 'abc'.myRepeater(2.5)).toThrow(RangeError);
        expect(() => 'test'.myRepeater(Infinity)).toThrow(RangeError);
    });

    // Дополнительные проверки
    it('должен корректно работать с пробелами и спецсимволами', () => {
        expect(' '.myRepeater(3)).toBe('   ');
        expect('\n'.myRepeater(2)).toBe('\n\n');
    });
});
require('../src/myPadStart')

describe('String.prototype.myPadStart', () => {
    // Базовые случаи
    it('должен дополнять строку до указанной длины заданным символом', () => {
        expect('abc'.myPadStart(5, 'x')).toBe('xxabc');
        expect('42'.myPadStart(5, '0')).toBe('00042');
    });

    it('должен использовать пробел по умолчанию, если символ не указан', () => {
        expect('hi'.myPadStart(4)).toBe('  hi');
        expect('test'.myPadStart(6)).toBe('  test');
    });

    // Граничные случаи
    it('должен возвращать исходную строку, если длина меньше или равна текущей', () => {
        expect('abc'.myPadStart(2, 'x')).toBe('abc');
        expect(''.myPadStart(0)).toBe('');
    });

    it('должен корректно обрабатывать пустую строку', () => {
        expect(''.myPadStart(3, 'a')).toBe('aaa');
        expect(''.myPadStart(0)).toBe('');
    });

    it('должен обрезать строку заполнения, если она длиннее 1 символа', () => {
        expect('abc'.myPadStart(6, '123')).toBe('123abc');
        expect('x'.myPadStart(4, 'ab')).toBe('abax');
    });

    // Обработка ошибок
    it('должен выбрасывать ошибку, если длина не является числом', () => {
        expect(() => 'abc'.myPadStart('5', 'x')).toThrow(TypeError);
        expect(() => 'test'.myPadStart(null, 'y')).toThrow(TypeError);
    });

    it('должен выбрасывать ошибку, если fillString не является строкой', () => {
        expect(() => 'abc'.myPadStart(5, 123)).toThrow(TypeError);
        expect(() => 'x'.myPadStart(3, true)).toThrow(TypeError);
    });

    // Специальные символы
    it('должен корректно работать с Unicode и спецсимволами', () => {
        expect('★'.myPadStart(3, '♫')).toBe('♫♫★');
        expect('\n'.myPadStart(2, '\t')).toBe('\t\n');
    });
});
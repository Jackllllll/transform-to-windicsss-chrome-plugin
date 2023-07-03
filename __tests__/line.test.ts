import {line} from '../src/transform/line';
import {getVal, transformImportant} from '../src/utils';

jest.mock('../src/utils', () => ({
    getVal: jest.fn(),
    transformImportant: jest.fn(),
}));

describe('line', () => {
    beforeEach(() => {
        // Reset mocked functions before each test
        jest.resetAllMocks();
    });

    it('should return the correct string', () => {
        const key = 'line-height';
        const val = '1.5';
        const value = '1.5';
        const important = '!important';
        const expected = `lh${value}${important}`;

        (transformImportant as jest.Mock<[string, string]>).mockReturnValueOnce([value, important]);
        (getVal as jest.Mock<string>).mockReturnValueOnce(value);

        const result = line(key, val);

        expect(result).toEqual(expected);
        expect(transformImportant).toHaveBeenCalledWith(val);
        expect(getVal).toHaveBeenCalledWith(value);
    });

});

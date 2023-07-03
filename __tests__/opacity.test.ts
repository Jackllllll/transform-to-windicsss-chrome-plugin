import {opacity} from '../src/transform/opacity';
import {isPercent, transformImportant} from '../src/utils';

jest.mock('../src/utils', () => ({
    isPercent: jest.fn(),
    transformImportant: jest.fn(),
}));

describe('opacity', () => {
    beforeEach(() => {
        // Reset mocked functions before each test
        jest.resetAllMocks();
    });

    it('should return the correct string when value is a percentage', () => {
        const key = 'opacity';
        const val = '50%';
        const value = '50%';
        const important = '';
        const expected = `op-${value.replace('%', '')}${important}`;

        (transformImportant as jest.Mock<[string, string]>).mockReturnValueOnce([value, important]);
        (isPercent as jest.Mock<boolean>).mockReturnValueOnce(true);

        const result = opacity(key, val);

        expect(result).toEqual(expected);
        expect(transformImportant).toHaveBeenCalledWith(val);
        expect(isPercent).toHaveBeenCalledWith(val);
    });

    it('should return the correct string when value is not a percentage', () => {
        const key = 'opacity';
        const val = '0.5';
        const value = '0.5';
        const important = '!important';
        const expected = `op-${+value * 100}${important}`;

        (transformImportant as jest.Mock<[string, string]>).mockReturnValueOnce([value, important]);
        (isPercent as jest.Mock<boolean>).mockReturnValueOnce(false);

        const result = opacity(key, val);

        expect(result).toEqual(expected);
        expect(transformImportant).toHaveBeenCalledWith(val);
        expect(isPercent).toHaveBeenCalledWith(val);
    });
});

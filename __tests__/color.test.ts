import {color} from '../src/transform/color';
import {getVal, transformImportant} from '../src/utils';

jest.mock('../src/utils', () => ({
    getVal: jest.fn(),
    transformImportant: jest.fn(),
}));

describe('color', () => {
    it('returns the correct string', () => {
        const key = 'color';
        const val = '#fff';
        const value = '-[#fff]';

        (transformImportant as jest.Mock<[string, string]>).mockReturnValueOnce([value, '!']);

        (getVal as jest.Mock<string>).mockReturnValueOnce(value);


        // Exercise
        const result = color(key, val);

        // Verify
        expect(result).toBe('text-[#fff]!');

        jest.resetAllMocks();
    });
});

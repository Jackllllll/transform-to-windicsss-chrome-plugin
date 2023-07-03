import {text} from '../src/transform/text'; // Replace 'your-module' with the actual module path
import {transformImportant} from '../src/utils';
jest.mock('../src/utils', () => ({
    transformImportant: jest.fn(),
}));

describe('text', () => {
    beforeEach(() => {
        // Reset mocked functions before each test
        jest.resetAllMocks();
    });

    it('should return the correct string for "text-decoration-line" key with value "none"', () => {
        const key = 'text-decoration-line';
        const val = 'none';
        const value = 'none';
        const important = '';
        const expected = `no-underline${important}`;

        (transformImportant as jest.Mock<[string, string]>).mockReturnValueOnce([value, important]);

        const result = text(key, val);

        expect(result).toEqual(expected);
        expect(transformImportant).toHaveBeenCalledWith(val);
    });

    it('should return the correct string for "text-decoration-line" key with other values', () => {
        const key = 'text-decoration-line';
        const val = 'underline';
        const value = 'underline';
        const important = '';
        const expected = `${value}${important}`;

        (transformImportant as jest.Mock<[string, string]>).mockReturnValueOnce([value, important]);

        const result = text(key, val);

        expect(result).toEqual(expected);
        expect(transformImportant).toHaveBeenCalledWith(val);
    });

    it('should return the correct string for "text-transform" key with value "none"', () => {
        const key = 'text-transform';
        const val = 'none';
        const value = 'none';
        const important = '';
        const expected = `normal-case${important}`;

        (transformImportant as jest.Mock<[string, string]>).mockReturnValueOnce([value, important]);

        const result = text(key, val);

        expect(result).toEqual(expected);
        expect(transformImportant).toHaveBeenCalledWith(val);
    });

    it('should return the correct string for "text-transform" key with other values', () => {
        const key = 'text-transform';
        const val = 'uppercase';
        const value = 'uppercase';
        const important = '';
        const expected = `${value}${important}`;

        (transformImportant as jest.Mock<[string, string]>).mockReturnValueOnce([value, important]);

        const result = text(key, val);

        expect(result).toEqual(expected);
        expect(transformImportant).toHaveBeenCalledWith(val);
    });
});

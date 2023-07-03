import {font} from '../src/transform/font'; //
import {transformImportant} from '../src/utils';


jest.mock('../src/utils', () => ({
    transformImportant: jest.fn(),
}));

describe('font', () => {
    beforeEach(() => {
        // Reset mocked functions before each test
        jest.resetAllMocks();
    });

    it('should return the correct string for "font-size" key', () => {
        const key = 'font-size';
        const val = '14px';
        const value = '14px';
        const important = '';
        const expected = `text-${value}${important}`;

        (transformImportant as jest.Mock<[string, string]>).mockReturnValueOnce([value, important]);

        const result = font(key, val);

        expect(result).toEqual(expected);
        expect(transformImportant).toHaveBeenCalledWith(val);
    });

    it('should return the correct string for "font-weight" key', () => {
        const key = 'font-weight';
        const val = 'bold';
        const value = 'bold';
        const important = '';
        const expected = `font-${value}${important}`;

        (transformImportant as jest.Mock<[string, string]>).mockReturnValueOnce([value, important]);

        const result = font(key, val);

        expect(result).toEqual(expected);
        expect(transformImportant).toHaveBeenCalledWith(val);
    });

    it('should return the correct string for "font-family" key with value starting with "ui-"', () => {
        const key = 'font-family';
        const val = 'ui-sans-serif';
        const value = 'ui-sans-serif';
        const important = '';
        const expected = `font-sans${important}`;

        (transformImportant as jest.Mock<[string, string]>).mockReturnValueOnce([value, important]);

        const result = font(key, val);

        expect(result).toEqual(expected);
        expect(transformImportant).toHaveBeenCalledWith(val);
    });

    it('should return the correct string for "font-family" key with value not starting with "ui-"', () => {
        const key = 'font-family';
        const val = 'Arial, sans-serif';
        const value = 'Arial, sans-serif';
        const important = '';
        const expected = `font-Arial, sans-serif${important}`;

        (transformImportant as jest.Mock<[string, string]>).mockReturnValueOnce([value, important]);

        const result = font(key, val);

        expect(result).toEqual(expected);
        expect(transformImportant).toHaveBeenCalledWith(val);
    });

    it('text-20px', () => {
        const key = 'font-size';
        const val = '20px';
        const value = '20px';
        const important = '';

        (transformImportant as jest.Mock<[string, string]>).mockReturnValueOnce([value, important]);

        const result = font(key, val);

        expect(result).toEqual('text-20px');
    });

});

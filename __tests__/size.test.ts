import {size} from '../src/transform/size'; // Replace 'your-module' with the actual module path
import {getVal, transformImportant} from '../src/utils';
jest.mock('../src/utils', () => ({
    getVal: jest.fn(),
    transformImportant: jest.fn(),
}));

describe('size', () => {
    it('width', () => {
        const key = 'width';
        const val = '16px';
        const mockValue = '-16px';
        const important = '';

        (transformImportant as jest.Mock<[string, string]>).mockReturnValueOnce([mockValue, important]);
        (getVal as jest.Mock<string>).mockReturnValueOnce(mockValue);
        const result = size(key, val);

        expect(result).toEqual('w-16px');
    });

    it('height', () => {
        const key = 'height';
        const val = '16px';
        const mockValue = '-16px';
        const important = '';

        (transformImportant as jest.Mock<[string, string]>).mockReturnValueOnce([mockValue, important]);
        (getVal as jest.Mock<string>).mockReturnValueOnce(mockValue);
        const result = size(key, val);

        expect(result).toEqual('h-16px');
    });
});
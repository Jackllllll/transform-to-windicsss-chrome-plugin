import {border} from '../src/transform/border'; // Replace 'your-module' with the actual module path
import {
    getVal,
    isCalc,
    joinWithUnderLine,
    transformImportant,
    trim
} from '../src/utils';

jest.mock('../src/utils', () => ({
    getVal: jest.fn(),
    isCalc: jest.fn(),
    joinWithUnderLine: jest.fn(),
    transformImportant: jest.fn(),
    trim: jest.fn()
}));

describe('border', () => {
    beforeEach(() => {
    // Reset mocked functions before each test
        jest.resetAllMocks();
    });

    it('should return the correct string for key "border-spacing"', () => {
        const value = '1px';
        const important = '';
        const joinedValue = '1_px'; // Replace with expected joined value

        (transformImportant as jest.Mock<[string, string]>).mockReturnValueOnce([value, important]);
        (joinWithUnderLine as jest.Mock<string>).mockReturnValueOnce(joinedValue);

        const result = border('border-spacing', value);
        expect(result).toEqual(`border-spacing="[${joinedValue}]${important}"`);

        expect(transformImportant).toHaveBeenCalledWith(value);
        expect(joinWithUnderLine).toHaveBeenCalledWith(value);
    });
    it('border-[3px] border-[solid] border-[#666666]', () => {
        const value = '3px solid #666666';
        const important = '';
        const key = 'border';

        (transformImportant as jest.Mock<[string, string]>).mockReturnValueOnce([value, important]);

        const result = border(key, value);
        expect(result).toBe('border-[3px] border-[solid] border-[#666666]');
    });

    it('border-rd-[24px_24px_0px_0px]', () => {
        const value = '24px 24px 0px 0px';
        const key = 'border-radius';
        const important = '';

        (transformImportant as jest.Mock<[string, string]>).mockReturnValueOnce([value, important]);
        (joinWithUnderLine as jest.Mock<string>).mockReturnValueOnce('24px_24px_0px_0px');

        const result = border(key, value);
        expect(result).toBe('border-rd-[24px_24px_0px_0px]');
    });
});

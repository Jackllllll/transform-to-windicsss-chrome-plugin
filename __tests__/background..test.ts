import {getLinearGradientPosition, transformSpaceToLine, background, linearGradientAleat} from '../src/transform/background';
// 暂时保存原始的 console.log
const originalConsoleLog = console.log;
describe('CSS Background Property Utility', () => {
    beforeEach(() => {
        // 用 jest 的 mock 函数替换 console.log
        console.log = jest.fn();
    });
    afterEach(() => {
        // 测试结束后恢复原始的 console.log
        console.log = originalConsoleLog;
    });

    describe('getLinearGradientPosition', () => {
        it('should return correct position for given from, via and to values', () => {
            const from = 'rgb(255, 255, 255) 0%';
            const via = 'rgb(0, 0, 0) 50%';
            const to = 'rgb(255, 255, 255) 100%';

            const result = getLinearGradientPosition(from, via, to);

            expect(result).toBe(' from="[rgb(255,255,255)] 0%" via="[rgb(0,0,0)] 50%" to="[rgb(255,255,255)] 100%"');
        });
    });

    describe('transformSpaceToLine', () => {
        it('should replace spaces with hyphen', () => {
            const input = 'some string with spaces';

            const result = transformSpaceToLine(input);

            expect(result).toBe('some-string-with-spaces');
        });
    });

    describe('background', () => {
        it('should return correct bg classes for given key and value', () => {
            let key = 'background-color';
            let val = 'red!important';

            let result = background(key, val);

            expect(result).toBe('bg-red!');

            key = 'background';
            val = 'linear-gradient(to right, red 0%, green 33%, blue 66%)';
            const message = 'unocss 目前无没有完全等效的 linear-gradient incalss 设置,请使用 css 其他方法实现';
            result = background(key, val);
            expect(console.log).toHaveBeenCalledWith(message);
        });
    });
});

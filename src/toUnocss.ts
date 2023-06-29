import {getFirstName} from './utils';
import {color} from './transform/color';
import {size} from './transform/size';
import {font} from './transform/font';
import {line} from './transform/line';
import {opacity} from './transform/opacity';
import {text} from './transform/text';
import {background} from './transform/background';
import {border} from './transform/border';
import {backdrop} from './transform/backdrop';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const typeMap: any = {
    color,
    width: size,
    height: size,
    font,
    line,
    opacity,
    text,
    background,
    border,
    backdrop
};
// eslint-disable-next-line no-useless-escape
export const splitReg = /([\w-]+)\s*:\s*([.\w\(\)-\s%+'",#\/!]+)/;

export function toUnocss(css: String) {
    const match = css.match(splitReg);
    if (!match)
        return;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, key, val] = match;
    const first = getFirstName(key);
    return typeMap[first]?.(key, val);
}

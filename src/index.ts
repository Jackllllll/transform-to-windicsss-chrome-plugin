import {toUnocss, splitReg} from './toUnocss';
import {IGNORE_TYPE} from './constant';

function getSplitArray(str: string): string[] {
    if (!str) {
        return [];
    }
    return str.replace(/[\r\n]+/g, '').split(';');
}

function filterIngore(textGourp: string[]) {
    return textGourp.map(css => {
        const match = css.match(splitReg);
        if (!match) {
            return;
        }
        const [_, key] = match;
        if (IGNORE_TYPE.includes(key)) {
            return;
        }
        return css;
    }).filter(item => item);
}
function writeText(text: string) {
    navigator.clipboard.writeText(text);
}
function toWindcss(textGourp: string[]) {
    const windicssGroup = [];
    const textGourpFilterIngore = filterIngore(textGourp);

    for (let [, value] of textGourpFilterIngore.entries()) {
        if (!value) {
            continue;
        }
        const windicss = toUnocss(value);
        if (!windicss) {
            continue;
        }
        windicssGroup.push(windicss);
    }
    return windicssGroup;
}
function transformTowindicss(text: string) {
    const textGourp = getSplitArray(text);

    const windicssGroup = toWindcss(textGourp);

    return windicssGroup.join(' ');
}
async function handleClipboardEvent() {
    try {
        const text = await navigator.clipboard.readText();
        console.log('css:', text);
        const windicssText = transformTowindicss(text as string);
        await writeText(windicssText);
        console.log('windicss:', windicssText);
    } catch (err) {
        console.error('Failed to read clipboard contents:', err);
    }
}


document.addEventListener('copy', () => {
    handleClipboardEvent();
});
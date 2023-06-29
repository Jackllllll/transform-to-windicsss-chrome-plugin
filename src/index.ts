import {toUnocss, splitReg} from './toUnocss';
import {IGNORE_TYPE} from './constant';
import {poll} from './utils';

const button = '<button id="to-windicss">复制 windicss</button>';
const buttonStyles = {
    background: '#2878ff',
    fontSize: '20px',
    padding: '0 16px',
    borderRadius: '30px',
    color: '#fff'
};
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
async function handleClipboardEvent(text: string) {
    try {
        const textCopyValue = text ?? await navigator.clipboard.readText();
        console.log('css:', textCopyValue);
        const windicssText = transformTowindicss(textCopyValue as string);
        await writeText(windicssText);
        console.log('windicss:', windicssText);
    } catch (err) {
        console.error('Failed to read clipboard contents:', err);
    }
}

function handleCopyText() {
    const text = (document.querySelector('.language-css') as HTMLElement)?.innerText;
    handleClipboardEvent(text);

}
// 找到 operation-center ,然后插入 复制按钮
poll(function () {
    return document.querySelector('.operation-center');
}, 10000, 150).then(function (res) {
    res.insertAdjacentHTML('afterend', button);
    const butElement = document.querySelector('#to-windicss') as HTMLElement;
    butElement?.addEventListener('click', handleCopyText);
    Object.assign(butElement?.style, buttonStyles);
});
// document.addEventListener('copy', () => {
//     handleClipboardEvent();
// });
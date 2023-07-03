import {toUnocss, splitReg} from './toUnocss';
import {IGNORE_TYPE} from './constant';
import {button, buttonStyles, hostList, selector} from './config';

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

function insertWindicssButton(copyButton: Element) {
    copyButton.insertAdjacentHTML('beforebegin', button);
    const windButtonElement = document.querySelector(`#${selector}`) as HTMLElement;
    windButtonElement?.addEventListener('click', handleCopyText);
    Object.assign(windButtonElement?.style, buttonStyles);
}
function startObserving() {
    const observer = new MutationObserver((mutationsList: MutationRecord[]) => {
        for (const mutation of mutationsList) {
            const copyButton = document.querySelector('#copy_code');
            if (mutation.type === 'childList' && copyButton && !document.querySelector(`#${selector}`)) {
                // 找到蓝湖 copyButton，插入复制 windicss 按钮
                insertWindicssButton(copyButton);
            }
        }


    });

    const config = {childList: true, subtree: true};
    observer.observe(document.body, config);
}
function initPlugin() {
    const host = window.location.host;
    if (hostList.includes(host)) {
        // 监听页面
        startObserving();
    }
}
initPlugin();


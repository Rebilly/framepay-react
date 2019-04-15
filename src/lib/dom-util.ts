import { FRAMEPAY_SCRIPT_LINK, FRAMEPAY_STYLE_LINK } from './constants';

interface ScriptProperties {
    readonly onReady: () => void;
    readonly onError: () => void;
}

export const injectScript = ({ onReady, onError }: ScriptProperties) => {
    // tslint:disable:no-expression-statement
    const script = document.createElement('script');
    const header = document.querySelector('head');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('async', 'true');
    script.setAttribute('defer', 'true');
    script.setAttribute('src', FRAMEPAY_SCRIPT_LINK);
    script.setAttribute('defer', 'true');
    script.addEventListener('load', () => onReady());
    script.addEventListener('error', () => onError());
    if (header) {
        header.appendChild(script);
    }
    // tslint:enable:no-expression-statement
};

export const injectStyle = () => {
    // tslint:disable:no-expression-statement
    const style = document.createElement('link');
    const header = document.querySelector('head');
    style.setAttribute('rel', 'stylesheet');
    style.setAttribute('href', FRAMEPAY_STYLE_LINK);
    if (header) {
        header.appendChild(style);
    }
    // tslint:enable:no-expression-statement
};

import { FRAMEPAY_SCRIPT_LINK, FRAMEPAY_STYLE_LINK } from './constants';

interface ScriptProperties {
  readonly onReady: () => void,
  readonly onError: () => void
}

export const injectScript = ({ onReady, onError }: ScriptProperties) => {
  // tslint:disable:no-expression-statement
  const script = document.createElement('script');
  script.async = true;
  script.defer = true;
  script.src = FRAMEPAY_SCRIPT_LINK;
  script.type = 'text/javascript';
  script.onload = () => onReady();
  script.onerror = () => onError();
  // @ts-ignore
  document.querySelector('head')
    .appendChild(script);
  // tslint:enable:no-expression-statement
};

export const injectStyle = () => {
  // tslint:disable:no-expression-statement
  const style = document.createElement('link');
  style.rel = 'stylesheet';
  style.href = FRAMEPAY_STYLE_LINK;
  // @ts-ignore
  document.querySelector('head')
    .appendChild(style);
  // tslint:enable:no-expression-statement
};

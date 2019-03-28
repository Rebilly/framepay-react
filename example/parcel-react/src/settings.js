export default {
  injectScript: true,
  injectStyle: true,
  style: {
    base: {
      color: 'green',
      fontSize: '12px',
      webkitFontSmoothing: 'auto',
      fontFeatureSettings: 'test',
      fontStyle: 'italic',
      fontVariant: 'normal',
      fontStretch: 'none',
      fontSomething: 'not-included',
      fontOtherThing: 'not-included',
      lineHeight: '20px',
    },
    invalid: {
      fontWeight: 'bold',
    },
  },
  classes: {
    base: 'rebilly-framepay',
    focus: 'rebilly-framepay-focus',
    valid: 'rebilly-framepay-valid',
    invalid: 'rebilly-framepay-invalid',
    buttons: 'rebilly-framepay-buttons',
    webkitAutofill: 'rebilly-framepay-webkit-autofill',
  },
  icon: {
    foobar: 123,
    display: true,
    color: 'blue',
  },
};

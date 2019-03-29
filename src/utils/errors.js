export const ERROR_CODES = {
  // error with remote framepay script
  remoteScriptError: 'remote-script-error',
  cardMountError: 'card-mount-error',
  undefinedConfiguration: 'undefined-configuration',
};

const defaultErrorMessages = {
  [ERROR_CODES.remoteScriptError]: 'Can\'t to load the framepay remote script',
  [ERROR_CODES.cardMountError]: 'Can\'t to mount the card component',
  [ERROR_CODES.undefinedConfiguration]: [
    'Undefined FramePay configuration',
    'Please pass the config property in Provider',
    'See https://github.com/Rebilly/framepay-react/tree/alpha#the-framepay-context-framepayprovider',
    'See https://rebilly.github.io/framepay-docs/reference/rebilly.html#rebilly-initialize',
  ],
};

class ErrorBuilder {
  make({ code, details = null }) {
    return {
      code,
      details,
      message: defaultErrorMessages[code],
    };
  }
}

const handler = new ErrorBuilder();

export default ({ code, details }) => handler.make({
  code,
  details,
});

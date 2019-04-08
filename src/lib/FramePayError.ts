const ERROR_CODES = {
    elementMountError: 'element-mount-error',
    initializeError: 'initialize-error',
    remoteScriptError: 'remote-script-error'
};

const defaultErrorMessages = {
    [ERROR_CODES.remoteScriptError]: "Can't to load the framepay remote script",
    [ERROR_CODES.elementMountError]: "Can't to mount the element component",
    [ERROR_CODES.initializeError]: [
        'FramePay initialize error',
        'See https://github.com/Rebilly/framepay-react/tree/alpha#the-framepay-context-framepayprovider',
        'See https://rebilly.github.io/framepay-docs/reference/rebilly.html#rebilly-initialize'
    ]
};

class ErrorBuilder {
    // @ts-ignore
    make({ code, details, trace }) {
        return {
            code,
            details,
            message: defaultErrorMessages[code],
            trace: trace || null
        };
    }
}

const handler = new ErrorBuilder();

// @ts-ignore
const FramePayError = ({ code, details = '', trace = '' }) =>
    handler.make({
        code,
        details,
        trace
    });

FramePayError.codes = ERROR_CODES;

export default FramePayError;

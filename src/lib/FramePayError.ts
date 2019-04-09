const ERROR_CODES = {
    elementMountError: 'element-mount-error',
    initializeError: 'initialize-error',
    remoteScriptError: 'remote-script-error'
};

const defaultErrorMessages = {
    [ERROR_CODES.remoteScriptError]: "Can't load the FramePay remote script",
    [ERROR_CODES.elementMountError]: "Can't mount the element component",
    [ERROR_CODES.initializeError]: `
        FramePay initialize error\r\n
        See https://github.com/Rebilly/framepay-react/tree/alpha#the-framepay-context-framepayprovider\r\n
        See https://rebilly.github.io/framepay-docs/reference/rebilly.html#rebilly-initialize`
};

type valueof<T> = T[keyof T];
type ErrorCodeTypes = typeof ERROR_CODES;
type DefaultErrorMessageTypes = typeof defaultErrorMessages;

class ErrorBuilder {
    make({
        code,
        details,
        trace
    }: {
        readonly code: valueof<ErrorCodeTypes>;
        readonly details: string;
        readonly trace: any;
    }): {
        readonly code: valueof<ErrorCodeTypes>;
        readonly details: string;
        readonly message: valueof<DefaultErrorMessageTypes>;
        readonly trace: any;
    } {
        return {
            code,
            details,
            message: defaultErrorMessages[code],
            trace: trace || null
        };
    }
}

const handler = new ErrorBuilder();

const FramePayError = ({
    code,
    details = '',
    trace = ''
}: {
    readonly code: valueof<ErrorCodeTypes>;
    readonly details?: string;
    readonly trace?: any;
}) =>
    handler.make({
        code,
        details,
        trace
    });

FramePayError.codes = ERROR_CODES;

export default FramePayError;

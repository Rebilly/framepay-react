export const ERROR_CODES = {
    elementMountError: 'element-mount-error',
    initializeError: 'initialize-error',
    remoteScriptError: 'remote-script-error'
} as ErrorCodes;

export const defaultErrorMessages = {
    [ERROR_CODES.remoteScriptError]: "Can't load the FramePay remote script",
    [ERROR_CODES.elementMountError]: "Can't mount the element component",
    [ERROR_CODES.initializeError]: `
        FramePay initialize error\r\n
        See https://github.com/Rebilly/framepay-react/tree/alpha#the-framepay-context-framepayprovider\r\n
        See https://rebilly.github.io/framepay-docs/reference/rebilly.html#rebilly-initialize`
} as DefaultErrorMessages;

class ErrorBuilder {
    make({
        code,
        details,
        trace
    }: {
        readonly code: FramePayErrorCode;
        readonly details: string;
        readonly trace: any;
    }): {
        readonly code: FramePayErrorCode;
        readonly details: string;
        readonly message: DefaultErrorMessage;
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
    readonly code: FramePayErrorCode;
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

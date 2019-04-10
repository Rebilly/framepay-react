interface ErrorCodes {
    readonly elementMountError: string;
    readonly initializeError: string;
    readonly remoteScriptError: string;
}

interface DefaultErrorMessages {
    readonly [key: string]: string;
}

type FramePayErrorCode = valueof<ErrorCodes>;
type DefaultErrorMessage = valueof<DefaultErrorMessages>;

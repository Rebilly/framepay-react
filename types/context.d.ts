interface FramePayContext {
    readonly api: RebillyApi;
    readonly ready: boolean;
    readonly error: null | FramePayErrorCode;
}

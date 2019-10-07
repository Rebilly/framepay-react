interface ProviderProps extends FramePaySettings {
    readonly injectStyle?: boolean;
    readonly injectScript?: boolean;
    readonly onReady?: () => {};
    readonly onError?: (error: object) => {};
}

interface ProviderProps extends FramePaySettings {
    readonly injectStyle?: boolean;
    readonly injectScript?: boolean;
    readonly onReady?: () => void;
    readonly onError?: (error: object) => void;
}

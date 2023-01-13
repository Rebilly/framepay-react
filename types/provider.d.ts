interface ProviderProps extends FramePaySettings {
    children?: React.ReactNode | undefined;
    readonly injectStyle?: boolean;
    readonly injectScript?: boolean;
    readonly onReady?: () => void;
    readonly onError?: (error: object) => void;
    readonly onTokenReady?: (data: string) => void;
}

interface PaymentElementOnChangeEventData {
    readonly valid?: boolean;
    readonly error?: object;
    readonly source: string;
}

interface PaymentElement {
    readonly on: <T extends PaymentElementEvents>(
        eventType: T,
        callback: (
            data: T extends 'change'
                ? PaymentElementOnChangeEventData
                : undefined
        ) => void
    ) => void;
    readonly unmount: () => void;
    readonly destroy: () => void;
}

interface PaymentElementWrapper {
    readonly mount: (node: HTMLElement | HTMLDivElement) => PaymentElement;
}

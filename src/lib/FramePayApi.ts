/**
 * FramePay Api implementation
 */
export default class FramePayApi {
    get card(): CardPaymentMethod {
        return {
            mount(
                node: HTMLElement | HTMLDivElement,
                elementType?: CardPaymentElementTypes
            ) {
                return FramePayApi.remoteApi().card.mount(node, elementType);
            }
        };
    }

    get bankAccount(): BankPaymentMethod {
        return {
            mount(
                node: HTMLElement | HTMLDivElement,
                elementType?: BankPaymentElementTypes
            ) {
                return FramePayApi.remoteApi().bankAccount.mount(
                    node,
                    elementType
                );
            }
        };
    }

    static remoteApi(): RemoteFramePayApi {
        // @ts-ignore
        return typeof window !== 'undefined' ? window.Rebilly : undefined;
    }

    static getInstance(): FramePayApi {
        return FramePayApi.instance;
    }
    private static readonly instance = new FramePayApi();

    async initialize(settings: FramePaySettings) {
        FramePayApi.remoteApi().initialize(settings);
    }

    // TODO extraData specification
    createToken(form: HTMLFormElement, extraData: object = {}) {
        return FramePayApi.remoteApi().createToken(form, extraData);
    }
}

let instance = null;
let provider = null;

class FramePayApi {
    constructor({provider: providerInstance}) {
        if (instance) {
            return instance;
        }

        provider = providerInstance;
        instance = this;
        return this;
    }

    async createToken(formData) {
        return Rebilly.createToken(formData);
    }

    get card() {
        return {
            mount(node) {
                // TODO MOUNT CARD BY NODE INSTEAD OF ID
                Rebilly.card.mount('#card');
            },
        };
    }

}

export default FramePayApi;
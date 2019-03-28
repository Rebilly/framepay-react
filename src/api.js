let instance = null;
let provider = null;

class FramePayApi {
  constructor({ provider: providerInstance }) {
    if (instance) {
      return instance;
    }

    provider = providerInstance;
    instance = this;
    return this;
  }

  get card() {
    return {
      mount(node) {
        // TODO MOUNT CARD BY NODE INSTEAD OF ID
        Rebilly.card.mount('#card');
      },
    };
  }

  async createToken(formData) {
    return Rebilly.createToken(formData);
  }
}

export default FramePayApi;

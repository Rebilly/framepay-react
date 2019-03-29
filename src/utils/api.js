/**
 * Api to use the framepay global object
 * @type {FramePayApi}
 */
let instance = null;
let provider = null;
let remoteApi = null;

const getRemoteApi = () => {
  if (remoteApi) {
    return remoteApi;
  }
  remoteApi = typeof window !== 'undefined' ? window.Rebilly : undefined;
  return remoteApi;
};

export default class FramePayApi {

  static remoteApiReady() {
    return !!getRemoteApi();
  };

  /**
   * @return {FramePayApi}
   */
  constructor({ provider: providerInstance }) {
    if (instance) {
      return instance;
    }

    provider = providerInstance;
    instance = this;
    return this;
  }

  static initialize(config) {
    getRemoteApi()
      .initialize(config);
  }

  get card() {
    return {
      mount(node) {
        return getRemoteApi()
          .card
          .mount(node);
      },
    };
  }

  async createToken(formData) {
    return Rebilly.createToken(formData);
  }
}

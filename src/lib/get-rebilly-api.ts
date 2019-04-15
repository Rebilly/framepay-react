/**
 * Just simple wrapper of remote FramePay api
 */
const remoteApi = (): RebillyApi => {
    // @ts-ignore
    return typeof window !== 'undefined' ? window.Rebilly : undefined;
};

export default function getRebillyApi(): RebillyApi {
    return remoteApi();
}

/**
 * Just simple wrapper of remote FramePay api
 */
const remoteApi = (): FramePayApi => {
    // @ts-ignore
    return typeof window !== 'undefined' ? window.Rebilly : undefined;
};

export default function getFramePayApi(): FramePayApi {
    return remoteApi();
}

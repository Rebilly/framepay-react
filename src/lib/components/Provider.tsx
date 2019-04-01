import * as React from 'react';
import {ContextProvider} from '../context';
import {injectScript, injectStyle} from '../dom-util';
import FramePayApi from '../FramePayApi';

interface ProviderProps {
  readonly injectScript: boolean,
  readonly injectStyle: boolean,
  readonly settings: FramePaySettings,
  readonly children: React.Component
}

/**
 * Provider state
 */
export interface ProviderState {
  readonly api: FramePayApi,
  readonly ready: boolean
}

export default class Provider extends React.Component<ProviderProps, ProviderState> {

  readonly state: ProviderState = {
    api: FramePayApi.getInstance(),
    ready: false
  };

  componentDidMount() {
    if (this.props.injectScript) {
      injectScript({
        onError: () => this.onApiError(),
        onReady: () => this.onApiReady()
      });
    }
    if (this.props.injectStyle) {
      injectStyle();
    }
  }

  onApiError() {
    return this.setState({ready: false} as ProviderState, () => {
      throw new Error(`api error`);
    });
  }

  async onApiReady() {
    await this.state.api.initialize(this.props.settings);
    this.setState({ready: true} as ProviderState);
  }

  render() {
    return (<ContextProvider value={this.state}>
      {this.props.children}
    </ContextProvider>);
  }
}

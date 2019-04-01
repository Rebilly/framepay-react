import * as React from 'react';
import {ContextConsumer} from '../context';
import FramePayApi from '../FramePayApi';
import BankElement from './elements/BankElement';
import CardElement from './elements/CardElement';
import {ProviderState} from './Provider';

interface WrappedComponentProps {
  readonly framePay: FramePayApi,
  readonly BankComponent?: BankElement,
  readonly CardComponent?: CardElement,
}

function Hoc<P extends object>(WrappedComponent: React.ComponentType<P>, provider: any) {
  return class extends React.Component<WrappedComponentProps & P, {}> {
    static readonly displayName = `FramePayInjector(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    render() {
      return <ContextConsumer>
        {(data) => {
          return <WrappedComponent {...{...this.props, ...provider(data)}}/>;
        }}
      </ContextConsumer>;
    }
  };
}

export function withFramePayCardComponent<P extends object>(WrappedComponent: React.ComponentType<P>) {
  const elements = {
    CardCvvElement: Hoc(CardElement, (data: ProviderState) => ({...data, elementType: 'cardCvv'}) as object),
    CardElement: Hoc(CardElement, (data: ProviderState) => ({...data}) as object),
    CardExpiryElement: Hoc(CardElement, (data: ProviderState) => ({
      ...data,
      elementType: 'cardExpiry'
    }) as object),
    CardNumberElement: Hoc(CardElement, (data: ProviderState) => ({
      ...data,
      elementType: 'cardNumber'
    }) as object),
  };
  return Hoc(
    WrappedComponent,
    (data: any) => ({
      framePay: data.api,
      ...elements
    })
  );
};


export function withFramePayBankComponent<P extends object>(WrappedComponent: React.ComponentType<P>) {

  const elements = {
    BankAccountNumberElement: Hoc(BankElement, (data: ProviderState) => ({
      ...data,
      elementType: 'bankAccountNumber'
    }) as object),
    BankAccountTypeElement: Hoc(BankElement, (data: ProviderState) => ({
      ...data,
      elementType: 'bankAccountType'
    }) as object),
    BankElement: Hoc(BankElement, (data: ProviderState) => ({...data}) as object),
    BankRoutingNumberElement: Hoc(BankElement, (data: ProviderState) => ({
      ...data,
      elementType: 'bankRoutingNumber'
    }) as object),
  };

  return Hoc(
    WrappedComponent,
    (data: any) => ({
      framePay: data.api,
      ...elements
    })
  );
};




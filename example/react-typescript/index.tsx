import { FramePayProvider } from 'framepay-react';
import * as React from 'react';
import { render } from 'react-dom';

import MyBankPageComponent from './MyBankPageComponent';
import MyCardPageComponent from './MyCardPageComponent';

const pages = {
    Bank: MyBankPageComponent,
    Card: MyCardPageComponent
};

const App = () => {
    const PageComponent = document.location.hash.includes('bank')
        ? pages.Bank
        : pages.Card;
    return (
        <FramePayProvider injectStyle publishableKey="pk_sandbox_c6cqKLddciVikuBOjhcng-rLccTz70NT4W_qZ_h">
            <PageComponent />
        </FramePayProvider>
    );
};

render(<App />, document.getElementById('root'));

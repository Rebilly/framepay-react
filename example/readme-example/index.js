import React from 'react';
import { render } from 'react-dom';
import { FramePayProvider } from '../../build';

import MyCardPageComponent from './MyCardPageComponent';
import MyBankPageComponent from './MyBankPageComponent';

const pages = {
    Card: MyCardPageComponent,
    Bank: MyBankPageComponent
};

const App = () => {
    const PageComponent = document.location.hash.includes('bank') ? pages.Bank : pages.Card;
    return (
        <FramePayProvider injectStyle publishableKey="pk_sandbox_c6cqKLddciVikuBOjhcng-rLccTz70NT4W_qZ_h">
            <PageComponent/>
        </FramePayProvider>
    );
};

render(<App/>, document.getElementById('root'));

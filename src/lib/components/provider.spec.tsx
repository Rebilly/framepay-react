// tslint:disable:max-classes-per-file

import { render } from '@testing-library/react';
import * as React from 'react';
import { FRAMEPAY_SCRIPT_LINK, FRAMEPAY_STYLE_LINK } from '../constants';
import Provider from './provider';

describe('Provider', () => {
    it('should add the FramePay script on the page', () => {
        const props = { publishableKey: 'pk_sandbox_1234567890' };

        class ChildComponent extends React.Component {
            render() {
                return <div>child</div>;
            }
        }

        expect(document.head.innerHTML).not.toContain(FRAMEPAY_SCRIPT_LINK);

        render(
            <Provider {...props}>
                <ChildComponent />
            </Provider>
        );
        expect(document.head.innerHTML).toContain(FRAMEPAY_SCRIPT_LINK);
    });

    it('should add the FramePay styles on the page', () => {
        const props = {
            injectStyle: true,
            publishableKey: 'pk_sandbox_1234567890'
        };

        class ChildComponent extends React.Component {
            render() {
                return <div>child</div>;
            }
        }

        expect(document.head.innerHTML).not.toContain(FRAMEPAY_STYLE_LINK);
        render(
            <Provider {...props}>
                <ChildComponent />
            </Provider>
        );
        expect(document.head.innerHTML).toContain(FRAMEPAY_STYLE_LINK);
    });

    it('should render with single child component', () => {
        const props = { publishableKey: 'pk_sandbox_1234567890' };

        class ChildComponent extends React.Component {
            render() {
                return <div>child</div>;
            }
        }

        const { container } = render(
            <Provider {...props}>
                <ChildComponent />
            </Provider>
        );
        expect(container.firstChild).toMatchInlineSnapshot(`
            <div>
              child
            </div>
        `);
    });

    it('should render with multiple child components', () => {
        const props = { publishableKey: 'pk_sandbox_1234567890' };

        class ChildComponent extends React.Component<{
            readonly title: string;
        }> {
            render() {
                return <div>{this.props.title}</div>;
            }
        }

        const { container } = render(
            <Provider {...props}>
                <ChildComponent title="child-1" />
                <ChildComponent title="child-2" />
            </Provider>
        );
        expect(container).toMatchInlineSnapshot(`
            <div>
              <div>
                child-1
              </div>
              <div>
                child-2
              </div>
            </div>
        `);
    });
});

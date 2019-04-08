// tslint:disable:max-classes-per-file

import { mount } from 'enzyme';
import * as React from 'react';
import Provider from '../../../../../src/lib/components/Provider';

describe('lib/components/Provider', () => {
    it('should render with single child component', () => {
        const props = { publishableKey: 'pk_sandbox_1234567890' };

        class ChildComponent extends React.Component {
            render() {
                return <div>child</div>;
            }
        }

        const wrapper = mount(
            <Provider {...props}>
                <ChildComponent />
            </Provider>
        );
        expect(wrapper.html()).toEqual('<div>child</div>');
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

        const wrapper = mount(
            <Provider {...props}>
                <ChildComponent title="child-1" />
                <ChildComponent title="child-2" />
            </Provider>
        );
        expect(wrapper.html()).toEqual('<div>child-1</div><div>child-2</div>');
    });
});

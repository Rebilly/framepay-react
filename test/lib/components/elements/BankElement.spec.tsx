import { Substitute } from '@fluffy-spoon/substitute';
import { shallow } from 'enzyme';
import * as React from 'react';

import BankElement from '../../../../src/lib/components/elements/BankElement';
import { BankElementComponentProps } from '../../../../src/types/payment-method-elements';

const mockedProps = Substitute.for<BankElementComponentProps>();

it('BankElement should render the empty div element', () => {
    const wrapper = shallow(<BankElement {...mockedProps} />);
    expect(wrapper.html()).toEqual('<div></div>');
});

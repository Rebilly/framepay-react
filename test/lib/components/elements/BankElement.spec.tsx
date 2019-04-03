import { Substitute } from '@fluffy-spoon/substitute';
import { mount, shallow } from 'enzyme';
import * as React from 'react';

import BankElement from '../../../../src/lib/components/elements/BankElement';
import { BankElementComponentProps } from '../../../../src/types/payment-method-elements';

const mockedProps = Substitute.for<BankElementComponentProps>();

// it('Method setupElement should not be called while the api isnt ready', () => {
//     const props = {
//         ...mockedProps,
//         api: {
//             ...mockedProps.api,
//             bankAccount: {
//                 ...mockedProps.api.bankAccount,
//                 mount: () => {
//                     console.log('MOUNT CALL');
//                     return {
//                         on: () => {}
//                     };
//                 }
//             }
//         },
//         ready: true
//     };
//
//     const spy = jest.spyOn(BankElement.prototype, 'setupElement');
//     const wrapper = mount(<BankElement {...props} />);
//     const instance = wrapper.instance();
//     console.log('instance.elementNode>>> ', instance);
//     expect(spy).toHaveBeenCalled();
// });

it('BankElement should render the empty div element', () => {
    const wrapper = shallow(<BankElement {...mockedProps} />);
    expect(wrapper.html()).toEqual('<div></div>');
});

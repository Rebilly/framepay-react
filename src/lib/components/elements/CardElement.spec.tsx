/* tslint:disable */
import test from 'ava';
// @ts-ignore
import React from 'react';
import * as TypeMoq from 'typemoq';
import { shallow } from 'enzyme';

import { configure } from 'enzyme';
// @ts-ignore
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import CardElement from './CardElement';
import { CardElementComponentProps } from '../../../types/internal/payment-method';

// @ts-ignore
const mockedProps: TypeMoq.IMock<CardElementComponentProps> = TypeMoq.Mock.ofType(CardElement);


test('rendered h1 element', (t) => {
    // @ts-ignore
    const wrapper = shallow(<CardElement {...mockedProps}/>);
    console.log('>>>>', wrapper);
    console.log('22222', wrapper.props);
    t.is(wrapper.type(), 'div');
});

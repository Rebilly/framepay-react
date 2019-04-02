import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FramePayReactNative from './FramePayReactNative';

const params = {
    scheme: 'CardElement',
    settings: {
        publishableKey: 'pk_live_PB0BfcVUrp1-0WVzuCKCf-6TnnJ64H0ngd-1AVq\n',
        style: {
            base: {
                color: 'green',
                fontSize: '12px',
                webkitFontSmoothing: 'auto',
                fontFeatureSettings: 'test',
                fontStyle: 'italic',
                fontVariant: 'normal',
                fontStretch: 'none',
                fontSomething: 'not-included',
                fontOtherThing: 'not-included',
                lineHeight: '20px',
            },
            invalid: {
                fontWeight: 'bold',
            },
        },
        classes: {
            base: 'rebilly-framepay',
            focus: 'rebilly-framepay-focus',
            valid: 'rebilly-framepay-valid',
            invalid: 'rebilly-framepay-invalid',
            buttons: 'rebilly-framepay-buttons',
            webkitAutofill: 'rebilly-framepay-webkit-autofill',
        },
        icon: {
            foobar: 123,
            display: true,
            color: 'blue',
        },
    },
};

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <FramePayReactNative params={params}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

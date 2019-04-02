import React from 'react';
import { Button, StyleSheet, Touchable, View, WebView } from 'react-native';

export default class FramePayReactNative extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onMessage(message) {
        alert(JSON.stringify(message));
    }

    handleSubmit() {
        this.webview.postMessage('submit');
    }

    render() {
        const self = this;
        const uri = 'http://localhost:8777';
        const params = `var params = ${JSON.stringify(this.props.params)};`;
        return (
            <View style={styles.container}>
                {/* INJECT FRAMEPAY SETTINGS IN IFRAME SECURITY REASONS */}
                <WebView
                    ref={webview => {
                        self.webview = webview;
                    }}
                    injectedJavaScript={params}
                    avaScriptEnabled={true}
                    domStorageEnabled={true}
                    onError={err => alert(err)}
                    onMessage={this.onMessage}
                    originWhitelist={['*']}
                    source={{ uri }}
                    useWebKit={true}

                />

                <Button title="ReactNative button" onPress={this.handleSubmit}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 300,
        height: 300,
    },
});

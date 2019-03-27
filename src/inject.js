import React from 'react';
import {Consumer} from './context';

class Card extends React.Component {

    componentDidMount() {
        setTimeout(() => {
            // TODO add provide listeners
            this.props.framePay.card.mount(this.cardNode);
        }, 3000);
    }

    shouldComponentUpdate() {
        return false;
    }

    render() {
        return <div id="card" ref={(node) => this.cardNode = node}></div>;
    }
}

const injectFramePayCard = (Component) => {
    class FramePayHoc extends React.Component {
        state = {};

        render() {
            const CardComponent = <Consumer>
                {(context) => <Card{...this.props} framePay={context}/>}
            </Consumer>;

            return (<Consumer>
                {(context) => <Component{...this.props} framePay={context} CardComponent={CardComponent}/>}
            </Consumer>);
        }
    }

    FramePayHoc.displayName = `FramePayHoc(${Component.displayName || Component.name || 'Component'})`;
    return FramePayHoc;
};

export default injectFramePayCard;

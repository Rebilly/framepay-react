import React from 'react';
import {injectFramePayCard} from 'framepay-react';

class Card extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.framePay.createToken({
            firstName: 'firstName',
            lastName: 'lastName',
            address: 'address',
            country: 'country',
            region: 'region',
        }).then(result => {
            console.log('result', result);
        });
    }

    render() {
        return (<form onSubmit={this.handleSubmit}>
            <div>
                <label>
                    First Name
                    <input data-rebilly="firstName" defaultValue="Bob"/>
                </label>
            </div>
            <div>
                <label>
                    Last Name
                    <input data-rebilly="lastName" defaultValue="Rogers"/>
                </label>
            </div>
            <div>
                <label>
                    Address
                    <input data-rebilly="address" defaultValue="1337 Fleet Street"/>
                </label>
            </div>
            <div>
                <label>
                    Country
                    <select name="country" data-rebilly="country" defaultValue="">
                        <option value="">Select</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                    </select>
                </label>
            </div>
            <div>
                <label>
                    Region
                    <textarea data-rebilly="region" defaultValue="Yukon"/>
                </label>
            </div>
            <br/>
            <label htmlFor="card">Payment Card</label>
            {this.props.CardComponent}
            <input type="hidden" data-rebilly="token" name="token"/>
            <button>Submit</button>
        </form>);
    }
}

export default injectFramePayCard(Card);

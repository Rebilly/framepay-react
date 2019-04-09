import { withFramePayBankComponent } from 'framepay-react';
import * as React from 'react';

interface BankState {
    readonly firstName: string;
    readonly lastName: string;
}
class MyBankPageComponent extends React.Component<
    BankComponentProps,
    BankState
> {
    private formRef = React.createRef<HTMLFormElement>();

    constructor(props) {
        super(props);
        this.state = { firstName: '', lastName: '' };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        // @see https://rebilly.github.io/framepay-docs/reference/rebilly.html#rebilly-createtoken
        this.props.Rebilly
            .createToken(this.formRef.current, {
                billingAddress: { ...this.state }
            })
            .then(data => alert(JSON.stringify(data, null, 2)))
            .catch(err => alert(JSON.stringify(err, null, 2)));
    }

    render() {
        return (
            <form ref={this.formRef} onSubmit={this.onSubmit}>
                <div>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        defaultValue={this.state.firstName}
                        onChange={e =>
                            this.setState({ firstName: e.target.value })
                        }
                    />
                </div>
                <br />
                <div>
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        defaultValue={this.state.lastName}
                        onChange={e =>
                            this.setState({ lastName: e.target.value })
                        }
                    />
                </div>
                <br />
                <this.props.BankElement />
                <hr />
                <button>Make Payment</button>
            </form>
        );
    }
}

export default withFramePayBankComponent(MyBankPageComponent);

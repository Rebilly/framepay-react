import * as React from 'react';

export default class BaseElement<
    T extends PaymentComponentProps,
    S extends PaymentComponentState
> extends React.Component<T, S> {
    readonly state = {
        element: null,
        mounted: false,
        ready: false
    } as S;

    /* tslint:disable:readonly-keyword */
    protected elementNode: HTMLDivElement | null = null;

    /* tslint:enable:readonly-keyword */

    componentWillUnmount() {
        if (this.state.mounted && !this.state.element) {
            throw new Error(
                `Element does not exists, please fix the setupElement method and add setState({element})`
            );
        }
        if (this.state.element) {
            this.state.element.destroy();
        }
    }

    componentDidMount() {
        this.handleSetupElement();
    }

    setupElement() {
        throw new Error(`Please implement method setupElement`);
    }

    handleSetupElement() {
        if (!this.props.Rebilly.ready) {
            /**
             * The remote api isn't ready
             */
            return;
        }
        if (this.state.mounted) {
            /**
             * The field already mounted
             */
            return;
        }
        if (!this.elementNode) {
            /**
             * Component dom element not mounted
             */
            return;
        }
        /**
         * Setup field
         */
        // @ts-ignore
        this.state.mounted = true;
        this.setupElement();
    }

    shouldComponentUpdate(nextProps: any, nextState: any) {
        // we can't to use the componentDidUpdate, componentWillReceiveProps methods
        // also, we can't return true here (to avoid the dom element re-render)
        // so, in that case we had to use that method as componentDidUpdate or componentWillReceiveProps
        // with some magic
        const rules: ReadonlyArray<any> = [
            // @ts-ignore
            [this.props.Rebilly.ready, nextProps.Rebilly.ready],
            // @ts-ignore
            [this.state.mounted, nextState.mounted],
            // @ts-ignore
            [this.state.ready, nextState.ready],
            // @ts-ignore
            [!!this.state.element, !!nextState.element]
        ];

        const shouldUpdate = rules.find(([prev, next]) => prev !== next);

        if (shouldUpdate) {
            // @ts-ignore
            this.props = nextProps;
            this.handleSetupElement();
            // @ts-ignore
            this.state = { ...nextState };
        }

        return false;
    }

    render() {
        return (
            <div id={this.props.id} ref={node => (this.elementNode = node)} />
        );
    }
}

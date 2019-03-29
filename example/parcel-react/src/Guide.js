import React from 'react';

export default class Guide extends React.Component {

  render() {
    return (<div>
      <h2>
        <a href="#set-up-framepay-provider" aria-hidden="true" className="header-anchor">#</a>
        Set up FramePayProvider
      </h2>
      <p>
        See <a href="#">App.js#18</a>
      </p>
      <div className="language-html extra-class">
        <pre className="language-html"><code>{`<FramePayProvider settings={settings}>
...
</FramePayProvider>`}</code></pre>
      </div>
    </div>);
  }
}

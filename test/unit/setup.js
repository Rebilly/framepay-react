const enzyme = require('enzyme');
const Adapter = require('@wojtekmaj/enzyme-adapter-react-17');

require('../../env');
require('jsdom-global/register');

enzyme.configure({ adapter: new Adapter() });

beforeEach(() => {
    document.head.innerHTML = '';
    document.body.innerHTML = '';
});

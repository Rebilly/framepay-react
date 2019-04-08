const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

require('../../env');
require('jsdom-global/register');

enzyme.configure({ adapter: new Adapter() });

beforeEach(() => {
    document.head.innerHTML = '';
    document.body.innerHTML = '';
});

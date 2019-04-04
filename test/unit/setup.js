const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

require('jsdom-global/register');

enzyme.configure({ adapter: new Adapter() });

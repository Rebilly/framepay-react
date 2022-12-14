/**
 * Tiny util to switch react version in test
 *
 * @type {string}
 */
const fs = require('fs');
const pkg = require('../../package');

const version = process.env.REACT_VERSION;
const clean = !Boolean(version) || version === 'clean';


const template = {
    'prop-types': './test/e2e/assets/prop-types.js',
    'react': `./test/e2e/assets/react-${version}.js`,
    'react-dom': `./test/e2e/assets/react-dom-${version}.js`
};


/**
 * Delete aliases
 */
if (clean) {
    if (pkg.alias) {
        Object.keys(template).forEach(key => delete pkg.alias[key]);

        if (!Object.keys(pkg.alias).length) {
            delete pkg.alias;
        }
    }
} else {
    pkg.alias = pkg.alias || {};
    Object.assign(pkg.alias, template);
}

if (!clean) {
    console.log(`>>> REACT_VERSION ${version} <<<`);
} else {
    console.log(`>>> CLEAN REACT ALIAS <<<`);
}

fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 4), 'utf8');

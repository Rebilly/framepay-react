require('@babel/register')({
    presets: [
        '@babel/env',
        '@babel/react',
    ],
});

require('./server');

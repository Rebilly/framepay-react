/**
 * Not used in e2e test, just for run the manual preview
 */

import server from './server.mjs';

(async function() {
    const { app } = await server();
    app.use(`/`, (req, res) => {
        res.redirect('/checkout-combined');
    });
})();

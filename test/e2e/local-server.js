/**
 * Not used in e2e test, just for run the manual preview
 */

(async function() {
    const { app } = await require('./server')();
    app.use(`/`, (req, res) => {
        res.redirect('/checkout-combined');
    });
})();

const authRoute = require('./auth.route');
const accountRoute = require('./account.route');
const profileRoute = require('./profile.route');
const productRoute = require('./product.route');

function route(app) {
    app.get('/', (req, res) => {
        res.send('Backend server is running!');
    });

    app.use('/account', accountRoute);

    app.use('/auth', authRoute);

    app.use('/profile', profileRoute);

    app.use('/product', productRoute);
}

module.exports = route;

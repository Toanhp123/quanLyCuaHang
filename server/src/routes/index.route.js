const authRoute = require('./auth.route');
const accountRoute = require('./account.route');

function route(app) {
    app.get('/', (req, res) => {
        res.send('Backend server is running!');
    });

    app.use('/account', accountRoute);

    app.use('/auth', authRoute);
}

module.exports = route;

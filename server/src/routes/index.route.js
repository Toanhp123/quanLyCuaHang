const authRoute = require('./auth.route');
const accountRoute = require('./account.route');
const profileRoute = require('./profile.route');

function route(app) {
    app.get('/', (req, res) => {
        res.send('Backend server is running!');
    });

    app.use('/account', accountRoute);

    app.use('/auth', authRoute);

    app.use('/profile', profileRoute);
}

module.exports = route;

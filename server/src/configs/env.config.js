const env = require('env-var');

module.exports = {
    POST: env.get('POST').default(80).asPortNumber(),

    DB_HOST: env.get('DB_HOST').required().asString(),
    DB_USER: env.get('DB_USER').required().asString(),
    DB_NAME: env.get('DB_NAME').required().asString(),
    DB_PASS: env.get('DB_PASS').required().asString(),

    JWT_ACCESS_SECRET: env.get('JWT_ACCESS_SECRET').required().asString(),
    JWT_REFRESH_SECRET: env.get('JWT_REFRESH_SECRET').required().asString(),
    JWT_EXPIRES_IN: env.get('JWT_EXPIRES_IN').default('15m').asString(),
    JWT_EXPIRES_DAY_IN: env.get('JWT_EXPIRES_DAY_IN').default('7d').asString(),

    COOKIE_EXPIRES_IN: env
        .get('COOKIE_EXPIRES_IN')
        .default(15 * 60 * 1000) // 15m
        .asIntPositive(),
    COOKIE_EXPIRES_DAY_IN: env
        .get('COOKIE_EXPIRES_DAY_IN')
        .default(7 * 60 * 60 * 24 * 1000) // 7d
        .asIntPositive(),

    NODE_ENV: env.get('NODE_ENV').default('production').asString(),
};

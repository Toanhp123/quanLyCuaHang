const { AccountFilter } = require('../utils/search');

const AccountService = require('../services/account.service');

class AccountController {
    // [GET] /account
    async getAccountByCondition(req, res, next) {
        try {
            const accounts = await AccountService.getAccountByCondition(
                AccountFilter(req.query),
            );

            res.json(accounts);
        } catch (err) {
            next(err);
        }
    }

    // [GET] /account/:username
    async getAccountByUsername(req, res, next) {
        const { username } = req.params;

        try {
            const account = await AccountService.getAccountByUsername(username);

            res.json(account);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new AccountController();

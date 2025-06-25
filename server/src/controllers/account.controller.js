const AccountService = require('../services/account.service');

class AccountController {
    // [GET] /account
    async getAllAccount(req, res) {
        try {
            const accounts = await AccountService.getAllAccount();
            res.json(accounts);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi server', error: err.message });
        }
    }
}

module.exports = new AccountController();

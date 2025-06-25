const { AccountFilter } = require('../utils/search');

const AccountService = require('../services/account.service');

class AccountController {
    // [GET] /account
    async getAccountByCondition(req, res) {
        try {
            const accounts = await AccountService.getAccountByCondition(
                AccountFilter(req.query),
            );

            if (!accounts || accounts.length === 0) {
                return res
                    .status(404)
                    .json({ message: 'Không tìm thấy tài khoản' });
            } else {
                res.json(accounts);
            }
        } catch (err) {
            res.status(500).json({ message: 'Lỗi server', error: err.message });
        }
    }

    // [GET] /account/:username
    async getAccountByUsername(req, res) {
        const { username } = req.params;

        try {
            const account = await AccountService.getAccountByUsername(username);
            if (!account) {
                return res
                    .status(404)
                    .json({ message: 'Tài khoản không tồn tại' });
            }
            res.json(account);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi server', error: err.message });
        }
    }
}

module.exports = new AccountController();

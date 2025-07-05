const { Account, AccountRole } = require('../models');
const { AccountStatus } = require('../configs/constants.config');

const AppError = require('../utils/errorCustom.util');

class AccountService {
    /**
     * Hàm lấy thông tin tài khoản theo tên người dùng:
     * @param {String} username id tên người dùng
     * @returns {Promise<Object>} Trả về thông tin tài khoản theo tên người dùng
     */
    async getAccountByUsername(username) {
        const account = await Account.findOne({
            where: { username },
        });

        if (!account) {
            throw new AppError(
                `Can't find account has this username: ${username}`,
                {
                    statusCode: 401,
                    errorCode: AccountStatus.NOT_FOUND,
                },
            );
        }

        return account;
    }

    /**
     * Hàm lấy thông tin tài khoản theo điều kiện truy vấn:
     * @param {Object} query thông tin truy vấn để lọc tài khoản
     * @returns {Promise<Array>} Trả về danh sách tài
     */
    async getAccountByCondition(query) {
        const account = await Account.findAll({
            where: query,
        });

        if (account.length === 0) {
            throw new AppError("Can't find account", {
                statusCode: 401,
                errorCode: AccountStatus.NOT_FOUND,
            });
        }

        return account;
    }
}

module.exports = new AccountService();

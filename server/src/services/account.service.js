// const Account = require('../models/account.model');

const { Account, AccountRole } = require('../models');

class AccountService {
    async getAllAccount() {
        return await Account.findAll();
    }

    async getAccountByUsername(username) {
        return await Account.findOne({
            where: { username },
        });
    }

    async getAccountByEmail(email) {
        return await Account.findOne({
            where: { email },
        });
    }

    async getAccountByEmployeeID(employee_id) {
        return await Account.findOne({
            where: { employee_id },
        });
    }

    async getAccountByCustomerID(customer_id) {
        return await Account.findOne({
            where: { customer_id },
        });
    }

    async getAccountByRole(role_id) {
        return await Account.findOne({
            where: { role_id },
        });
    }

    async getAccountByType(account_type) {
        return await Account.findOne({
            where: { account_type },
        });
    }

    async getAccountByStatus(account_status) {
        return await Account.findOne({
            where: { account_status },
        });
    }
}

module.exports = new AccountService();

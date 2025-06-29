// const Account = require('../models/account.model');

const { Account, AccountRole } = require('../models');

class AccountService {
    /**
     * Hàm lấy thông tin toàn bộ tài khoản:
     * @returns {Promise<Array>} Trả về thông tin toàn bộ tài khoản
     */
    async getAllAccount() {
        return await Account.findAll();
    }

    /**
     * Hàm lấy thông tin tài khoản theo tên người dùng:
     * @param {String} username id tên người dùng
     * @returns {Promise<Object>} Trả về thông tin tài khoản theo tên người dùng
     */
    async getAccountByUsername(username) {
        return await Account.findOne({
            where: { username },
        });
    }

    /**
     * Hàm lấy thông tin tài khoản theo Email:
     * @param {String} email id Email
     * @return {Promise<Object>} Trả về thông tin tài khoản theo Email
     */
    async getAccountByEmail(email) {
        return await Account.findOne({
            where: { email },
        });
    }

    /**
     * Hàm lấy thông tin tài khoản theo ID nhân viên:
     * @param {Int} employee_id id nhân viên
     * @returns {Promise<Object>} Trả về thông tin tài khoản theo ID nhân viên
     */
    async getAccountByEmployeeID(employee_id) {
        return await Account.findOne({
            where: { employee_id },
        });
    }

    /**
     * Hàm lấy thông tin tài khoản theo ID khách hàng:
     * @param {Int} customer_id id khách hàng
     * @returns {Promise<Object>} Trả về thông tin tài khoản theo ID khách hàng
     */
    async getAccountByCustomerID(customer_id) {
        return await Account.findOne({
            where: { customer_id },
        });
    }

    /**
     * Hàm lấy thông tin tài khoản theo ID vai trò:
     * @param {Int} role_id id vai trò
     * @returns {Promise<Object>} Trả về thông tin tài khoản theo ID vai trò
     */
    async getAccountByRole(role_id) {
        return await Account.findOne({
            where: { role_id },
        });
    }

    /**
     * Hàm lấy thông tin tài khoản theo loại tài khoản:
     * @param {Int} account_type id loại tài khoản
     * @returns {Promise<Object>} Trả về thông tin tài khoản theo loại tài khoản
     */
    async getAccountByType(account_type) {
        return await Account.findOne({
            where: { account_type },
        });
    }

    /**
     * Hàm lấy thông tin tài khoản theo trạng thái tài khoản:
     * @param {Int} account_status id trạng thái tài khoản
     * @returns {Promise<Object>} Trả về thông tin tài khoản theo trạng thái tài khoản
     */
    async getAccountByStatus(account_status) {
        return await Account.findOne({
            where: { account_status },
        });
    }

    /**
     * Hàm lấy thông tin tài khoản theo điều kiện truy vấn:
     * @param {Object} query thông tin truy vấn để lọc tài khoản
     * @returns {Promise<Array>} Trả về danh sách tài
     */
    async getAccountByCondition(query) {
        return await Account.findAll({
            where: query,
        });
    }
}

module.exports = new AccountService();

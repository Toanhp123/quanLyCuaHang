const { Customer, Account } = require('../models');

class ProfileService {
    /**
     * Lấy thông tin hồ sơ của khách hàng
     * @param {number} customer_id - ID của khách hàng
     * @returns {Promise<Object>} Thông tin hồ sơ của khách hàng
     */
    async getProfile(customer_id) {
        return await Customer.findOne({
            attributes: ['first_name', 'last_name', 'phone_number', 'address'],
            where: { customer_id },
            include: [
                {
                    model: Account,
                    attributes: ['username', 'email'],
                },
            ],
        });
    }
}

module.exports = new ProfileService();

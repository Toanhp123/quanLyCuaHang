const { Customer, Account } = require('../models');
const { ProfileStatus } = require('../configs/constants.config');

const AppError = require('../utils/errorCustom.util');

class ProfileService {
    /**
     * Lấy thông tin hồ sơ của khách hàng
     * @param {number} customer_id - ID của khách hàng
     * @returns {Promise<Object>} Thông tin hồ sơ của khách hàng
     */
    async getProfile(customer_id) {
        const customer = await Customer.findOne({
            attributes: ['first_name', 'last_name', 'phone_number', 'address'],
            where: { customer_id },
            include: [
                {
                    model: Account,
                    attributes: ['username', 'email'],
                },
            ],
        });

        if (!customer) {
            throw new AppError(`Can't find customer has id: ${customer_id}`, {
                statusCode: 401,
                errorCode: ProfileStatus.NOT_FOUND,
            });
        }

        return customer;
    }
}

module.exports = new ProfileService();

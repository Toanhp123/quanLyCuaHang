const { Op } = require('sequelize');

/**
 * Hàm tìm kiếm account theo điều kiện nhất định
 * @param {Object} query - Đối tượng chứa các điều kiện tìm kiếm
 */
const AccountFilter = (query) => {
    const filter = {};

    if (query.status) filter.account_status = query.status;
    if (query.username) {
        filter.username = { [Op.like]: `%${query.username}%` };
    }

    return filter;
};

module.exports = {
    AccountFilter,
};

const { Op } = require('sequelize');

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

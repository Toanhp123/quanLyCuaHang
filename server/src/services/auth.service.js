const {
    checkPassword,
    createPasswordHash,
} = require('../utils/validateUser.util');
const { Account, Customer, SessionLog } = require('../models');
const { TokenStatus, AccountStatus } = require('../configs/constants.config');
const { signAccessToken, signRefreshToken } = require('../utils/token.util');

const AppError = require('../utils/errorCustom.util');
const sequelize = require('../configs/database.config');
const accountService = require('../services/account.service');

class AuthService {
    /**
     * Hàm đăng nhập:
     * - Kiểm tra xem tài khoản có tồn tại không
     * - Kiểm tra xem tài khoản có hoạt động không
     * - Kiểm tra mật khẩu có đúng không
     * - Tạo Access Token và Refresh Token từ thông tin người dùng
     * @param {String} username - Tên đăng nhập của người dùng
     * @param {String} password - Mật khẩu của người dùng
     * @return {Object} Trả về thông tin người dùng và token
     */
    async login(username, password) {
        const user = await accountService.getAccountByUsername(username);

        if (!user) {
            throw new AppError("Can't find user", {
                statusCode: 401,
                errorCode: AccountStatus.NOT_FOUND,
            });
        } else if (user.account_status !== 'approved') {
            throw new AppError('Account is not active', {
                statusCode: 401,
                errorCode: AccountStatus.NOT_ACTIVE,
            });
        }

        const isPasswordCorrect = await checkPassword(
            password,
            user.password_hash,
        );

        if (!isPasswordCorrect) {
            throw new AppError('Password is incorrect', {
                statusCode: 401,
                errorCode: AccountStatus.WRONG_PASSWORD,
            });
        }

        const payload = {
            id: user.account_id,
            username: user.username,
            role: user.role_id,
        };

        // Tạo Access Token từ thông tin người dùng
        const accessToken = signAccessToken(payload);

        // Tạo Refresh Token từ thông tin người dùng
        const refreshToken = signRefreshToken(payload);

        return {
            accessToken,
            refreshToken,
            user: {
                id: user.account_id,
                username: user.username,
                role: user.role_id,
            },
        };
    }

    /**
     * Hàm đăng xuất:
     * - Cập nhật session log để đánh dấu là không hợp lệ
     * - Cập nhật thời gian đăng xuất
     * @param {number} id - ID của người dùng
     * @param {string} ip - Địa chỉ IP của người dùng
     */
    async logout(id, ip) {
        const checkSessionLog = await SessionLog.findOne({
            where: {
                account_id: id,
                ip_address: ip,
                isValid: true,
            },
        });

        if (checkSessionLog) {
            await SessionLog.update(
                {
                    isValid: false,
                    logout_time: new Date(),
                },
                {
                    where: {
                        account_id: id,
                        ip_address: ip,
                    },
                },
            );
        }
    }

    /**
     * Hàm đăng ký:
     * - Kiểm tra xem tài khoản đã tồn tại chưa
     * - Kiểm tra xem email đã tồn tại chưa
     * - Mã hóa mật khẩu
     * - Tạo tài khoản mới
     * @param {Object} user - Thông tin người dùng
     */
    async register(user) {
        const transaction = await sequelize.transaction();

        const checkUsername = await accountService.getAccountByUsername(
            user.username,
        );
        const checkEmail = await accountService.getAccountByEmail(user.email);

        if (checkUsername) {
            throw new AppError('Account already exists', {
                statusCode: 400,
                errorCode: AccountStatus.ALREADY_EXISTS,
            });
        }

        if (checkEmail) {
            throw new AppError('Email already exists', {
                statusCode: 400,
                errorCode: AccountStatus.ALREADY_EXISTS,
            });
        }

        // Mã hóa mật khẩu
        const passwordHash = await createPasswordHash(user.password);

        try {
            // Tạo khách mới
            const newCustomer = await Customer.create(
                {
                    first_name: user.firstName,
                    last_name: user.lastName,
                    phone_number: user.phoneNumber,
                    address: user.address,
                    customer_type_id: 1,
                    customer_birthday: user.birthday,
                },
                { transaction },
            );

            // Tạo tài khoản mới
            await Account.create(
                {
                    username: user.username,
                    password_hash: passwordHash,
                    account_type: 'customer',
                    employee_id: null,
                    customer_id: newCustomer.customer_id,
                    role_id: 3,
                    email: user.email,
                    account_status: 'pending',
                    create_at: new Date(),
                },
                { transaction },
            );

            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            console.error('Error during registration:', error);

            throw new AppError('Failed to register', {
                errorCode: Account.ERROR,
                statusCode: 500,
            });
        }
    }

    /**
     * Hàm tạo session log:
     * - Kiểm tra xem session log đã tồn tại chưa
     * - Nếu chưa tồn tại thì tạo mới
     * - Nếu đã tồn tại nhưng không hợp lệ thì cập nhật lại session log
     * @param {number} id - ID của người dùng
     * @param {string} ip - Địa chỉ IP của người dùng
     */
    async createSessionLog(id, ip) {
        const checkSessionLog = await SessionLog.findOne({
            where: {
                account_id: id,
                ip_address: ip,
            },
        });

        if (checkSessionLog === null) {
            await SessionLog.create({
                account_id: id,
                login_time: new Date(),
                ip_address: ip,
                isValid: true,
            });
        } else {
            if (checkSessionLog.isValid === false) {
                await SessionLog.update(
                    { isValid: true, login_time: new Date() },
                    {
                        where: {
                            account_id: id,
                            ip_address: ip,
                            isValid: false,
                        },
                    },
                );
            }
        }
    }

    /**
     * Hàm kiểm tra session log:
     * - Kiểm tra xem session log của refresh token có hợp lệ không
     * @param {number} id - ID của người dùng
     * @param {string} ip - Địa chỉ IP của người dùng
     * @return {boolean} Trả về true nếu session log hợp lệ, false nếu không hợp lệ
     */
    async checkRefreshTokenSession(id, ip) {
        const checkSessionLog = await SessionLog.findOne({
            where: {
                account_id: id,
                ip_address: ip,
                isValid: true,
            },
        });

        if (checkSessionLog === null) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * Hàm tạo Access Token nếu Refresh Token hợp lệ:
     * - Kiểm tra xem session log của refresh token có hợp lệ không
     * - Nếu hợp lệ thì tạo Access Token mới
     * @param {Object} payload - Payload của Refresh Token
     * @param {string} ip - Địa chỉ IP của người dùng
     * @return {string} Trả về Access Token mới
     */
    async refreshTokenHandler(payload, ip) {
        // Check xem session refresh token có hợp lệ không
        const checkRefreshToken = await this.checkRefreshTokenSession(
            payload.id,
            ip,
        );

        if (!checkRefreshToken) {
            throw new AppError('Refresh token is invalid', {
                statusCode: 403,
                errorCode: TokenStatus.INVALID,
            });
        }

        // Tạo access token mới
        const newAccessToken = signAccessToken({
            id: payload.id,
            username: payload.username,
            role: payload.role_id,
        });

        return newAccessToken;
    }
}

module.exports = new AuthService();
